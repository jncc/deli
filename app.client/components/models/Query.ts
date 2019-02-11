

export class Query {
  collections: string[]
  bbox:        number[] //[number, number, number, number]
  offset?:     number
  limit?:      number
  start:       string
  end:         string
}
