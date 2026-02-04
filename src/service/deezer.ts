import axios from "axios";
import type { DeezerInformation, DeezerResponse } from "@/app/types/deezer";

export const fetchDeezerData = async (artist: string, title: string, album: string): Promise<DeezerResponse> => {
    const res = await axios.get('https://sharing-link-back-end-production.up.railway.app/deezer/search', {
      params: {
        artist: artist,
        track: title,
        album: album,
      },
    });
  
    return res.data;
  };
  
  export const fetchDeezerDataById = async (id: string): Promise<DeezerInformation> => {
    const res = await axios.get(`https://sharing-link-back-end-production.up.railway.app/deezer/id/${id}`)
  
    return res.data;
  };
  
  export const fetchDeezerSongIdFromSharingLink = async (url: string | null): Promise<string> => {
    const res = await axios.get(`https://sharing-link-back-end-production.up.railway.app/deezer/url/${url}`);
  
    return res.data;
  };