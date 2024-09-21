import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export async function getVideoDetails(videoId: string) {
  const response = await youtube.videos.list({
    part: ['snippet'],
    id: [videoId],
  })

  const video = response.data.items?.[0]
  if (!video) throw new Error('Video not found')

  return {
    title: video.snippet?.title,
    description: video.snippet?.description,
    thumbnail: video.snippet?.thumbnails?.high?.url,
  }
}

export async function getVideoComments(videoId: string) {
  const response = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId: videoId,
    maxResults: 100,
  })

  return response.data.items?.map(item => item.snippet?.topLevelComment?.snippet?.textDisplay) || []
}
