import axios from 'axios';
import { NextResponse } from 'next/server';
import type { AxiosResponse } from 'axios';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url: string | null = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response: AxiosResponse<string> = await axios.get(url, { maxRedirects: 5 });
    const html: string = response.data;

    const identifyLink: RegExpExecArray | null = /https:\/\/www\.deezer\.com\/fr\/track\/\d+/i.exec(html);

    if (!identifyLink) {
      return NextResponse.json({ error: 'Deezer track URL not found' }, { status: 404 });
    }

    const deezerId: string | undefined = identifyLink[0].split('/').pop();

    if (!deezerId) {
      return NextResponse.json({ error: 'Failed to extract Deezer ID' }, { status: 500 });
    }

    return NextResponse.json({ id: deezerId }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
