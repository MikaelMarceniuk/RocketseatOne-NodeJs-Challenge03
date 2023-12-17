import { beforeEach, describe, expect, it } from "vitest"
import CreateOrgUseCase from "../createOrgUseCase"
import InMemoryOrgRepo from "@repo/inMemory/inMemoryOrgRepo"
import InMemoryUserRepo from "@repo/inMemory/inMemoryUserRepo"
import ResourceNotFoundError from "@useCases/errors/resourceNotFoundError"
import UnauthorizedError from "@useCases/errors/unauthorizedError"

let userRepo: InMemoryUserRepo
let orgRepo: InMemoryOrgRepo
let sut: CreateOrgUseCase

describe("CreateOrgUseCase", () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    orgRepo = new InMemoryOrgRepo()
    sut = new CreateOrgUseCase(userRepo, orgRepo)

    userRepo.items.push({
      id: "userId-01",
      name: "Mikael Member",
      email: "mikael.marceniuk@codeui.com.br",
      password_hash: "123456",
      role: "MEMBER",
      created_at: new Date(),
    })

    userRepo.items.push({
      id: "userId-02",
      name: "Mikael Adm",
      email: "mikael.marceniuk@codeui.com.br",
      password_hash: "123456",
      role: "ORG_ADMIN",
      created_at: new Date(),
    })
  })

  it("Should create organization", async () => {
    const { org } = await sut.execute({
      userId: "userId-02",
      name: "Org pros Gatinhos",
      address: "Rua Org",
      city: "Sao Paulo",
      wppNumber: "16999999999",
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("Should throw 'ResourceNotFoundError' because user does not exists", async () => {
    await expect(
      sut.execute({
        userId: "userId-03",
        name: "Org pros Gatinhos",
        address: "Rua Org",
        city: "Ribeirao Preto",
        wppNumber: "16999999999",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("Should throw 'UnauthorizedError' because user is not 'ORG_ADMIN'", async () => {
    await expect(
      sut.execute({
        userId: "userId-01",
        name: "Org pros Gatinhos",
        address: "Rua Org",
        city: "Ribeirao Preto",
        wppNumber: "16999999999",
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("Should throw 'UnauthorizedError' because user already have an Org", async () => {
    orgRepo.create({
      user_id: "userId-02",
      name: "Org pros cachorros",
      address: "Rua Org dos cachorros",
      city: "Ribeirao Preto",
      wpp_number: "16999999999",
    })

    await expect(
      sut.execute({
        userId: "userId-02",
        name: "Org pros Gatinhos",
        address: "Rua Org",
        city: "Ribeirao Preto",
        wppNumber: "16999999999",
      })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
