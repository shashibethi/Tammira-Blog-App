export interface Author {
  first_name: string;
  last_name: string;
  profile_pic_url?: string;
  bio?: string;
  [key: string]: any;
}

export interface Blog {
  _id: string;
  id?: string;
  title: string;
  sub_title?: string;
  content: string;
  excerpt?: string;
  created_date?: string;
  createdAt?: string; 
  updatedAt?: string;
  author: string | Author | undefined;
  tags?: string[];
  slug?: string;
  readTime?: number;
  featured_image?: string;
  status?: 'draft' | 'published' | 'archived';
  [key: string]: any; 
}

export interface BlogResponse {
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BlogFilterParams {
  page?: number;
  limit?: number;
  tags?: string;
  search?: string;
  author?: string;
  status?: string;
}