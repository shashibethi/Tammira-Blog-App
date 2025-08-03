'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../../components/BlogCard';
import TagFilter from '../../components/TagFilter';
import Pagination from '../../components/Pagination';
import { fetchBlogs } from '../../store/slices/blogSlice';
import { Blog } from '../../types/blog';
import { RootState, AppDispatch } from '../../store/store';

export default function BlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: blogs, pagination, selectedTags, searchQuery, loading, error } = useSelector((state: RootState) => state.blogs);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const availableTags = blogs.reduce((tags: string[], blog: Blog) => {
    if (blog.tags) {
      tags.push(...blog.tags);
    }
    return tags;
  }, []);

  useEffect(() => {
    const tagsString = selectedTags.join(',');
    dispatch(fetchBlogs({ 
      page: currentPage, 
      limit: 6, 
      tags: tagsString 
    }));
  }, [dispatch, currentPage, selectedTags]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBlogs = blogs.filter((blog: Blog) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt?.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      blog.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 py-10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-blue-300/40">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-20 text-pink-300/40">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-10 left-1/4 text-purple-300/40">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-5xl font-bold text-gray-800 mb-6">
            All Blogs
          </h1>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-20 left-1/3 w-16 h-16 bg-pink-200/30 rounded-full blur-lg"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <TagFilter availableTags={availableTags} />
            
            {/* Enhanced Statistics Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-100/50 p-8 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Statistics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Total Blogs:</span>
                  <span className="font-bold text-blue-600 text-lg">{pagination.totalBlogs}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Current Page:</span>
                  <span className="font-bold text-purple-600 text-lg">{pagination.currentPage}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Available Tags:</span>
                  <span className="font-bold text-pink-600 text-lg">{[...new Set(availableTags)].length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative mb-8">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200 border-t-pink-500"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-purple-300 animate-pulse"></div>
                </div>
                <span className="text-gray-600 font-medium text-lg">Loading amazing content...</span>
              </div>
            )}

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-8 mb-8 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Error loading blogs</h3>
                    <p className="text-red-700 font-medium">{error}</p>
                    <button 
                      onClick={() => dispatch(fetchBlogs({ page: currentPage, limit: 6 }))}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all transform hover:scale-105 shadow-md"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Blogs grid */}
            {!loading && !error && (
              <>
                {searchQuery && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-3xl shadow-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-blue-800 font-semibold">
                        Showing results for: <strong className="text-purple-600">"{searchQuery}"</strong>
                        {filteredBlogs.length === 0 && " (No results found)"}
                      </p>
                    </div>
                  </div>
                )}

                {selectedTags.length > 0 && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-3xl shadow-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <p className="text-pink-800 font-semibold">
                        Filtered by tags: <span className="text-purple-600 font-bold">{selectedTags.map((tag: string) => `#${tag}`).join(', ')}</span>
                      </p>
                    </div>
                  </div>
                )}

                {filteredBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {filteredBlogs.map((blog: Blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No blogs found</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      {searchQuery || selectedTags.length > 0 
                        ? 'Try adjusting your search criteria or removing some filters to discover more content.'
                        : 'No blogs have been published yet. Check back soon for amazing content!'}
                    </p>
                    {(searchQuery || selectedTags.length > 0) && (
                      <button
                        onClick={() => {
                          window.location.reload();
                        }}
                        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {!searchQuery && filteredBlogs.length > 0 && (
                  <Pagination 
                    pagination={pagination} 
                    onPageChange={handlePageChange} 
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}