import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68f7be9e1fd9a1ac923b9856", 
  requiresAuth: true // Ensure authentication is required for all operations
});
