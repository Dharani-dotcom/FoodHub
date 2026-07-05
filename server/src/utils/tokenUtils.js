import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (id, role = 'customer', expiresIn = process.env.JWT_EXPIRE) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Generate Refresh Token
export const generateRefreshToken = (id, expiresIn = process.env.JWT_REFRESH_EXPIRE) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn }
  );
};

// Verify Token
export const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

// Generate Reset Token (short-lived)
export const generateResetToken = () => {
  return require('crypto').randomBytes(32).toString('hex');
};
