import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddOwnerToJobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('target_id').references('id').inTable('minerals').onDelete('CASCADE')
    })
  }

  public async down() {
    // this.schema.dropTable(this.tableName)
  }
}
