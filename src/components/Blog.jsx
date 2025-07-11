import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, Tag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const DEV_TO_USERNAME = 'indunil';

  useEffect(() => {
    fetchArticles();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchArticles, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Blog component: Fetching articles from Dev.to API...');
      
      // Try CORS proxy first since direct API calls often fail due to CORS
      try {
        console.log('Blog component: Trying CORS proxy...');
        const timestamp = Date.now(); // Cache busting
        const randomParam = Math.random().toString(36).substring(7);
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=10&_=${timestamp}&r=${randomParam}`)}`;
        console.log('Blog component: CORS proxy URL:', proxyUrl);
        
        const response = await fetch(proxyUrl, {
          cache: 'no-cache' // Simplified cache control
        });
        
        if (response.ok) {
          const proxyData = await response.json();
          const data = JSON.parse(proxyData.contents);
          console.log('Blog component: Fetched articles via CORS proxy:', data.length, 'articles');
          console.log('Blog component: Latest article:', data[0]?.title, 'ID:', data[0]?.id);
          console.log('Blog component: Articles data:', data);
          
          if (data && data.length > 0) {
            // Sort by published date to get the latest 3
            const sortedArticles = data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
            const latestArticles = sortedArticles.slice(0, 3);
            
            // Add debugging info
            console.log('Blog component: Final articles to display:', latestArticles);
            latestArticles.forEach((article, index) => {
              console.log(`Article ${index + 1}:`, {
                id: article.id,
                title: article.title,
                description: article.description,
                cover_image: article.cover_image,
                tag_list: article.tag_list,
                user: article.user
              });
            });
            
            setArticles(latestArticles);
            console.log('Blog component: Successfully loaded latest 3 articles from Dev.to via proxy');
            return;
          }
        }
      } catch (proxyError) {
        console.log('Blog component: CORS proxy failed, trying direct API...');
        console.error('Blog component: Proxy Error:', proxyError);
      }
      
      // Try direct API call as fallback
      try {
        const timestamp = Date.now();
        const randomParam = Math.random().toString(36).substring(7);
        const response = await fetch(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=10&_=${timestamp}&r=${randomParam}`, {
          cache: 'no-cache'
        });
        
        console.log('Blog component: API Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        console.log('Blog component: Fetched articles via direct API:', data.length, 'articles');
        console.log('Blog component: Latest article:', data[0]?.title, 'ID:', data[0]?.id);
        console.log('Blog component: API Timestamp:', new Date().toISOString());
        console.log('Blog component: Articles data:', data);
        
        if (data && data.length > 0) {
          // Sort by published date to get the latest 3
          const sortedArticles = data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
          const latestArticles = sortedArticles.slice(0, 3);
          
          // Add debugging info
          console.log('Blog component: Final articles to display:', latestArticles);
          setArticles(latestArticles);
          console.log('Blog component: Successfully loaded latest 3 articles from Dev.to');
          return;
        }
      } catch (directError) {
        console.log('Blog component: Direct API also failed');
        console.error('Blog component: Direct API Error:', directError);
      }
      
      // If both methods fail, show error and use demo data
      throw new Error('Unable to fetch articles from Dev.to API');
      
    } catch (err) {
      console.error('Blog component: Error fetching articles from Dev.to:', err);
      setError(err.message);
      // Fallback demo data for development
      setArticles([
        {
          id: 1,
          title: "Advanced Malware Analysis Techniques",
          description: "Deep dive into modern malware analysis methods using dynamic and static analysis tools.",
          url: "#",
          cover_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
          published_at: "2025-01-15T10:00:00Z",
          reading_time_minutes: 8,
          tag_list: ["malware", "cybersecurity", "analysis"],
          user: { name: "Indunil Jayaranga" }
        },
        {
          id: 2,
          title: "Network Forensics: Capturing Digital Evidence",
          description: "Essential techniques for network forensics investigation and digital evidence collection.",
          url: "#",
          cover_image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800",
          published_at: "2025-01-10T14:30:00Z",
          reading_time_minutes: 12,
          tag_list: ["forensics", "networking", "investigation"],
          user: { name: "Indunil Jayaranga" }
        },
        {
          id: 3,
          title: "Building a Home Lab for Cybersecurity",
          description: "Complete guide to setting up your own cybersecurity testing laboratory at home.",
          url: "#",
          cover_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
          published_at: "2025-01-05T09:15:00Z",
          reading_time_minutes: 15,
          tag_list: ["homelab", "security", "tutorial"],
          user: { name: "Indunil Jayaranga" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag) => {
    const colors = {
      'cybersecurity': '#e74c3c',
      'malware': '#8e44ad',
      'forensics': '#2980b9',
      'networking': '#27ae60',
      'tutorial': '#f39c12',
      'analysis': '#34495e',
      'security': '#c0392b',
      'investigation': '#16a085',
      'homelab': '#d35400'
    };
    return colors[tag.toLowerCase()] || '#7f8c8d';
  };

  if (loading) {
    return (
      <section id="blog" className="blog">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-gradient">Featured</h2>
            <p className="section-description">
              Latest insights on cybersecurity, digital forensics, and security research
            </p>
          </div>
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading latest articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-gradient">Featured</h2>
          <p className="section-description">
            Latest insights on cybersecurity, digital forensics, and security research
          </p>
        </div>

        {error && (
          <div className="blog-error">
            <p>⚠️ Using demo content. Update DEV_TO_USERNAME in Blog.jsx to show real articles.</p>
          </div>
        )}

        <div className="blog-grid">
          {articles.map((article) => (
            <article key={article.id} className="blog-card">
              <div className="blog-image">
                <img 
                  src={article.cover_image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'} 
                  alt={article.title}
                  loading="lazy"
                />
                <div className="blog-overlay">
                  <button 
                    onClick={() => navigate(`/blog/article/${article.id}`)}
                    className="read-more-btn"
                  >
                    <ExternalLink size={20} />
                    Read Article
                  </button>
                </div>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <div className="blog-author">
                    <User size={16} />
                    <span>{article.user?.name || 'Indunil Jayaranga'}</span>
                  </div>
                  <div className="blog-date">
                    <Calendar size={16} />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="blog-reading-time">
                    <Clock size={16} />
                    <span>{article.reading_time_minutes || 5} min read</span>
                  </div>
                </div>

                <h3 className="blog-title">
                  <button 
                    onClick={() => navigate(`/blog/article/${article.id}`)}
                    className="blog-title-link"
                  >
                    {article.title}
                  </button>
                </h3>

                <p className="blog-description">
                  {article.description || article.title}
                </p>

                <div className="blog-tags">
                  {Array.isArray(article.tag_list) && article.tag_list.length > 0 && article.tag_list.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="blog-tag"
                      style={{ backgroundColor: getTagColor(tag) }}
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                  {(!Array.isArray(article.tag_list) || article.tag_list.length === 0) && (
                    <span 
                      className="blog-tag"
                      style={{ backgroundColor: '#7f8c8d' }}
                    >
                      <Tag size={12} />
                      general
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-cta">
          <p>Want to read more of my security research and insights?</p>
          <div className="blog-cta-buttons">
            <button 
              onClick={() => navigate('/blog')}
              className="btn btn-primary"
            >
              View All Articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
