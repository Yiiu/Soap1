import dbUser, { User } from '../model/User'

export const getUserInfo = async (id: string) => {
  const user = await dbUser.findById(id)
  return user
}