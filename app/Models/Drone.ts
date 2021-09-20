import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Bob from 'App/Models/Bob'
import Job from 'App/Models/Job'

export default class Drone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public bobId: number

  @column()
  public jobId: number

  @belongsTo(() => Bob)
  public bob: BelongsTo<typeof Bob>

  @belongsTo(() => Job)
  public job: BelongsTo<typeof Job>
  // public job: HasOne<typeof Job>
}
