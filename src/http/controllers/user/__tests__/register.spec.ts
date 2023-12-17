import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { FastifyInstance } from "fastify"
import App from "src/app"

let sut: FastifyInstance

describe("POST /api/user (e2e)", () => {
  beforeAll(async () => {
    const app = new App()
    await app.init()
    await app.app.ready()
    sut = app.app
  })

  afterAll(async () => {
    await sut.close()
  })

  it("Should create user", async () => {
    const apiResp = await request(sut.server).post("/api/user").send({
      name: "Mikael Marceniuk",
      email: "mika.marceniuk@gmail.com",
      password: "123456",
      role: "MEMBER",
    })

    expect(apiResp.statusCode).toBe(201)
  })
})
