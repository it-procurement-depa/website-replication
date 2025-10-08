import { useState } from 'react'
import { 
  MagnifyingGlass, 
  ArrowSquareOut, 
  ChartLineUp,
  Heart,
  Toolbox,
  ArrowRight,
  Play
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/VideoPlayer'
import { PanelPage } from '@/components/PanelPage'
import { UpNextPage } from '@/components/UpNextPage'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

function App() {
  const [activeSection, setActiveSection] = useState('all-documentation')
  const [currentVideo, setCurrentVideo] = useState<{ title: string; url: string } | null>(null)

  // YouTube video URLs for each panel - these would be replaced with actual YouTube URLs
  const videoUrls = {
    'About': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example YouTube URL
    'Licenses Manager': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Openings Tools': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Standards Tools': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Step 2 Tools': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Model Health Tools': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Utilities Tools': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Up Next': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }

  // Panel data for individual pages
  const panelData = {
    'About': {
      description: 'Learn about the One Click Plugin and discover how it revolutionizes your Revit workflow with powerful automation tools.',
      overview: 'The One Click Plugin is a comprehensive toolkit designed to streamline your Revit workflow. With intuitive automation and smart tools, it reduces manual tasks and increases productivity across all phases of your project.',
      instructions: [
        'Launch Revit and open your project file',
        'Navigate to the Add-ins tab in the Revit ribbon',
        'Locate the One Click Plugin panel and click to expand it',
        'Browse through the available tools and documentation',
        'Watch the video tutorials to understand each feature'
      ],
      keyFeatures: [
        { title: 'Automated opening creation and modification', description: 'Streamline opening workflows' },
        { title: 'Intelligent model health diagnostics', description: 'Monitor model performance' },
        { title: 'Standards compliance verification', description: 'Ensure project consistency' },
        { title: 'License management system', description: 'Manage team licenses efficiently' }
      ],
      benefits: [
        { title: 'Reduce project delivery time by up to 40%', description: 'Faster project completion' },
        { title: 'Minimize human errors in modeling', description: 'Improved accuracy' },
        { title: 'Ensure consistent standards across teams', description: 'Better collaboration' },
        { title: 'Streamline repetitive tasks', description: 'Enhanced productivity' }
      ]
    },
    'Licenses Manager': {
      description: 'Manage your plugin licenses efficiently with our comprehensive licensing system that supports individual and team deployments.',
      overview: 'The Licenses Manager provides centralized control over plugin licensing, supporting both individual users and enterprise teams with flexible activation options and usage monitoring.',
      instructions: [
        'Open the Licenses Manager from the One Click Plugin panel',
        'Enter your license key in the activation field',
        'Click "Activate License" to validate your credentials',
        'For team licenses, assign users through the team management interface',
        'Monitor license usage and renewal dates in the dashboard'
      ],
      keyFeatures: [
        { title: 'Centralized license management', description: 'Control all licenses from one place' },
        { title: 'Team license distribution', description: 'Assign licenses to team members' },
        { title: 'Usage monitoring and reporting', description: 'Track license utilization' },
        { title: 'Automatic license renewal', description: 'Seamless license updates' }
      ],
      benefits: [
        { title: 'Simplified license administration', description: 'Easier management' },
        { title: 'Cost-effective team licensing', description: 'Better value for teams' },
        { title: 'Real-time usage insights', description: 'Data-driven decisions' },
        { title: 'Reduced administrative overhead', description: 'More time for design' }
      ]
    },
    'Openings Tools': {
      description: 'Automate the creation and modification of openings in walls, floors, and ceilings with precision and speed.',
      overview: 'The Openings Tools provide intelligent automation for creating, modifying, and managing openings in building elements, ensuring accuracy and consistency across your project.',
      instructions: [
        'Select the wall, floor, or ceiling where you want to create an opening',
        'Launch the Openings Tools from the plugin panel',
        'Choose the opening type (door, window, generic) from the dropdown',
        'Set the dimensions and position using the input fields',
        'Click "Create Opening" to automatically generate the opening with proper parameters'
      ],
      keyFeatures: [
        { title: 'Automated opening placement', description: 'Smart positioning algorithms' },
        { title: 'Batch opening operations', description: 'Process multiple openings' },
        { title: 'Size optimization tools', description: 'Ensure proper dimensions' },
        { title: 'Structural integration checks', description: 'Verify structural integrity' }
      ],
      benefits: [
        { title: 'Faster opening creation process', description: 'Improved workflow speed' },
        { title: 'Consistent opening standards', description: 'Maintained quality' },
        { title: 'Reduced manual errors', description: 'Higher accuracy' },
        { title: 'Streamlined coordination workflow', description: 'Better team coordination' }
      ]
    },
    'Standards Tools': {
      description: 'Ensure project consistency and compliance with comprehensive standard management and validation tools.',
      overview: 'Standards Tools help maintain consistent project standards across all model elements, ensuring compliance with company guidelines and industry best practices.',
      instructions: [
        'Access Standards Tools from the main plugin interface',
        'Load your company or project standards template',
        'Run the standards validation check on selected elements',
        'Review the compliance report highlighting any issues',
        'Apply automatic corrections or manually adjust non-compliant elements'
      ],
      keyFeatures: [
        { title: 'Standards validation engine', description: 'Automated compliance checking' },
        { title: 'Custom standards configuration', description: 'Tailored to your needs' },
        { title: 'Batch standards application', description: 'Apply to multiple elements' },
        { title: 'Standards reporting tools', description: 'Track compliance status' }
      ],
      benefits: [
        { title: 'Consistent project standards', description: 'Unified quality' },
        { title: 'Reduced review time', description: 'Faster approvals' },
        { title: 'Improved quality control', description: 'Better outcomes' },
        { title: 'Streamlined collaboration', description: 'Team alignment' }
      ]
    },
    'Step 2 Tools': {
      description: 'Advanced workflow automation for the second phase of your modeling process with intelligent decision-making capabilities.',
      overview: 'Step 2 Tools provide advanced automation for complex modeling workflows, featuring intelligent decision-making capabilities that adapt to your project requirements.',
      instructions: [
        'Complete the initial model setup and first phase documentation',
        'Launch Step 2 Tools from the advanced workflows section',
        'Configure the automation parameters based on your project type',
        'Run the automated workflow processes in the recommended sequence',
        'Review and approve the suggested changes before applying them to the model'
      ],
      keyFeatures: [
        { title: 'Intelligent workflow automation', description: 'Smart process management' },
        { title: 'Advanced decision algorithms', description: 'Adaptive processing' },
        { title: 'Complex element coordination', description: 'Multi-system integration' },
        { title: 'Performance optimization', description: 'Enhanced efficiency' }
      ],
      benefits: [
        { title: 'Accelerated modeling workflows', description: 'Faster completion' },
        { title: 'Intelligent process automation', description: 'Smarter decisions' },
        { title: 'Reduced complexity management', description: 'Simplified workflows' },
        { title: 'Enhanced project coordination', description: 'Better integration' }
      ]
    },
    'Model Health Tools': {
      description: 'Comprehensive model diagnostics and health monitoring to ensure optimal performance and reliability.',
      overview: 'Model Health Tools provide comprehensive diagnostics and monitoring capabilities to maintain optimal model performance, identify issues early, and ensure long-term reliability.',
      instructions: [
        'Open Model Health Tools from the utilities section',
        'Run a full model health scan to identify potential issues',
        'Review the detailed health report and performance metrics',
        'Address critical issues using the automated fix suggestions',
        'Schedule regular health checks to maintain optimal model performance'
      ],
      keyFeatures: [
        { title: 'Real-time health monitoring', description: 'Continuous performance tracking' },
        { title: 'Performance optimization suggestions', description: 'Actionable recommendations' },
        { title: 'Issue detection and reporting', description: 'Early problem identification' },
        { title: 'Model cleanup automation', description: 'Automated maintenance' }
      ],
      benefits: [
        { title: 'Improved model performance', description: 'Faster operation' },
        { title: 'Proactive issue resolution', description: 'Prevent problems' },
        { title: 'Reduced file corruption risk', description: 'Better reliability' },
        { title: 'Enhanced stability and speed', description: 'Optimal performance' }
      ]
    },
    'Utilities Tools': {
      description: 'A collection of powerful utility tools designed to enhance productivity and streamline common Revit tasks.',
      overview: 'Utilities Tools offer a comprehensive collection of productivity enhancers and task automation features designed to streamline common Revit operations and improve overall efficiency.',
      instructions: [
        'Access the Utilities Tools collection from the main menu',
        'Select the specific utility tool needed for your current task',
        'Configure the tool parameters according to your project requirements',
        'Execute the utility function on your selected elements or entire model',
        'Review the results and apply any additional optimizations as needed'
      ],
      keyFeatures: [
        { title: 'Batch processing capabilities', description: 'Handle multiple operations' },
        { title: 'Custom automation scripts', description: 'Tailored solutions' },
        { title: 'Data import/export tools', description: 'Flexible data handling' },
        { title: 'Productivity enhancement features', description: 'Improved efficiency' }
      ],
      benefits: [
        { title: 'Streamlined repetitive tasks', description: 'Time savings' },
        { title: 'Enhanced workflow efficiency', description: 'Better productivity' },
        { title: 'Flexible automation options', description: 'Customizable solutions' },
        { title: 'Improved data management', description: 'Better organization' }
      ]
    },
    'Up Next': {
      description: 'Discover the exciting new tools and features coming to the One Click Plugin in future releases.',
      overview: 'Up Next showcases the upcoming features and tools planned for future releases of the One Click Plugin, providing insight into the continuous evolution and enhancement of the platform.',
      instructions: [
        'Browse the upcoming features roadmap in the Up Next section',
        'Review planned features and their expected release dates',
        'Provide feedback on proposed features through the feedback system',
        'Sign up for beta testing programs for early access to new tools',
        'Stay updated with release notifications and feature announcements'
      ],
      keyFeatures: [
        { title: 'Advanced AI integration', description: 'Machine learning capabilities' },
        { title: 'Cloud-based collaboration', description: 'Remote team features' },
        { title: 'Enhanced reporting tools', description: 'Advanced analytics' },
        { title: 'Mobile companion app', description: 'On-the-go access' }
      ],
      benefits: [
        { title: 'Cutting-edge technology adoption', description: 'Stay ahead' },
        { title: 'Improved collaboration features', description: 'Better teamwork' },
        { title: 'Enhanced mobile workflows', description: 'Flexible access' },
        { title: 'Future-ready capabilities', description: 'Long-term value' }
      ]
    }
  }

  const openVideo = (panelKey: string) => {
    const url = videoUrls[panelKey as keyof typeof videoUrls]
    if (url) {
      setCurrentVideo({ title: panelKey, url })
    }
  }

  // Map card titles to navigation IDs
  const getNavigationIdFromTitle = (title: string): string => {
    const titleToIdMap: Record<string, string> = {
      'About': 'about',
      'Licenses Manager': 'licenses',
      'Openings Tools': 'openings',
      'Standards Tools': 'standards',
      'Step 2 Tools': 'step2',
      'Model Health Tools': 'health',
      'Utilities Tools': 'utilities',
      'Up Next': 'next'
    }
    return titleToIdMap[title] || ''
  }

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
      icon: Heart
    },
    {
      id: 'licenses',
      title: 'Licenses Manager',
      subtitle: 'License management and activation',
      icon: ChartLineUp
    },
    {
      id: 'openings',
      title: 'Openings Tools',
      subtitle: 'Opening creation and modification tools',
      icon: Toolbox
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
      icon: ArrowRight
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
      id: 'next',
      title: 'Up Next',
      subtitle: 'Upcoming features and tools',
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

  // Future project cards for the "Up Next" section
  const futureProjectCards = [
    {
      title: 'Wall Fixation Tools',
      category: 'Fixation Systems',
      description: 'Create comprehensive fixation systems for walls with automated placement and sizing.',
      status: 'IN DEVELOPMENT',
      quarter: 'Q2 2024',
      statusColor: 'bg-yellow-500',
      onClick: () => {
        toast.info('Wall Fixation Tools is coming soon! This feature is currently in development.')
      }
    },
    {
      title: 'Ceiling Fixation Tools', 
      category: 'Fixation Systems',
      description: 'Complete fixation system for standard ceilings with intelligent anchor placement.',
      status: 'PLANNED',
      quarter: 'Q3 2024', 
      statusColor: 'bg-blue-500',
      onClick: () => {
        toast.info('Ceiling Fixation Tools is coming soon! This feature is currently planned.')
      }
    },
    {
      title: 'Ceiling Curved Fixation Tools',
      category: 'Fixation Systems', 
      description: 'Specialized tools for creating fixation systems on curved ceiling surfaces.',
      status: 'PLANNED',
      quarter: 'Q3 2024',
      statusColor: 'bg-blue-500',
      onClick: () => {
        toast.info('Ceiling Curved Fixation Tools is coming soon! This feature is currently planned.')
      }
    },
    {
      title: 'Floor Fixation Tools',
      category: 'Fixation Systems',
      description: 'Comprehensive floor fixation system with support for various flooring types.',
      status: 'PLANNED', 
      quarter: 'Q4 2024',
      statusColor: 'bg-blue-500',
      onClick: () => {
        toast.info('Floor Fixation Tools is coming soon! This feature is currently planned.')
      }
    },
    {
      title: 'Parts Tools',
      category: 'Modeling Tools',
      description: 'Advanced parts creation with automatic grooves for tiles and enhanced detailing.',
      status: 'TESTING',
      quarter: 'Q1 2024',
      statusColor: 'bg-green-500',
      onClick: () => {
        toast.info('Parts Tools is coming soon! This feature is currently in testing.')
      }
    },
    {
      title: 'Shop Drawings',
      category: 'Documentation',
      description: 'Automated shop drawing generation with intelligent dimensions and tags.',
      status: 'IN DEVELOPMENT',
      quarter: 'Q2 2024',
      statusColor: 'bg-yellow-500',
      onClick: () => {
        toast.info('Shop Drawings is coming soon! This feature is currently in development.')
      }
    },
    {
      title: 'Depa Chat Bot Tool',
      category: 'AI Assistant', 
      description: 'ChatGPT integration directly inside Revit for intelligent assistance and guidance.',
      status: 'PLANNED',
      quarter: 'Q3 2024',
      statusColor: 'bg-blue-500',
      onClick: () => {
        toast.info('Depa Chat Bot Tool is coming soon! This feature is currently planned.')
      }
    },
    {
      title: 'QA/QC Tools',
      category: 'Quality Control',
      description: 'Advanced quality assurance and control tools for comprehensive model validation.',
      status: 'IN DEVELOPMENT',
      quarter: 'Q2 2024', 
      statusColor: 'bg-yellow-500',
      onClick: () => {
        toast.info('QA/QC Tools is coming soon! This feature is currently in development.')
      }
    }
  ]

  return (
    <>
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          },
        }}
      />
      
      {currentVideo && (
        <VideoPlayer
          title={currentVideo.title}
          youtubeUrl={currentVideo.url}
          onClose={() => setCurrentVideo(null)}
        />
      )}
      
      {!currentVideo && (
        <div className="min-h-screen bg-background text-foreground font-inter">
          {/* Header */}
          <header className="border-b border-border bg-card">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">depa</div>
                <span className="text-lg font-semibold font-audiowide">One Click Plugin</span>
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

              {/* Version Info */}
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
                        onClick={() => {
                          setActiveSection(item.id)
                        }}
                        className={`w-full justify-start h-auto p-3 ${
                          isActive 
                            ? 'bg-[#ffd6d1] text-foreground border-l-4 border-primary' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
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
                {activeSection === 'all-documentation' ? (
                  <>
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
                              {card.title === 'About' && <Heart />}
                              {card.title === 'Licenses Manager' && <ChartLineUp />}
                              {card.title === 'Openings Tools' && <Toolbox />}
                              {card.title === 'Standards Tools' && <ChartLineUp />}
                              {card.title === 'Step 2 Tools' && <ArrowRight />}
                              {card.title === 'Model Health Tools' && <Heart />}
                              {card.title === 'Utilities Tools' && <Toolbox />}
                              {card.title === 'Up Next' && <ArrowRight />}
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
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => openVideo(card.title)}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                              >
                                <Play className="w-3 h-3" />
                                Video Guide
                              </Button>
                            )}
                            {card.hasDocumentation && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setActiveSection(getNavigationIdFromTitle(card.title))}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground ml-auto h-7 px-2"
                              >
                                <ArrowSquareOut className="w-3 h-3" />
                                View Documentation
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  // Individual Panel Pages
                  (() => {
                    // Map navigation IDs to panel data keys
                    const navigationToPanelMap: Record<string, string> = {
                      'about': 'About',
                      'licenses': 'Licenses Manager',
                      'openings': 'Openings Tools',
                      'standards': 'Standards Tools',
                      'step2': 'Step 2 Tools',
                      'health': 'Model Health Tools',
                      'utilities': 'Utilities Tools',
                      'next': 'Up Next'
                    }
                    
                    const panelKey = navigationToPanelMap[activeSection]
                    const navItem = navigationItems.find(item => item.id === activeSection)
                    const data = panelKey ? panelData[panelKey as keyof typeof panelData] : null
                    
                    if (!data || !panelKey || !navItem) return null
                    
                    // Special handling for "Up Next" section
                    if (panelKey === 'Up Next') {
                      return (
                        <UpNextPage
                          title={navItem.title}
                          description={data.description}
                          youtubeUrl={videoUrls[panelKey as keyof typeof videoUrls]}
                          onPlayVideo={() => openVideo(panelKey)}
                          overview={data.overview}
                          futureProjectCards={futureProjectCards}
                        />
                      )
                    }
                    
                    return (
                      <PanelPage
                        title={navItem.title}
                        description={data.description}
                        youtubeUrl={videoUrls[panelKey as keyof typeof videoUrls]}
                        onPlayVideo={() => openVideo(panelKey)}
                        overview={data.overview}
                        keyFeatures={data.keyFeatures}
                        benefits={data.benefits}
                        instructions={data.instructions}
                      />
                    )
                  })()
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App