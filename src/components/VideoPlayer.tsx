import { useState } from 'react'
import { Play, X, ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  title: string
  youtubeUrl: string
  onClose: () => void
}

export function VideoPlayer({ title, youtubeUrl, onClose }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [embedError, setEmbedError] = useState(false)

  // Convert YouTube URL to embeddable format
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      // Handle different YouTube URL formats
      let videoId = ''
      
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0]
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0]
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0]
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
      }
      
      return url
    } catch {
      return url
    }
  }

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl)

  const handleIframeError = () => {
    setEmbedError(true)
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Button>
            <div className="w-px h-6 bg-border" />
            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p className="text-sm text-muted-foreground">Video Tutorial</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>
      </header>

      {/* Video Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {isLoading && !embedError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}

              {embedError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-4 text-center p-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Video Loading Error</h3>
                      <p className="text-muted-foreground mb-4">
                        Unable to load the video. Please try watching it directly on YouTube.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => window.open(youtubeUrl, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Watch on YouTube
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!embedError && (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setIsLoading(false)}
                  onError={handleIframeError}
                  title={`${title} Video Tutorial`}
                />
              )}
              
              {/* YouTube link overlay */}
              {!isLoading && !embedError && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(youtubeUrl, '_blank')}
                    className="flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white border-white/20"
                  >
                    <Play className="w-4 h-4" />
                    Watch on YouTube
                  </Button>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{title} - Video Tutorial</h2>
              <p className="text-muted-foreground mb-4">
                This video provides a comprehensive overview of the {title.toLowerCase()} features and functionality.
                Learn how to effectively use these tools in your Revit workflow.
              </p>
              
              {embedError && (
                <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Video Viewing:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Click "Watch on YouTube" to open the video in a new tab</li>
                    <li>• Videos are hosted on YouTube for better accessibility</li>
                    <li>• No special authentication required</li>
                  </ul>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => window.open(youtubeUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch on YouTube
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex items-center gap-2"
                >
                  Return to Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}