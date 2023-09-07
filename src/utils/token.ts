function getToken() {
  return localStorage.getItem('token')
}

function setToken(token: string) {
  return localStorage.setItem('token', token)
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

function setRefreshToken(token: string) {
  return localStorage.setItem('refreshToken', token)
}

export { getToken, setToken, getRefreshToken, setRefreshToken }
