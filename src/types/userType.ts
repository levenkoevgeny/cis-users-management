export interface UserTypeBase {
  username: string
}
// what we get from api -> /api/users/1/ or /api/users/
export interface UserTypeItem extends UserTypeBase {
  id: number
  is_staff: boolean
  is_superuser: boolean
  first_name: string
  last_name: string
  is_active: boolean
  date_joined: string | null
  last_login?: string | null
}

export interface UserTypeCreate extends UserTypeBase {
  password: string
  last_name?: string
  first_name?: string
  is_active?: boolean
  is_staff?: boolean
  is_superuser?: boolean
}

export interface UserTypeUpdate extends UserTypeBase {
  id: number
  is_staff: boolean
  is_superuser: boolean
  first_name: string
  last_name: string
  is_active: boolean
}

export interface UserTypeUpdatePassword extends UserTypeBase {
  password: string
}

export interface userSearchForm {
  username__icontains: string
  last_name__icontains: string
  is_staff: number | string
  is_active: number | string
  is_superuser: number | string
}

export type handlerFunction = (event: any) => void

export type handlerFunctionWithPromise = (event: any) => any
