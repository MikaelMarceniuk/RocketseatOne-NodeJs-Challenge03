import bcrypt from "bcrypt"
import InvalidCredentialsError from "../errors/invalidCredentialsError"
import { User } from "@prisma/client"
import IUserRepository from "@repo/userRepository"

export interface IAuthUserCaseRequest {
  email: string
  password: string
}

interface IAuthUserCaseResponse {
  user: User
}

class AuthUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthUserCaseRequest): Promise<IAuthUserCaseResponse> {
    const dbUser = await this.userRepo.findByEmail(email)
    if (!dbUser) throw new InvalidCredentialsError()

    const doesPasswordMatch = await bcrypt.compare(
      password,
      dbUser.password_hash
    )
    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return {
      user: dbUser,
    }
  }
}

export default AuthUserUseCase
