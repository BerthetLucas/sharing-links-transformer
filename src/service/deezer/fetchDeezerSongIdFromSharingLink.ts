import axios from 'axios';

export const fetchDeezerSongIdFromSharingLink = async (url: string | null): Promise<string | null> => {
  if (!url) {
    return null;
  }

  const res = await axios.get(`https://sharing-link-back-end-production.up.railway.app/deezer/url/`, {
    params: {
      url: url,
    },
  });

  return res.data.data;
};
