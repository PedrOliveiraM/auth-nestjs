export type UserCreateDto = {
  name: string
  password: string
  username: string
}

export type UserUpdateAddRoleDto = {
  _id: string
  roles: string[]
}
