import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
export default class JobsController {
  public async show({ params, response, auth }: HttpContextContract) {
    return await Job.all()
  }
}
