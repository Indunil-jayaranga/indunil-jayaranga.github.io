import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const DEV_TO_USERNAME = 'indunil';

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching articles from Dev.to API...');
      console.log('API URL:', `https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=100`);
        
        // Try CORS proxy first since direct API calls often fail due to CORS
        try {
          console.log('Trying CORS proxy...');
          const timestamp = Date.now(); // Cache busting
          const randomParam = Math.random().toString(36).substring(7);
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=100&_=${timestamp}&r=${randomParam}`)}`;
          console.log('CORS proxy URL:', proxyUrl);
          
          const response = await fetch(proxyUrl, {
            cache: 'no-cache' // Simplified cache control
          });
          
          if (response.ok) {
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            console.log('Fetched articles via CORS proxy:', data.length, 'articles');
            console.log('Latest article from proxy:', data[0]?.title, 'ID:', data[0]?.id);
            console.log('Articles data:', data);
            
            if (data && data.length > 0) {
              setArticles(data);
              console.log('Successfully loaded real articles from Dev.to via proxy');
              console.log('Articles loaded - Count:', data.length);
              console.log('Articles loaded - IDs:', data.map(a => `${a.id}: ${a.title}`));
              return;
            }
          }
        } catch (proxyError) {
          console.log('CORS proxy failed, trying direct API...');
          console.error('Proxy Error:', proxyError);
        }
        
        // Try direct API call as fallback
        try {
          const timestamp = Date.now();
          const randomParam = Math.random().toString(36).substring(7);
          const response = await fetch(`https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=100&_=${timestamp}&r=${randomParam}`, {
            method: 'GET',
            cache: 'no-cache'
          });
          
          console.log('API Response status:', response.status);
          console.log('API Response headers:', [...response.headers.entries()]);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log('Fetched articles via direct API:', data.length, 'articles');
          console.log('Latest article from API:', data[0]?.title, 'ID:', data[0]?.id);
          console.log('API Timestamp:', new Date().toISOString());
          console.log('Articles data:', data);
          
          if (data && data.length > 0) {
            setArticles(data);
            console.log('Successfully loaded real articles from Dev.to');
            console.log('Direct API - Articles loaded - Count:', data.length);
            console.log('Direct API - Articles loaded - IDs:', data.map(a => `${a.id}: ${a.title}`));
            return;
          }
        } catch (directError) {
          console.log('Direct API also failed');
          console.error('Direct API Error:', directError);
        }
        
        // If both methods fail, show error and use demo data
        throw new Error('Unable to fetch articles from Dev.to API');
        
      } catch (err) {
        console.error('Error fetching articles from Dev.to:', err);
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        setError(`Unable to load articles: ${err.message}`);
        console.log('Falling back to demo data');
        setArticles(getDemoArticles());
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchArticles();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchArticles, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchArticles]);

  const getDemoArticles = () => {
    return [
      {
        id: 1,
        title: "Advanced Malware Analysis Techniques",
        description: "Deep dive into modern malware analysis methods using dynamic and static analysis tools. Learn how to identify, analyze, and understand malicious software behavior.",
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
        description: "Essential techniques for network forensics investigation and digital evidence collection in modern enterprise environments.",
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
        description: "Complete guide to setting up your own cybersecurity testing laboratory at home with virtual machines and tools.",
        url: "#",
        cover_image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        published_at: "2025-01-05T09:15:00Z",
        reading_time_minutes: 15,
        tag_list: ["homelab", "security", "tutorial"],
        user: { name: "Indunil Jayaranga" }
      },
      {
        id: 4,
        title: "OSINT Techniques for Security Research",
        description: "Open Source Intelligence gathering methods and tools for cybersecurity professionals and researchers.",
        url: "#",
        cover_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        published_at: "2025-01-01T08:00:00Z",
        reading_time_minutes: 10,
        tag_list: ["osint", "research", "intelligence"],
        user: { name: "Indunil Jayaranga" }
      }
    ];
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
      'homelab': '#d35400',
      'osint': '#9b59b6',
      'research': '#2c3e50',
      'intelligence': '#1abc9c'
    };
    return colors[tag.toLowerCase()] || '#7f8c8d';
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleArticleClick = (article) => {
    navigate(`/blog/article/${article.id}`);
  };

  if (loading) {
    return (
      <div className="blog-page modern-bg">
        <div className="container">
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page modern-bg">
      <div className="container">
        <div className="blog-header">
          <h1 className="blog-title text-gradient">Security Research Blog</h1>
          <p className="blog-subtitle">
            Latest insights, research, and tutorials on cybersecurity
          </p>
          
          {error && (
            <div className="blog-error">
              <p>⚠️ Error loading articles from Dev.to: {error}</p>
              <p>Showing demo content instead. Check console for details.</p>
              <p>Articles will auto-refresh every 5 minutes.</p>
            </div>
          )}
        </div>

        <div className="blog-filters">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="blog-grid">
          {console.log('BlogPage: Rendering articles count:', filteredArticles.length)}
          {console.log('BlogPage: Total articles loaded:', articles.length)}
          {console.log('BlogPage: Search term:', searchTerm)}
          {console.log('BlogPage: All article IDs:', articles.map(a => a.id))}
          {console.log('BlogPage: Filtered article IDs:', filteredArticles.map(a => a.id))}
          {filteredArticles.length === 0 ? (
            <div className="no-articles">
              <p>No articles found matching your criteria.</p>
              {articles.length === 0 && (
                <p>No articles loaded. Please check your internet connection and try refreshing.</p>
              )}
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article key={article.id} className="blog-card" onClick={() => handleArticleClick(article)}>
                <div className="blog-card-image">
                  <img 
                    src={article.cover_image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'} 
                    alt={article.title}
                    loading="lazy"
                  />
                  <div className="blog-card-overlay">
                    <button className="read-more-btn">
                      Read More
                    </button>
                  </div>
                </div>

                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <div className="blog-card-author">
                      <User size={16} />
                      <span>{article.user?.name || 'Indunil Jayaranga'}</span>
                    </div>
                    <div className="blog-card-date">
                      <Calendar size={16} />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <div className="blog-card-reading-time">
                      <Clock size={16} />
                      <span>{article.reading_time_minutes || 5} min read</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">{article.title}</h3>
                  <p className="blog-card-description">{article.description}</p>

                  <div className="blog-card-tags">
                    {Array.isArray(article.tag_list) && article.tag_list.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="blog-tag"
                        style={{ backgroundColor: getTagColor(tag) }}
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
   