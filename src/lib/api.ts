import { getVisitorId } from './visitor'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function sendContactForm(
  form: { name: string; email: string; timeline: string; message: string },
  token: string
) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, token }),
  })
  if (!res.ok) throw new Error('Something went wrong.')
}

export const getViews = (projectNum: string) =>
  fetch(`${BASE_URL}/api/views/${projectNum}`).then(r => r.json())

export const incrementView = (projectNum: string) =>
  fetch(`${BASE_URL}/api/views/${projectNum}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitor_id: getVisitorId() }),
  }).then(r => r.json())

export const getReactions = (projectNum: string) =>
  fetch(`${BASE_URL}/api/reactions/${projectNum}?visitor_id=${getVisitorId()}`).then(r => r.json())

export const incrementReaction = (projectNum: string) =>
  fetch(`${BASE_URL}/api/reactions/${projectNum}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitor_id: getVisitorId() }),
  }).then(r => r.json())

export const getComments = (projectNum: string) =>
  fetch(`${BASE_URL}/api/comments/${projectNum}`).then(r => r.json())

export const postComment = (projectNum: string, text: string, token: string) =>
  fetch(`${BASE_URL}/api/comments/${projectNum}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, token, visitor_id: getVisitorId() }),
  }).then(r => r.json())
