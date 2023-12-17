import { Prisma, User } from "@prisma/client"

interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>
  create(data: Prisma.UserCreateInput): Promise<User>
}

export default IUserRepository
