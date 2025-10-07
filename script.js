// One Click Plugin Documentation - Interactive Features

// SharePoint video URLs mapping
const videoUrls = {
    'About': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Licenses Manager': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Openings Tools': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Standards Tools': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Step 2 Tools': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Model Health Tools': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Utilities Tools': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ',
    'Up Next': 'https://depagroupdepa.sharepoint.com/:v:/s/Learning/EfKpkTQymRRAslaIb4XPvZsBuH_I04fGiR6Y3wB2R0WHEg?e=llIEpQ'
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeSearch();
    initializeCardInteractions();
    initializeScrollEffects();
    initializeVideoModal();
});

// Video functionality
function openVideo(title) {
    const modal = document.getElementById('videoModal');
    const videoTitle = document.getElementById('videoTitle');
    const videoFrame = document.getElementById('videoFrame');
    
    if (videoUrls[title]) {
        // Since SharePoint videos require authentication, we'll try iframe first
        // and provide fallback instructions if needed
        const sharePointUrl = videoUrls[title];
        const embedUrl = convertSharePointUrlToEmbed(sharePointUrl);
        
        videoTitle.textContent = title + ' - Video Guide';
        
        // Try to load the video in iframe
        videoFrame.src = embedUrl;
        videoFrame.onload = function() {
            // If iframe loads successfully, show it
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        videoFrame.onerror = function() {
            // If iframe fails, show instructions instead
            showVideoInstructions(title, sharePointUrl);
        };
        
        // Show modal immediately and let iframe load
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        setTimeout(() => {
            document.querySelector('.close-btn').focus();
        }, 100);
    }
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoContainer = document.querySelector('.video-container');
    
    modal.style.display = 'none';
    videoFrame.src = '';
    
    // Reset video container to original iframe structure
    videoContainer.innerHTML = '<iframe id="videoFrame" src="" frameborder="0" allowfullscreen></iframe>';
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
}

function convertSharePointUrlToEmbed(sharePointUrl) {
    // Convert SharePoint sharing URL to embed format
    try {
        // Extract the unique ID from the SharePoint URL
        const url = new URL(sharePointUrl);
        
        // Try to extract the resource ID from the URL
        let resid = '';
        if (url.pathname.includes('/:v:/')) {
            // This is a video sharing URL
            const pathSegments = url.pathname.split('/');
            const vIndex = pathSegments.findIndex(segment => segment === ':v:');
            if (vIndex >= 0 && vIndex < pathSegments.length - 1) {
                resid = pathSegments[vIndex + 2]; // The ID should be two positions after ':v:'
            }
        }
        
        // If we couldn't extract the ID, try from the full URL
        if (!resid) {
            const match = sharePointUrl.match(/([A-Za-z0-9_-]{43})/);
            if (match) {
                resid = match[1];
            }
        }
        
        // Create embed URL for SharePoint video
        if (resid) {
            const embedUrl = `https://depagroupdepa.sharepoint.com/_layouts/15/embed.aspx?UniqueId=${resid}&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`;
            return embedUrl;
        }
        
        // Fallback to original URL
        return sharePointUrl;
        
    } catch (error) {
        console.error('Error converting SharePoint URL:', error);
        return sharePointUrl;
    }
}

function showVideoInstructions(title, url) {
    const videoContainer = document.querySelector('.video-container');
    
    // Show instructions instead of iframe
    videoContainer.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            background-color: #1a1a1a;
            border-radius: 8px;
            text-align: center;
            padding: 40px;
        ">
            <div style="
                font-size: 48px;
                margin-bottom: 20px;
                color: #ff4444;
            ">📹</div>
            <h3 style="
                color: #ffffff;
                margin-bottom: 16px;
                font-size: 18px;
            ">SharePoint Video Access</h3>
            <p style="
                color: #cccccc;
                margin-bottom: 24px;
                line-height: 1.6;
                max-width: 400px;
                font-size: 14px;
            ">
                This video is hosted on SharePoint and requires authentication. 
                Click the button below to open the video in a new tab where you can sign in if needed.
            </p>
            <button onclick="window.open('${url}', '_blank')" style="
                background-color: #ff4444;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s ease;
                margin-bottom: 12px;
            " onmouseover="this.style.backgroundColor='#e63939'" 
               onmouseout="this.style.backgroundColor='#ff4444'">
                📺 Open Video in New Tab
            </button>
            <small style="
                color: #888888;
                font-size: 12px;
            ">
                You may need to sign in to access the video
            </small>
        </div>
    `;
}

function initializeVideoModal() {
    const modal = document.getElementById('videoModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideo();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeVideo();
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the title of the clicked item
            const title = this.querySelector('.nav-title').textContent;
            
            // Open video for About section automatically
            if (title === 'About') {
                setTimeout(() => {
                    openVideo('About');
                }, 300);
            }
            
            // Smooth scroll to top of content area
            document.querySelector('.content').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update content based on selection
            updateContentArea(this);
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make nav items focusable
        item.setAttribute('tabindex', '0');
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Search input functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterContent(searchTerm);
    });
    
    // Search button click
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            highlightSearchResults(searchTerm);
        }
    });
    
    // Enter key search
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm) {
                highlightSearchResults(searchTerm);
            }
        }
    });
}

// Filter content based on search
function filterContent(searchTerm) {
    const toolCards = document.querySelectorAll('.tool-card');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!searchTerm) {
        // Show all content if search is empty
        toolCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        navItems.forEach(item => {
            item.style.display = 'flex';
            item.style.opacity = '1';
        });
        return;
    }
    
    // Filter tool cards
    toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
        }
    });
    
    // Filter navigation items
    navItems.forEach(item => {
        const title = item.querySelector('.nav-title').textContent.toLowerCase();
        const subtitle = item.querySelector('.nav-subtitle').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
            item.style.display = 'flex';
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0.5';
        }
    });
}

// Highlight search results
function highlightSearchResults(searchTerm) {
    // Remove existing highlights
    removeHighlights();
    
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        highlightText(title, searchTerm);
        highlightText(description, searchTerm);
    });
}

// Helper function to highlight text
function highlightText(element, searchTerm) {
    const text = element.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    
    if (highlightedText !== text) {
        element.innerHTML = highlightedText;
    }
}

// Remove highlights
function removeHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Card interactions
function initializeCardInteractions() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    // Add hover effects and click handlers
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll effects
function initializeScrollEffects() {
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe tool cards for scroll animations
    document.querySelectorAll('.tool-card').forEach(card => {
        observer.observe(card);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update content area based on navigation selection
function updateContentArea(navItem) {
    const title = navItem.querySelector('.nav-title').textContent;
    const contentHeader = document.querySelector('.content-header h1');
    const contentDescription = document.querySelector('.content-description');
    
    // Update header based on selection
    switch(title) {
        case 'About':
            contentHeader.textContent = 'About One Click Plugin';
            contentDescription.textContent = 'Learn about the One Click Plugin and discover how it revolutionizes your Revit workflow with powerful automation tools.';
            break;
        case 'Licenses Manager':
            contentHeader.textContent = 'License Management';
            contentDescription.textContent = 'Manage your plugin licenses efficiently with our comprehensive licensing system that supports individual and team deployments.';
            break;
        case 'Openings Tools':
            contentHeader.textContent = 'Openings Tools Documentation';
            contentDescription.textContent = 'Automate the creation and modification of openings in walls, floors, and ceilings with precision and speed.';
            break;
        case 'Standards Tools':
            contentHeader.textContent = 'Standards Tools Documentation';
            contentDescription.textContent = 'Ensure project consistency and compliance with comprehensive standard management and validation tools.';
            break;
        case 'Step 2 Tools':
            contentHeader.textContent = 'Step 2 Tools Documentation';
            contentDescription.textContent = 'Advanced workflow automation for the second phase of your modeling process with intelligent decision-making capabilities.';
            break;
        case 'Model Health Tools':
            contentHeader.textContent = 'Model Health Tools Documentation';
            contentDescription.textContent = 'Comprehensive model diagnostics and health monitoring to ensure optimal performance and reliability.';
            break;
        case 'Utilities Tools':
            contentHeader.textContent = 'Utilities Tools Documentation';
            contentDescription.textContent = 'A collection of powerful utility tools designed to enhance productivity and streamline common Revit tasks.';
            break;
        case 'Up Next':
            contentHeader.textContent = 'Upcoming Features';
            contentDescription.textContent = 'Discover the exciting new tools and features coming to the One Click Plugin in future releases.';
            break;
        default:
            contentHeader.textContent = 'One Click Plugin Documentation';
            contentDescription.textContent = 'Comprehensive documentation for all plugin panels and tools. Select a specific panel from the navigation to view detailed information, instructional videos, and usage guidelines.';
    }
    
    // Add fade effect
    contentHeader.style.opacity = '0';
    contentDescription.style.opacity = '0';
    
    setTimeout(() => {
        contentHeader.style.opacity = '1';
        contentDescription.style.opacity = '1';
    }, 150);
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#333333',
        color: '#ffffff',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: '1000',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple effect and animations
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .search-highlight {
        background-color: #ff4444;
        color: #ffffff;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: 600;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .btn-secondary {
        position: relative;
        overflow: hidden;
    }
`;

// Inject additional styles
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);