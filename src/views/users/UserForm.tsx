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

const validate = async (values: Values) => {
  const errors: any = {}
  if (!values.username) {
    errors.username = "Поле обязательно"
  } else if (!/^\w+$/i.test(values.username)) {
    errors.username = "Имя пользователя содержит неразрешенные символы"
  }

  if (!values.password) {
    errors.password = "Поле обязательно"
  } else if (
    !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/i.test(
      values.password,
    )
  ) {
    errors.password = "Пароль не удовлетворяет требованиям безопасности"
  } else if (values.password !== values.password_repeated) {
    errors.password = "Введенные пароли не совпадают"
    errors.password_repeated = "Введенные пароли не совпадают"
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
    onSubmit: async (values, { resetForm }) => {
      await props.createUserHandler(values)
      resetForm()
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
          className={
            formik.touched.username && formik.errors.username
              ? "form-control is-invalid"
              : "form-control"
          }
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
          className={
            formik.touched.password && formik.errors.password
              ? "form-control is-invalid"
              : "form-control"
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="id_password_repeated">Пароль (повтор)</label>
        <input
          id="id_password_repeated"
          name="password_repeated"
          type="password"
          className={
            formik.touched.password_repeated && formik.errors.password_repeated
              ? "form-control is-invalid"
              : "form-control"
          }
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
          className={
            formik.touched.last_name && formik.errors.last_name
              ? "form-control is-invalid"
              : "form-control"
          }
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
          className={
            formik.touched.first_name && formik.errors.first_name
              ? "form-control is-invalid"
              : "form-control"
          }
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
        disabled={
          Object.keys(formik.errors).length > 0 ||
          Object.keys(formik.touched).length == 0
        }
        className="btn btn-primary"
      >
        Создать пользователя
      </button>
    </form>
  )
}
