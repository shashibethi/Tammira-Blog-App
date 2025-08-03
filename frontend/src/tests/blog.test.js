const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');
const Blog = require('../models/blog');


const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/SampleBlogsTest';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Blog API', () => {
  let testUser;
  let testBlog;

  beforeEach(async () => {
    testUser = await User.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      bio: 'Test user bio'
    });

    testBlog = await Blog.create({
      title: 'Test Blog Title',
      sub_title: 'Test subtitle',
      content: 'This is test blog content with enough text to be meaningful.',
      slug: 'test-blog-title',
      tags: ['test', 'javascript'],
      author: testUser._id
    });
  });

  describe('GET /api/blogs', () => {
    test('should return paginated blogs', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .expect(200);

      expect(response.body).toHaveProperty('blogs');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.blogs).toHaveLength(1);
      expect(response.body.blogs[0].title).toBe('Test Blog Title');
      expect(response.body.blogs[0].author.first_name).toBe('Test');
    });

    test('should filter blogs by tags', async () => {
      await Blog.create({
        title: 'Another Blog',
        content: 'Another blog content',
        slug: 'another-blog',
        tags: ['react', 'frontend'],
        author: testUser._id
      });

      const response = await request(app)
        .get('/api/blogs?tags=javascript')
        .expect(200);

      expect(response.body.blogs).toHaveLength(1);
      expect(response.body.blogs[0].tags).toContain('javascript');
    });

    test('should handle pagination correctly', async () => {
      for (let i = 0; i < 5; i++) {
        await Blog.create({
          title: `Blog ${i}`,
          content: `Content for blog ${i}`,
          slug: `blog-${i}`,
          tags: ['test'],
          author: testUser._id
        });
      }

      const response = await request(app)
        .get('/api/blogs?page=1&limit=3')
        .expect(200);

      expect(response.body.blogs).toHaveLength(3);
      expect(response.body.pagination.currentPage).toBe(1);
      expect(response.body.pagination.totalPages).toBe(2);
    });
  });

  describe('GET /api/blogs/:id', () => {
    test('should return a single blog by ID', async () => {
      const response = await request(app)
        .get(`/api/blogs/${testBlog._id}`)
        .expect(200);

      expect(response.body.title).toBe('Test Blog Title');
      expect(response.body.author.first_name).toBe('Test');
    });

    test('should return a single blog by slug', async () => {
      const response = await request(app)
        .get(`/api/blogs/${testBlog.slug}`)
        .expect(200);

      expect(response.body.title).toBe('Test Blog Title');
    });

    test('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/blogs/${fakeId}`)
        .expect(404);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    test('should update a blog successfully', async () => {
      const updateData = {
        title: 'Updated Blog Title',
        content: 'Updated content'
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.blog.title).toBe('Updated Blog Title');
      expect(response.body.blog.content).toBe('Updated content');
      expect(response.body.blog.slug).toBe('updated-blog-title');
    });

    test('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/blogs/${fakeId}`)
        .send({ title: 'Updated' })
        .expect(404);
    });

    test('should validate update data', async () => {
      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .send({ title: '' })
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('POST /api/blogs', () => {
    test('should create a new blog successfully', async () => {
      const newBlog = {
        title: 'New Blog Post',
        sub_title: 'A new blog subtitle',
        content: 'This is the content of the new blog post.',
        tags: ['new', 'blog'],
        author: testUser._id
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(201);

      expect(response.body.blog.title).toBe('New Blog Post');
      expect(response.body.blog.slug).toBe('new-blog-post');
      expect(response.body.blog.author._id).toBe(testUser._id.toString());
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/blogs')
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });
});