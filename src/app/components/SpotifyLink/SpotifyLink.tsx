import { SpotifySongFromDeezerSharingLink } from '@/app/components/SpotifyLink/SpotifySongFromDeezerSharingLink';
import { SpotifySongFromStandardLink } from '@/app/components/SpotifyLink/SpotifySongFromStandardLink';

type SpotifyLinkProps = {
  deezerId: string;
  deezerSongUrl: string;
};

export const SpotifyLink = ({ deezerSongUrl, deezerId }: SpotifyLinkProps) => {
  if (!deezerId && !deezerSongUrl) {
    return null;
  }

  if (deezerId) {
    return <SpotifySongFromStandardLink deezerId={deezerId} />;
  }

  if (deezerSongUrl) {
    return <SpotifySongFromDeezerSharingLink deezerSongUrl={deezerSongUrl} />;
  }
};
