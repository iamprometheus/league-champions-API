import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'champions_db'
}

const connection = await mysql.createConnection(config)

export class ChampionModel {
  static async getAll () {}

  static async getByName ({ name }) {
    const lowerCaseName = name.toLowerCase()

    const [positions] = await connection.query(
      'SELECT id, position FROM positions WHERE LOWER(position) = ?', [lowerCaseName]
    )

    return positions
  }

  static async getByPosition ({ position }) {}

  static async getByRegion ({ region }) {}

  static async getBySpecies ({ species }) {}

  static async getByYear ({ year }) {}

  static async getByFilters (query) {}
}
