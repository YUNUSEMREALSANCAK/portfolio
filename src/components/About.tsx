import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Zap, Brain } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const SkillIcon = ({ type }: { type: 'frontend' | 'performance' | 'ai' }) => {
  switch (type) {
    case 'frontend':
      return <Code2 className="w-8 h-8 text-violet-500" />;
    case 'performance':
      return <Zap className="w-8 h-8 text-yellow-500" />;
    case 'ai':
      return <Brain className="w-8 h-8 text-purple-500" />;
    default:
      return null;
  }
};

const About = () => {
  const { about } = useAdmin();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {about.description}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {about.skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <SkillIcon type={skill.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;