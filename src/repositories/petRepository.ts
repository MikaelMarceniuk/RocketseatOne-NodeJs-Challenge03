import { Pet, Prisma } from "@prisma/client"

interface IFindWithFiltersParams {
  city: string
  characteristics?: {
    characteristic_id: number
    value: string
  }[]
}

interface IPetRepository {
  findById(id: string): Promise<Pet>
  findWithFilters(filters: IFindWithFiltersParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

export default IPetRepository
