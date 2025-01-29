import { type SchemaTypeDefinition } from 'sanity'
import order from './order'
import menu from './menu'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menu,order],
}
