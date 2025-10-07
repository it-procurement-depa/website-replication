// One Click Plugin Documentation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeSearch();
    initializeCardInteractions();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to top of content area
            document.querySelector('.content').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update content based on selection (you can expand this)
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
    const buttons = document.querySelectorAll('.btn-secondary');
    
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
    
    // Button click effects
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Simulate action (you can replace with actual functionality)
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Video Guide';
                this.disabled = false;
                showToast('Video guide will be available soon!');
            }, 1000);
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
            contentDescription.textContent = 'Learn about the One Click Plugin and discover core functionality along with powerful application tools for enhanced productivity.';
            break;
        case 'Licenses Manager':
            contentHeader.textContent = 'License Management';
            contentDescription.textContent = 'Manage your plugin licenses with our efficient workflow system that supports individual and community licensing options.';
            break;
        case 'Openings Tools':
            contentHeader.textContent = 'Opening Tools Documentation';
            contentDescription.textContent = 'Automate the creation and modification of game openings with precision, speed, and advanced configuration options.';
            break;
        default:
            contentHeader.textContent = 'One Click Plugin Documentation';
            contentDescription.textContent = 'Comprehensive documentation for all plugin panels and tools. Select a specific panel from the left navigation to view detailed information, instructional videos, and usage guidelines.';
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