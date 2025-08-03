# Tammira Blog Application

A full-stack web application made for Tammira. Built with Node.js, Express, MongoDB, and Next.js 15. This application provides a comprehensive blog management system with features like tag filtering, pagination, search functionality, and a beautiful responsive interface.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and gradient backgrounds
- **Blog Management**: Create, edit, delete, and view blog posts with rich content
- **Advanced Filtering**: Filter blogs by tags with multi-select functionality
- **Search**: Real-time search through blog titles, content, and tags
- **Pagination**: Server-side pagination for optimal performance
- **State Management**: Redux Toolkit for efficient state management
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Toast Notifications**: User-friendly feedback with react-hot-toast

### Backend Features
- **RESTful API**: Clean, well-structured API endpoints
- **MongoDB Integration**: Robust data persistence with Mongoose ODM
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling with meaningful responses
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Data Seeding**: Sample data generation for development
- **Testing**: Comprehensive test suite with Jest and Supertest
- **Health Monitoring**: Health check endpoint for API status

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v7.5.0) - MongoDB object modeling
- **Express-validator** (v7.0.1) - Input validation middleware
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.3.1) - Environment configuration
- **Jest** (v29.6.2) - Testing framework
- **Supertest** (v6.3.3) - HTTP testing

### Frontend
- **Next.js** (v15.4.5) - React framework with App Router
- **React** (v18.3.1) - UI library
- **TypeScript** (v5.9.2) - Type-safe JavaScript
- **Redux Toolkit** (v2.8.2) - State management
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **React Hot Toast** (v2.5.2) - Toast notifications
- **React Icons** (v5.5.0) - Icon library
- **Axios** (v1.11.0) - HTTP client

## 📁 Project Structure

```
Tammira/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── controllers/
│   │   └── blogController.js    # Blog API logic and handlers
│   ├── middleware/
│   │   └── validation.js        # Input validation middleware
│   ├── models/
│   │   ├── blog.js             # Blog schema and model
│   │   └── user.js             # User schema and model
│   ├── routes/
│   │   └── blogs.js            # Blog API routes
│   ├── scripts/
│   │   └── seedData.js         # Database seeding script
│   ├── server.js               # Express server setup
│   ├── package.json            # Backend dependencies
│   └── local.env               # Environment variables
└── frontend/
    ├── src/
    │   ├── app/                # Next.js App Router pages
    │   │   ├── blogs/          # Blog-related pages
    │   │   │   ├── [id]/       # Individual blog page
    │   │   │   ├── edit/[id]/  # Blog editing page
    │   │   │   ├── manage/     # Blog management page
    │   │   │   └── page.tsx    # Blog listing page
    │   │   ├── manage/         # Main management page
    │   │   ├── layout.tsx      # Root layout component
    │   │   ├── page.tsx        # Home page
    │   │   └── globals.css     # Global styles
    │   ├── components/         # Reusable React components
    │   │   ├── BlogCard.tsx    # Blog card component
    │   │   ├── Footer.tsx      # Footer component
    │   │   ├── Header.tsx      # Header component
    │   │   ├── Layout.tsx      # Page layout wrapper
    │   │   ├── Pagination.tsx  # Pagination component
    │   │   └── TagFilter.tsx   # Tag filtering component
    │   ├── store/              # Redux store configuration
    │   │   ├── store.ts        # Store setup
    │   │   └── slices/
    │   │       └── blogSlice.ts # Blog state management
    │   ├── types/              # TypeScript type definitions
    │   │   └── blog.ts         # Blog-related types
    │   └── tests/              # Test files
    ├── package.json            # Frontend dependencies
    ├── next.config.js          # Next.js configuration
    ├── tailwind.config.js      # Tailwind CSS configuration
    └── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/SampleBlogs
   MONGODB_TEST_URI=mongodb://localhost:27017/SampleBlogsTest
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   ```bash
   # For local MongoDB installation
   mongod
   
   # For MongoDB as a service (Windows)
   net start MongoDB
   
   # For MongoDB as a service (macOS/Linux)
   sudo systemctl start mongod
   ```

5. **Seed the database with sample data:**
   ```bash
   node scripts/seedData.js
   ```

6. **Start the backend server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The backend API will be running on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Blogs

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/blogs` | Get paginated list of blogs | `page`, `limit`, `tags` |
| `GET` | `/blogs/:id` | Get single blog by ID | - |
| `POST` | `/blogs` | Create new blog | - |
| `PUT` | `/blogs/:id` | Update existing blog | - |

#### Query Parameters for `/blogs`
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `tags` (string): Comma-separated tags to filter by

### Frontend Tests
```bash
cd frontend
npm test

# Watch mode for development
npm run test:watch

# Type checking
npm run type-check
```

## 🎨 UI Features

### Design Highlights
- **Modern Gradient Backgrounds**: Beautiful gradient overlays and backgrounds
- **Responsive Grid Layouts**: Adaptive layouts for different screen sizes
- **Interactive Components**: Hover effects and smooth transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Scheme**: Consistent color palette with pink and purple accents
- **Cards**: Elegant blog cards with shadows and rounded corners
- **Navigation**: Intuitive navigation with breadcrumbs and back buttons

### Pages
1. **Home Page** (`/`): Hero section with featured content
2. **Blog Listing** (`/blogs`): Paginated blog list with filtering
3. **Blog Detail** (`/blogs/[id]`): Individual blog post view
4. **Blog Management** (`/manage`): Admin interface for blog management
5. **Blog Editor** (`/blogs/edit/[id]`): Blog editing interface

## ⚡ Performance Optimizations

### Backend
- **Database Indexing**: Optimized queries with proper indexing
- **Lean Queries**: Using `.lean()` for faster read operations
- **Pagination**: Server-side pagination to limit data transfer
- **Population**: Efficient population of author data

### Frontend
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component with optimization
- **State Management**: Efficient Redux state updates
- **Lazy Loading**: Component-level lazy loading
- **Caching**: Browser caching for static assets

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/SampleBlogs
MONGODB_TEST_URI=mongodb://localhost:27017/SampleBlogsTest
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Next.js Configuration
The `next.config.js` includes:
- Image optimization settings
- Remote pattern configurations for external images
- SWC minification for better performance

### Tailwind Configuration
Custom color palette and responsive breakpoints configured in `tailwind.config.js`

---