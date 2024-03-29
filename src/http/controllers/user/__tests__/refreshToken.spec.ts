import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { FastifyInstance } from "fastify"
import App from "src/app"

let sut: FastifyInstance

describe("POST /api/user/session Route (e2e)", () => {
  beforeAll(async () => {
    const app = new App()
    await app.init()
    await app.app.ready()
    sut = app.app
  })

  afterAll(async () => {
    await sut.close()
  })

  it("Should authenticate user", async () => {
    await request(sut.server).post("/api/user").send({
      name: "Mikael Marceniuk",
      email: "mika.marceniuk@gmail.com",
      password: "123456",
      role: "MEMBER",
    })

    const apiAuthResp = await request(sut.server)
      .post("/api/user/session")
      .send({
        email: "mika.marceniuk@gmail.com",
        password: "123456",
      })

    const apiResp = await request(sut.server)
      .patch("/api/user/session/refresh")
      .set("Cookie", apiAuthResp.get("Set-Cookie"))

    expect(apiResp.statusCode).toEqual(200)
    expect(apiResp.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    )
  })
})
