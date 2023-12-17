import { Prisma, User } from "@prisma/client"

interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
}

export default IUserRepository
