import { Prisma, User } from "@prisma/client"

interface IUserRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: Prisma.UserCreateInput): Promise<User>
}

export default IUserRepository
