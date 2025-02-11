export type DeezerTrack = {
  album: {
    cover_big: string;
  };
  artist: {
    id: number;
    name: string;
  };
  id: number;
  link: string;
  title: string;
};

export type DeezerResponse = {
  album: { title: string };
  artist: { name: string };
  data: DeezerTrack[];
  id: string;
  title: string;
  total: number;
};
