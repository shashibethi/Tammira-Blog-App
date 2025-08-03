import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Blog, Author } from '@/types/blog';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogsResponse {
  blogs: Blog[];
  pagination: Pagination;
}

export interface FetchBlogsParams {
  page?: number;
  limit?: number;
  tags?: string;
}

export interface UpdateBlogParams {
  id: string;
  blogData: Partial<Blog>;
}

export interface BlogState {
  items: Blog[];
  currentBlog: Blog | null;
  pagination: Pagination;
  selectedTags: string[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

export const fetchBlogs = createAsyncThunk<BlogsResponse, FetchBlogsParams>(
  'blogs/fetchBlogs',
  async ({ page = 1, limit = 10, tags = '' } = {}) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (tags) params.append('tags', tags);

    const response = await axios.get<BlogsResponse>(`${API_BASE_URL}/blogs?${params}`);
    return response.data;
  }
);

export const fetchBlogById = createAsyncThunk<Blog, string>(
  'blogs/fetchBlogById',
  async (id: string) => {
    const response = await axios.get<Blog>(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  }
);

export const updateBlog = createAsyncThunk<Blog, UpdateBlogParams>(
  'blogs/updateBlog',
  async ({ id, blogData }: UpdateBlogParams) => {
    const response = await axios.put<{ blog: Blog }>(`${API_BASE_URL}/blogs/${id}`, blogData);
    return response.data.blog;
  }
);

const initialState: BlogState = {
  items: [],
  currentBlog: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false
  },
  selectedTags: [],
  searchQuery: '',
  loading: false,
  error: null
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.selectedTags.includes(action.payload)) {
        state.selectedTags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.selectedTags = state.selectedTags.filter((tag: string) => tag !== action.payload);
    },
    clearTags: (state) => {
      state.selectedTags = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogsResponse>) => {
        state.loading = false;
        state.items = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blogs';
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog';
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
        const index = state.items.findIndex((blog: Blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update blog';
      });
  }
});

export type NormalizedBlog = Omit<Blog, 'author'> & {
  author: Author;
};

export const normalizeBlog = (blog: Blog): NormalizedBlog => {
  const defaultAuthor: Author = {
    _id: 'unknown',
    first_name: 'Unknown',
    last_name: 'Author',
    profile_pic_url: ''
  };

  let author: Author;
  if (!blog.author) {
    author = defaultAuthor;
  } else if (typeof blog.author === 'string') {
    author = {
      ...defaultAuthor,
      _id: blog.author,
      first_name: blog.author.split(' ')[0] || 'Unknown',
      last_name: blog.author.split(' ')[1] || 'Author'
    };
  } else {
    author = blog.author;
  }

  return {
    ...blog,
    _id: blog._id,
    id: blog._id,
    created_date: blog.created_date || blog.createdAt || new Date().toISOString(),
    modified_date: blog.updatedAt,
    author
  };
};

export const {
  setSelectedTags,
  addTag,
  removeTag,
  clearTags,
  setSearchQuery,
  clearCurrentBlog,
  clearError
} = blogSlice.actions;

export default blogSlice.reducer;