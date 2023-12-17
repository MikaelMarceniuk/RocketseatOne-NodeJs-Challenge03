import { beforeEach, describe, expect, it, vitest } from "vitest"
import GetPetUseCase from "../getPetsUseCase"
import InMemoryPetRepo from "@repo/inMemory/inMemoryPetRepo"

let petRepo: InMemoryPetRepo
let sut: GetPetUseCase

describe("CreatePetUseCase", () => {
  beforeEach(async () => {
    petRepo = new InMemoryPetRepo()
    sut = new GetPetUseCase(petRepo)
  })

  it.todo("Should one pet with Org and Characteristcs")

  it.todo('Should throw "ResourceNotFoundError" beucase pet does not exists')
})
