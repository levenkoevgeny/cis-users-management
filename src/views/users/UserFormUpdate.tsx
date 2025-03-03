import React from "react"
import { useFormik } from "formik"
import {
  handlerFunction,
  handlerFunctionWithPromise,
  UserTypeItem,
  UserTypeUpdate,
} from "../../types/userType"

const validate = async (values: UserTypeUpdate) => {
  const errors: any = {}
  // if (!values.username) {
  //   errors.username = "Поле обязательно"
  // } else if (!/^\w+$/i.test(values.username)) {
  //   errors.username = "Имя пользователя содержит неразрешенные символы"
  // }
  return errors
}

export default function UserFormUpdate(props: {
  handleClose: handlerFunction
  updateUserHandler: handlerFunctionWithPromise
  initValues: UserTypeUpdate
}) {
  const formik = useFormik({
    initialValues: props.initValues,
    validate,
    onSubmit: async (values, { resetForm }) => {
      await props.updateUserHandler(values)
      resetForm()
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id_update_username">Имя пользователя</label>
        <input
          id="id_update_username"
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
        <label htmlFor="id_update_last_name">Фамилия</label>
        <input
          id="id_update_last_name"
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
        <label htmlFor="id_update_firstname">Имя</label>
        <input
          id="id_update_firstname"
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
          id="id_update_is_active"
          name="is_active"
          onChange={formik.handleChange}
          checked={formik.values.is_active}
        />
        <label className="form-check-label" htmlFor="id_update_is_active">
          Запись активна
        </label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="id_update_is_staff"
          name="is_staff"
          onChange={formik.handleChange}
          checked={formik.values.is_staff}
        />
        <label className="form-check-label" htmlFor="id_update_is_staff">
          Персонал
        </label>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="id_update_is_superuser"
          name="is_superuser"
          onChange={formik.handleChange}
          checked={formik.values.is_superuser}
        />
        <label className="form-check-label" htmlFor="id_update_is_superuser">
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
        Сохранить изменения
      </button>
    </form>
  )
}
