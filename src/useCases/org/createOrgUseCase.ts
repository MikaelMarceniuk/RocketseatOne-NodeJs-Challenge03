import IOrgRepository from "@src/repositories/orgRepository"
import IUserRepository from "@src/repositories/userRepository"
import ResourceNotFoundError from "../errors/resourceNotFoundError"
import UnauthorizedError from "../errors/unauthorizedError"
import { Org } from "@prisma/client"

export interface ICreateOrgRequest {
  userId: string
  name: string
  city: string
  address: string
  wppNumber: string
}

interface ICreateOrgResponse {
  org: Org
}

class CreateOrgUseCase {
  constructor(
    private userRepo: IUserRepository,
    private orgRepo: IOrgRepository
  ) {}

  async execute({
    userId,
    ...org
  }: ICreateOrgRequest): Promise<ICreateOrgResponse> {
    const dbUser = await this.userRepo.findById(userId)
    if (!dbUser) throw new ResourceNotFoundError()
    if (dbUser.role != "ORG_ADMIN") throw new UnauthorizedError()

    const userOrg = await this.orgRepo.findByUserId(userId)
    if (userOrg) throw new UnauthorizedError()

    const newOrg = await this.orgRepo.create({
      user_id: userId,
      wpp_number: org.wppNumber,
      ...org,
    })

    return {
      org: newOrg,
    }
  }
}

export default CreateOrgUseCase
