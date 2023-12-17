import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { FastifyInstance } from "fastify"
import App from "src/app"

let sut: FastifyInstance

describe("PATH /api/user/session/refresh Route (e2e)", () => {
  beforeAll(async () => {
    const app = new App()
    await app.init()
    await app.app.ready()
    sut = app.app
  })

  afterAll(async () => {
    await sut.close()
  })

  it("Should return new refresh token", async () => {
    await request(sut.server).post("/api/user").send({
      name: "Mikael Marceniuk",
      email: "mika.marceniuk@gmail.com",
      password: "123456",
      role: "MEMBER",
    })

    const apiResp = await request(sut.server).post("/api/user/session").send({
      email: "mika.marceniuk@gmail.com",
      password: "123456",
    })

    expect(apiResp.statusCode).toBe(200)
    expect(apiResp.body).toEqual({ jwtToken: expect.any(String) })
    expect(apiResp.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ])
  })
})
