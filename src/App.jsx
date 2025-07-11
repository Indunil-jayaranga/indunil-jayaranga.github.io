import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import ArticleView from './components/ArticleView';
import Contact from './components/Contact';
import Vision from './components/Vision';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import './theme.css';
import './responsive.css';

function App() {
  return (
    <Router basename="/portfolio">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Blog />
              <Vision />
              <Contact />
            </>
          } />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/article/:id" element={<ArticleView />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
