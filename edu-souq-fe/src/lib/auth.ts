// Token storage key
const TOKEN_KEY = 'edu_souq_token';

// Store the JWT token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Retrieve the JWT token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove the JWT token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};