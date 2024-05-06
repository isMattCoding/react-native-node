import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('hotels', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable(),
      tbl.string('city', 255).notNullable()
    })
    .createTable('upgrades', function(table) {
      table.increments('id').primary();  // Primary key
      table.integer('price').notNullable();  // Upgrade price
      table.string('type').notNullable();  // Upgrade price
      table.integer('hotel_id')  // Reference to hotels table
        .unsigned()
        .notNullable()
        .references('id')  // Links to primary key of hotels
        .inTable('hotels')
        .onDelete('CASCADE');  // Deletes upgrades if hotel is deleted
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('hotels')
    .dropTableIfExists('upgrades')
}
