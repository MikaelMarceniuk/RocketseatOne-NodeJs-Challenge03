import prisma from "@config/db"
import { Prisma, User } from "@prisma/client"
import IUserRepository from "@repo/userRepository"

class PrismaUserRepo implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { email } })
  }

  async create({
    name,
    email,
    password_hash,
    role,
  }: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data: { name, email, password_hash, role },
    })
  }
}

export default PrismaUserRepo
