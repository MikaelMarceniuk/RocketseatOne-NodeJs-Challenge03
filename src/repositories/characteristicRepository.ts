import { Characteristic, Prisma } from "@prisma/client"

interface ICharacteristicRepository {
  findById(id: number): Promise<Characteristic | undefined>
  findManyById(ids: number[]): Promise<Characteristic[]>
  create(data: Prisma.CharacteristicCreateInput): Promise<Characteristic>
}

export default ICharacteristicRepository
