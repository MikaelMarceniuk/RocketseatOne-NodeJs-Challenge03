import { beforeEach, describe, expect, it, vitest } from "vitest"
import GetPetUseCase from "../getPetsUseCase"
import InMemoryPetRepo from "@src/repositories/inMemory/inMemoryPetRepo"

let petRepo: InMemoryPetRepo
let sut: GetPetUseCase

describe("CreatePetUseCase", () => {
  beforeEach(async () => {
    petRepo = new InMemoryPetRepo()
    sut = new GetPetUseCase(petRepo)
  })

  it.todo('Should return all pets from "Sao Paulo"')

  it.todo('Should return all pets from "Sao Paulo" with "Dog" characteristic')

  it.todo('Should return no pets from "Sao Paulo" with "Cat" characteristic')
})
