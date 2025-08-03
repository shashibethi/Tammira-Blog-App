import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BlogCard from '../BlogCard';
import blogReducer from '../../store/slices/blogSlice';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockStore = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

const mockBlog = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Test Blog Title',
  sub_title: 'Test Blog Subtitle',
  content: 'This is a test blog content that should be long enough to demonstrate the truncation feature of the blog card component.',
  slug: 'test-blog-title',
  tags: ['javascript', 'react', 'testing'],
  created_date: '2025-01-30T12:00:00Z',
  modified_date: '2025-01-30T14:00:00Z',
  author: {
    _id: '507f1f77bcf86cd799439012',
    first_name: 'John',
    last_name: 'Doe',
    bio: 'Software engineer and writer.',
    profile_pic_url: 'https://example.com/john_doe.jpg'
  }
};

const renderWithProvider = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('BlogCard Component', () => {
  test('renders blog title and subtitle', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Subtitle')).toBeInTheDocument();
  });

  test('renders author information', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  test('renders tags and handles tag clicks', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#testing')).toBeInTheDocument();

    const tagButton = screen.getByText('#javascript');
    fireEvent.click(tagButton);
    
  });

  test('truncates long content', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    const contentElement = screen.getByText(/This is a test blog content/);
    expect(contentElement.textContent).toContain('...');
  });

  test('displays formatted date', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    expect(screen.getByText('January 30, 2025')).toBeInTheDocument();
  });

  test('calculates reading time', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    expect(screen.getByText(/min read/)).toBeInTheDocument();
  });

  test('handles missing author profile picture', () => {
    const blogWithoutPic = {
      ...mockBlog,
      author: {
        ...mockBlog.author,
        profile_pic_url: ''
      }
    };

    renderWithProvider(<BlogCard blog={blogWithoutPic} />);
    
    const authorImage = screen.getByAltText('John Doe');
    
    fireEvent.error(authorImage);
    
    expect(authorImage.src).toContain('ui-avatars.com');
  });

  test('renders read more link', () => {
    renderWithProvider(<BlogCard blog={mockBlog} />);
    
    const readMoreLink = screen.getByText('Read more →');
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink.closest('a')).toHaveAttribute('href', '/blogs/507f1f77bcf86cd799439011');
  });
});