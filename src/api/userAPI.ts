import { axiosInstance as axios } from "../index"
import { UserTypeCreate, userSearchForm } from "../types/userType"

class userAPI {
  baseURL: string
  searchObj: object
  searchObjDefault: object
  formData: object
  constructor(baseUrl: string, searchForm: userSearchForm, formData: object) {
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

  async getItemsList() {
    let query = this.getQueryStringFromSearchObj()
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${query}`,
    )
  }

  async updateList(url: string) {
    return axios.get(url)
  }

  async getItemData(itemId: number) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
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

export const userAPIInstance = new userAPI(
  "users",
  { username: "levenko", last_name: "" },
  {},
)
