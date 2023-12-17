import PrismaUserRepo from "@repo/Prisma/prismaUserRepo"
import AuthUserUseCase from "@useCases/user/authUserUseCase"

const makeAuthUserUseCase = () => {
  const userRepo = new PrismaUserRepo()
  return new AuthUserUseCase(userRepo)
}

export default makeAuthUserUseCase
