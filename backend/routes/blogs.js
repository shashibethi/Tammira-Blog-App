const express = require('express');
const router = express.Router();
const { 
  getBlogs, 
  getBlogById, 
  updateBlog, 
  createBlog,
  deleteBlog
} = require('../controllers/blogController');
const { 
  validateBlogCreation, 
  validateBlogUpdate 
} = require('../middleware/validation');

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', validateBlogCreation, createBlog);
router.put('/:id', validateBlogUpdate, updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;