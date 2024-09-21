import { AnalysisResult } from '@/types'

export async function analyzeVideo(videoId: string): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze-video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze video')
  }

  return response.json()
}
