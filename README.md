# One Click Plugin Documentation Website

A static documentation website for the One Click Plugin, built with pure HTML, CSS, and JavaScript. This website replicates the design and functionality shown in the reference documentation interface.

## 🚀 Live Demo

Visit the live website: [Your GitHub Pages URL will go here]

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── style.css          # All styling and responsive design
├── script.js          # Interactive features and functionality
└── README.md          # This file
```

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Navigation**: Clickable sidebar navigation with active states
- **Video Integration**: SharePoint video streaming with modal player
- **Search Functionality**: Real-time search with content filtering and highlighting
- **Smooth Animations**: Subtle animations and hover effects for better UX
- **Accessibility**: Keyboard navigation support and proper focus management
- **Modern UI**: Dark theme with clean, professional styling

## 🛠 Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern CSS with Flexbox, Grid, and CSS Variables
- **Vanilla JavaScript**: Pure JavaScript for all interactive features
- **Google Fonts**: Inter font family for consistent typography

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme
- **Typography**: Inter font family with proper hierarchy
- **Color Palette**: 
  - Primary: #ff4444 (red accent)
  - Background: #0a0a0a (dark)
  - Cards: #111111 (dark gray)
  - Text: #ffffff (white) and #cccccc (light gray)
- **Interactive Elements**: Hover effects, button animations, and smooth transitions

## 🚀 How to Deploy on GitHub Pages

### Method 1: Direct Upload

1. **Create a new repository** on GitHub
2. **Upload files** to your repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

### Method 2: Git Commands

```bash
# Clone your repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Add your files
# (Copy index.html, style.css, script.js, and README.md to this directory)

# Commit and push
git add .
git commit -m "Add One Click Plugin documentation website"
git push origin main

# Enable GitHub Pages in repository settings
```

### Method 3: GitHub Desktop

1. **Create repository** in GitHub Desktop
2. **Add files** to the local repository folder
3. **Commit changes** with a descriptive message
4. **Publish to GitHub**
5. **Enable GitHub Pages** in repository settings

## 🔧 Customization

### Video URLs
Edit the SharePoint video URLs in `script.js` to link to your specific videos:

```javascript
const videoUrls = {
    'About': 'https://your-sharepoint-domain.sharepoint.com/:v:/s/site/video-id',
    'Licenses Manager': 'https://your-sharepoint-domain.sharepoint.com/:v:/s/site/video-id',
    // Add more video URLs as needed
};
```

### Colors
Edit the CSS variables in `style.css` to change the color scheme:

```css
:root {
    --primary-color: #ff4444;
    --background-color: #0a0a0a;
    --card-background: #111111;
    --text-color: #ffffff;
    --text-secondary: #cccccc;
}
```

### Content
Modify the navigation items and tool cards in `index.html` to match your needs:

```html
<div class="nav-item">
    <span class="nav-icon">🔧</span>
    <div>
        <div class="nav-title">Your Tool Name</div>
        <div class="nav-subtitle">Your tool description</div>
    </div>
</div>
```

### Fonts
Change the font family by updating the Google Fonts link in `index.html` and the CSS font-family property.

## 📊 Performance

- **Lightweight**: No external frameworks or libraries
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Semantic HTML structure
- **Accessibility**: WCAG compliant with keyboard navigation

## 🔍 Browser Support

- **Chrome**: 90+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 90+

## 📞 Support

For questions or issues with this template:

1. Check the code comments in each file for inline documentation
2. Verify that all files are in the same directory
3. Ensure relative paths are maintained when deploying
4. Test responsive design using browser developer tools

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Note**: This is a static website template. All interactive features are client-side only. For dynamic functionality, consider integrating with a backend service or API.