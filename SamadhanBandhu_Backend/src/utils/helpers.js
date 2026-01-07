import { v4 as uuidv4 } from 'uuid';

export const generateId = () => uuidv4();

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...sanitized } = user;
  return sanitized;
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
