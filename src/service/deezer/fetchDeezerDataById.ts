import axios from 'axios';
import type { DeezerInformation } from '@/app/types/deezer';

export const fetchDeezerDataById = async (id: string): Promise<DeezerInformation> => {
  const res = await axios.get(`https://sharing-link-back-end-production.up.railway.app/deezer/id/${id}`);

  return res.data.data;
};
