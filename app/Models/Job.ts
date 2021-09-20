import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Drone from 'App/Models/Drone'
import Mineral from 'App/Models/Mineral'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column.dateTime()
  public completeAt: DateTime

  @column()
  public ownerId: number

  @hasOne(() => Drone, {})
  public owner: HasOne<typeof Drone>

  @column()
  public targetId: number

  @hasOne(() => Mineral)
  public target: HasOne<typeof Mineral>
}
