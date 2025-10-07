import { useState } from 'react'
import { Play, X, ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  title: string
  sharePointUrl: string
  onClose: () => void
}

export function VideoPlayer({ title, sharePointUrl, onClose }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [embedError, setEmbedError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Convert SharePoint share link to embeddable URL
  const getEmbedUrl = (url: string) => {
    try {
      // Method 1: Try to convert to direct embed URL
      if (url.includes('sharepoint.com')) {
        // Extract base URL and attempt multiple embed formats
        const baseUrl = url.split('/:v:')[0]
        const fileIdMatch = url.match(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
        
        if (fileIdMatch) {
          const fileId = fileIdMatch[0]
          // Try Stream embed format
          return `${baseUrl}/_layouts/15/embed.aspx?UniqueId=${fileId}&access_token=&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D`
        }
      }
      
      // Method 2: Add embed parameters to existing URL
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}embed=true&nav=false&file=&action=embedview`
    } catch {
      return url
    }
  }

  const extractFileId = (url: string) => {
    // Extract various ID formats from SharePoint URL
    const guidMatch = url.match(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
    if (guidMatch) return guidMatch[0]
    
    const idMatch = url.match(/[a-zA-Z0-9_-]{22,}/)
    return idMatch ? idMatch[0] : ''
  }

  const embedUrl = getEmbedUrl(sharePointUrl)

  const handleIframeError = () => {
    setEmbedError(true)
    setIsLoading(false)
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    setEmbedError(false)
    setIsLoading(true)
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
                      <h3 className="text-lg font-semibold mb-2">Video Embed Restricted</h3>
                      <p className="text-muted-foreground mb-4">
                        This SharePoint video cannot be embedded directly due to security settings.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => window.open(sharePointUrl, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Watch in SharePoint
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleRetry}
                          className="flex items-center gap-2"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!embedError && (
                <iframe
                  key={retryCount} // Force re-render on retry
                  src={embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; encrypted-media; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                  onLoad={() => setIsLoading(false)}
                  onError={handleIframeError}
                  title={`${title} Video Tutorial`}
                />
              )}
              
              {/* Enhanced fallback controls */}
              {!isLoading && !embedError && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(sharePointUrl, '_blank')}
                    className="flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white border-white/20"
                  >
                    <Play className="w-4 h-4" />
                    Open Original
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
                  <h4 className="font-medium mb-2">Viewing Options:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Click "Watch in SharePoint" to open the video in a new tab</li>
                    <li>• Use your organization's SharePoint credentials to access the content</li>
                    <li>• Videos may require authentication depending on your access level</li>
                  </ul>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => window.open(sharePointUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch in SharePoint
                </Button>
                
                {embedError && (
                  <Button
                    variant="outline"
                    onClick={handleRetry}
                    className="flex items-center gap-2"
                  >
                    Try Embed Again
                  </Button>
                )}
                
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