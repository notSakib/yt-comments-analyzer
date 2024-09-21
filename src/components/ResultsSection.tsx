import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalysisResult } from '@/types'

interface ResultsSectionProps {
  result: AnalysisResult
}

export default function ResultsSection({ result }: ResultsSectionProps) {
  const { videoDetails, summary } = result

  return (
    <div className="mt-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{videoDetails.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={videoDetails.thumbnail} alt={videoDetails.title} className="w-full h-auto mb-4" />
          <p className="text-sm text-gray-500">{videoDetails.description}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Review Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{summary}</p>
        </CardContent>
      </Card>
    </div>
  )
}
