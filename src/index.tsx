import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

export const axiosInstance: AxiosInstance = axios.create()

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const state = store.getState()
  config.headers["Authorization"] = `Bearer ${state.auth.token}`
  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  //     if (error.code === "ERR_NETWORK") {
  //       window.location.href = "/network-error"
  //       return Promise.reject(error)
  //     }
  //     if (error.response.status === 401 || error.response.status === 403) {
  //       await store.dispatch("auth/actionRemoveLogIn")
  //       await router.replace({ name: "login" })
  //     }
  //     if (error.response.status === 500) {
  //       await router.replace({ name: "server-error" })
  //     }
  //     return Promise.reject(error)
  return Promise.reject(error)
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
