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

  // Convert SharePoint share link to embeddable URL
  const getEmbedUrl = (url: string) => {
    try {
      // Extract the file ID and site info from SharePoint URL
      // SharePoint URLs typically have format: https://tenant.sharepoint.com/:v:/s/site/fileId?params
      const urlParts = url.split('/')
      const siteIndex = urlParts.findIndex(part => part === 's')
      
      if (siteIndex !== -1 && siteIndex + 1 < urlParts.length) {
        const siteName = urlParts[siteIndex + 1]
        const baseUrl = urlParts.slice(0, 3).join('/')
        
        // Create embed URL - SharePoint supports direct embedding with /embed parameter
        return `${baseUrl}/sites/${siteName}/_layouts/15/embed.aspx?UniqueId=${extractFileId(url)}&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D`
      }
      
      // Fallback: try adding embed parameter to original URL
      return url.includes('?') ? `${url}&embed=true` : `${url}?embed=true`
    } catch {
      return url
    }
  }

  const extractFileId = (url: string) => {
    // Extract file ID from SharePoint URL
    const match = url.match(/[a-zA-Z0-9_-]{22,}/)
    return match ? match[0] : ''
  }

  const embedUrl = getEmbedUrl(sharePointUrl)

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
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media"
                onLoad={() => setIsLoading(false)}
                title={`${title} Video Tutorial`}
              />
              
              {/* Fallback for embed issues */}
              {!isLoading && (
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(sharePointUrl, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Open in SharePoint
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
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => window.open(sharePointUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch in SharePoint
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