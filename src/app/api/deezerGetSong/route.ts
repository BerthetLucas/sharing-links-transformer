import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ message: 'un ID est requis' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://api.deezer.com/track/${id}`);

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ message: 'Erreur serveur', error: (error as Error).message }, { status: 500 });
  }
}
