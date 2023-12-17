import { PetCharacteristic, Prisma } from "@prisma/client"

interface IPetCharacteristicRepository {
  createMany(
    data: Prisma.PetCharacteristicUncheckedCreateInput[]
  ): Promise<PetCharacteristic[]>
}

export default IPetCharacteristicRepository
