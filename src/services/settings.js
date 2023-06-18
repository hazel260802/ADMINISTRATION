import cfg from '../configs';
import { getAuthToken } from '../utils/auth';

export async function getSettings() {
  const token = getAuthToken();
  const response = await fetch(`${cfg.API_SERVER}/api/settings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function updateJobCycle({ crawlCycle, dkhptdCycle }) {
  const token = getAuthToken();
  const response = await fetch(`${cfg.API_SERVER}/api/settings/job-cycle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ crawl_cycle: crawlCycle, dkhptd_cycle: dkhptdCycle }),
  });

  return response;
}

export async function updateDkhptdTime({ from, to }) {
  const token = getAuthToken();
  const response = await fetch(`${cfg.API_SERVER}/api/settings/dkhptd-time`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ from, to }),
  });

  return response;
}
