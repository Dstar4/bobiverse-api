import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Bob from 'App/Models/Bob'
import Drone from 'App/Models/Drone'
import Mineral from 'App/Models/Mineral'

export default class BobsController {
  /* -------------------------------------------------------------------------- */
  /*                                     All                                    */
  /* -------------------------------------------------------------------------- */
  public async all({ response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')

    const userId: number = auth.user.id
    const user = await User.findOrFail(userId)

    const bobs = await user.related('bobs').query()

    return bobs
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Create                                   */
  /* -------------------------------------------------------------------------- */
  public async create({ request, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    const user = await User.findOrFail(auth.user.id)

    const payload = request.body()
    const bob = await Bob.firstOrCreate(payload, payload)
    await user.related('bobs').save(bob)
    return response.created(bob)
  }

  /* -------------------------------------------------------------------------- */
  /*                                     Show                                    */
  /* -------------------------------------------------------------------------- */
  public async show({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    const userId: number = auth.user.id

    const bob = await Bob.findOrFail(params.id)
    if (bob.userId !== userId) return response.badRequest('Unauthorized')

    return bob
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Update                                   */
  /* -------------------------------------------------------------------------- */
  public async update({ params, request, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    const userId: number = auth.user.id

    let bob = await Bob.findOrFail(params.id)
    if (bob.userId !== userId) return response.badRequest('Unauthorized')

    return await bob.merge({ ...request.body() }).save()
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Show Drones                                */
  /* -------------------------------------------------------------------------- */
  public async showDrones({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    const userId: number = auth.user.id

    let bob = await Bob.findOrFail(params.id)
    if (bob.userId !== userId) return response.badRequest('Unauthorized')

    let drones = await bob.related('drones').query()
    return drones
  }

  /* -------------------------------------------------------------------------- */
  /*                                     Scan                                    */
  /* -------------------------------------------------------------------------- */
  public async scan({ params, response, auth }: HttpContextContract) {
    // if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    // const userId: number = auth.user.id

    // const bob = await Bob.findOrFail(params.id)
    // if (bob.userId !== userId) return response.badRequest('Unauthorized')

    const minerals = await Mineral.all()
    return minerals
  }
}
