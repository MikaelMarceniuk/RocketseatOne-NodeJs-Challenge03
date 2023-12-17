import { Pet } from "@prisma/client"
import IPetRepository from "@repo/petRepository"

interface IGetPetsRequest {
  city: string
  characteristics?: {
    characteristicId: number
    value: string
  }[]
}

interface IGetPetsResponse {
  pets: Pet[]
}

class GetPetUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({
    city,
    characteristics,
  }: IGetPetsRequest): Promise<IGetPetsResponse> {
    const dbPets = await this.petRepository.findWithFilters({
      city: city,
      characteristics: characteristics
        ? characteristics.map((p) => ({
            characteristic_id: p.characteristicId,
            value: p.value,
          }))
        : [],
    })

    return {
      pets: dbPets,
    }
  }
}

export default GetPetUseCase
