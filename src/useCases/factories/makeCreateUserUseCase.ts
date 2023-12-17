import PrismaUserRepo from "@repo/Prisma/prismaUserRepo"
import CreateUserUseCase from "@useCases/user/createUserUseCase"

const makeCreateUserUseCase = () => {
  const userRepo = new PrismaUserRepo()
  return new CreateUserUseCase(userRepo)
}

export default makeCreateUserUseCase
