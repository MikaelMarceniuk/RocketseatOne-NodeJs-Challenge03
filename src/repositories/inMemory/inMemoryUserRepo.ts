import { $Enums, Prisma, User } from "@prisma/client"
import IUserRepository from "../userRepository"
import { randomUUID } from "crypto"

class InMemoryUserRepo implements IUserRepository {
  items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const newLength = this.items.push({
      ...data,
      id: data.id || randomUUID(),
      created_at: new Date(),
    })

    return this.items[newLength - 1]
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.items.find((p) => p.email == email)
  }
}

export default InMemoryUserRepo
