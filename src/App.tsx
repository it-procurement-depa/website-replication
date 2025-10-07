import { useState } from 'react'
import { 
  MagnifyingGlass, 
  ArrowSquareOut, 
  GridFour,
  Info,
  CreditCard,
  Wrench,
  ChartLineUp,
  NumberTwo,
  Heart,
  Toolbox,
  ArrowRight
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

function App() {
  const [activeSection, setActiveSection] = useState('all-documentation')

  const navigationItems = [
    {
      id: 'all-documentation',
      title: 'All Documentation',
      subtitle: 'Browse all available documentation',
      icon: GridFour,
      isActive: true
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Plugin overview and introduction',
      icon: Info
    },
    {
      id: 'licenses',
      title: 'Licenses Manager',
      subtitle: 'License management and activation',
      icon: CreditCard
    },
    {
      id: 'openings',
      title: 'Openings Tools',
      subtitle: 'Opening creation and modification tools',
      icon: Wrench
    },
    {
      id: 'standards',
      title: 'Standards Tools',
      subtitle: 'Standard compliance and setup tools',
      icon: ChartLineUp
    },
    {
      id: 'step2',
      title: 'Step 2 Tools',
      subtitle: 'Advanced workflow step 2 tools',
      icon: NumberTwo
    },
    {
      id: 'health',
      title: 'Model Health Tools',
      subtitle: 'Model validation and health checks',
      icon: Heart
    },
    {
      id: 'utilities',
      title: 'Utilities Tools',
      subtitle: 'General utility and helper tools',
      icon: Toolbox
    },
    {
      id: 'up-next',
      title: 'Up Next',
      subtitle: 'Upcoming features and tutorials',
      icon: ArrowRight
    }
  ]

  const toolCards = [
    {
      title: 'About',
      features: '5 Features',
      description: 'Learn about the One Click Plugin and discover how it revolutionizes your Revit workflow with powerful automation tools.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Licenses Manager',
      features: '5 Features',
      description: 'Manage your plugin licenses efficiently with our comprehensive licensing system that supports individual and team deployments.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Openings Tools',
      features: '5 Features',
      description: 'Automate the creation and modification of openings in walls, floors, and ceilings with precision and speed.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Standards Tools',
      features: '5 Features',
      description: 'Ensure project consistency and compliance with comprehensive standard management and validation tools.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Step 2 Tools',
      features: '5 Features',
      description: 'Advanced workflow automation for the second phase of your modeling process with intelligent decision-making capabilities.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Model Health Tools',
      features: '5 Features',
      description: 'Comprehensive model diagnostics and health monitoring to ensure optimal performance and reliability.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Utilities Tools',
      features: '5 Features',
      description: 'A collection of powerful utility tools designed to enhance productivity and streamline common Revit tasks.',
      hasVideo: true,
      hasDocumentation: true
    },
    {
      title: 'Up Next',
      features: '5 Features',
      description: 'Discover the exciting new tools and features coming to the One Click Plugin in future releases.',
      hasVideo: true,
      hasDocumentation: true
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">depa</div>
            <span className="text-lg font-semibold">One Click Plugin</span>
            <span className="text-xs text-muted-foreground ml-2">
              Revit Plugin Documentation
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tutorials, panels, or tools..."
                className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-foreground">Plugin Documentation</span>
            <span className="text-muted-foreground">Version 2025.1.2</span>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-card border-r border-border h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Documentation</h3>
            
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start h-auto p-4 rounded-lg ${
                      isActive 
                        ? 'bg-primary/10 text-foreground border border-primary/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5">
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className={`font-medium text-sm ${isActive ? 'text-foreground' : ''}`}>{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.subtitle}</div>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">One Click Plugin Documentation</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Comprehensive documentation for all plugin panels and tools. Select a specific panel from the navigation to view detailed information, instructional videos, and usage guidelines.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCards.map((card, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-muted-foreground/20 transition-colors">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {card.title === 'About' && <Info className="w-4 h-4" />}
                      {card.title === 'Licenses Manager' && <CreditCard className="w-4 h-4" />}
                      {card.title === 'Openings Tools' && <Wrench className="w-4 h-4" />}
                      {card.title === 'Standards Tools' && <ChartLineUp className="w-4 h-4" />}
                      {card.title === 'Step 2 Tools' && <NumberTwo className="w-4 h-4" />}
                      {card.title === 'Model Health Tools' && <Heart className="w-4 h-4" />}
                      {card.title === 'Utilities Tools' && <Toolbox className="w-4 h-4" />}
                      {card.title === 'Up Next' && <ArrowRight className="w-4 h-4" />}
                      <h3 className="font-semibold">{card.title}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {card.features}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {card.hasVideo && (
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-7 px-2">
                        Video Guide
                      </Button>
                    )}
                    {card.hasDocumentation && (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground ml-auto h-7 px-2">
                        <ArrowSquareOut className="w-3 h-3" />
                        View Documentation
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App