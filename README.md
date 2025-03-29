# Odzyskajmy Foundation Website

## Project Overview
This is the official website for the Odzyskajmy Foundation, built with React, TypeScript, and Tailwind CSS.

## Table of Contents
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Content Management](#content-management)
- [Facebook Integration](#facebook-integration)
- [Security Enhancements](#security-enhancements)
- [Color Scheme Management](#color-scheme-management)

## Development Setup

### Prerequisites
- Node.js (v16 or later) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm (included with Node.js)

### Installation Steps
```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

The application will run at http://localhost:5173/ by default.

## Production Deployment

### Building for Production
```sh
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

### Hosting Requirements
1. **Static Hosting Service**: You can deploy this site to any static hosting service like:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

2. **Environment Variables**: None are required for basic functionality.

3. **Contact Form Backend**:
   The contact form requires a backend service to process form submissions and send emails. Options include:

   - **Using Netlify Forms**: 
     If deploying to Netlify, you can use their built-in form handling service.
     Add this to your form: `data-netlify="true" name="contact"`

   - **Custom Email Backend**: 
     Set up a simple serverless function (AWS Lambda, Netlify Functions, etc.) that:
     - Receives form data via POST request
     - Validates the data
     - Sends email via SMTP or an email service API (SendGrid, Mailgun, etc.)
     - Returns success/error response

   Example serverless function for email (Node.js with SendGrid):
   ```javascript
   const sgMail = require('@sendgrid/mail');
   
   exports.handler = async function(event, context) {
     try {
       const { name, email, message } = JSON.parse(event.body);
       
       sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       
       const msg = {
         to: 'foundation@example.com',
         from: 'website@example.com',
         subject: `New contact form submission from ${name}`,
         text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
         html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
       };
       
       await sgMail.send(msg);
       
       return {
         statusCode: 200,
         body: JSON.stringify({ message: "Email sent successfully" })
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: "Failed to send email" })
       };
     }
   };
   ```

## Content Management

### Adding New Posts/Projects

1. **Direct Code Editing**:
   To add a new project, update the project data array in `/src/data/projects.ts`:

   ```typescript
   // Example of adding a new project
   export const projects = [
     // ... existing projects
     {
       id: "new-project-id",
       title: "New Project Title",
       description: "Description of the new project",
       fullDescription: "Detailed information about the project...",
       images: ["url-to-image1.jpg", "url-to-image2.jpg"],
       startDate: "January 2024",
       endDate: "Ongoing",
       goals: ["Goal 1", "Goal 2"],
       achievements: ["Achievement 1", "Achievement 2"],
     }
   ];
   ```

2. **CMS Integration** (recommended for non-technical users):
   For easier content management, consider integrating with:
   
   - **Headless CMS** (Contentful, Sanity, Strapi)
   - **Firebase** for real-time content updates
   - **Supabase** for content storage with authentication

   Basic CMS integration involves:
   1. Setting up a content model in your chosen CMS
   2. Fetching content via API in your React components
   3. Displaying the fetched content dynamically

## Facebook Integration

To display the latest post from a specific Facebook page:

1. **Create a Facebook Developer Account** at [developers.facebook.com](https://developers.facebook.com/)
2. **Create a Facebook App** in the Developer Dashboard
3. **Get a Page Access Token** with permissions to access the page's posts
4. **Add the Facebook Graph API integration**:

```javascript
// src/components/FacebookFeed.jsx
import { useState, useEffect } from 'react';

const FacebookFeed = ({ pageId, accessToken }) => {
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v18.0/${pageId}/posts?fields=message,created_time,full_picture,permalink_url&limit=1&access_token=${accessToken}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch from Facebook API');
        }
        
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setLatestPost(data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching Facebook post:', err);
        setError('Could not load the latest post');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, [pageId, accessToken]);

  if (loading) return <div>Loading latest update...</div>;
  if (error) return <div>{error}</div>;
  if (!latestPost) return <div>No recent posts found</div>;

  return (
    <div className="facebook-post">
      <div className="post-date">
        {new Date(latestPost.created_time).toLocaleDateString()}
      </div>
      {latestPost.message && <p>{latestPost.message}</p>}
      {latestPost.full_picture && (
        <img 
          src={latestPost.full_picture} 
          alt="Facebook post" 
          className="w-full h-64 object-cover rounded-md my-4"
        />
      )}
      <a 
        href={latestPost.permalink_url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-secondary"
      >
        View on Facebook
      </a>
    </div>
  );
};

export default FacebookFeed;
```

**Important Notes**:
- Store your access token securely (environment variables)
- Facebook access tokens expire, so implement token refresh logic
- This approach is for client-side rendering; for production, consider fetching posts server-side to protect your access token

## Security Enhancements

### Adding CAPTCHA to Forms

1. **Google reCAPTCHA Integration**:

   a. Sign up for reCAPTCHA at [google.com/recaptcha](https://www.google.com/recaptcha/admin/create)
   
   b. Install the package:
   ```bash
   npm install react-google-recaptcha
   ```
   
   c. Add to your form component:
   ```jsx
   import ReCAPTCHA from "react-google-recaptcha";

   function ContactForm() {
     const recaptchaRef = React.createRef();
     
     const handleSubmit = async (e) => {
       e.preventDefault();
       
       // Get the reCAPTCHA token
       const token = await recaptchaRef.current.executeAsync();
       
       // Verify token on your backend before processing the form
       const formData = new FormData(e.target);
       formData.append('recaptchaToken', token);
       
       // Submit form data to your backend
       // ...
       
       // Reset the reCAPTCHA
       recaptchaRef.current.reset();
     };
     
     return (
       <form onSubmit={handleSubmit}>
         {/* Form fields */}
         <ReCAPTCHA
           ref={recaptchaRef}
           sitekey="YOUR_RECAPTCHA_SITE_KEY"
           size="normal"
         />
         <button type="submit">Submit</button>
       </form>
     );
   }
   ```

2. **Bot Protection Measures**:

   a. **Honeypot Fields**:
   ```jsx
   function ContactForm() {
     return (
       <form>
         {/* Visible form fields */}
         
         {/* Honeypot field - hidden from humans but bots will fill it */}
         <input
           type="text"
           name="website"
           style={{ display: 'none' }}
           tabIndex="-1"
           autoComplete="off"
         />
         
         <button type="submit">Submit</button>
       </form>
     );
   }
   ```
   
   b. **Rate Limiting**:
   Implement rate limiting on your backend to prevent form submission abuse.
   
   c. **Form Submission Timing**:
   Check how quickly a form is submitted after page load. Submissions that happen too quickly are likely automated.

## Color Scheme Management

All color settings are consolidated in the following locations:

1. **Primary Location**: `tailwind.config.ts` - Contains the color scheme definitions
2. **CSS Variables**: `src/index.css` - Contains CSS variables for the color scheme
3. **Component-specific styling**: Uses the Tailwind classes defined in the config

To modify the site's colors:

1. Edit the color definitions in `tailwind.config.ts` under the `theme.extend.colors` section
2. Update corresponding CSS variables in `src/index.css` if needed
3. The changes will automatically apply across the site

Example of current color scheme:
```typescript
// In tailwind.config.ts
foundation: {
  green: '#15C39A',
  'green-light': '#E6F7F4',
  'green-dark': '#0E8A6B',
  brown: '#BF884E',
  'brown-light': '#F0E5D8',
  'brown-dark': '#8A6235',
  light: '#F5F5F5',
  dark: '#333333',
  orange: '#F97316',
  gray: '#F1F5F9',
  white: '#FFFFFF'
}
```
