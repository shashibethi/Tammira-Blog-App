'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import { fetchBlogs } from '../store/slices/blogSlice';
import { Blog } from '../types/blog';
import { RootState, AppDispatch } from '../store/store';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: blogs, loading, error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, limit: 6 }));
  }, [dispatch]);

  const featuredBlogs = blogs.slice(0, 3);
  const recentBlogs = blogs.slice(3, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-blue-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="absolute top-32 right-20 text-pink-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-32 text-purple-300">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 flex items-center min-h-screen">
          <div className="w-full">
            <div className="text-center mb-16">

              <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-800">
                BlogApp
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A comprehensive full-stack blog application showcasing modern web development with
                Next.js, Node.js, MongoDB, and Redux state management.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center px-10 py-4 border-2 border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span>Explore Blogs</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap justify-center gap-4">
                {['Next.js', 'Node.js', 'MongoDB', 'Redux', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-sm font-medium text-gray-700 hover:bg-white/80 transition-all cursor-default shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 left-1/4 w-24 h-24 bg-pink-200/30 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-blue-200/30 rounded-full blur-lg"></div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Featured Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest insights and knowledge from our community of writers
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200 border-t-pink-500"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-pink-300 animate-pulse"></div>
              </div>
              <span className="text-gray-600 font-medium text-lg">Loading amazing content...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-600 font-medium text-lg mb-6">Error loading blogs: {error}</p>
              <button
                onClick={() => dispatch(fetchBlogs({ page: 1, limit: 6 }))}
                className="px-8 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredBlogs.map((blog: Blog) => (
                <BlogCard
                  key={blog._id}
                  blog={{
                    ...blog,
                    created_date: blog.createdAt || new Date().toISOString(),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Blogs Section */}
      {recentBlogs.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-5xl font-bold text-gray-800">Latest Posts</h2>
              <Link
                href="/blogs"
                className="group text-pink-500 hover:text-pink-600 font-semibold flex items-center text-xl"
              >
                View all posts
                <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((blog: Blog) => (
                <BlogCard
                  key={blog._id}
                  blog={{
                    ...blog,
                    created_date: blog.createdAt || new Date().toISOString(),
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Demo Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Assignment Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This application demonstrates the required functionality for the full-stack blog development test
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg border border-blue-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Paginated Blog Listing</h3>
              <p className="text-gray-600 leading-relaxed">Browse through blogs with efficient pagination implementation using query parameters and smooth navigation.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-lg border border-purple-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tag-Based Filtering</h3>
              <p className="text-gray-600 leading-relaxed">Filter and discover content by tags with dynamic API calls and seamless user experience.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 shadow-lg border border-pink-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Redux State Management</h3>
              <p className="text-gray-600 leading-relaxed">Centralized state management with Redux for scalable and maintainable application architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-10 py-4 border-2 border-white text-xl font-semibold rounded-full text-white hover:bg-white hover:text-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Start Reading
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}