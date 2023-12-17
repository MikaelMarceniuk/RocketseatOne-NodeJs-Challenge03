import { beforeEach, describe, expect, it } from "vitest"
import bcrypt from "bcrypt"
import CreateUserUseCase, {
  ICreateUserUseCaseRequest,
} from "../createUserUseCase"
import InMemoryUserRepo from "@repo/inMemory/inMemoryUserRepo"

let userRepo: InMemoryUserRepo
let sut: CreateUserUseCase

const newUserData: ICreateUserUseCaseRequest = {
  name: "Mikael Marceniuk",
  email: "mikael.marceniuk@codeui.com.br",
  password: "123456",
  role: "MEMBER",
}

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    sut = new CreateUserUseCase(userRepo)
  })

  it("Should create a new user", async () => {
    const { user } = await sut.execute(newUserData)

    expect(user.id).toEqual(expect.any(String))
  })

  it("Should hash user password", async () => {
    const { user } = await sut.execute(newUserData)

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      newUserData.password,
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
