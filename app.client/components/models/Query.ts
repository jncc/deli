

export class Query {
  collections: string[]
  bbox:  [number, number, number, number]
  start: string
  end:   string
}

export function defaultQuery(): Query {
  return {
    collections:  ["s2-ard"],
    bbox:  [-8, 53, 0, 57],
    start: "2016-06-01",
    end:   "2016-06-31",
  }
}
