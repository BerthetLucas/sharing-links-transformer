# Songlink Migration (Frontend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Spotify↔Deezer metadata-matching flow with a single call to the backend's new `/songlink` endpoint, rendering one `SongCard` per platform Odesli returns — same visual design, far less code.

**Architecture:** One new service (`fetchSongLinks`) + one new hook (`useGetSongLinks`) replace the five deezer/spotify service+hook files. `SongResult` maps over `data.platforms` instead of branching between `DeezerLink`/`SpotifyLink`. `linksAtoms.ts` collapses to a single `inputUrlAtom`. `SongCard`'s `platform` prop becomes `string` with a generic translation fallback.

**Tech Stack:** Next.js App Router, `@tanstack/react-query` (`useSuspenseQuery`), `jotai`, `axios`, `next-intl`, Vitest + Testing Library, Playwright.

## Global Constraints

- Same visual design — reuse `SongCard`'s existing JSX/classes, no restyle.
- Front-end talks to the backend directly via `axios` (existing convention — no Next.js API-route proxy; the old `api/deezer*` routes are dead code, confirmed unused, and are deleted rather than repurposed).
- Backend contract (already implemented): `GET {BACKEND_BASE_URL}/songlink?url=` → `{ message: 'found', data: { pageUrl, thumbnail?, title?, artist?, platforms: {platform, url}[] } }`.
- Backend base URL is currently hardcoded per-file as `https://sharing-link-back-end-production.up.railway.app`; extract to one shared constant instead of repeating the string a third time.

---

### Task 1: Songlink types, service, hook

**Files:**
- Create: `src/app/types/songlink.ts`
- Create: `src/config/backend.ts`
- Create: `src/service/songlink/fetchSongLinks.ts`
- Create: `src/app/hooks/useGetSongLinks.ts`
- Test: `src/service/songlink/fetchSongLinks.test.ts`

**Interfaces:**
- Produces: `SongLinkPlatform = { platform: string; url: string }`, `SongLinkData = { pageUrl: string; thumbnail?: string; title?: string; artist?: string; platforms: SongLinkPlatform[] }`; `BACKEND_BASE_URL: string`; `fetchSongLinks(url: string): Promise<SongLinkData>`; `useGetSongLinks(url: string)` → `useSuspenseQuery<SongLinkData>` result — consumed by Task 3's `SongResult`.

- [ ] **Step 1: Write `src/app/types/songlink.ts`**

```ts
export type SongLinkPlatform = {
  platform: string;
  url: string;
};

export type SongLinkData = {
  pageUrl: string;
  thumbnail?: string;
  title?: string;
  artist?: string;
  platforms: SongLinkPlatform[];
};
```

- [ ] **Step 2: Write `src/config/backend.ts`**

```ts
export const BACKEND_BASE_URL = 'https://sharing-link-back-end-production.up.railway.app';
```

- [ ] **Step 3: Write the failing test for the service**

```ts
// src/service/songlink/fetchSongLinks.test.ts
import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { fetchSongLinks } from './fetchSongLinks';
import type { SongLinkData } from '@/app/types/songlink';

vi.mock('axios');

describe('fetchSongLinks', () => {
  it('calls the backend songlink endpoint with the url param and returns the data payload', async () => {
    const data: SongLinkData = {
      pageUrl: 'https://song.link/s/123',
      platforms: [{ platform: 'spotify', url: 'https://open.spotify.com/track/123' }],
    };
    vi.mocked(axios.get).mockResolvedValue({ data: { message: 'found', data } });

    const result = await fetchSongLinks('https://www.deezer.com/track/456');

    expect(axios.get).toHaveBeenCalledWith(
      'https://sharing-link-back-end-production.up.railway.app/songlink',
      { params: { url: 'https://www.deezer.com/track/456' } },
    );
    expect(result).toEqual(data);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `pnpm vitest run src/service/songlink/fetchSongLinks.test.ts`
Expected: FAIL — cannot find module `./fetchSongLinks`.

- [ ] **Step 5: Write `src/service/songlink/fetchSongLinks.ts`**

```ts
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/config/backend';
import type { SongLinkData } from '@/app/types/songlink';

export const fetchSongLinks = async (url: string): Promise<SongLinkData> => {
  const res = await axios.get(`${BACKEND_BASE_URL}/songlink`, {
    params: { url },
  });

  return res.data.data;
};
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `pnpm vitest run src/service/songlink/fetchSongLinks.test.ts`
Expected: PASS.

- [ ] **Step 7: Write `src/app/hooks/useGetSongLinks.ts`**

```ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSongLinks } from '@/service/songlink/fetchSongLinks';
import type { SongLinkData } from '@/app/types/songlink';

export const useGetSongLinks = (url: string) => {
  return useSuspenseQuery<SongLinkData>({
    queryKey: ['songlink', url],
    queryFn: () => fetchSongLinks(url),
  });
};
```

