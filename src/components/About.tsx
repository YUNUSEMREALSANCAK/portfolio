import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Cpu, Zap, Brain, Cloud, Lock } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      category: 'Frontend',
      icon: <Code className="w-8 h-8 text-violet-500" />,
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      description: 'Modern ve responsive kullanıcı arayüzleri geliştirme'
    },
    {
      category: 'Backend',
      icon: <Database className="w-8 h-8 text-fuchsia-500" />,
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
      description: 'Ölçeklenebilir ve güvenli backend sistemleri'
    },
    {
      category: 'DevOps',
      icon: <Cloud className="w-8 h-8 text-blue-500" />,
      technologies: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
      description: 'Otomatize deployment ve altyapı yönetimi'
    },
    {
      category: 'Security',
      icon: <Lock className="w-8 h-8 text-green-500" />,
      technologies: ['OAuth', 'JWT', 'HTTPS', 'Encryption'],
      description: 'Güvenli uygulama geliştirme pratikleri'
    },
    {
      category: 'Performance',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      technologies: ['Lazy Loading', 'Code Splitting', 'Caching', 'CDN'],
      description: 'Yüksek performanslı web uygulamaları'
    },
    {
      category: 'AI/ML',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      technologies: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
      description: 'Yapay zeka ve makine öğrenmesi entegrasyonları'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-6">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            5+ yıllık deneyime sahip bir yazılım mühendisiyim. Kullanıcı deneyimini
            ön planda tutan, ölçeklenebilir ve sürdürülebilir uygulamalar geliştiriyorum.
            Modern teknolojileri yakından takip ediyor ve projelerimde en güncel çözümleri
            kullanmaya özen gösteriyorum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-6">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                    {skill.category}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-600 dark:text-violet-400 rounded-full"
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