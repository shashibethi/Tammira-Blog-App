const Blog = require('../models/blog');
const User = require('../models/user');
const { validationResult } = require('express-validator');

// Get blogs with pagination and tag filtering
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tags = req.query.tags;
    
    // Build query object
    let query = { status: 'published' };
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute query with population
    const blogs = await Blog.find(query)
      .populate('author', 'first_name last_name bio profile_pic_url')
      .sort({ created_date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination info
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    // Response object
    const response = {
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blogs',
      message: error.message 
    });
  }
};

// Get single blog by ID or slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    let blog = await Blog.findById(id).populate('author', 'first_name last_name bio profile_pic_url');
    
    if (!blog) {
      blog = await Blog.findOne({ slug: id }).populate('author', 'first_name last_name bio profile_pic_url');
    }

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blog',
      message: error.message 
    });
  }
};

// Update blog by ID
const updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Generate new slug if title is being updated
    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    const blog = await Blog.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('author', 'first_name last_name bio profile_pic_url');

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate slug error',
        message: 'A blog with this slug already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to update blog',
      message: error.message 
    });
  }
};

// Create new blog
const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array() 
      });
    }

    const blogData = req.body;

    // Generate slug from title
    if (blogData.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    // Set creation date
    blogData.created_date = new Date();
    blogData.modified_date = new Date();

    const blog = new Blog(blogData);
    await blog.save();

    // Populate author data
    await blog.populate('author', 'first_name last_name bio profile_pic_url');

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate slug error',
        message: 'A blog with this slug already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create blog',
      message: error.message 
    });
  }
};

// Delete blog by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({
      message: 'Blog deleted successfully',
      blog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ 
      error: 'Failed to delete blog',
      message: error.message 
    });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  updateBlog,
  createBlog,
  deleteBlog
};