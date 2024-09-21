'use client'

import { useState } from 'react'
import VideoForm from '@/components/VideoForm'
import ResultsSection from '@/components/ResultsSection'
import { analyzeVideo } from '@/lib/api'
import { VideoDetails, AnalysisResult } from '@/types'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async (videoId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await analyzeVideo(videoId)
      setResult(data)
    } catch (err) {
      setError('Failed to analyze video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">YouTube Video Review Analyzer</h1>
      <VideoForm onAnalyze={handleAnalyze} isLoading={isLoading} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && <ResultsSection result={result} />}
    </main>
  )
}
