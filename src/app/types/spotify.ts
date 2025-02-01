export type SpotifyResponse = {
  album: { name: string };
  artists: [{ id: number; name: string }];
  id: number;
  name: string;
  title: string;
  tracks: {
    items: [
      {
        album: {
          images: [{ test: string }, { url: string }];
        };
        external_urls: { spotify: string };
      },
    ];
  };
};
