import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bobs extends BaseSchema {
  protected tableName = 'bobs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name')
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('minerals').defaultTo(0)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
