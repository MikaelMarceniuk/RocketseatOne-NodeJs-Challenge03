import { PetCharacteristic, Prisma } from "@prisma/client"
import IPetCharacteristicRepository from "../petCharacteristicRepository"

class InMemoryPetCharacteristicRepo implements IPetCharacteristicRepository {
  items: PetCharacteristic[] = []

  async createMany(
    data: Prisma.PetCharacteristicUncheckedCreateInput[]
  ): Promise<PetCharacteristic[]> {
    const newCharacts = []

    for (const newCharact of data) {
      const newLength = this.items.push({
        ...newCharact,
        id: newCharact.id || this.items.length + 1,
      })

      newCharacts.push(this.items[newLength - 1])
    }

    return newCharacts
  }
}

export default InMemoryPetCharacteristicRepo
