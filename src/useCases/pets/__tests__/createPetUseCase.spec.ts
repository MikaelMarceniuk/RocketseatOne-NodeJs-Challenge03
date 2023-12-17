import { beforeEach, describe, expect, it } from "vitest"
import CreatePetUseCase from "../createPetUseCase"
import InMemoryPetCharacteristicRepo from "@repo/inMemory/inMemoryPetCharacteristicRepo"
import InMemoryCharacteristcRepo from "@repo/inMemory/inMemoryCharacteristicRepo"
import InMemoryOrgRepo from "@repo/inMemory/inMemoryOrgRepo"
import InMemoryPetRepo from "@repo/inMemory/inMemoryPetRepo"
import ResourceNotFoundError from "@useCases/errors/resourceNotFoundError"

let orgRepo: InMemoryOrgRepo
let characteristicRepo: InMemoryCharacteristcRepo
let petRepo: InMemoryPetRepo
let petCharactRepo: InMemoryPetCharacteristicRepo
let sut: CreatePetUseCase

describe("CreatePetUseCase", () => {
  beforeEach(async () => {
    orgRepo = new InMemoryOrgRepo()
    characteristicRepo = new InMemoryCharacteristcRepo()
    petRepo = new InMemoryPetRepo()
    petCharactRepo = new InMemoryPetCharacteristicRepo()
    sut = new CreatePetUseCase(
      orgRepo,
      characteristicRepo,
      petRepo,
      petCharactRepo
    )

    await orgRepo.items.push({
      id: "org-01",
      user_id: "user-01",
      name: "name",
      city: "city",
      address: "address",
      wpp_number: "wpp_number",
      created_at: new Date(),
    })

    await characteristicRepo.items.push({ id: 1, name: "Tipo" })
    await characteristicRepo.items.push({ id: 2, name: "Raca" })
  })

  it("Should create a new pet", async () => {
    const { pet, petCharacterists } = await sut.execute({
      orgId: "org-01",
      name: "Destruidor de mundos",
      characteristics: [
        { id: 1, value: "Cachorro" },
        { id: 2, value: "Bulldog" },
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(petCharacterists).toHaveLength(2)
    expect(petCharacterists).toEqual([
      expect.objectContaining({
        pet_id: pet.id,
        characteristic_id: 1,
        value: "Cachorro",
      }),
      expect.objectContaining({
        pet_id: pet.id,
        characteristic_id: 2,
        value: "Bulldog",
      }),
    ])
  })

  it("Should throw 'ResourceNotFoundError' because org does not exists", async () => {
    await expect(
      sut.execute({
        orgId: "org-02",
        name: "Destruidor de mundos",
        characteristics: [
          { id: 1, value: "Cachorro" },
          { id: 2, value: "Bulldog" },
        ],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("Should throw 'ResourceNotFoundError' because characterist with id 3 does not exists", async () => {
    await expect(
      sut.execute({
        orgId: "org-02",
        name: "Destruidor de mundos",
        characteristics: [
          { id: 1, value: "Cachorro" },
          { id: 2, value: "Bulldog" },
          { id: 3, value: "Bulldog" },
        ],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
