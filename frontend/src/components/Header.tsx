
import Link from 'next/link';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/slices/blogSlice';
import { RootState, AppDispatch } from '../store/store';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.blogs.searchQuery);
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50/95 via-purple-50/95 to-pink-50/95 backdrop-blur-lg border-b border-white/30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 bg-gradient-to-r from-pink-400 to-purple-500 px-3 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <img 
                  src="https://tammira.com/images/Tammira-Logo-White.png" 
                  alt="Tammira Logo" 
                  className="h-4 w-auto filter brightness-0 invert"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
              </div>

            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link 
              href="/" 
              className="group relative text-gray-700 hover:text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:bg-white/60 backdrop-blur-sm"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/blogs" 
              className="group relative text-gray-700 hover:text-gray-900 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:bg-white/60 backdrop-blur-sm"
            >
              <span className="relative z-10">All Blogs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <input
                type="text"
                placeholder="Search for Tammira blogs..."
                value={localSearch}
                onChange={handleInputChange}
                className="relative w-full px-6 py-4 pr-14 text-sm bg-white/80 backdrop-blur-sm border border-white/60 rounded-full focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300/50 focus:bg-white/90 placeholder-gray-500 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02]"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-5 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group-hover:rotate-12">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </button>
            </form>
          </div>

          {/* Desktop Edit Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/blogs/manage"
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Blog Update Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative bg-white/70 backdrop-blur-sm inline-flex items-center justify-center p-3 rounded-2xl text-gray-600 hover:text-gray-900 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2.5" 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-6 space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl mx-4 mb-4 shadow-xl border border-white/50">
              <Link 
                href="/" 
                className="group flex items-center text-gray-700 hover:text-gray-900 hover:bg-white/70 px-5 py-4 rounded-xl text-base font-medium transition-all backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link 
                href="/blogs" 
                className="group flex items-center text-gray-700 hover:text-gray-900 hover:bg-white/70 px-5 py-4 rounded-xl text-base font-medium transition-all backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                All Blogs
              </Link>
              
              {/* Mobile Search */}
              <div className="pt-2">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={localSearch}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 pr-14 text-sm bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl focus:ring-2 focus:ring-pink-300/50 focus:border-pink-300/50 focus:bg-white/90 placeholder-gray-500 text-gray-700 shadow-lg transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;