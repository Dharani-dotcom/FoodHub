# FoodHub - Premium Food Ordering Platform

![FoodHub](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Node](https://img.shields.io/badge/Node-18%2B-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)

A production-ready, enterprise-level food ordering web application similar to Zomato, Swiggy, and Uber Eats.

## 🚀 Features

### 👥 Customer Features
- ✨ Beautiful responsive home page with modern UI
- 🏪 Restaurant listing with advanced filters
- 🔍 Food search and discovery with AI recommendations
- 🛒 Shopping cart and checkout process
- 📍 Real-time order tracking with Socket.IO
- 📜 Order history and management
- ❤️ Wishlist functionality
- 👤 User profile management with avatar upload
- 🌙 Dark mode support
- 📱 Fully responsive design (mobile, tablet, desktop)

### 🏢 Admin Features
- 📊 Comprehensive admin dashboard with analytics
- 📈 Sales and revenue analytics with charts
- 📦 Order management and tracking
- 🍔 Food and restaurant management
- 👥 User management
- 💹 Real-time charts and reports
- 📋 Coupon and offer management
- 📸 Image management with Cloudinary

### 🍽️ Restaurant Features
- 🏷️ Restaurant profiles with menu
- 🍲 Food item management
- ⭐ Rating and reviews system
- 🖼️ Gallery management
- 📅 Opening hours and delivery time
- 🚚 Delivery zones management

## 🛠 Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP Client
- **React Query (TanStack Query)** - State management
- **Framer Motion** - Animations
- **Socket.IO Client** - Real-time updates
- **React Hook Form** - Form management
- **Chart.js & Recharts** - Data visualization

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB with Mongoose** - Database
- **JWT** - Authentication
- **Socket.IO** - Real-time communication
- **Cloudinary** - Image storage and CDN
- **Bcrypt** - Password hashing
- **Nodemailer** - Email notifications
- **Helmet** - Security headers
- **Express Validator** - Input validation

### Infrastructure
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render
- **Database**: MongoDB Atlas
- **CDN/Image Storage**: Cloudinary

## 📋 Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- Cloudinary account (free tier available)
- Git

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Dharani-dotcom/FoodHub.git
cd FoodHub
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## 🌍 Environment Configuration

### Backend (.env)
Create `server/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodhub

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
JWT_REFRESH_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@foodhub.com
FROM_NAME=FoodHub

# Razorpay (Optional - payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Stripe (Optional - payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Frontend URL
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@foodhub.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ENV=development
```

## 🗄️ MongoDB Setup

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Add your IP to whitelist (or allow all: 0.0.0.0/0)
7. Paste the connection string in `.env`

## 📸 Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, and API Secret
4. Add to `.env` file

## 🏃 Running the Application

### Option 1: Run Both Frontend & Backend Together
```bash
npm run dev
```

### Option 2: Run Separately (Recommended for Development)

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```
Backend will run on: `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 🏗️ Project Structure

```
FoodHub/
├── client/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── layouts/            # Layout components
│   │   ├── hooks/              # Custom hooks
│   │   ├── context/            # React Context
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── styles/             # Global styles
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── .env                    # Environment variables
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── server/                      # Backend (Express + Node)
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── routes/             # API routes
│   │   ├── models/             # MongoDB schemas
│   │   ├── middleware/         # Express middleware
│   │   ├── validators/         # Input validation
│   │   ├── config/             # Configuration
│   │   ├── utils/              # Utility functions
│   │   ├── socket/             # Socket.IO handlers
│   │   ├── services/           # Business logic
│   │   ├── uploads/            # Upload handlers
│   │   └── server.js           # Main server file
│   ├── .env                    # Environment variables
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/avatar` - Upload avatar
- `GET /api/users/addresses` - Get saved addresses
- `POST /api/users/addresses` - Add new address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

### Restaurants
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `GET /api/restaurants/search` - Search restaurants
- `GET /api/restaurants/nearby` - Get nearby restaurants

### Foods
- `GET /api/foods` - List all foods
- `GET /api/foods/:id` - Get food details
- `GET /api/foods/search` - Search foods
- `GET /api/foods/category/:categoryId` - Get foods by category
- `GET /api/foods/trending` - Get trending foods
- `GET /api/foods/popular` - Get popular foods

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/:id/track` - Track order in real-time
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update cart item quantity
- `DELETE /api/cart/items/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear entire cart

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/food/:foodId` - Get food reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/like` - Like a review
- `POST /api/reviews/:id/replies` - Reply to review

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/:foodId` - Add to wishlist
- `DELETE /api/wishlist/:foodId` - Remove from wishlist

### Coupons & Offers
- `GET /api/coupons` - Get available coupons
- `POST /api/coupons/validate` - Validate coupon code
- `GET /api/offers` - Get available offers

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Payment history

### Admin Dashboard
- `GET /api/admin/dashboard` - Dashboard overview
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/orders` - All orders
- `GET /api/admin/users` - All users
- `GET /api/admin/restaurants` - All restaurants
- `GET /api/admin/foods` - All foods
- `GET /api/admin/reviews` - All reviews
- `PUT /api/admin/foods/:id` - Update food
- `DELETE /api/admin/foods/:id` - Delete food
- `PUT /api/admin/restaurants/:id/status` - Update restaurant status

## 🔒 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Bcrypt password hashing
- ✅ HTTP-only secure cookies
- ✅ CORS protection
- ✅ Helmet.js for security headers
- ✅ Rate limiting
- ✅ Input validation and sanitization
- ✅ Role-based access control (RBAC)
- ✅ Environment variable encryption
- ✅ SQL/NoSQL injection prevention
- ✅ XSS protection

## 📦 Production Build

### Frontend Build
```bash
cd client
npm run build
```
Output: `client/dist/`

### Backend Build
```bash
cd server
npm run build
```

## 🚀 Deployment

### Deploy Frontend to Vercel
```bash
cd client
npm install -g vercel
vercel --prod
```

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create New → Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

### Set MongoDB Connection
1. Add MongoDB Atlas IP whitelist in Render settings
2. Use MongoDB connection string in environment variables

## 📊 Database Models

- **User** - Customer and admin accounts
- **Restaurant** - Restaurant profiles
- **Food** - Food items
- **Category** - Food categories
- **Order** - Customer orders
- **OrderItem** - Items in orders
- **Cart** - Shopping carts
- **CartItem** - Items in carts
- **Review** - Food/restaurant reviews
- **Wishlist** - Saved favorite foods
- **Coupon** - Discount coupons
- **Address** - Delivery addresses
- **Notification** - User notifications
- **Analytics** - Sales and order analytics

## 🐛 Troubleshooting

### MongoDB Connection Error
```
ERROR: connect ECONNREFUSED
```
**Solution:**
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct credentials
- Add your IP: https://www.whatsmyipaddress.com/

### Cloudinary Upload Failed
```
ERROR: Invalid credentials
```
**Solution:**
- Verify Cloudinary credentials in `.env`
- Check API Key and Secret
- Ensure CORS is enabled

### Socket.IO Connection Failed
```
ERROR: Failed to connect to socket server
```
**Solution:**
- Check backend is running on port 5000
- Verify CORS settings in `server/config/socket.js`
- Clear browser cache
- Restart backend server

### CORS Error
```
ERROR: Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Verify `CLIENT_URL` in `.env`
- Check CORS configuration in Express
- Ensure frontend URL matches CORS whitelist

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Dharani** - Full Stack Software Engineer

- GitHub: [@Dharani-dotcom](https://github.com/Dharani-dotcom)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Email: support@foodhub.com

## 🎯 Roadmap

- [ ] AI-powered food recommendations
- [ ] Advanced analytics dashboard
- [ ] Restaurant app for order management
- [ ] Delivery partner app
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Loyalty program and rewards
- [ ] Multi-language support
- [ ] PWA and offline support
- [ ] Advanced search with filters
- [ ] Real-time notifications

---

**Made with ❤️ by Dharani**
