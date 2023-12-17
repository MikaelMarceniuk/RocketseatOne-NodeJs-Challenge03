import { Pet, Prisma } from "@prisma/client"

interface IPetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

export default IPetRepository
