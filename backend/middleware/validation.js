const { body } = require('express-validator');

const validateBlogCreation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must not exceed 200 characters'),
    
  body('sub_title')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Subtitle must not exceed 300 characters'),
    
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
    
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Each tag must not be empty'),
    
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isMongoId()
    .withMessage('Author must be a valid MongoDB ObjectId'),
    
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
];

const validateBlogUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title must not exceed 200 characters'),
    
  body('sub_title')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Subtitle must not exceed 300 characters'),
    
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty'),
    
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
    
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Each tag must not be empty'),
    
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
];

module.exports = {
  validateBlogCreation,
  validateBlogUpdate
};