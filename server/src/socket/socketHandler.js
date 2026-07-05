// Socket.IO Event Handlers
export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`\n👤 User connected: ${socket.id}`);

    // Join room for real-time order updates
    socket.on('join_order_room', (orderId) => {
      socket.join(`order_${orderId}`);
      console.log(`📦 User joined order room: order_${orderId}`);
    });

    // Leave order room
    socket.on('leave_order_room', (orderId) => {
      socket.leave(`order_${orderId}`);
      console.log(`👋 User left order room: order_${orderId}`);
    });

    // Admin notifications room
    socket.on('join_admin', () => {
      socket.join('admin_notifications');
      console.log(`👨‍💼 Admin connected for notifications`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`\n❌ User disconnected: ${socket.id}`);
    });
  });
};

// Emit order status update to clients
export const emitOrderStatusUpdate = (io, orderId, status, orderData) => {
  io.to(`order_${orderId}`).emit('order_status_updated', {
    orderId,
    status,
    timestamp: new Date(),
    data: orderData
  });
};

// Emit new order notification to admins
export const emitNewOrderNotification = (io, orderData) => {
  io.to('admin_notifications').emit('new_order_received', {
    orderId: orderData._id,
    restaurantId: orderData.restaurantId,
    totalAmount: orderData.totalAmount,
    timestamp: new Date(),
    data: orderData
  });
};

// Emit notification to user
export const emitNotification = (io, userId, notification) => {
  io.to(`user_${userId}`).emit('notification', {
    ...notification,
    timestamp: new Date()
  });
};
