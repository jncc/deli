

export interface Query {

  collections: string[]
  bbox:    [number, number, number, number] // [minX, minY, maxX, maxY]
  offset?: number
  limit?: number

  // optional properties, specific to dataset
  start?:  string   // properties.capturedate start
  end?:    string   // properties.capturedate end
  row?:    number   // properties.row
  orbit?:  number   // properties.orbit
}
