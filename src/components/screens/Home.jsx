import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Container from '../layout/Container';
import './Home.css';

const Home = ({ onNext }) => {
  return (
    <Container className="fade-in">
      <div className="text-center mt-4">
        <h1 className="hero-title">Your AI Career Architect 🚀</h1>
        <p className="hero-subtitle">
          Unlock a high-detail, personalized learning ecosystem. From skill gap analysis to weekly study plans, SERS uses simulated intelligence to build your future.
        </p>
        
        <div className="home-grid">
          <div className="home-main-hero">
            <Card className="mb-8 premium-hero-card">
              <div className="home-feature-list">
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <div className="feature-text">
                    <h3>Personalized Path</h3>
                    <p>Tailored courses based on your interests and background.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <div className="feature-text">
                    <h3>Actionable Roadmap</h3>
                    <p>6-8 detailed steps with checklists and skill tracking.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🧠</span>
                  <div className="feature-text">
                    <h3>Skill Gap Analysis</h3>
                    <p>Identify what you're missing for your dream role.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={onNext} className="btn-lg">
              Get Your Roadmap Now 🚀
            </Button>
          </div>

          <aside className="home-sidebar">
            <Card className="trending-card">
              <h3>🔥 Trending Now</h3>
              <div className="trending-list">
                <div className="trending-item">Cybersecurity Specialist</div>
                <div className="trending-item">AI Ethics Researcher</div>
                <div className="trending-item">Cloud Solutions Architect</div>
                <div className="trending-item">Full-Stack Developer</div>
              </div>
            </Card>

            <Card className="stats-card mt-4">
              <div className="stat-row">
                <span className="stat-num">95%</span>
                <span className="stat-label">AI Accuracy</span>
              </div>
              <div className="stat-row">
                <span className="stat-num">10k+</span>
                <span className="stat-label">Resources</span>
              </div>
            </Card>
          </aside>
        </div>

        <section className="how-it-works mt-xl">
          <h2 className="section-title">How it Works</h2>
          <div className="steps-container">
            <div className="step-box">
              <div className="step-num">1</div>
              <h4>Profile Input</h4>
              <p>Tell us your interests and goals.</p>
            </div>
            <div className="step-box">
              <div className="step-num">2</div>
              <h4>AI Analysis</h4>
              <p>Our engine matches your profile.</p>
            </div>
            <div className="step-box">
              <div className="step-num">3</div>
              <h4>Deployment</h4>
              <p>Get your detailed roadmap & PDF.</p>
            </div>
          </div>
        </section>

        <p className="presentation-line mt-lg">
          "This system doesn’t just recommend courses, it builds a complete learning ecosystem including roadmap, skill analysis, and career insights."
        </p>
      </div>
    </Container>
  );
};

export default Home;
