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
    duration:String,
    channelId:String
  }


  export interface Comment {
    authorText: string;
    publishedTimeText: string;
    textDisplay: string;
    likesCount: number;
  }
  
  // Comments Response
  export interface CommentsResponse {
    data: Comment[];
    commentsCount: number;
  }
  
  // Define interface for channel metadata
  export interface ChannelMeta {
    avatar: { url: string }[];
    banner: { url: string }[];
    title: string;
    subscriberCountText: string;
    channelHandle: string;
    
    videosCountText:string;

  }
  
  // Define interface for channel data
  export interface ChannelData {
    meta: ChannelMeta;
    data: Video[];
  }

  export interface HomeVideo {
    type: string; // Type of the content, e.g., "video"
    videoId: string; // Unique identifier for the video
    title: string; // Title of the video
    channelTitle: string; // Title of the channel
    channelId: string; // ID of the channel
    channelThumbnail: Thumbnail; // Thumbnail details for the channel
    description: string; // Description of the video
    viewCount: string; // Number of views
    publishedTimeText: string; // Textual representation of published time
    publishDate: string; // Date when the video was published
    publishedAt: string; // Full published date with timestamp
    lengthText: string; // Duration of the video
    thumbnail: Thumbnail[]; // Array of video thumbnails
    richThumbnail: Thumbnail | null; // Rich thumbnail, can be null
    
  }
  
  export interface Thumbnail {
    url: string; // URL of the thumbnail
    width: number; // Width of the thumbnail in pixels
    height: number; // Height of the thumbnail in pixels
  }
  
  
  