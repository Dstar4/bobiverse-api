import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddJobToDrones extends BaseSchema {
  protected tableName = 'drones'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('job_id').references('id').inTable('jobs').onDelete('CASCADE')
    })
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
  }
}
