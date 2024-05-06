import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("hotels").del();

    // Inserts seed entries
    await knex("hotels").insert([
        { id: 1, name: "Marriot", city: "New York"},
        { id: 2, name: "Marriot", city: "Paris" },
        { id: 3, name: "Hyatt", city: "New York" },
        { id: 4, name: "Hyatt", city: "Sydney" }
    ]);

    await knex("upgrades").insert([
        { id: 1, price: 100, type: "junior suite", hotel_id: 1},
        { id: 2, price: 200, type: "master suite", hotel_id: 1},
        { id: 3, price: 45, type: "early check-in", hotel_id: 1},
        { id: 4, price: 29, type: "breakfast", hotel_id: 1},
        { id: 5, price: 70, type: "airport pick-up", hotel_id: 2},
        { id: 6, price: 500, type: "presidential suite", hotel_id: 3},
        { id: 7, price: 500, type: "harbour view", hotel_id: 4},
    ]);
};
