import { beforeEach, describe, expect, it } from "vitest"
import InMemoryUserRepo from "@repo/inMemory/inMemoryUserRepo"
import { Prisma } from "@prisma/client"
import AuthUserUseCase from "../authUserUseCase"
import hashUserPassword from "@src/utils/hashUserPassword"
import InvalidCredentialsError from "@src/useCases/errors/invalidCredentialsError"

const userPassword = "123456"
let userRepo: InMemoryUserRepo
let sut: AuthUserUseCase
let userData: Prisma.UserCreateInput

describe("AuthUserUseCase", () => {
  beforeEach(async () => {
    userRepo = new InMemoryUserRepo()
    sut = new AuthUserUseCase(userRepo)

    userData = {
      name: "Mikael Marceniuk",
      email: "mikael.marceniuk@codeui.com.br",
      password_hash: await hashUserPassword(userPassword),
      role: "MEMBER",
    }

    userRepo.create(userData)
  })

  it("Should return user", async () => {
    const { user } = await sut.execute({
      email: userData.email,
      password: userPassword,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual(userData.email)
  })

  it("Should throw 'Invalid Credentials' because of wrong email", async () => {
    await expect(
      sut.execute({
        email: "mikael.marceniuk@codeui.com",
        password: userPassword,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("Should throw 'Invalid Credentials' because of wrong password", async () => {
    await expect(
      sut.execute({
        email: userData.email,
        password: "12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
