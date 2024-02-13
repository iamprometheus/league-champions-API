import { readJSON, compareStrings } from '../utils.js'

const champions = readJSON('./champions.json')

export class ChampionModel {
  static async getAll () {
    return champions
  }

  static async getByName ({ name }) {
    return champions.find(champ => compareStrings(champ.name, name))
  }

  static async getByPosition ({ position }) {
    return champions.filter(champ => champ.positions.some(p => compareStrings(p, position)))
  }

  static async getByRegion ({ region }) {
    return champions.filter(champ => champ.region.some(r => compareStrings(r, region)))
  }

  static async getBySpecies ({ species }) {
    return champions.filter(champ => champ.species.some(r => compareStrings(r, species)))
  }

  static async getByYear ({ year }) {
    year = year.toString()
    return champions.filter(champ => champ.release_year === year)
  }

  static async getByFilters (query) { /* eslint-disable */
    const { gender, positions, species, resource, region, range_type, release_year } = query 
    /* eslint-enable */
    let champs = champions.slice()

    if (gender) champs = champs.filter(champ => compareStrings(champ.gender, gender))
    if (positions) champs = champs.filter(champ => champ.positions.some(p => compareStrings(p, positions)))
    if (species) champs = champs.filter(champ => champ.species.some(s => compareStrings(s, species)))
    if (resource) champs = champs.filter(champ => compareStrings(champ.resource, resource))
    if (region) champs = champs.filter(champ => champ.region.some(r => compareStrings(r, region)))
    /* eslint-disable */
    if (range_type) champs = champs.filter(champ => champ.range_type.some(r => compareStrings(r, range_type)))
    if (release_year) champs = champs.filter(champ => champ.release_year === release_year.toString()) 
    /* eslint-enable */
    return champs
  }
}
