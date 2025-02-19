import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Check, X, Plus, Trash2, Code2, Zap, Brain } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const SkillIcon = ({ type }: { type: 'frontend' | 'performance' | 'ai' }) => {
  switch (type) {
    case 'frontend':
      return <Code2 className="w-6 h-6 text-violet-500" />;
    case 'performance':
      return <Zap className="w-6 h-6 text-yellow-500" />;
    case 'ai':
      return <Brain className="w-6 h-6 text-purple-500" />;
    default:
      return null;
  }
};

const AdminAbout = () => {
  const { about, updateAbout, addSkill, updateSkill, deleteSkill } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(about?.description || '');
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState(false);

  console.log('About data:', about); // Debug için

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout({ description });
    setIsEditing(false);
  };

  const handleSkillSubmit = (e: React.FormEvent, id?: number) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const skillData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      icon: formData.get('icon') as 'frontend' | 'performance' | 'ai'
    };

    if (id) {
      updateSkill(id, skillData);
    } else {
      addSkill(skillData);
    }
    
    setEditingSkill(null);
    setNewSkill(false);
  };

  // Basit bir yükleme kontrolü
  if (!about) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600 dark:text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Başlık */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hakkımda Sayfası Yönetimi
        </h1>
      </div>

      {/* Ana İçerik Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Kolon - Hakkımda Metni */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Hakkımda Metni
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Düzenle
              </button>
            )}
          </div>
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateAbout({ description });
                setIsEditing(false);
              }}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Hakkımda metni..."
                />
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setDescription(about.description);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Kaydet
                  </button>
                </div>
              </form>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  {about.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Kolon - Yetenekler */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Yetenekler
            </h2>
            <button
              onClick={() => setNewSkill(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Yetenek
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {newSkill && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <form onSubmit={(e) => handleSkillSubmit(e)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Başlık
                        </label>
                        <input
                          name="title"
                          placeholder="Örn: Frontend"
                          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          İkon Tipi
                        </label>
                        <select
                          name="icon"
                          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                          required
                        >
                          <option value="frontend">Frontend</option>
                          <option value="performance">Performance</option>
                          <option value="ai">AI/ML</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Açıklama
                        </label>
                        <input
                          name="description"
                          placeholder="Yetenek açıklaması"
                          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teknolojiler
                        </label>
                        <input
                          name="technologies"
                          placeholder="React, TypeScript, Next.js (virgülle ayırın)"
                          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setNewSkill(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                      >
                        Kaydet
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {about.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-violet-300 dark:hover:border-violet-500 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <SkillIcon type={skill.icon} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {skill.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => setEditingSkill(skill.id)}
                        className="p-1 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout; 