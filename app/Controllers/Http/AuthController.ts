import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const { request, response, auth } = ctx
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  // public async register(ctx: HttpContextContract) {
  //   const { request, response, auth } = ctx

  //   const email = request.input('email')
  //   const password = request.input('password')

  //   try {
  //     const token = await auth.use('api').attempt(email, password)
  //     console.log({token})
  //     return token
  //   } catch {
  //     return response.badRequest('Invalid credentials')
  //   }
  // }
}
