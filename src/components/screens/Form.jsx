import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Container from '../layout/Container';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    interest: '',
    level: '',
    goal: '',
    commitment: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Please enter your name");
    if (!formData.interest.trim()) return alert("Please enter what you want to learn");
    if (!formData.level.trim()) return alert("Please enter your current level");
    if (!formData.goal.trim()) return alert("Please enter your goal");
    if (!formData.commitment.trim()) return alert("Please enter your daily commitment");
    onSubmit(formData);
  };

  return (
    <Container className="fade-in">
      <div className="text-center">
        <h1 className="section-title">Personalize Your Path</h1>
        <p className="section-subtitle">Since our AI is completely dynamic, you can type absolutely anything below!</p>
        
        <Card className="form-card">
          <form onSubmit={handleSubmit}>
            <Input
              label="What's your name?"
              id="name"
              placeholder="e.g. Sreekar"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <Input
              label="What exactly do you want to learn?"
              id="interest"
              placeholder="e.g. Web3 Game Development in Rust"
              value={formData.interest}
              onChange={handleChange}
              required
            />

            <div className="form-row">
              <Input
                label="Current Skill Level"
                id="level"
                placeholder="e.g. Absolute Beginner or 5 yrs exp"
                value={formData.level}
                onChange={handleChange}
                required
              />

              <Input
                label="Time Commitment"
                id="commitment"
                placeholder="e.g. 2 hours on weekends"
                value={formData.commitment}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="What is your primary goal?"
              id="goal"
              placeholder="e.g. Build my own startup SaaS"
              value={formData.goal}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full mt-4">
              Generate Detailed AI Roadmap 🤖
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
};

export default Form;
