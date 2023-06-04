export default interface IUser {
  id?: string | null,
  username?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}