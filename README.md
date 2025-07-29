# TechBridge Solutions - Professional ERP Migration Website

A modern, responsive website for TechBridge Solutions, a consultancy agency specializing in ERP migrations to Dynamics and Salesforce platforms.

## 🚀 Features

- **Modern Design**: Sleek, professional design with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Fast Loading**: Static site with optimized assets and minimal dependencies
- **Interactive Elements**: Smooth scrolling, hover effects, and form validation
- **Contact Form**: Integrated contact form that sends JSON data to your API endpoint
- **Accessibility**: Keyboard navigation, screen reader support, and focus management
- **SEO Optimized**: Semantic HTML, meta tags, and structured content

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with modern features
- **CSS3**: Custom properties, Grid, Flexbox, and advanced animations
- **Vanilla JavaScript**: No frameworks, optimized for performance
- **Font Awesome**: Icons for visual elements
- **Google Fonts**: Inter font family for typography

## 📁 Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Secondary**: Purple gradient (#f093fb to #f5576c)
- **Accent**: Cyan (#06b6d4)
- **Text**: Dark slate (#1e293b) with secondary gray (#64748b)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive Sizing**: Using clamp() for fluid typography
- **Hierarchy**: Clear heading structure with proper contrast

### Animations
- **Scroll Animations**: Fade-in effects on scroll
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Form submission feedback
- **Parallax**: Subtle parallax effect on hero section

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Setup and Deployment

### Local Development
1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development server, use any static file server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Production Deployment
The site is designed to be served statically. You can deploy to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a repository
- **AWS S3**: Upload files to a bucket
- **Any web server**: Upload files to your hosting provider

## 📧 Contact Form Configuration

The contact form is configured to send data to `https://contact.oursite.com/contact`. The form sends a JSON payload with the following structure:

```json
{
  "name": "Full Name",
  "email": "email@example.com",
  "company": "Company Name",
  "phone": "Phone Number",
  "currentSystem": "sap|oracle|sage|netsuite|quickbooks|other",
  "targetSystem": "dynamics365|salesforce|both|undecided",
  "message": "Project description",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "TechBridge Solutions Website"
}
```

### Form Validation
- Required fields: Name, Email, Message
- Email format validation
- Real-time feedback
- Loading states during submission

## 🎯 Performance Optimizations

- **Minimal Dependencies**: Only essential external resources
- **Optimized Images**: SVG graphics and optimized assets
- **Efficient CSS**: CSS custom properties and modern techniques
- **Debounced Events**: Optimized scroll and resize handlers
- **Lazy Loading**: Intersection Observer for animations

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color ratios
- **Mobile Menu**: Accessible hamburger menu

## 🔍 SEO Features

- **Meta Tags**: Title, description, and viewport
- **Semantic Structure**: Proper heading hierarchy
- **Alt Text**: Descriptive text for images
- **Structured Data**: Ready for schema markup
- **Fast Loading**: Optimized for Core Web Vitals

## 🚀 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

## 📈 Analytics Integration

The site includes placeholder analytics tracking. To integrate with Google Analytics:

1. Add your Google Analytics script to the `<head>` section
2. Update the `trackEvent` function in `script.js`
3. Add tracking calls for important user interactions

## 🔧 Customization

### Colors
Update CSS custom properties in `:root`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other colors */
}
```

### Content
- Update text content in `index.html`
- Modify contact information
- Change service offerings
- Update company details

### Styling
- Modify `styles.css` for design changes
- Update animations and transitions
- Customize responsive breakpoints

## 📞 Support

For questions or customization requests:
- Email: info@techbridge-solutions.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is created for TechBridge Solutions. All rights reserved.

---

**TechBridge Solutions** - Transforming businesses through successful ERP migrations and innovative technological solutions. 