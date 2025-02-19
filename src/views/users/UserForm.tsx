import React from "react"
import { useFormik } from "formik"
import {
  handlerFunction,
  handlerFunctionWithPromise,
} from "../../types/userType"

interface Values {
  username: string
  password: string
  password_repeated: string
  last_name: string
  first_name: string
  is_active: boolean
  is_superuser: boolean
  is_staff: boolean
}

const validate = (values: Values) => {
  const errors: any = {}
  if (!values.username) {
    errors.username = "Поле обязательно"
  }
  if (!values.password) {
    errors.password = "Поле обязательно"
  }

  return errors
}

export default function UserForm(props: {
  handleClose: handlerFunction
  createUserHandler: handlerFunctionWithPromise
}) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_repeated: "",
      last_name: "",
      first_name: "",
      is_active: true,
      is_superuser: false,
      is_staff: false,
    },
    validate,
    onSubmit: async (values) => {
      console.log("values", values)
      await props.createUserHandler(values)
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id_username">Имя пользователя</label>
        <input
          id="id_username"
          name="username"
          type="text"
          className="form-control"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="id_password">Пароль</label>
        <input
          id="id_password"
          name="password"
          type="password"
          className="form-control"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="id_password_repeated">Пароль (повтор)</label>
        <input
          id="id_password_repeated"
          name="password_repeated"
          type="password"
          className="form-control"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password_repeated}
        />
        {formik.touched.password_repeated && formik.errors.password_repeated ? (
          <div>{formik.errors.password_repeated}</div>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="id_last_name">Фамилия</label>
        <input
          id="id_last_name"
          name="last_name"
          type="text"
          className="form-control"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div>{formik.errors.last_name}</div>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="id_firstname">Имя</label>
        <input
          id="id_firstname"
          name="first_name"
          type="text"
          className="form-control"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div>{formik.errors.first_name}</div>
        ) : null}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="id_is_active"
          name="is_active"
          onChange={formik.handleChange}
          checked={formik.values.is_active}
        />
        <label className="form-check-label" htmlFor="id_is_active">
          Запись активна
        </label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="id_is_staff"
          name="is_staff"
          onChange={formik.handleChange}
          checked={formik.values.is_staff}
        />
        <label className="form-check-label" htmlFor="id_is_staff">
          Персонал
        </label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="id_is_superuser"
          name="is_superuser"
          onChange={formik.handleChange}
          checked={formik.values.is_superuser}
        />
        <label className="form-check-label" htmlFor="id_is_superuser">
          Суперпользователь
        </label>
      </div>
      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={props.handleClose}
      >
        Закрыть
      </button>
      <button
        type="submit"
        disabled={Object.keys(formik.errors).length > 0}
        className="btn btn-primary"
      >
        Создать пользователя
      </button>
    </form>
  )
}
