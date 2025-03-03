import { createBrowserRouter, RouterProvider, redirect } from "react-router"
import Layout from "./components/Layout"
import UsersList from "./views/users/UsersList"
import LoginPage from "./views/auth/LoginPage"
import { store } from "./app/store"
import { checkLoggedIn } from "./features/auth/authSlice"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/users",
        index: true,
        Component: UsersList,
        loader: protectedLoader,
      },
    ],
  },
  { path: "/login", Component: LoginPage },
])

async function protectedLoader({ request }: { request: any }) {
  await store.dispatch(checkLoggedIn())
  const state = store.getState()
  const isLoggedIn = state.auth.isLoggedIn

  if (!isLoggedIn) {
    let params = new URLSearchParams()
    params.set("from", new URL(request.url).pathname)
    return redirect("/login?" + params.toString())
  }
  return null
}

function App() {
  return <RouterProvider router={router} />
}

export default App
