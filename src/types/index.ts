export interface VideoDetails {
  title: string
  description: string
  thumbnail: string
}

export interface AnalysisResult {
  videoDetails: VideoDetails
  summary: string
}
