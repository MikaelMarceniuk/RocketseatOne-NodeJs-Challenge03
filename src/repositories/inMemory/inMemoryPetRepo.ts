import { Pet, Prisma } from "@prisma/client"
import IPetRepository from "../petRepository"
import { randomUUID } from "crypto"

class InMemoryPetRepo implements IPetRepository {
  items: Pet[] = []

  async findWithFilters(filters: { city: string }): Promise<Pet[]> {
    throw new Error("Method not implemented.")
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const newLength = this.items.push({
      ...data,
      id: data.id || randomUUID(),
    })

    return this.items[newLength - 1]
  }
}

export default InMemoryPetRepo
