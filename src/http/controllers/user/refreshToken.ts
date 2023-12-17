import { FastifyRequest, FastifyReply } from "fastify"

const refreshToken = async (req: FastifyRequest, rep: FastifyReply) => {
  await req.jwtVerify({ onlyCookie: true })

  const { role, sub } = req.user

  const token = await rep.jwtSign({ role }, { sign: { sub } })

  const refreshToken = await rep.jwtSign(
    { role },
    { sign: { sub, expiresIn: "7d" } }
  )

  return rep
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}

export default refreshToken
