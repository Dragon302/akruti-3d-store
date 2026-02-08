// This helper picks the right URL automatically
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default BASE_URL;