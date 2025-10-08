import { Play, ArrowSquareOut, Plus, Wrench, FileText, Robot } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface FutureProjectCard {
  title: string
  category: string
  description: string
  status: string
  quarter: string
  statusColor: string
  onClick?: () => void
}

interface UpNextPageProps {
  title: string
  description: string
  youtubeUrl: string
  onPlayVideo: () => void
  overview: string
  futureProjectCards: FutureProjectCard[]
}

export function UpNextPage({ 
  title, 
  description, 
  youtubeUrl, 
  onPlayVideo, 
  overview,
  futureProjectCards
}: UpNextPageProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Fixation Systems':
        return <Wrench className="w-4 h-4" />
      case 'Modeling Tools':
        return <Plus className="w-4 h-4" />
      case 'Documentation':
        return <FileText className="w-4 h-4" />
      case 'AI Assistant':
        return <Robot className="w-4 h-4" />
      case 'Quality Control':
        return <ArrowSquareOut className="w-4 h-4" />
      default:
        return <Plus className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm">
            🚀
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">Upcoming Features & Tools</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          {description}
        </p>

        {/* Video Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Watch the Roadmap Overview</h3>
              <p className="text-muted-foreground text-sm">
                Get insights into upcoming features and development timeline
              </p>
            </div>
            <Button onClick={onPlayVideo} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Play Video
            </Button>
          </div>
        </div>
      </div>

      {/* Development Roadmap Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs">📋</span>
          </div>
          <h2 className="text-xl font-semibold">Development Roadmap</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Our commitment to continuous innovation and workflow enhancement
        </p>
        
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <p className="text-foreground leading-relaxed">
            Our development roadmap is packed with innovative tools designed to further streamline your Revit workflow. From advanced fixation systems to 
            AI-powered assistance, these upcoming features will revolutionize how you work with building models.
          </p>
          
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">8+ New Tools</span>
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">AI Integration</span>
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Quality Control</span>
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">Automation</span>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureProjectCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 cursor-pointer group"
              onClick={card.onClick}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(card.category)}
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-xs text-muted-foreground">{card.category}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded text-white ${card.statusColor}`}>
                  {card.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {card.description}
              </p>

              {/* Quarter */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{card.quarter}</span>
                <ArrowSquareOut className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Much More Section */}
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Much More...</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're constantly innovating and developing new tools based on user feedback and 
          industry needs. Stay tuned for even more exciting features that will continue to 
          revolutionize your Revit workflow.
        </p>
      </div>
    </div>
  )
}