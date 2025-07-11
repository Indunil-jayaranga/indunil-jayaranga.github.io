## How to Fix Your Dev.to Articles

Your website is correctly fetching all 7 articles from Dev.to, but they need to be updated with proper content and tags.

### Current Issues with Your Articles:

1. **No tags**: All articles have empty `tag_list` arrays
2. **Test content**: Articles contain development/test content instead of cybersecurity topics
3. **Poor titles**: Titles like "ane hukam", "bla bla bla" are not professional

### Steps to Fix:

#### Method 1: Edit Articles Directly on Dev.to (Easiest)

1. **Go to your Dev.to dashboard**: https://dev.to/dashboard
2. **Click "Posts" in the left sidebar**
3. **For each article, click "Edit"**
4. **Update the content**:

```markdown
---
title: "Professional Cybersecurity Article Title"
published: true
description: "Professional description about cybersecurity topic"
tags: cybersecurity, security, tutorial, homelab
cover_image: https://your-professional-image.com/image.jpg
---

# Professional Article Content

## Introduction
Professional cybersecurity content here...

## Main Content
Detailed technical content...

## Conclusion
Professional summary...
```

#### Method 2: Use the Dev.to API

Run this script after getting your API key from https://dev.to/settings/account:

```javascript
// Update existing article via API
const updateArticle = async (articleId) => {
  const response = await fetch(`https://dev.to/api/articles/${articleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'api-key': 'YOUR_API_KEY'
    },
    body: JSON.stringify({
      article: {
        title: "Building a Home Cybersecurity Lab",
        body_markdown: `
## Introduction

Setting up a cybersecurity lab is essential for hands-on learning...

[Continue with professional content]
        `,
        tags: ["cybersecurity", "homelab", "tutorial", "security"],
        description: "Complete guide to setting up your own cybersecurity testing laboratory"
      }
    })
  });
  
  const result = await response.json();
  console.log('Article updated:', result);
};

// Update each of your articles:
// updateArticle(2676119); // "hese don't seem to be proper cybersecurity articles"
// updateArticle(2676085); // "ane hukam"
// updateArticle(2675608); // "Last one"
// etc...
```

### Article Ideas to Replace Your Test Content:

1. **"Building a Home Cybersecurity Lab"**
   - Tags: `cybersecurity`, `homelab`, `tutorial`, `security`

2. **"Introduction to Network Security Monitoring"**
   - Tags: `cybersecurity`, `networking`, `monitoring`, `security`

3. **"Malware Analysis Fundamentals"**
   - Tags: `cybersecurity`, `malware`, `analysis`, `tutorial`

4. **"Incident Response Best Practices"**
   - Tags: `cybersecurity`, `incident-response`, `soc`, `security`

5. **"Digital Forensics Investigation Techniques"**
   - Tags: `cybersecurity`, `forensics`, `investigation`, `security`

6. **"OSINT for Security Professionals"**
   - Tags: `cybersecurity`, `osint`, `intelligence`, `security`

7. **"Web Application Security Testing"**
   - Tags: `cybersecurity`, `webapp`, `testing`, `security`

### Important Tags to Use:

Always include `cybersecurity` as your primary tag, plus 3 others from:
- `security`
- `tutorial` 
- `homelab`
- `malware`
- `forensics`
- `networking`
- `soc`
- `incident-response`
- `osint`
- `webapp`
- `analysis`
- `monitoring`

### After You Update:

1. Your website will automatically show the new content within minutes
2. All 7 articles will be properly displayed
3. Your portfolio will look professional

**The API integration is working perfectly - you just need to publish proper cybersecurity content!**
