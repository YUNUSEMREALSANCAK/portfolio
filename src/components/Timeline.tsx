import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Timeline = () => {
  const { timelineItems } = useAdmin();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // En son eklenen en üstte görünsün
  const sortedTimelineItems = [...timelineItems].reverse();

  return (
    <section id="timeline" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">
            Deneyim & Eğitim
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline çizgisi */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-12">
            {sortedTimelineItems.map((item, index) => (
              <div key={item.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Sol taraf içeriği */}
                  {index % 2 === 0 && (
                    <div className="w-5/12 pr-8">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {item.type === 'education' ? (
                            <GraduationCap className="w-5 h-5 text-violet-500" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-violet-500" />
                          )}
                          <span className="text-sm text-violet-500">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {item.institution} • {item.location}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Orta nokta */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-violet-500 rounded-full border-4 border-white dark:border-gray-900" />

                  {/* Sağ taraf içeriği */}
                  {index % 2 === 1 && (
                    <div className="w-5/12 pl-8">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {item.type === 'education' ? (
                            <GraduationCap className="w-5 h-5 text-violet-500" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-violet-500" />
                          )}
                          <span className="text-sm text-violet-500">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {item.institution} • {item.location}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 