const hotel_database = require('../dbConfig');

function findAllUpgradesByHotel(hotel_id: number) {
  return hotel_database('upgrades').where({ hotel_id })
}

function findAllHotels() {
  return hotel_database('hotels')
}

module.exports = {
  findAllUpgradesByHotel,
  findAllHotels
}
