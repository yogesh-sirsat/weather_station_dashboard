export const API_KEY = process.env.REACT_APP_API_KEY;
export const MAX_RETRY_ATTEMPTS = 3;
export const MAX_REQUESTS_PER_MINUTE = 60;
export const RATE_LIMIT_BACKOFF_INTERVAL = 60 * 1000 / MAX_REQUESTS_PER_MINUTE;
export const SERVER_ERROR_BACKOFF_INTERVAL = 2000;