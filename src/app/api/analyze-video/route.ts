import { NextResponse } from 'next/server'
import { getVideoDetails, getVideoComments } from '@/lib/youtubeApi'
import { analyzeComments } from '@/lib/openaiApi'

export async function POST(req: Request) {
  const { videoId } = await req.json()
  console.log({ videoId })


  try {
    const videoDetails = await getVideoDetails(videoId)
    console.log({ videoDetails })
    const comments = await getVideoComments(videoId)
    console.log({ comments })
    const summary = await analyzeComments(comments.filter((comment): comment is string => typeof comment === 'string'))
    console.log({ summary })

    return NextResponse.json({ videoDetails, summary })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze video' }, { status: 500 })
  }
}
