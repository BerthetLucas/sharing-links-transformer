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
