import { $Enums, User } from "@prisma/client"
import IUserRepository from "@src/repositories/userRepository"
import hashUserPassword from "@src/utils/hashUserPassword"

export interface ICreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: $Enums.Role
}

interface ICreateUserUseCaseResponse {
  user: User
}

class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    data: ICreateUserUseCaseRequest
  ): Promise<ICreateUserUseCaseResponse> {
    const dbUser = await this.userRepo.create({
      ...data,
      password_hash: await hashUserPassword(data.password),
    })

    return {
      user: dbUser,
    }
  }
}

export default CreateUserUseCase
