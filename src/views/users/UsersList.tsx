import React, { useEffect, useState, useMemo } from "react"
import { userAPIInstance } from "../../api/userAPI"
import { userSearchForm, UserTypeItem } from "../../types/userType"
import { useAppSelector } from "../../app/hooks"
import debounce from "lodash.debounce"

type handlerFunction = (event: any) => void

function SearchForm(props: {
  input: userSearchForm
  handleSearchFormInput: handlerFunction
}) {
  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3">
            {props.input.username}
            <label htmlFor="id_username" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              name="username"
              value={props.input.username}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
              className="form-control"
              id="id_username"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="id_last_name" className="form-label">
              Фамилия
            </label>
            <input
              type="text"
              value={props.input.last_name}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
              className="form-control"
              name="last_name"
              id="id_last_name"
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
  count: number
  next: string | null
  previous: string | null
  results: Array<UserTypeItem>
}

export default function UsersList() {
  const [userList, setUserList] = useState<UserState>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [searchForm, setSearchForm] = useState<userSearchForm>(
    Object.assign({}, userAPIInstance.searchObj as userSearchForm),
  )

  useEffect(() => {
    userAPIInstance
      .getItemsList()
      .then((response) => setUserList(response.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  function handleSearchFormInput(event: any) {
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchFormInput, 300)
  }, [])

  return (
    <div>
      {isError ? (
        <div className="alert alert-danger" role="alert">
          Error!
        </div>
      ) : (
        <></>
      )}
      <h1 className="mt-3">Пользователи</h1>
      <SearchForm
        input={searchForm}
        handleSearchFormInput={handleSearchFormInput}
      />

      <div className="my-5"></div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button type="button" className="btn btn-warning">
          Добавить пользователя
        </button>
      </div>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {userList.results.length ? (
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {userList.results.map((user) => (
                  <tr key={user.id}>
                    <td></td>
                    <td>{user.id}</td>
                    {user.is_active ? <td>true</td> : <td></td>}
                    <td>{user.username}</td>
                    <td>{user.last_name}</td>
                    <td>{user.first_name}</td>
                    {user.is_superuser ? <td>true</td> : <td></td>}
                    <td>{user.date_joined}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Список пуст</div>
          )}
        </div>
      )}
    </div>
  )
}
