import { Characteristic, Prisma } from "@prisma/client"
import ICharacteristicRepository from "../characteristicRepository"

class InMemoryCharacteristcRepo implements ICharacteristicRepository {
  items: Characteristic[] = []

  async findById(id: number): Promise<Characteristic | undefined> {
    return this.items.find((p) => p.id == id)
  }

  async findManyById(ids: number[]): Promise<Characteristic[]> {
    return this.items.filter((p) => ids.includes(p.id))
  }

  async create(
    data: Prisma.CharacteristicCreateInput
  ): Promise<Characteristic> {
    const newLength = this.items.push({
      id: this.items.length + 1,
      name: data.name,
    })

    return this.items[newLength - 1]
  }
}

export default InMemoryCharacteristcRepo
