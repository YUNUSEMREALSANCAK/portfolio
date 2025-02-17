export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  company?: string;
}