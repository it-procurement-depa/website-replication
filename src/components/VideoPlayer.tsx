import { useState } from 'react'
import { Play, X, ArrowLeft, ArrowSquareOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  title: string
  youtubeUrl: string // This is now actually SharePoint URL
  onClose: () => void
}

export function VideoPlayer({ title, youtubeUrl, onClose }: VideoPlayerProps) {
  const isSharePointUrl = youtubeUrl.includes('sharepoint.com')

  // Convert SharePoint URL to display format
  const getVideoDisplayUrl = (url: string) => {
    if (isSharePointUrl) {
      return url
    }
    return url
  }

  const displayUrl = getVideoDisplayUrl(youtubeUrl)

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
            <div className="relative aspect-video bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {isSharePointUrl ? 'SharePoint Video' : 'Video Tutorial'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {isSharePointUrl 
                        ? 'This video is hosted on SharePoint and requires authentication. Click the button below to open it in a new tab.'
                        : 'Click the button below to watch the video tutorial.'
                      }
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => window.open(youtubeUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ArrowSquareOut className="w-4 h-4" />
                        {isSharePointUrl ? 'Open in SharePoint' : 'Watch Video'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{title} - Video Tutorial</h2>
              <p className="text-muted-foreground mb-4">
                This video provides a comprehensive overview of the {title.toLowerCase()} features and functionality.
                Learn how to effectively use these tools in your Revit workflow.
              </p>
              
              {isSharePointUrl && (
                <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">SharePoint Video Access:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• This video is hosted on SharePoint and requires proper authentication</li>
                    <li>• You may need to sign in with your company credentials</li>
                    <li>• Click "Open in SharePoint" to access the video in a new tab</li>
                    <li>• If you have access issues, contact your system administrator</li>
                  </ul>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => window.open(youtubeUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ArrowSquareOut className="w-4 h-4" />
                  {isSharePointUrl ? 'Open in SharePoint' : 'Watch Video'}
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