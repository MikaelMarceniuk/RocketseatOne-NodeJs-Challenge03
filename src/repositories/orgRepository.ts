import { Org, Prisma } from "@prisma/client"

interface IOrgRepository {
  findByUserId(id: string): Promise<Org | undefined>
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}

export default IOrgRepository
