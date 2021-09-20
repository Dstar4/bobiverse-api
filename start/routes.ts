/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Authentication
Route.post('login', 'AuthController.login')

// Protected Routes
Route.group(() => {
  /* ---------------------------------- /bobs ---------------------------------- */
  Route.get('bobs', 'BobsController.all')
  Route.post('bobs', 'BobsController.create')
  Route.get('bob/:id', 'BobsController.show')
  Route.patch('bob/:id', 'BobsController.update')
  Route.get('bob/:id/drones', 'BobsController.showDrones')
  Route.get('bob/:id/scan', 'BobsController.scan')

  /* --------------------------------- /drones --------------------------------- */
  Route.get('drones', 'DronesController.index')
  Route.get('drone/:id', 'DronesController.show')
  Route.get('drone/:id/mine/:target', 'DronesController.mine')
  Route.get('drone/:id/stop', 'DronesController.stopAction')

  /* ---------------------------------- /jobs --------------------------------- */
  Route.get('jobs', 'JobsController.index')

  /* -------------------------------- /minerals -------------------------------- */
  Route.get('minerals', 'MineralsController.index')
}).middleware('auth:api')

// Public Routes
Route.get('/', async () => {
  return { hello: 'world' }
})
