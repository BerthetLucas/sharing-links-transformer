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
  link: string;
  cover: string;
};

export type DeezerInformation = {
  album: string;
  artist: string;
  track: string;
};
