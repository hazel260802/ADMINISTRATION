import { redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import cfg from '../configs';

export async function getJobs({ studentId, termId, page, size }) {
  // console.log(JSON.stringify({ studentId, termId, page, size }));
  const token = getAuthToken()

  if (!token){
    console.log('Unauthorized!')
    return redirect('/')
  }

  const params = new URLSearchParams()
  
  if (studentId) params.append('studentId', studentId)
  if (termId) params.append('termId', termId)
  if (page) params.append('page', page)
  if (size) params.append('size', size)

  const response = await fetch(`${cfg.API_SERVER}/api/log/job/dkhptdv1?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  return response
}

export async function getSemesters() {

  const token = getAuthToken()

  if (!token){
    console.log('Unauthorized!')
    return redirect('/')
  }

  const response = await fetch(`${cfg.API_SERVER}/api/term-ids`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  return response
}