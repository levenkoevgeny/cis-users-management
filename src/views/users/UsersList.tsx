import React, { useEffect, useState } from "react"
import { userAPIInstance } from "../../api/userAPI"
import {
  userSearchForm,
  UserTypeItem,
  UserTypeCreate,
  UserTypeUpdate,
} from "../../types/userType"
import debounce from "lodash.debounce"
import { Modal } from "react-bootstrap"
import { handlerFunction } from "../../types/userType"

import UserForm from "./UserForm"
import UserFormUpdate from "./UserFormUpdate"

function SearchForm(props: {
  input: userSearchForm
  handleSearchFormInput: handlerFunction
  clearForm: handlerFunction
}) {
  return (
    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="id_search_username" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              name="username__icontains"
              value={props.input.username__icontains}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
              className="form-control"
              id="id_search_username"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="id_search_last_name" className="form-label">
              Фамилия
            </label>
            <input
              type="text"
              value={props.input.last_name__icontains}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
              className="form-control"
              name="last_name__icontains"
              id="id_search_last_name"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3">
            <label htmlFor="id_search_is_active" className="form-label">
              Активный
            </label>

            <select
              id="id_search_is_active"
              name="is_active"
              className="form-select"
              value={props.input.is_active}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
            >
              <option value="">----</option>
              <option value="1">Да</option>
              <option value="0">Нет</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label htmlFor="id_search_is_staff" className="form-label">
              Персонал
            </label>
            <select
              id="id_search_is_staff"
              name="is_staff"
              className="form-select"
              value={props.input.is_staff}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
            >
              <option value="">----</option>
              <option value="1">Да</option>
              <option value="0">Нет</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label htmlFor="id_search_username" className="form-label">
              Суперпользователь
            </label>
            <select
              id="id_search_username"
              name="is_superuser"
              className="form-select"
              value={props.input.is_superuser}
              onChange={(event) => {
                props.handleSearchFormInput(event)
              }}
            >
              <option value="">----</option>
              <option value="1">Да</option>
              <option value="0">Нет</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.clearForm}
      >
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
  const [currentUSerForUpdate, setCurrentUSerForUpdate] =
    useState<UserTypeUpdate>({
      id: 10000000000,
      username: "",
      last_name: "",
      first_name: "",
      is_active: false,
      is_staff: false,
      is_superuser: false,
    })
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [searchForm, setSearchForm] = useState<userSearchForm>(
    Object.assign({}, userAPIInstance.searchObj as userSearchForm),
  )
  const [show, setShow] = useState(false)
  const [showForUpdate, setShowForUpdate] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseForUpdate = () => setShowForUpdate(false)
  const handleShowForUpdate = () => setShowForUpdate(true)

  useEffect(() => {
    userAPIInstance
      .getItemsList()
      .then((response) => setUserList(response.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    userAPIInstance.searchObj = searchForm
    debounce(() => {
      userAPIInstance
        .getItemsList()
        .then((response) => setUserList(response.data))
    }, 500)()
  }, [searchForm])

  function handleSearchFormInput(event: any) {
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
  }

  function clearForm() {
    setSearchForm(
      Object.assign({}, userAPIInstance.searchObjDefault as userSearchForm),
    )
  }

  async function createUserHandler(userData: UserTypeCreate) {
    const response = await userAPIInstance.createNewUser(userData)
    setUserList({ ...userList, results: [...userList.results, response.data] })
    handleClose()
  }

  async function getUserForUpdate(userId: number) {
    const response = await userAPIInstance.getItemData(userId)

    let userForUpdate = response.data
    const { avatar, ...restOfUser } = userForUpdate
    setCurrentUSerForUpdate(restOfUser)

    handleShowForUpdate()
  }

  async function updateUserHandler(userForUpdate: UserTypeUpdate) {
    const response = await userAPIInstance.updateItem(userForUpdate)
    const updatedList = userList.results.map((user) => {
      if (user.id === userForUpdate.id) {
        return { ...user, ...response.data }
      } else return user
    })
    setUserList({ ...userList, results: [...updatedList] })
    handleCloseForUpdate()
  }

  return (
    <div>
      <Modal show={showForUpdate} onHide={handleCloseForUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование записи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserFormUpdate
            handleClose={handleCloseForUpdate}
            updateUserHandler={updateUserHandler}
            initValues={currentUSerForUpdate}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новая запись</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            handleClose={handleClose}
            createUserHandler={createUserHandler}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

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
        clearForm={clearForm}
      />

      <div className="my-5"></div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <button type="button" className="btn btn-warning" onClick={handleShow}>
          Добавить пользователя
        </button>
      </div>

      <div className="mb-3">
        <h5>Всего записей - {userList.count}</h5>
      </div>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {userList.results.length ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" key="avatar">
                    Аватар
                  </th>
                  <th scope="col" key="id">
                    id
                  </th>
                  <th scope="col" key="is_active">
                    Активный
                  </th>
                  <th scope="col" key="username">
                    Имя пользователя
                  </th>
                  <th scope="col" key="lastname">
                    Фамилия
                  </th>
                  <th scope="col" key="firstname">
                    Имя
                  </th>
                  <th scope="col" key="is_superuser">
                    Супер пользователь
                  </th>
                  <th scope="col" key="date_time_created">
                    Дата и время создания
                  </th>
                  <th scope="col" key="empty"></th>
                </tr>
              </thead>
              <tbody>
                {userList.results.map((user) => (
                  <tr
                    key={user.id}
                    onDoubleClick={() => getUserForUpdate(user.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt=""
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{user.id}</td>
                    {user.is_active ? <td>Да</td> : <td>Нет</td>}
                    <td>{user.username}</td>
                    <td>{user.last_name}</td>
                    <td>{user.first_name}</td>
                    {user.is_superuser ? <td>Да</td> : <td>Нет</td>}
                    <td>
                      {user.date_joined
                        ? new Date(user.date_joined).toLocaleString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Нет данных"}
                    </td>
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
