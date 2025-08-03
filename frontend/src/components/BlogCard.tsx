import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addTag } from '../store/slices/blogSlice';
import { ReactNode } from 'react';
import { Blog, Author } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const dispatch = useDispatch();

  const handleTagClick = (tag: string) => {
    dispatch(addTag(tag));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, limit: number = 150): string => {
    if (content.length <= limit) return content;
    return content.substring(0, limit).trim() + '...';
  };

  // Helper function to get author name
  const getAuthorName = (): string => {
    if (!blog.author) return 'Unknown Author';
    if (typeof blog.author === 'string') return blog.author;
    return `${blog.author.first_name} ${blog.author.last_name}`;
  };

  // Helper function to get author avatar
  const getAuthorAvatar = (): string => {
    if (!blog.author) return '';
    if (typeof blog.author === 'string') {
      return `https://ui-avatars.com/api/?name=${blog.author}&background=gradient&color=fff`;
    }
    return blog.author.profile_pic_url || 
           `https://ui-avatars.com/api/?name=${blog.author.first_name}+${blog.author.last_name}&background=gradient&color=fff`;
  };

  return (
    <article className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-2xl hover:bg-white/80 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      <div className="p-8">
        {/* Author Section */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={getAuthorAvatar()}
              alt={getAuthorName()}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 group-hover:ring-pink-200 transition-all duration-300"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.src = '';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold text-gray-800">
              {getAuthorName()}
            </p>
            <p className="text-xs text-gray-500 flex items-center">
              <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(blog.created_date || blog.createdAt || new Date().toISOString())}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-6">
          <Link href={`/blogs/${blog._id}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 cursor-pointer leading-tight">
              {blog.title}
            </h2>
          </Link>
          
          {blog.sub_title && (
            <p className="text-gray-600 text-base mb-4 font-medium leading-relaxed">
              {blog.sub_title}
            </p>
          )}
          
          <p className="text-gray-700 leading-relaxed text-sm">
            {truncateContent(blog.content)}
          </p>
        </div>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className="inline-block px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-pink-400 to-purple-500 rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                #{tag}
              </button>
            ))}
            {blog.tags.length > 3 && (
              <span className="inline-block px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Section */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Link 
            href={`/blogs/${blog._id}`}
            className="group/link inline-flex items-center text-pink-500 text-sm font-semibold hover:text-purple-600 transition-all duration-300"
          >
            Read more
            <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {Math.ceil(blog.content.length / 200)} min read
          </div>
        </div>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
    </article>
  );
};

export default BlogCard;