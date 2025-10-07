import { useState } from 'react'
import { MagnifyingGlass, ArrowSquareOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

// Icon components to match the design
const IconInfo = () => <span className="text-blue-400">ℹ️</span>
const IconKey = () => <span className="text-yellow-400">🔑</span>
const IconTool = () => <span className="text-green-400">🔧</span>
const IconChart = () => <span className="text-purple-400">📊</span>
const IconBolt = () => <span className="text-orange-400">⚡</span>
const IconHealth = () => <span className="text-pink-400">💊</span>
const IconUtility = () => <span className="text-cyan-400">🛠️</span>
const IconNext = () => <span className="text-indigo-400">➡️</span>

function App() {
  const [activeSection, setActiveSection] = useState('all-documentation')

  const navigationItems = [
    {
      id: 'all-documentation',
      title: 'All Documentation',
      subtitle: 'Browse all available documentation',
      icon: '📄',
      isActive: true
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Plugin overview and introduction',
      icon: IconInfo
    },
    {
      id: 'licenses',
      title: 'Licenses Manager',
      subtitle: 'License management and activation',
      icon: IconKey
    },
    {
      id: 'openings',
      title: 'Openings Tools',
      subtitle: 'Opening creation and modification tools',
      icon: IconTool
    },
    {
      id: 'standards',
      title: 'Standards Tools',
      subtitle: 'Standard compliance and setup tools',
      icon: IconChart
    },
    {
      id: 'step2',
      title: 'Step 2 Tools',
      subtitle: 'Advanced workflow step 2 tools',
      icon: IconBolt
    },
    {
      id: 'health',
      title: 'Model Health Tools',
      subtitle: 'Model validation and health checks',
      icon: IconHealth
    },
    {
      id: 'utilities',
      title: 'Utilities Tools',
      subtitle: 'General utility and helper tools',
      icon: IconUtility
    },
    {
      id: 'up-next',
      title: 'Up Next',
      subtitle: 'Upcoming features and tutorials',
      icon: IconNext
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
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-sm">
              dopa
            </div>
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
            
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start h-auto p-3 ${
                      isActive 
                        ? 'bg-muted text-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        {typeof item.icon === 'string' ? (
                          <span>{item.icon}</span>
                        ) : (
                          <item.icon />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.subtitle}</div>
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
                      {card.title === 'About' && <IconInfo />}
                      {card.title === 'Licenses Manager' && <IconKey />}
                      {card.title === 'Openings Tools' && <IconTool />}
                      {card.title === 'Standards Tools' && <IconChart />}
                      {card.title === 'Step 2 Tools' && <IconBolt />}
                      {card.title === 'Model Health Tools' && <IconHealth />}
                      {card.title === 'Utilities Tools' && <IconUtility />}
                      {card.title === 'Up Next' && <IconNext />}
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
  )
}

export default App