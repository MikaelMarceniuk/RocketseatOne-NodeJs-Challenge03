import { Pet } from "@prisma/client"
import IPetRepository from "@src/repositories/petRepository"
import ResourceNotFoundError from "../errors/resourceNotFoundError"

interface IGetPetDetailsRequest {
  petId: string
}

interface IGetPetDetailsResponse {
  pet: Pet
}

class GetPetDetailsUseCase {
  constructor(private petRepository: IPetRepository) {}

  async execute({
    petId,
  }: IGetPetDetailsRequest): Promise<IGetPetDetailsResponse> {
    const dbPet = await this.petRepository.findById(petId)
    if (!dbPet) throw new ResourceNotFoundError()

    return {
      pet: dbPet,
    }
  }
}

export default GetPetDetailsUseCase
