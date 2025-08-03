'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Blog } from '../../types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        const data = await response.json();
        console.log('API Response:', data); 
        if (response.ok) {
          const blogsArray = Array.isArray(data) ? data : (data.blogs || data.data || []);
          console.log('Blogs Array:', blogsArray);
          setBlogs(blogsArray);
        } else {
          throw new Error(data.message || 'Failed to fetch blogs');
        }
      } catch (error) {
        toast.error('Error loading blogs');
        console.error('Fetch error:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-8 h-96 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Your Blog Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Edit, delete, or create new blog posts to share with your audience
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <Link
            href="/blogs/create"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-700"
          >
            <FiPlus className="mr-2" />
            Create New Blog
          </Link>
        </div>

        {!Array.isArray(blogs) || blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No blog posts yet</h3>
            <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
            <Link
              href="/blogs/create"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Create Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="relative group">
                <BlogCard blog={blog} />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => router.push(`/blogs/edit/${blog._id}`)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    aria-label="Edit blog"
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}