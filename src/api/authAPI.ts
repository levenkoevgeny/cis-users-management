import axios from "axios"

export function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const authAPI = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams()
    params.append("username", username)
    params.append("password", password)

    return axios.post(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/token/`,
      params,
    )
  },
  async getUserData(token: string) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/users/me/`,
      authHeaders(token),
    )
  },
}
