import { getAuthToken } from '../utils/auth';
import cfg from '../configs';

export async function login({ username, password }) {
  console.log(JSON.stringify({ username, password }));
  const response = await fetch(`${cfg.API_SERVER}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}
