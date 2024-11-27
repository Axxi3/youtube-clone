// Define interface for a video
export interface Video {
    videoId: string;
    title: string;
    thumbnail: { url: string }[];
    channelTitle: string;
    viewCount: number;
    publishedTimeText: string;
    videoUrl: string;
    description:String;
    duration:String
  }
  
  // Define interface for channel metadata
  export interface ChannelMeta {
    avatar: { url: string }[];
    banner: { url: string }[];
    title: string;
    subscriberCountText: string;
    channelHandle: string;
  }
  
  // Define interface for channel data
  export interface ChannelData {
    meta: ChannelMeta;
    data: Video[];
  }
  
  