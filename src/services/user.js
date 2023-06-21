import { redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import cfg from '../configs';

export async function getStudents({studentId, school, cohort, page, size}) {
  // console.log(JSON.stringify({ name, studentId, cohort, school }));
  const token = getAuthToken()

  if (!token){
    console.log('Unauthorized!')
    return redirect('/')
  }

  const params = new URLSearchParams({ studentId, school, cohort, page, size })
  console.log(params);
  
  const response = await fetch(`${cfg.API_SERVER}/api/statistic/student?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response;
}




export async function getStudentPromise(studentId) {
  const token = getAuthToken();
  if (!token){
    console.log('Unauthorized!');
    return redirect('/');
  }

  const params = new URLSearchParams({studentId});
  const promiseArray = [
    fetch(`${cfg.API_SERVER}/api/crawl/info?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => response.json()),
    fetch(`${cfg.API_SERVER}/api/crawl/grade/language?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => response.json()),
    fetch(`${cfg.API_SERVER}/api/crawl/grade/subject?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => response.json()),
    fetch(`${cfg.API_SERVER}/api/crawl/grade/semester?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => response.json()),
  ];
  
  const [res1, res2, res3, res4] = await Promise.all(promiseArray);
  
  return { res1, res2, res3, res4 };
}
