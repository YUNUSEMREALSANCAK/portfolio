import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  status: 'published' | 'draft';
  content: string;
  excerpt: string;
  slug: string;
  image: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string[];
  github: string;
  live: string;
  description: string;
  image: string;
}

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'experience';
  institution?: string;
  location?: string;
}

interface Skill {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: 'frontend' | 'performance' | 'ai';
}

interface About {
  description: string;
  skills: Skill[];
}

interface AdminContextType {
  blogs: Blog[];
  projects: Project[];
  timelineItems: TimelineItem[];
  about: About;
  addBlog: (blog: Omit<Blog, 'id'>) => void;
  updateBlog: (id: number, data: Partial<Blog>) => void;
  deleteBlog: (id: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addTimelineItem: (item: Omit<TimelineItem, 'id'>) => void;
  updateTimelineItem: (id: number, data: Partial<TimelineItem>) => void;
  deleteTimelineItem: (id: number) => void;
  updateAbout: (data: Partial<About>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: number, skill: Partial<Skill>) => void;
  deleteSkill: (id: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const savedBlogs = localStorage.getItem('admin_blogs');
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('admin_projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(() => {
    const savedItems = localStorage.getItem('admin_timeline');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [about, setAbout] = useState<About>(() => {
    const savedAbout = localStorage.getItem('admin_about');
    return savedAbout ? JSON.parse(savedAbout) : {
      description: "Kullanıcı deneyimini ön planda tutan, ölçeklenebilir ve sürdürülebilir uygulamalar geliştiriyorum. Modern teknolojileri yakından takip ediyor ve projelerimde en güncel çözümleri kullanmaya özen gösteriyorum.",
      skills: [
        {
          id: 1,
          title: "Frontend",
          description: "Modern ve responsive kullanıcı arayüzleri geliştirme",
          technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
          icon: "frontend"
        },
        {
          id: 2,
          title: "Performance",
          description: "Yüksek performanslı web uygulamaları",
          technologies: ["Lazy Loading", "Code Splitting", "Caching", "CDN"],
          icon: "performance"
        },
        {
          id: 3,
          title: "AI/ML",
          description: "Yapay zeka ve makine öğrenmesi entegrasyonları",
          technologies: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
          icon: "ai"
        }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('admin_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('admin_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('admin_timeline', JSON.stringify(timelineItems));
  }, [timelineItems]);

  useEffect(() => {
    localStorage.setItem('admin_about', JSON.stringify(about));
  }, [about]);

  // Firebase'den verileri yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        // About verilerini yükle
        const aboutDoc = await getDocs(collection(db, 'about'));
        if (!aboutDoc.empty) {
          const aboutData = aboutDoc.docs[0].data();
          setAbout(aboutData as About);
        }

        // Diğer koleksiyonları yükle
        const blogsSnapshot = await getDocs(collection(db, 'blogs'));
        const blogsData = blogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogsData as Blog[]);

        // ... diğer koleksiyonlar için benzer yükleme işlemleri
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
      }
    };

    loadData();
  }, []);

  const addBlog = (blog: Omit<Blog, 'id'>) => {
    const newBlog = { ...blog, id: blogs.length + 1 };
    setBlogs(prev => [...prev, newBlog]);
  };

  const updateBlog = (id: number, data: Partial<Blog>) => {
    setBlogs(prev => prev.map(blog => blog.id === id ? { ...blog, ...data } : blog));
  };

  const deleteBlog = (id: number) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: projects.length + 1 };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: number, data: Partial<Project>) => {
    setProjects(prev => prev.map(project => project.id === id ? { ...project, ...data } : project));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addTimelineItem = (item: Omit<TimelineItem, 'id'>) => {
    const newItem = { ...item, id: timelineItems.length + 1 };
    setTimelineItems(prev => [...prev, newItem]);
  };

  const updateTimelineItem = (id: number, data: Partial<TimelineItem>) => {
    setTimelineItems(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };

  const deleteTimelineItem = (id: number) => {
    setTimelineItems(prev => prev.filter(item => item.id !== id));
  };

  // About güncelleme fonksiyonu
  const updateAbout = async (data: Partial<About>) => {
    try {
      const aboutRef = collection(db, 'about');
      const aboutDocs = await getDocs(aboutRef);
      
      if (aboutDocs.empty) {
        // Eğer about dokümanı yoksa yeni oluştur
        await addDoc(aboutRef, { ...about, ...data });
      } else {
        // Varolan dokümanı güncelle
        const docRef = doc(db, 'about', aboutDocs.docs[0].id);
        await updateDoc(docRef, data);
      }
      
      setAbout(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('About güncelleme hatası:', error);
    }
  };

  // Yetenek ekleme fonksiyonu
  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    try {
      const skillsRef = collection(db, 'skills');
      const docRef = await addDoc(skillsRef, skill);
      
      const newSkill = { ...skill, id: docRef.id };
      setAbout(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    } catch (error) {
      console.error('Yetenek ekleme hatası:', error);
    }
  };

  // Yetenek güncelleme fonksiyonu
  const updateSkill = async (id: number, skillData: Partial<Skill>) => {
    try {
      const skillRef = doc(db, 'skills', id.toString());
      await updateDoc(skillRef, skillData);
      
      setAbout(prev => ({
        ...prev,
        skills: prev.skills.map(skill => 
          skill.id === id ? { ...skill, ...skillData } : skill
        )
      }));
    } catch (error) {
      console.error('Yetenek güncelleme hatası:', error);
    }
  };

  // Yetenek silme fonksiyonu
  const deleteSkill = async (id: number) => {
    try {
      await deleteDoc(doc(db, 'skills', id.toString()));
      
      setAbout(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill.id !== id)
      }));
    } catch (error) {
      console.error('Yetenek silme hatası:', error);
    }
  };

  return (
    <AdminContext.Provider value={{
      blogs,
      projects,
      timelineItems,
      about,
      addBlog,
      updateBlog,
      deleteBlog,
      addProject,
      updateProject,
      deleteProject,
      addTimelineItem,
      updateTimelineItem,
      deleteTimelineItem,
      updateAbout,
      addSkill,
      updateSkill,
      deleteSkill
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}; 