import InvalidCredentialsError from "@useCases/errors/invalidCredentialsError"
import makeAuthUserUseCase from "@useCases/factories/makeAuthUserUseCase"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

const authUserController = async (req: FastifyRequest, rep: FastifyReply) => {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = userSchema.parse(req.body)

  try {
    const { user } = await makeAuthUserUseCase().execute({ email, password })

    const jwtToken = await rep.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "10m",
        },
      }
    )

    const refreshToken = await rep.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    )

    rep
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ jwtToken })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      rep.status(400).send({ message: e.message })
    }

    throw e
  }
}

export default authUserController
