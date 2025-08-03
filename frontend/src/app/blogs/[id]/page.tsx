'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { fetchBlogById, addTag } from '../../../store/slices/blogSlice';
import { Blog } from '../../../types/blog';
import { RootState, AppDispatch } from '../../../store/store';

interface Author {
  first_name: string;
  last_name: string;
  profile_pic_url?: string;
  bio?: string;
}

interface BlogWithAuthor extends Omit<Blog, 'author'> {
  sub_title?: string;
  created_date: string;
  modified_date: string;
  author?: Author;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBlog: blog, loading, error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchBlogById(params.id as string));
    }
  }, [dispatch, params.id]);

  const handleTagClick = (tag: string) => {
    dispatch(addTag(tag));
    router.push('/blogs');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              {/* Back button skeleton */}
              <div className="h-10 bg-white/60 backdrop-blur-sm rounded-full w-32 mb-8 shadow-sm"></div>
              
              {/* Title skeleton */}
              <div className="space-y-4 mb-8">
                <div className="h-12 bg-white/60 backdrop-blur-sm rounded-2xl w-3/4 shadow-sm"></div>
                <div className="h-6 bg-white/60 backdrop-blur-sm rounded-xl w-1/2 shadow-sm"></div>
              </div>
              
              {/* Meta info skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-32"></div>
                  </div>
                </div>
              </div>
              
              {/* Content skeleton */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded-full" style={{width: `${Math.random() * 30 + 70}%`}}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the blog you're looking for.
            </p>
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all blogs
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const blogWithAuthor: BlogWithAuthor = {
    ...blog,
    sub_title: (blog as any).sub_title,
    created_date: (blog as any).created_date || blog.createdAt,
    modified_date: (blog as any).modified_date || blog.createdAt,
    author: (blog as any).author && typeof (blog as any).author === 'object' 
      ? (blog as any).author as Author 
      : undefined
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <nav className="mb-8">
            <Link 
              href="/blogs" 
              className="group inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm hover:shadow-md transform hover:scale-105 font-medium text-gray-700"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All blogs
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((tag: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="group inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      #{tag}
                      <svg className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Title and Subtitle */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              {blogWithAuthor.sub_title && (
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                  {blogWithAuthor.sub_title}
                </p>
              )}
            </div>

            {/* Author and Meta Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={blogWithAuthor.author?.profile_pic_url}
                    alt={`${blogWithAuthor.author?.first_name || 'Author'} ${blogWithAuthor.author?.last_name || ''}`}
                    className="w-16 h-16 rounded-full object-cover mr-6 ring-4 ring-white shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${blogWithAuthor.author?.first_name || 'User'}+${blogWithAuthor.author?.last_name || ''}&background=3b82f6&color=fff`;
                    }}
                  />
                  <div>
                    <p className="font-bold text-lg text-gray-800 mb-2">
                      {blogWithAuthor.author?.first_name 
                        ? `${blogWithAuthor.author.first_name} ${blogWithAuthor.author.last_name || ''}`.trim()
                        : typeof blog.author === 'string' ? blog.author : 'Anonymous'
                      }
                    </p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={blogWithAuthor.created_date}>
                          {formatDate(blogWithAuthor.created_date)}
                        </time>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{blog.readTime || getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Share button */}
                <button className="p-3 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
              <div className="prose prose-lg pt-10 max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {blog.content}
                </div>
              </div>
            </div>
          </header>

          {/* Author Bio */}
          {blogWithAuthor.author?.bio && (
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100/50">
                <div className="flex items-start">
                  <img
                    src={blogWithAuthor.author.profile_pic_url}
                    alt={`${blogWithAuthor.author.first_name} ${blogWithAuthor.author.last_name || ''}`}
                    className="w-16 h-16 rounded-full object-cover mr-6 flex-shrink-0 ring-4 ring-white shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${blogWithAuthor.author?.first_name}+${blogWithAuthor.author?.last_name || ''}&background=3b82f6&color=fff`;
                    }}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      About {blogWithAuthor.author.first_name} {blogWithAuthor.author.last_name || ''}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {blogWithAuthor.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-pink-100/50">
              <div className="max-w-lg mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Enjoyed this article?
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Discover more stories from our community of writers and join the conversation.
                </p>
                <Link 
                  href="/blogs"
                  className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  <span>Explore More</span>
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}