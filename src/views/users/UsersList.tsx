import React, { useEffect, useState, useCallback } from "react"
import { userAPIInstance } from "../../api/userAPI"
import { UserTypeItem } from "../../types/userType"

function SearchForm() {
  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Фамилия
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-primary">
        Очистить форму
      </button>
    </div>
  )
}

interface UserState {
  count?: number
  next?: string
  previous?: string
  results?: Array<UserTypeItem>
}

export default function UsersList() {
  const [userList, setUserList] = useState<UserState>({ count: 0, results: [] })
  const isLoading = useState(true)
  const isError = useState(false)

  useEffect(() => {
    // userAPIInstance
    //   .getItemsList(
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4OTg4MjcxLCJpYXQiOjE3Mzg5NjQyNzEsImp0aSI6IjY2MDNhOGU4YzRhNTQwZGE5NDIwMzAwYjAzZjdiZDQ0IiwidXNlcl9pZCI6MX0.GgI0pk1VUkjQLtDlBzK-0cqWkjs0CmzL4mHy28-uC9E",
    //   )
    //   .then((response) => setUserList(response.data))
  }, [])

  return (
    <div>
      <h1 className="mt-3">Пользователи</h1>
      <SearchForm />
      <div className="my-5"></div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button type="button" className="btn btn-warning">
          Добавить пользователя
        </button>
      </div>
      {userList.results?.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Аватар</th>
            <th scope="col">id</th>
            <th scope="col">Активный</th>
            <th scope="col">Имя пользователя</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Супер пользователь</th>
            <th scope="col">Дата и время создания</th>
            <th scope="col">Дата и время последнего входа</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
