import { Org, Prisma, User } from "@prisma/client"
import IOrgRepository from "../orgRepository"
import { randomUUID } from "crypto"

class InMemoryOrgRepo implements IOrgRepository {
  items: Org[] = []

  async findById(id: string): Promise<Org | undefined> {
    return this.items.find((p) => p.id == id)
  }

  async findByUserId(userId: string): Promise<Org | undefined> {
    return this.items.find((p) => p.user_id == userId)
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const newLength = this.items.push({
      ...data,
      id: data.id || randomUUID(),
      created_at: new Date(),
    })

    return this.items[newLength - 1]
  }
}

export default InMemoryOrgRepo
