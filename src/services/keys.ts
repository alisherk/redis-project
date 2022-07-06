export const pageCacheKey = (id: string) => 'pagecache#' + id;

export const userKey = (userId: string) => 'users#' + userId;

export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const itemKey = (itemId: string) => `items#${itemId}`;

export const usernameUniqueKey = () => 'usernames:unique';

export const userLikeKey = (userId: string) => `users:likes#${userId}`;



