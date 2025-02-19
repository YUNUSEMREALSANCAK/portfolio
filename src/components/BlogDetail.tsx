import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Modern Web Development Best Practices',
    slug: 'modern-web-development-best-practices',
    content: `
      <h2>Modern Web Geliştirme Süreçleri</h2>
      <p>Modern web geliştirme süreçlerinde dikkat edilmesi gereken birçok önemli nokta bulunmaktadır. Bu yazıda, günümüz web geliştirme dünyasındaki en iyi uygulamaları ve yaklaşımları inceleyeceğiz.</p>
      
      <h3>1. Performans Optimizasyonu</h3>
      <p>Web uygulamalarında performans, kullanıcı deneyimini doğrudan etkileyen en önemli faktörlerden biridir. Modern web uygulamalarında şu performans optimizasyonları mutlaka yapılmalıdır:</p>
      <ul>
        <li>Kod bölme (Code splitting)</li>
        <li>Lazy loading</li>
        <li>Image optimization</li>
        <li>Caching stratejileri</li>
      </ul>

      <h3>2. Modern Framework Kullanımı</h3>
      <p>Günümüzde React, Vue, Angular gibi modern framework'ler web geliştirme süreçlerini önemli ölçüde kolaylaştırmaktadır. Bu framework'lerin sunduğu avantajlar:</p>
      <ul>
        <li>Komponent bazlı geliştirme</li>
        <li>Virtual DOM</li>
        <li>State management</li>
        <li>Hot reloading</li>
      </ul>

      <h3>3. Güvenlik Önlemleri</h3>
      <p>Web uygulamalarında güvenlik her zaman öncelikli konulardan biridir. Temel güvenlik önlemleri:</p>
      <ul>
        <li>XSS koruması</li>
        <li>CSRF tokenları</li>
        <li>Input validasyonu</li>
        <li>Güvenli authentication</li>
      </ul>
    `,
    author: 'Yunus Emre Alsancak',
    date: '15 Mart 2024',
    readTime: '8 dk',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Microservices Architecture Deep Dive',
    slug: 'microservices-architecture-deep-dive',
    content: `
      <h2>Mikroservis Mimarisi Derinlemesine İnceleme</h2>
      <p>Mikroservis mimarisi, modern yazılım geliştirme dünyasının en popüler konularından biri. Bu yazıda, mikroservis mimarisinin temellerini ve uygulama sürecindeki önemli noktaları inceleyeceğiz.</p>

      <h3>1. Mikroservis Nedir?</h3>
      <p>Mikroservisler, büyük ve karmaşık uygulamaları daha küçük, bağımsız servislere bölerek yönetmeyi sağlayan bir mimari yaklaşımdır. Her bir servis:</p>
      <ul>
        <li>Bağımsız deploy edilebilir</li>
        <li>Farklı teknolojilerle geliştirilebilir</li>
        <li>Kendi veritabanını yönetebilir</li>
        <li>Ölçeklendirilebilir</li>
      </ul>

      <h3>2. Mikroservis Avantajları</h3>
      <p>Mikroservis mimarisinin başlıca avantajları şunlardır:</p>
      <ul>
        <li>Yüksek ölçeklenebilirlik</li>
        <li>Teknoloji bağımsızlığı</li>
        <li>Hızlı geliştirme ve deployment</li>
        <li>İzole hata yönetimi</li>
      </ul>

      <h3>3. Zorluklar ve Çözümler</h3>
      <p>Mikroservis mimarisinde karşılaşılan zorluklar ve çözüm önerileri:</p>
      <ul>
        <li>Servisler arası iletişim - API Gateway kullanımı</li>
        <li>Veri tutarlılığı - Saga pattern</li>
        <li>Monitoring - Distributed tracing</li>
        <li>Service discovery - Service mesh</li>
      </ul>
    `,
    author: 'Yunus Emre Alsancak',
    date: '10 Mart 2024',
    readTime: '10 dk',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'The Future of AI in Software Development',
    slug: 'future-of-ai-in-software-development',
    content: `
      <h2>Yazılım Geliştirmede Yapay Zeka'nın Geleceği</h2>
      <p>Yapay zeka teknolojileri, yazılım geliştirme süreçlerini hızla değiştiriyor. Bu yazıda, AI'ın yazılım geliştirme üzerindeki etkilerini ve gelecekte bizi bekleyen değişimleri inceleyeceğiz.</p>

      <h3>1. Kod Üretimi ve AI</h3>
      <p>AI destekli kod üretimi araçları giderek daha yetenekli hale geliyor:</p>
      <ul>
        <li>GitHub Copilot gibi AI pair programming araçları</li>
        <li>Otomatik kod optimizasyonu</li>
        <li>Bug tahmin ve tespit sistemleri</li>
        <li>Kod review asistanları</li>
      </ul>

      <h3>2. AI Destekli Geliştirme Araçları</h3>
      <p>Günümüzde kullanılan ve geliştirilmekte olan AI destekli araçlar:</p>
      <ul>
        <li>Akıllı kod tamamlama</li>
        <li>Otomatik test üretimi</li>
        <li>Performans optimizasyonu</li>
        <li>Güvenlik açığı tespiti</li>
      </ul>

      <h3>3. Geleceğe Bakış</h3>
      <p>Yazılım geliştirmede AI'ın gelecekteki rolü:</p>
      <ul>
        <li>Low-code/No-code platformların yaygınlaşması</li>
        <li>Otomatik kod dönüşümü ve modernizasyonu</li>
        <li>Doğal dil ile programlama</li>
        <li>AI destekli proje yönetimi</li>
      </ul>
    `,
    author: 'Yunus Emre Alsancak',
    date: '5 Mart 2024',
    readTime: '12 dk',
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  }
];

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog yazısı bulunamadı
          </h2>
          <Link
            to="/#blog"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/#blog"
          className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Blog'a Dön
        </Link>

        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            {post.date}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            {post.readTime}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Tag className="w-4 h-4 mr-2" />
            {post.category}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
              alt={post.author}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.author}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yazılım Mühendisi & Full Stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail; 