import { Org, Prisma } from "@prisma/client"

interface IOrgRepository {
  findById(id: string): Promise<Org | undefined>
  findByUserId(id: string): Promise<Org | undefined>
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}

export default IOrgRepository
