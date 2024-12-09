import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HomeVideo, Video, CommentsResponse, ChannelData } from './Dataprovider';
import { apiConfig } from './Config';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://yt-api.p.rapidapi.com', // Base URL for all requests
  headers: apiConfig.headers,
});

// Generic wrapper function to handle API requests
const requests = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const response: AxiosResponse<T> = await apiClient.request(config);
    return response.data;
  } catch (error: any) {
    console.error('API request error:', error?.response?.data || error.message);
    return null; // Return null to handle errors gracefully
  }
};

// Fetch home videos
export const getHomeVideos = async (): Promise<HomeVideo[]> => {
  const data = await requests<{ data: HomeVideo[] }>({
    url: '/home',
    method: 'GET',
  });
  return data?.data.filter((item) => item.type === 'video') || [];
};

// Fetch specific video information
export const getVideoInfo = async (videoId: string): Promise<Video | null> => {
  return await requests<Video>({
    url: `/video/info?id=${videoId}`,
    method: 'GET',
  });
};

// Fetch related videos for a given video ID
export const getRelatedVideos = async (videoId: string): Promise<Video[]> => {
  const data = await requests<{ data: Video[] }>({
    url: `/related?id=${videoId}`,
    method: 'GET',
  });
  return data?.data || [];
};

// Fetch comments for a specific video ID
export const getComments = async (videoId: string): Promise<CommentsResponse> => {
  const data = await requests<CommentsResponse>({
    url: `/comments?id=${videoId}`,
    method: 'GET',
  });
  return data || { data: [], commentsCount: 0 };
};

// Fetch search results for a query
export const getSearchResults = async (query: string): Promise<HomeVideo[]> => {
  const data = await requests<{ data: HomeVideo[] }>({
    url: `/search?query=${query}`,
    method: 'GET',
  });
  return data?.data.filter((item) => item.type === 'video') || [];
};

// Fetch channel videos
export const getChannelVideos = async (channelId: string): Promise<ChannelData | null> => {
  const data = await requests<ChannelData>({
    url: `/channel/videos?id=${channelId}`,
    method: 'GET',
  });
  return data || null; // Return ChannelData or null in case of error
};

export { requests };
