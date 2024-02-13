import z from 'zod'

const champScheme = z.object({
  name: z.string({
    invalid_type_error: 'Champion name must be a string',
    required_error: 'Champion name is required'
  }),
  gender: z.string(
    z.enum(['Masculino', 'Femenino', 'Otro']),
    {
      invalid_type_error: 'Champion gender must be a string',
      required_error: 'Champion gender is required'
    }
  ),
  positions: z.array(
    z.enum(['Superior', 'Jungla', 'Central', 'Inferior', 'Soporte']),
    {
      required_error: 'Champion position is required',
      invalid_type_error: 'Champion position must be an array of enum Positions'
    }
  ),
  species: z.array(z.string()),
  resource: z.string({
    invalid_type_error: 'Champion resource must be a string',
    required_error: 'Champion resource is required'
  }),
  range_type: z.array(
    z.enum(['Cuerpo a Cuerpo', 'De Rango'])
  ),
  region: z.array(z.string()),
  release_year: z.number().int().min(2009),
  icon_url: z.string().url({
    message: 'quote icon url must be a valid URL'
  }),
  encrypted_champ_icon_url: z.string().url({
    message: 'quote icon url must be a valid URL'
  }),
  encrypted_quote_icon_url: z.string().url({
    message: 'quote icon url must be a valid URL'
  }),
  abilities: z.array(z.string()),
  emojis: z.array(z.string()),
  quotes: z.array(z.string()),
  abilities_icons_url: z.array(z.string().url({
    message: 'quote icon url must be a valid URL'
  }),
  {
    message: 'abilities_icons_url must be an array of valid URLs'
  }
  ),
  aka: z.string({
    invalid_type_error: 'Champion gender must be a string',
    required_error: 'Champion gender is required'
  })
})

export const validateChampion = (object) => {
  return champScheme.safeParse(object)
}
