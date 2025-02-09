import axios from "axios"
import { UserTypeCreate } from "../types/userType"

export function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

class userAPI {
  baseURL: string
  searchObj: object
  searchObjDefault: object
  formData: object
  constructor(baseUrl: string, searchForm: object, formData: object) {
    this.baseURL = baseUrl
    this.searchObj = searchForm
    this.searchObjDefault = Object.assign({}, searchForm)
    this.formData = Object.assign({}, formData)
  }
  getQueryStringFromSearchObj(): string {
    let queryString: string = "?"
    for (let key in this.searchObj) {
      // @ts-ignore
      queryString = queryString + `${key}=${this.searchObj[key]}&`
    }
    return queryString
  }

  async getItemsList(token: string) {
    let query = this.getQueryStringFromSearchObj()
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${query}`,
      { ...authHeaders(token) },
    )
  }

  async updateList(url: string, token: string) {
    return axios.get(url, authHeaders(token))
  }

  async getItemData(token: string, itemId: number) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
      authHeaders(token),
    )
  }

  // async addItem(token: string, itemData: object) {
  //   return axios.post(
  //     `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${this.baseURL}/`,
  //     itemData,
  //     authHeaders(token),
  //   )
  // }
  //
  // async updateItem(token: string, itemData: { id: string }) {
  //   return axios.put(
  //     `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${this.baseURL}/${itemData.id}/`,
  //     itemData,
  //     authHeaders(token),
  //   )
  // }
  //
  // async deleteItem(token: string, itemId: string) {
  //   return axios.delete(
  //     `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
  //     authHeaders(token),
  //   )
  // }
}

export const userAPIInstance = new userAPI("users", {}, {})
