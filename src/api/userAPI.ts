import { axiosInstance as axios } from "../index"
import {
  UserTypeCreate,
  userSearchForm,
  UserTypeItem,
  UserTypeUpdate,
} from "../types/userType"

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
    return axios.get<{ data: UserTypeItem }, { data: UserTypeItem }>(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
    )
  }

  async getItemDataForUpdate(itemId: number) {
    return axios.get<{ data: UserTypeUpdate }, { data: UserTypeUpdate }>(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
    )
  }

  async createNewUser(newUserForm: UserTypeCreate) {
    const params = new URLSearchParams()
    params.append("username", newUserForm.username)
    params.append("password", newUserForm.password)
    if (newUserForm.last_name) {
      params.append("last_name", newUserForm.last_name)
    }
    if (newUserForm.first_name) {
      params.append("first_name", newUserForm.first_name)
    }
    return axios.post<{ data: UserTypeItem }, { data: UserTypeItem }>(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/`,
      params,
    )
  }

  async updateItem(itemData: UserTypeUpdate) {
    return axios.patch<{ data: UserTypeItem }, { data: UserTypeItem }>(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemData.id}/`,
      itemData,
    )
  }

  async deleteItem(itemId: string) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/${this.baseURL}/${itemId}/`,
    )
  }
}

export const userAPIInstance = new userAPI(
  "users",
  {
    username__icontains: "",
    last_name__icontains: "",
    is_staff: "",
    is_active: "",
    is_superuser: "",
  },
  {},
)
