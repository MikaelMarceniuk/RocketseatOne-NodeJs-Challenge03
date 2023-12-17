import App from "@src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { FastifyInstance } from "fastify"

let sut: FastifyInstance

describe("/api Route (e2e)", () => {
  beforeAll(async () => {
    const app = new App()
    await app.init()
    await app.app.ready()
    sut = app.app
  })

  afterAll(async () => {
    await sut.close()
  })

  it("Should return hello world!", async () => {
    const apiResp = await request(sut.server).get("/api")

    expect(apiResp.text).toBe("Hello World!")
  })
})
