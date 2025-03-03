import { Navigate, Outlet } from "react-router"
import { useAppDispatch } from "../app/hooks"
import { removeLoggedIn } from "../features/auth/authSlice"
import { useNavigate } from "react-router"

function Navbar() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  function logOut() {
    dispatch(removeLoggedIn()).then(() => navigate("/login"))
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/users">
          User management
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/users">
                Главная
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={logOut}
            className="btn btn-link link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Выход из системы
          </button>
        </div>
      </div>
    </nav>
  )
}

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Navigate to="/users" replace={true} />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
