import { redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import cfg from '../configs';

export async function getRequestLogs(username, page, size) {
  const token = getAuthToken()

  if (!token){
    console.log('Unauthorized!')
    return redirect('/')
  }

  const params = new URLSearchParams(username, page, size)
  
  const response = await fetch(`${cfg.API_SERVER}/api/log/request?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}

