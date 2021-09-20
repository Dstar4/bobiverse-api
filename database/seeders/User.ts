import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Bob from 'App/Models/Bob'
import Drone from 'App/Models/Drone'
import Mineral from 'App/Models/Mineral'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await Drone.truncate(true)
    await Bob.truncate(true)
    await User.truncate(true)
    await Mineral.truncate(true)

    /* ----------------------------------- Users ----------------------------------- */
    const user = await User.create({
      email: 'danielstarling4@gmail.com',
      password: 'test',
    })

    /* ---------------------------------- Bobs ---------------------------------- */
    const bobs = await Bob.createMany([
      { name: 'Bob', minerals: 200 },
      { name: 'Riker', minerals: 300 },
    ])
    await Promise.all(bobs.map(async (bob) => await user.related('bobs').save(bob)))

    /* --------------------------------- Drones --------------------------------- */
    await Promise.all(
      bobs.map(async (bob) => {
        await Drone.create({ bobId: bob.id })
        await Drone.create({ bobId: bob.id })
        await Drone.create({ bobId: bob.id })
        await Drone.create({ bobId: bob.id })
      })
    )

    /* -------------------------------- Minerals -------------------------------- */
    await Mineral.create({ name: '1', payload: 100 })
    await Mineral.create({ name: '2', payload: 100 })
    await Mineral.create({ name: '3', payload: 100 })
    await Mineral.create({ name: '4', payload: 100 })
  }
}
