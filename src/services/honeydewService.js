import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/honeydews`

async function create(honeydew) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`, // Form Data notification for the back-end
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(honeydew)
  })
  return res.json()
}

// async function getAll() {
//   const res = await fetch(BASE_URL)
//   return res.json()
// }

async function getAll() {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`, // Form Data notification for the back-end
    }
  })
  return res.json()
}

async function getOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return res.json()
}

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
}

async function update(drink) {
  const res = await fetch(`${BASE_URL}/${drink._id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(drink)
  })
  return res.json()
}

export {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
}