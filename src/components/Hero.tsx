import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Code2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Hero = () => {
  const { about } = useAdmin();

  return (
    <div id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 800 - 400],
              scale: [null, Math.random() * 1 + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ opacity: 0.3 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          {/* Profil Fotoğrafı */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-48 h-48 mb-8 rounded-full overflow-hidden ring-4 ring-violet-500 dark:ring-violet-400 shadow-lg"
          >
            <img
              src="https://avatars.githubusercontent.com/u/92470093?s=400&u=3a55083e976c40738ce46dfb1223c5fb97ae02cc&v=4"
              alt="Yunus Emre ALSANCAK"
              className="w-full h-full object-cover transform scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 to-transparent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            Merhaba, Ben Yunus Emre ALSANCAK
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            {about.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { Icon: Github, href: "https://github.com/YUNUSEMREALSANCAK", bg: "bg-gray-900 dark:bg-gray-700" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/yunus-emre-alsancak-95475a21b/", bg: "bg-blue-600" },
              { Icon: Mail, href: "yunusemre@gmail.com", bg: "bg-red-500" }
            ].map(({ Icon, href, bg }, index) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 ${bg} text-white rounded-full hover:shadow-lg transition-all duration-300`}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;