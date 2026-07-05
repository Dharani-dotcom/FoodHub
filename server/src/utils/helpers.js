// API Response Helper
export const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    ...(data && { data })
  });
};

// Pagination Helper
export const getPagination = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

// Filter Helper
export const buildFilter = (filters) => {
  const query = {};

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  if (filters.rating) {
    query.rating = { $gte: filters.rating };
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.isVeg !== undefined) {
    query.isVeg = filters.isVeg;
  }

  if (filters.isAvailable !== undefined) {
    query.isAvailable = filters.isAvailable;
  }

  return query;
};

// Sort Helper
export const buildSort = (sortBy) => {
  const sortMap = {
    'price_asc': { price: 1 },
    'price_desc': { price: -1 },
    'rating': { rating: -1 },
    'newest': { createdAt: -1 },
    'popular': { orderCount: -1 }
  };

  return sortMap[sortBy] || { createdAt: -1 };
};
