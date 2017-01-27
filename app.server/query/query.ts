

// typed query (the result of parsing a query string)

export interface Query {
  dataset: string
  bbox:    [number, number, number, number]
  // optional properties specific to dataset
  start?:  Date   // properties.capturedate start
  end?:    Date   // properties.capturedate end
  row?:    number // properties.row
  orbit?:  number // properties.orbit
}
