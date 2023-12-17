import ICharacteristicRepository from "@repo/characteristicRepository"
import IOrgRepository from "@repo/orgRepository"
import IPetCharacteristicRepository from "@repo/petCharacteristicRepository"
import IPetRepository from "@repo/petRepository"
import ResourceNotFoundError from "../errors/resourceNotFoundError"
import { Pet, PetCharacteristic } from "@prisma/client"

export interface ICreatePetRequest {
  orgId: string
  name: string
  characteristics: {
    id: number
    value: string
  }[]
}

interface ICreatePetResponse {
  pet: Pet
  petCharacterists: PetCharacteristic[]
}

class CreatePetUseCase {
  constructor(
    private orgRepo: IOrgRepository,
    private characteristicRepo: ICharacteristicRepository,
    private petRepo: IPetRepository,
    private petCharactRepo: IPetCharacteristicRepository
  ) {}

  async execute({
    orgId,
    name,
    characteristics,
  }: ICreatePetRequest): Promise<ICreatePetResponse> {
    const dbOrg = await this.orgRepo.findById(orgId)
    if (!dbOrg) throw new ResourceNotFoundError()

    const idsCharact = characteristics.map((p) => p.id)
    const dbCharacteristics = await this.characteristicRepo.findManyById(
      idsCharact
    )
    if (dbCharacteristics.length != idsCharact.length)
      throw new ResourceNotFoundError()

    const newPet = await this.petRepo.create({
      org_id: orgId,
      name,
    })

    const petCharacts = characteristics.map((p) => ({
      pet_id: newPet.id,
      characteristic_id: p.id,
      value: p.value,
    }))
    const newCharacts = await this.petCharactRepo.createMany(petCharacts)

    return {
      pet: newPet,
      petCharacterists: newCharacts,
    }
  }
}

export default CreatePetUseCase
