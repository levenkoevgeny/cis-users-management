import { useState } from "react"
import { useLocation } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  isLoggedIn,
  isLogInError,
  userLogin,
} from "../../features/auth/authSlice"
import { Navigate } from "react-router"
import "./style.css"
export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<{
    username: string
    password: string
  }>({
    username: "",
    password: "",
  })

  const dispatch = useAppDispatch()
  const isLoggedInState = useAppSelector(isLoggedIn)
  const isLogInErrorState = useAppSelector(isLogInError)
  let location = useLocation()
  let params = new URLSearchParams(location.search)
  let from = params.get("from") || "/users"

  const submitForm = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch(userLogin(loginForm))
  }

  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (
        <div>
          {isLogInErrorState ? (
            <div className="alert alert-danger" role="alert">
              Ошибка авторизации!
            </div>
          ) : (
            <div></div>
          )}
          <main className="form-signin w-100 m-auto">
            <form onSubmit={submitForm}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Login"
                  required
                  value={loginForm.username}
                  onChange={(event) => {
                    setLoginForm({ ...loginForm, username: event.target.value })
                  }}
                />
                <label htmlFor="username">Login</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  value={loginForm.password}
                  onChange={(event) => {
                    setLoginForm({ ...loginForm, password: event.target.value })
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign in
              </button>
              <p className="mt-5 mb-3 text-body-secondary">
                &copy; E. Levenko 2025
              </p>
            </form>
          </main>
        </div>
      )}
    </div>
  )
}
