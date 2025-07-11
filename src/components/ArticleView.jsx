import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react';
import './BlogPage.css';

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        
        // Try CORS proxy first since direct API calls often fail due to CORS
        try {
          console.log('ArticleView: Trying CORS proxy...');
          const timestamp = Date.now(); // Cache busting
          const randomParam = Math.random().toString(36).substring(7);
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://dev.to/api/articles/${id}?_=${timestamp}&r=${randomParam}`)}`;
          console.log('ArticleView: CORS proxy URL:', proxyUrl);
          
          const response = await fetch(proxyUrl, {
            cache: 'no-cache' // Prevent browser caching
          });
          
          if (response.ok) {
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            console.log('ArticleView: Fetched article via CORS proxy:', data);
            setArticle(data);
            return;
          }
        } catch (proxyError) {
          console.log('ArticleView: CORS proxy failed, trying direct API...');
          console.error('ArticleView: Proxy Error:', proxyError);
        }
        
        // Try direct API call as fallback
        try {
          const timestamp = Date.now();
          const randomParam = Math.random().toString(36).substring(7);
          const response = await fetch(`https://dev.to/api/articles/${id}?_=${timestamp}&r=${randomParam}`, {
            method: 'GET',
            cache: 'no-cache'
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('ArticleView: Fetched article via direct API:', data);
            setArticle(data);
            return;
          } else {
            throw new Error(`Failed to fetch article: ${response.status}`);
          }
        } catch (directError) {
          console.log('ArticleView: Direct API also failed');
          console.error('ArticleView: Direct API Error:', directError);
        }
        
        // If both methods fail, try demo data
        const demoArticles = getDemoArticles();
        const demoArticle = demoArticles.find(a => a.id === parseInt(id));
        if (demoArticle) {
          setArticle(demoArticle);
          console.log('ArticleView: Using demo article');
        } else {
          throw new Error('Article not found');
        }
        
      } catch (err) {
        setError(err.message);
        console.error('ArticleView: Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
        user: { name: "Indunil Jayaranga" },
        body_html: `
          <h2>Introduction to Malware Analysis</h2>
          <p>Malware analysis is a critical skill in cybersecurity that involves examining malicious software to understand its behavior, purpose, and impact. This comprehensive guide will walk you through the essential techniques and tools used in modern malware analysis.</p>
          
          <h3>Static Analysis</h3>
          <p>Static analysis involves examining malware without executing it. This includes:</p>
          <ul>
            <li>File signature analysis</li>
            <li>String analysis</li>
            <li>Disassembly and reverse engineering</li>
            <li>Metadata examination</li>
          </ul>
          
          <h3>Dynamic Analysis</h3>
          <p>Dynamic analysis involves executing malware in a controlled environment to observe its behavior:</p>
          <ul>
            <li>Sandbox analysis</li>
            <li>Network traffic monitoring</li>
            <li>System call tracing</li>
            <li>Registry and file system monitoring</li>
          </ul>
          
          <h3>Tools and Techniques</h3>
          <p>Some essential tools for malware analysis include:</p>
          <ul>
            <li><strong>IDA Pro</strong> - Advanced disassembler and debugger</li>
            <li><strong>Wireshark</strong> - Network protocol analyzer</li>
            <li><strong>Process Monitor</strong> - Real-time file system, registry and process monitoring</li>
            <li><strong>Volatility</strong> - Memory forensics framework</li>
          </ul>
          
          <h3>Best Practices</h3>
          <p>When conducting malware analysis, always remember to:</p>
          <ul>
            <li>Use isolated environments</li>
            <li>Document your findings thoroughly</li>
            <li>Follow proper safety protocols</li>
            <li>Stay updated with latest threats and techniques</li>
          </ul>
          
          <p>Malware analysis is an evolving field that requires continuous learning and adaptation to new threats. By mastering these fundamental techniques, you'll be better equipped to protect systems and networks from malicious attacks.</p>
        `
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
        user: { name: "Indunil Jayaranga" },
        body_html: `
          <h2>Network Forensics Overview</h2>
          <p>Network forensics is the practice of capturing, recording, and analyzing network traffic to investigate security incidents and gather digital evidence. This field has become increasingly important as cyber attacks become more sophisticated.</p>
          
          <h3>Key Components of Network Forensics</h3>
          <ul>
            <li><strong>Data Collection</strong> - Capturing network traffic using tools like tcpdump, Wireshark</li>
            <li><strong>Data Analysis</strong> - Examining captured data for anomalies and evidence</li>
            <li><strong>Timeline Reconstruction</strong> - Building a chronological sequence of events</li>
            <li><strong>Evidence Preservation</strong> - Maintaining chain of custody for legal purposes</li>
          </ul>
          
          <h3>Common Investigation Scenarios</h3>
          <p>Network forensics is commonly used in:</p>
          <ul>
            <li>Data breach investigations</li>
            <li>Malware infection analysis</li>
            <li>Insider threat detection</li>
            <li>Compliance auditing</li>
            <li>Incident response</li>
          </ul>
          
          <h3>Essential Tools</h3>
          <p>Professional network forensics requires specialized tools:</p>
          <ul>
            <li><strong>Wireshark</strong> - Network protocol analyzer</li>
            <li><strong>NetworkMiner</strong> - Network forensic analysis tool</li>
            <li><strong>Snort</strong> - Network intrusion detection system</li>
            <li><strong>Xplico</strong> - Network forensic analysis tool</li>
          </ul>
          
          <p>Network forensics plays a crucial role in modern cybersecurity, providing the ability to investigate incidents, understand attack vectors, and prevent future breaches.</p>
        `
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
        user: { name: "Indunil Jayaranga" },
        body_html: `
          <h2>Setting Up Your Cybersecurity Home Lab</h2>
          <p>A cybersecurity home lab is essential for learning, practicing, and testing security tools and techniques. This comprehensive guide will help you build a professional-grade lab environment at home.</p>
          
          <h3>Hardware Requirements</h3>
          <p>You don't need expensive equipment to start:</p>
          <ul>
            <li><strong>Minimum</strong> - One computer with 8GB RAM and 500GB storage</li>
            <li><strong>Recommended</strong> - 16GB+ RAM, 1TB+ storage, dedicated network equipment</li>
            <li><strong>Optional</strong> - Raspberry Pi devices for IoT security testing</li>
          </ul>
          
          <h3>Software Components</h3>
          <h4>Virtualization Platform</h4>
          <ul>
            <li>VMware Workstation Pro (Windows/Linux)</li>
            <li>VirtualBox (Free, cross-platform)</li>
            <li>Proxmox (Enterprise-grade virtualization)</li>
          </ul>
          
          <h4>Operating Systems</h4>
          <ul>
            <li><strong>Kali Linux</strong> - Penetration testing distribution</li>
            <li><strong>Ubuntu Server</strong> - For hosting vulnerable applications</li>
            <li><strong>Windows 10/11</strong> - For Windows-specific security testing</li>
            <li><strong>pfSense</strong> - Network security and firewall</li>
          </ul>
          
          <h3>Vulnerable Applications</h3>
          <p>Practice your skills with intentionally vulnerable applications:</p>
          <ul>
            <li>DVWA (Damn Vulnerable Web Application)</li>
            <li>Metasploitable</li>
            <li>VulnHub VMs</li>
            <li>TryHackMe boxes</li>
          </ul>
          
          <h3>Network Segmentation</h3>
          <p>Properly segment your lab network:</p>
          <ul>
            <li>Isolated lab network</li>
            <li>DMZ for vulnerable services</li>
            <li>Management network</li>
            <li>Internet access controls</li>
          </ul>
          
          <p>Building a home lab is an investment in your cybersecurity career. Start small and gradually expand as you learn and grow your skills.</p>
        `
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
        user: { name: "Indunil Jayaranga" },
        body_html: `
          <h2>What is OSINT?</h2>
          <p>Open Source Intelligence (OSINT) is intelligence collected from publicly available sources. In cybersecurity, OSINT techniques are used for reconnaissance, threat intelligence, and security research.</p>
          
          <h3>Categories of OSINT Sources</h3>
          <h4>Internet Sources</h4>
          <ul>
            <li>Social media platforms</li>
            <li>Search engines</li>
            <li>Public databases</li>
            <li>Government websites</li>
            <li>News articles and blogs</li>
          </ul>
          
          <h4>Traditional Media</h4>
          <ul>
            <li>Newspapers and magazines</li>
            <li>Television and radio</li>
            <li>Academic publications</li>
            <li>Professional journals</li>
          </ul>
          
          <h3>OSINT Tools and Techniques</h3>
          <h4>Search Engines</h4>
          <ul>
            <li><strong>Google Dorking</strong> - Advanced search operators</li>
            <li><strong>Shodan</strong> - Search engine for Internet-connected devices</li>
            <li><strong>Censys</strong> - Internet scanning and analysis</li>
          </ul>
          
          <h4>Social Media Intelligence</h4>
          <ul>
            <li>Social media monitoring tools</li>
            <li>Profile analysis</li>
            <li>Network mapping</li>
            <li>Content analysis</li>
          </ul>
          
          <h4>Domain and Network Intelligence</h4>
          <ul>
            <li>WHOIS databases</li>
            <li>DNS enumeration</li>
            <li>Certificate transparency logs</li>
            <li>Subdomain discovery</li>
          </ul>
          
          <h3>OSINT in Cybersecurity</h3>
          <p>OSINT is used for:</p>
          <ul>
            <li><strong>Threat Intelligence</strong> - Identifying potential threats</li>
            <li><strong>Vulnerability Assessment</strong> - Finding exposed assets</li>
            <li><strong>Incident Response</strong> - Investigating security incidents</li>
            <li><strong>Red Team Operations</strong> - Reconnaissance phase</li>
          </ul>
          
          <h3>Ethical Considerations</h3>
          <p>When conducting OSINT research:</p>
          <ul>
            <li>Respect privacy and legal boundaries</li>
            <li>Follow responsible disclosure practices</li>
            <li>Use information ethically</li>
            <li>Maintain professional standards</li>
          </ul>
          
          <p>OSINT is a powerful tool in the cybersecurity arsenal, providing valuable intelligence while operating within legal and ethical boundaries.</p>
        `
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

  if (loading) {
    return (
      <div className="blog-page modern-bg">
        <div className="container">
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="blog-page modern-bg">
        <div className="container">
          <div className="blog-error">
            <h2>Article Not Found</h2>
            <p>The article you're looking for could not be found.</p>
            <button onClick={() => navigate('/blog')} className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="container">
        <div className="article-header">
          <button 
            onClick={() => navigate('/blog')}
            className="back-button"
          >
            <ArrowLeft size={20} />
            Back to All Articles
          </button>
        </div>

        <article className="article-content">
          <div className="article-cover">
            <img 
              src={article.cover_image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'} 
              alt={article.title}
            />
          </div>

          <div className="article-body">
            <div className="article-meta">
              <div className="article-author">
                <User size={16} />
                <span>{article.user?.name || 'Indunil Jayaranga'}</span>
              </div>
              <div className="article-date">
                <Calendar size={16} />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="article-reading-time">
                <Clock size={16} />
                <span>{article.reading_time_minutes || 5} min read</span>
              </div>
            </div>

            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-tags">
              {Array.isArray(article.tag_list) && article.tag_list.map((tag, index) => (
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

            <div className="article-description">
              <p>{article.description}</p>
            </div>

            <div className="article-content-body">
              {article.body_html ? (
                <div dangerouslySetInnerHTML={{ __html: article.body_html }} />
              ) : (
                <div className="article-content">
                  <p>{article.description}</p>
                  <p><em>Full article content would be displayed here when available from the API.</em></p>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleView;
