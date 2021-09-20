import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import addMinutes from 'date-fns/addMinutes'
import User from 'App/Models/User'
import Drone from 'App/Models/Drone'
import Job from 'App/Models/Job'
import { DateTime } from 'luxon'

export default class DronesController {
  public async index({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    let drones = await Drone.all()
    // let job = await drone.related('job').query()
    return { drones }
  }
  public async show({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    let drone = await Drone.findOrFail(params.id)
    let job = await drone.related('job').query()
    return { drone, job }
  }
  public async mine({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    let drone = await Drone.findOrFail(params.id)

    const findPayload = { ownerId: drone.id }
    const insertPayload = {
      name: 'mining',
      ownerId: drone.id,
      targetId: params.target,
    }
    let job = await Job.updateOrCreate(findPayload, insertPayload)

    drone.jobId = job.id
    drone.save()

    return { drone, job }
  }

  public async stopAction({ params, response, auth }: HttpContextContract) {
    if (!auth?.user?.id) return response.badRequest('No user with that id was found')
    let drone = await Drone.findOrFail(params.id)

    const updatePayload = { name: 'resting', targetId: null }
    let job = await drone.related('job').query().update(updatePayload)
    job = await drone.related('job').query()

    return { drone, job }
  }
}
