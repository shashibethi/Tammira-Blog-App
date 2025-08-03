#!/bin/bash

# Tammira Blog Application Deployment Script

echo "🚀 Starting deployment process..."

# Backend deployment to Railway
echo "📦 Deploying backend to Railway..."
cd backend
npm install --production
echo "✅ Backend dependencies installed"

# Frontend deployment to Vercel
echo "🎨 Deploying frontend to Vercel..."
cd ../frontend
npm install
npm run build
echo "✅ Frontend built successfully"

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push changes to GitHub: git push origin main"
echo "2. Railway will auto-deploy backend"
echo "3. Vercel will auto-deploy frontend"
echo "4. Update environment variables in both platforms"
echo "5. Seed production database: node scripts/seedData.js"
