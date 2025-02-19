import React from 'react';
import Hero from './Hero';
import About from './About';
import Timeline from './Timeline';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
};

export default HomePage; 