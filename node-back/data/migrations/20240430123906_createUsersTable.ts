import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments(),
    tbl.string('username', 128).notNullable().unique().index(),
    tbl.string('password', 255).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users')
}
