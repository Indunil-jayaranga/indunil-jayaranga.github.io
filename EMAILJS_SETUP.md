# EmailJS Setup Guide for Portfolio Contact Form

Your portfolio now has a fully functional contact form using EmailJS! The current configuration uses a demo setup, but you can easily configure it with your own EmailJS account for production use.

## Current Configuration ✅

The contact form is already configured with working EmailJS credentials:
- **Service ID**: `service_2fm4pmc`
- **Template ID**: `template_y6qf7ks`
- **Public Key**: `IwZTAMQKLZEJ_OQFE`

**The form is fully functional and ready to use!**

## Features ✨

- ✅ Frontend-only email sending (no backend required)
- ✅ Form validation (required fields, email format)
- ✅ Loading states and user feedback
- ✅ Success/error message styling with beautiful dark theme design
- ✅ Automatic form reset after successful submission
- ✅ Auto-clearing status messages after 5 seconds
- ✅ Professional email template with sender details
- ✅ Responsive design

## Setting Up Your Own EmailJS Account (Optional)

If you want to use your own EmailJS account for production:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your **Service ID**

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} <{{from_email}}>
Reply To: {{reply_to}}

Message:
{{message}}

---
This message was sent through your portfolio contact form.
Sender: {{from_name}}
Email: {{from_email}}
```

4. Note your **Template ID**

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**

### 5. Update Configuration
Replace the values in `src/components/Contact.jsx`:

```javascript
const serviceID = 'your_service_id';     // Replace with your Service ID
const templateID = 'your_template_id';   // Replace with your Template ID
const publicKey = 'your_public_key';     // Replace with your Public Key
```

## Template Variables

The contact form sends these variables to EmailJS:
- `from_name` - Sender's name
- `from_email` - Sender's email
- `message` - The message content
- `to_name` - Your name (Indunil Jayaranga)
- `reply_to` - Sender's email for replies
- `subject` - Auto-generated subject line

## Testing

1. Open your portfolio in a browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check for success/error messages
6. Verify email delivery in your inbox

## Troubleshooting

### Common Issues:
1. **"Failed to send message"** - Check your internet connection and EmailJS credentials
2. **No email received** - Check spam folder, verify email service setup
3. **Form validation errors** - Ensure all fields are filled and email format is valid

### Debug Steps:
1. Open browser Developer Tools (F12)
2. Check Console tab for error messages
3. Verify EmailJS credentials are correct
4. Test with a simple message first

## Production Deployment

The contact form will work on any hosting platform since it's frontend-only:
- GitHub Pages ✅
- Netlify ✅
- Vercel ✅
- Any static hosting service ✅

No server configuration needed!

## Security Notes

- EmailJS public keys are safe to expose in frontend code
- Rate limiting is handled by EmailJS
- The current setup includes basic spam protection
- Consider adding reCAPTCHA for additional security in production

---

**Your contact form is ready to use! 🚀**

Test it out and start receiving messages from potential clients and collaborators!
