import { Play, ArrowSquareOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface Feature {
  title: string
  description: string
}

interface Benefit {
  title: string
  description: string
}

interface PanelPageProps {
  title: string
  description: string
  youtubeUrl: string
  onPlayVideo: () => void
  overview: string
  keyFeatures: Feature[]
  benefits: Benefit[]
  instructions: string[]
}

export function PanelPage({ 
  title, 
  description, 
  youtubeUrl, 
  onPlayVideo, 
  overview, 
  keyFeatures, 
  benefits,
  instructions 
}: PanelPageProps) {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm">
            ℹ️
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">Plugin Panel Documentation</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {/* Instructional Video Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Instructional Video</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Watch this comprehensive tutorial to learn how to use the {title} effectively.
        </p>
        
        {/* Video Player Container */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
          <div className="relative aspect-video bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    الفيديو غير متاح<br />
                    هذا الفيديو خاص
                  </p>
                  <Button
                    onClick={onPlayVideo}
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Play Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-primary">Tutorial Video</span>
                <span className="text-muted-foreground">HD Quality</span>
                <span className="text-green-500">Embedded Player</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(youtubeUrl, '_blank')}
                className="flex items-center gap-2"
              >
                <ArrowSquareOut className="w-4 h-4" />
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs">
            📋
          </div>
          <h2 className="text-xl font-semibold">Usage Instructions</h2>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">How to Use {title}</h3>
          <div className="space-y-3">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Overview Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center text-xs">
            📊
          </div>
          <h2 className="text-xl font-semibold">Detailed Overview</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            {overview}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Features */}
          <div>
            <h3 className="text-lg font-medium mb-4">Key Features</h3>
            <ul className="space-y-3">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{feature.title}</div>
                    {feature.description && (
                      <div className="text-muted-foreground text-sm mt-1">{feature.description}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-medium mb-4">Benefits</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{benefit.title}</div>
                    {benefit.description && (
                      <div className="text-muted-foreground text-sm mt-1">{benefit.description}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}