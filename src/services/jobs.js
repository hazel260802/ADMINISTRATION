import { getAuthToken } from '../utils/auth';
import cfg from '../configs';

export async function getJobs({ studentId, termId, page, size }) {
  const token = getAuthToken()

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


export async function getJobDetail(jobId){
  const token = getAuthToken()

  try{
    const response = await fetch(`${cfg.API_SERVER}/api/log/job/dkhptdv1/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    return response

  } catch (error) {
    console.log(`Error message: ${  error.message}`)
    return null
  }
}


export async function getJobResult(jobId){

  const token = getAuthToken()
  const params = new URLSearchParams({ jobId })

  const response = await fetch(`${cfg.API_SERVER}/api/log/job-result/dkhptdv1?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  return response
}


export async function getSemesters() {

  const token = getAuthToken()

  const response = await fetch(`${cfg.API_SERVER}/api/term-ids`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  return response
}