- [ ] **Step 8: Commit**

```bash
git add src/app/types/songlink.ts src/config/backend.ts src/service/songlink/fetchSongLinks.ts src/service/songlink/fetchSongLinks.test.ts src/app/hooks/useGetSongLinks.ts
git commit -m "feat: add songlink service, hook and types"
```

---

### Task 2: Simplify `linksAtoms.ts`

**Files:**
- Modify: `src/app/store/linksAtoms.ts`
- Test: none (no behavior beyond atom definitions; covered by Task 4/5's component tests once wired up)

**Interfaces:**
- Produces: `inputUrlAtom` (unchanged, already exists), `useReset()` → `{ resetInputUrl, resetAll }` — consumed by Task 3 (`useLinkTransformer`), Task 4 (`Title`, `FormInputLink`), Task 6 (`RetryButton`, unchanged usage).

- [ ] **Step 1: Rewrite `src/app/store/linksAtoms.ts`**

```ts
import { atomWithReset, useResetAtom } from 'jotai/utils';

export const inputUrlAtom = atomWithReset('');

export const useReset = () => {
  const resetInputUrl = useResetAtom(inputUrlAtom);

  return {
    resetInputUrl,
    resetAll: resetInputUrl,
  };
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/store/linksAtoms.ts
git commit -m "refactor: collapse linksAtoms to a single inputUrlAtom"
```

(This intentionally breaks `useLinkTransformer.ts`, `Title.tsx`, `FormInputLink.tsx`, `SongResult.tsx` — fixed in Tasks 3-4. Expected in a multi-file refactor; do not run the full test suite until Task 4 is done.)

---

### Task 3: Simplify `useLinkTransformer`

**Files:**
- Modify: `src/app/hooks/useLinkTransformer.ts`

**Interfaces:**
- Consumes: `inputUrlAtom`, `useReset` (Task 2).
- Produces: `useLinkTransformer()` → `{ inputUrl, handleSubmit }` — consumed by Task 4 (`SongResult` reads `inputUrlAtom` directly via `useAtomValue`, `page.tsx` uses `handleSubmit`).

- [ ] **Step 1: Rewrite `src/app/hooks/useLinkTransformer.ts`**

```ts
import { useAtom } from 'jotai';
import { inputUrlAtom, useReset } from '@/app/store/linksAtoms';
import type { FormEvent } from 'react';

export const useLinkTransformer = () => {
  const { resetInputUrl } = useReset();
  const [inputUrl, setInputUrl] = useAtom(inputUrlAtom);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    resetInputUrl();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get('url') as string;
    setInputUrl(url);
  };

  return {
    inputUrl,
    handleSubmit,
  };
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/hooks/useLinkTransformer.ts
git commit -m "refactor: simplify useLinkTransformer to a single url atom"
```

---

### Task 4: Update `Title` and `FormInputLink` to gate on `inputUrlAtom`

**Files:**
- Modify: `src/app/components/Title.tsx`
- Modify: `src/app/components/FormInputLink.tsx`

**Interfaces:**
- Consumes: `inputUrlAtom` (Task 2).

- [ ] **Step 1: Update `src/app/components/Title.tsx`**

```ts
'use client';
import { AudioLines } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { inputUrlAtom } from '@/app/store/linksAtoms';

export const Title = () => {
  const t = useTranslations('Title');
  const inputUrl = useAtomValue(inputUrlAtom);

  if (inputUrl) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col items-center gap-3">
        <AudioLines size={48} />
        <h1 className="text-3xl font-bold md:text-5xl">{t('title')}</h1>
      </div>
      <p className="max-w-md text-base text-neutral-400">{t('subtitle')}</p>
    </div>
  );
};
```

- [ ] **Step 2: Update `src/app/components/FormInputLink.tsx`**

```tsx
'use client';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import { inputUrlAtom } from '@/app/store/linksAtoms';

type FormInputLinkProps = {
  onSubmit: (event: FormEvent) => void;
};

export const FormInputLink = ({ onSubmit }: FormInputLinkProps) => {
  const t = useTranslations('Form');
  const inputUrl = useAtomValue(inputUrlAtom);

  if (inputUrl) {
    return null;
  }

  return (
    <form className="flex w-3/4 flex-col items-center gap-4 md:w-1/2" onSubmit={onSubmit}>
      <input
        className="mb-4 w-full rounded border bg-white p-2 text-black"
        data-testid="form-url-input"
        name="url"
        placeholder={t('placeholder')}
        required
        type="text"
      />
      <input
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium [box-shadow:0px_4px_1px_#a3a3a3] transition-all active:translate-y-0.5 active:shadow-none"
        data-testid="form-url-submit"
        type="submit"
        value={t('button')}
      />
    </form>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/Title.tsx src/app/components/FormInputLink.tsx
git commit -m "refactor: gate Title and FormInputLink on inputUrlAtom"
```

---

### Task 5: Generalize `SongCard` platform prop + translation

**Files:**
- Modify: `src/app/components/SongCard.tsx`
- Modify: `messages/en.json`
- Modify: `src/app/components/__test__/SongCard.test.tsx`

**Interfaces:**
- Produces: `SongCard({ artist, cover, link, title, platform }: { platform: string, ... })` — consumed by Task 6 (`SongResult`).

- [ ] **Step 1: Add a generic fallback message to `messages/en.json`**

Update the `Card` block:

```json
  "Card": {
    "spotifyUser": "You can now share this link to a Spotify User",
    "deezerUser": "You can now share this link to a Deezer User",
    "genericUser": "You can now share this link to a {platform} User"
  },
```

- [ ] **Step 2: Update the existing test's type import (no behavior change yet)**

In `src/app/components/__test__/SongCard.test.tsx`, change:

```ts
platform: 'deezer' as 'deezer' | 'spotify',
```

to:

```ts
platform: 'deezer',
```

- [ ] **Step 3: Add a failing test for the generic-platform fallback**

Append to `src/app/components/__test__/SongCard.test.tsx` (inside the existing `describe('SongCard')` block):

```ts
    it('falls back to a generic message for a platform without a dedicated translation', async () => {
      render(
        <SongCard
          artist="INOHA"
          cover="https://cdn-images.dzcdn.net/images/cover/b6f288faccbbd2f188ac2b4892abe2c4/500x500-000000-80-0-0.jpg"
          link="https://music.apple.com/track/123"
          platform="appleMusic"
          title="GESHUOU"
        />,
      );

      const section = document.querySelector('section');
      if (section) {
        section.style.opacity = '1';
      }

      await waitFor(() => {
        expect(screen.getByText('You can now share this link to a appleMusic User')).toBeVisible();
      });
    });
```

- [ ] **Step 4: Run tests to verify the new one fails**

Run: `pnpm vitest run src/app/components/__test__/SongCard.test.tsx`
Expected: the new test FAILs (component still types `platform` as a union and has no generic fallback); the pre-existing test still passes.

- [ ] **Step 5: Update `src/app/components/SongCard.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import { CopyLinkButton } from '@/app/components/CopyLinkButton';
import { ImageContainer } from '@/app/components/ImageContainer';
import { RetryButton } from '@/app/components/RetryButton';
import { MotionSection } from './MotionComponents/MotionSection';

type SongCardProps = {
  artist: string;
  cover: string;
  link: string;
  platform: string;
  title: string;
};

const DEDICATED_MESSAGE_KEYS: Record<string, string> = {
  spotify: 'spotifyUser',
  deezer: 'deezerUser',
};

export const SongCard = ({ artist, cover, link, title, platform }: SongCardProps) => {
  const t = useTranslations('Card');

  const messageKey = DEDICATED_MESSAGE_KEYS[platform];
  const description = messageKey ? t(messageKey) : t('genericUser', { platform });

  return (
    <MotionSection className="flex w-full flex-col-reverse items-center gap-10 px-4 md:flex-row md:justify-center">
      <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-white bg-gray-900 p-6 text-center md:w-auto">
        <p>{description}</p>
        <div className="flex max-w-full gap-3 rounded-lg bg-white p-6 font-bold text-black">
          <p className="truncate">{link}</p>
          <CopyLinkButton link={link} />
        </div>
        <ImageContainer image={cover} />
        <p>{artist}</p>
        <p>{title}</p>
      </div>
      <RetryButton />
    </MotionSection>
  );
};
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run src/app/components/__test__/SongCard.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/app/components/SongCard.tsx messages/en.json src/app/components/__test__/SongCard.test.tsx
git commit -m "feat: generalize SongCard platform prop with translation fallback"
```

---

### Task 6: Rewrite `SongResult` to render all platforms, delete dead code

**Files:**
- Modify: `src/app/components/SongResult.tsx`
- Delete: `src/app/components/DeezerLink.tsx`
- Delete: `src/app/components/SpotifyLink.tsx`
- Delete: `src/app/hooks/useGetDeezerSong.ts`
- Delete: `src/app/hooks/useGetSpotifySong.ts`
- Delete: `src/app/hooks/useGetSpotifySongInfo.ts`
- Delete: `src/service/deezer/` (entire directory)
- Delete: `src/service/spotify/` (entire directory)
- Delete: `src/app/api/deezer/`, `src/app/api/deezerGetId/`, `src/app/api/deezerGetSong/` (entire directories — confirmed unused: `grep -rn "api/deezer" src --include="*.ts" --include="*.tsx"` outside the route files themselves returns nothing)
- Delete: `src/app/types/deezer.ts`
- Delete: `src/app/types/spotify.ts`

**Interfaces:**
- Consumes: `inputUrlAtom` (Task 2), `useGetSongLinks` (Task 1), `SongCard` (Task 5).

- [ ] **Step 1: Rewrite `src/app/components/SongResult.tsx`**

```tsx
'use client';
import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { inputUrlAtom } from '@/app/store/linksAtoms';
import { Loading } from './Loading';
import { PlatformLinks } from './PlatformLinks';

export const SongResult = () => {
  const inputUrl = useAtomValue(inputUrlAtom);

  if (!inputUrl) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <PlatformLinks url={inputUrl} />
    </Suspense>
  );
};
```

- [ ] **Step 2: Create `src/app/components/PlatformLinks.tsx`**

```tsx
import { useGetSongLinks } from '@/app/hooks/useGetSongLinks';
import { SongCard } from './SongCard';

type PlatformLinksProps = {
  url: string;
};

export const PlatformLinks = ({ url }: PlatformLinksProps) => {
  const { data } = useGetSongLinks(url);

  return (
    <>
      {data.platforms.map(({ platform, url: platformUrl }) => (
        <SongCard
          key={platform}
          artist={data.artist ?? ''}
          cover={data.thumbnail ?? ''}
          link={platformUrl}
          platform={platform}
          title={data.title ?? ''}
        />
      ))}
    </>
  );
};
```

- [ ] **Step 3: Delete the superseded files**

```bash
git rm -r src/app/components/DeezerLink.tsx src/app/components/SpotifyLink.tsx \
  src/app/hooks/useGetDeezerSong.ts src/app/hooks/useGetSpotifySong.ts src/app/hooks/useGetSpotifySongInfo.ts \
  src/service/deezer src/service/spotify \
  src/app/api/deezer src/app/api/deezerGetId src/app/api/deezerGetSong \
  src/app/types/deezer.ts src/app/types/spotify.ts
```

- [ ] **Step 4: Run typecheck and full unit test suite**

Run: `pnpm types && pnpm vitest run`
Expected: PASS — no dangling imports, all existing + new tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/SongResult.tsx src/app/components/PlatformLinks.tsx
git commit -m "feat: render all platforms via PlatformLinks, remove deezer/spotify-specific code"
```

---

### Task 7: Replace platform-specific e2e specs with one generic flow

**Files:**
- Create: `e2e/share-link.spec.ts`
- Delete: `e2e/share-deezer-link.spec.ts`
- Delete: `e2e/share-spotify-link.spec.ts`
- Delete: `e2e/share-deezer-sharing-link-format.spec.ts`

**Interfaces:** none (end-to-end browser test, hits the real backend + real Odesli API, no mocks — same convention as the specs it replaces).

- [ ] **Step 1: Write `e2e/share-link.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('When I share a valid streaming link, I should get links for other platforms', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
  const inputUrl = page.getByTestId('form-url-input');
  await inputUrl.fill('https://www.deezer.com/track/13791930');
  const submitButton = page.getByTestId('form-url-submit');
  await submitButton.click();
  await expect(page.getByText('You can now share this link to a Spotify User')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Nirvana')).toBeVisible();
  await expect(page.getByText('Smells Like Teen Spirit')).toBeVisible();
  const retryButton = page.getAllByTestId('retry-button').first();
  await retryButton.click();
  await expect(page.getByText('From Spotify to Deezer and the other way around')).toBeVisible();
});
```

- [ ] **Step 2: Delete the old specs**

```bash
git rm e2e/share-deezer-link.spec.ts e2e/share-spotify-link.spec.ts e2e/share-deezer-sharing-link-format.spec.ts
```

- [ ] **Step 3: Run the e2e suite**

Run: `pnpm test:e2e`
Expected: PASS (requires the backend's `/songlink` endpoint to be live — run against the deployed Railway backend or a local instance per `e2e/error.spec.ts`'s existing setup convention).

- [ ] **Step 4: Commit**

```bash
git add e2e/share-link.spec.ts
git commit -m "test: replace platform-specific e2e specs with one generic songlink flow"
```

---

### Task 8: Manual verification in the browser

**Files:** none

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

- [ ] **Step 2: Paste a Spotify link, confirm multiple platform cards render**

Open `http://localhost:3000`, paste a Spotify track share link, submit, confirm cards for Deezer and at least one other platform (e.g. Apple Music or YouTube Music) all render with the same visual style as before.

- [ ] **Step 3: Paste a Deezer link, confirm the same**

Repeat with a `deezer.com/track/...` link and with a shortened `dzr.page.link` link.

- [ ] **Step 4: Confirm retry button resets back to the input form**

Click the retry button on any card, confirm the form and title reappear.
