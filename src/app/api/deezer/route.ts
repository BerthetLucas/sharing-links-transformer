import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get('artist');
  const title = searchParams.get('title');
  const album = searchParams.get('album');

  if (!artist || !title || !album) {
    return Response.json({ message: 'Artist, track and album are required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://api.deezer.com/search`, {
      params: {
        q: `artist:"${artist}" album:"${album}" track:"${title}"`,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ message: 'Internal Error', error: (error as Error).message }, { status: 500 });
  }
}
