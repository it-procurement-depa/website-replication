# One Click Plugin Documentation Website

A comprehensive documentation website for the One Click Plugin for Revit, built with React, TypeScript, and Vite.

## Features

- 📚 **Comprehensive Documentation**: Detailed documentation for all plugin tools and features
- 🎥 **Video Tutorials**: Integrated SharePoint video tutorials for each component
- 🔍 **Search Functionality**: Quick search through documentation and tools
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with dark theme
- 🚀 **Fast Performance**: Built with Vite for optimal loading speeds

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Icons**: Phosphor Icons
- **Fonts**: Audiowide, Inter

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── VideoPlayer.tsx # SharePoint video player
│   ├── PanelPage.tsx   # Individual tool documentation pages
│   └── UpNextPage.tsx  # Future features page
├── lib/                # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── index.css          # Global styles and theme
└── prd.md            # Product requirements document
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/it-procurement-depa/website-replication.git
cd website-replication
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. **Triggers**: On push to `main` branch or manual workflow dispatch
2. **Build Process**: 
   - Installs Node.js and dependencies
   - Runs `npm run build` to create production build
   - Uploads the `dist` folder to GitHub Pages
3. **Live Site**: Available at `https://it-procurement-depa.github.io/website-replication/`

### Manual Deployment

If you need to deploy manually:

1. Build the project: `npm run build`
2. The `dist` folder contains all files needed for deployment
3. Upload the contents of `dist` to your web server

## Features Overview

### Navigation
- **All Documentation**: Overview page with all available tools
- **Individual Tool Pages**: Dedicated pages for each plugin component
- **Video Integration**: SharePoint video tutorials for each tool
- **Future Features**: Roadmap of upcoming plugin enhancements

### Video Integration
- SharePoint videos require authentication
- Videos open in new tabs for proper access
- Fallback instructions for authentication issues

### Responsive Design
- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly interface for mobile devices

## Customization

### Theme Colors
Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.55 0.2 25);  /* Red accent */
  --background: oklch(0.08 0 0);  /* Dark background */
  /* ... other color variables */
}
```

### Adding New Tools
1. Add tool data to the `panelData` object in `App.tsx`
2. Add navigation item to `navigationItems` array
3. Add tool card to `toolCards` array
4. Add video URL to `videoUrls` object

## Troubleshooting

### Build Issues
- Ensure Node.js version is 18 or higher
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run build`

### Deployment Issues
- Verify GitHub Actions workflow is enabled
- Check that the `dist` folder is generated correctly
- Ensure base URL is set correctly in `vite.config.ts`

### Video Access Issues
- SharePoint videos require company authentication
- Users may need to sign in with corporate credentials
- Contact system administrator for access issues

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and ensure build works: `npm run build`
5. Commit your changes: `git commit -m "Description of changes"`
6. Push to your fork: `git push origin feature-name`
7. Create a pull request

## License

This project is proprietary software owned by DEPA. All rights reserved.

## Support

For technical support or questions about the plugin documentation:
- Contact: IT Procurement DEPA
- Repository Issues: [GitHub Issues](https://github.com/it-procurement-depa/website-replication/issues)

---

**Note**: This documentation website is specifically designed for the One Click Plugin for Revit. Video content is hosted on SharePoint and requires appropriate authentication for access.