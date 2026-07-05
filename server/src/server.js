import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Import database connection
import connectDB from './src/config/database.js';

// Import routes
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/users.js';
import restaurantRoutes from './src/routes/restaurants.js';
import foodRoutes from './src/routes/foods.js';
import categoryRoutes from './src/routes/categories.js';
import orderRoutes from './src/routes/orders.js';
import cartRoutes from './src/routes/cart.js';
import reviewRoutes from './src/routes/reviews.js';
import wishlistRoutes from './src/routes/wishlist.js';
import couponRoutes from './src/routes/coupons.js';
import adminRoutes from './src/routes/admin.js';
import uploadRoutes from './src/routes/uploads.js';

// Import middleware
import { errorHandler } from './src/middleware/errorHandler.js';

// Import Socket.IO handlers
import { setupSocket } from './src/socket/socketHandler.js';

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// ============= MIDDLEWARE =============

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Socket.IO Setup
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }
});

// Setup Socket.IO event handlers
setupSocket(io);

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ============= ROUTES =============

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FoodHub API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler Middleware
app.use(errorHandler);

// ============= START SERVER =============

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 FoodHub API Server Running on Port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`${'='.repeat(50)}\n`);
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});

export default app;
