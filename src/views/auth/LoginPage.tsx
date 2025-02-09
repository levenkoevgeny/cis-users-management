import { useLocation } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { isLoggedIn, userLogin } from "../../features/auth/authSlice"
import { Navigate } from "react-router"

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const isLoggedInState = useAppSelector(isLoggedIn)
  let location = useLocation()
  let params = new URLSearchParams(location.search)
  let from = params.get("from") || "/"

  const submitForm = () => {
    dispatch(userLogin({ username: "levenko", password: "1986" }))
  }

  return (
    <div>
      {isLoggedInState ? (
        <Navigate to={from} replace={true} />
      ) : (
        <div>
          Login page
          <button onClick={submitForm}>Login</button>
        </div>
      )}
    </div>
  )
}
