

export class Query {
  dataset: string
  bbox:  [number, number, number, number]
  start: string
  end:   string
}

export function defaultQuery(): Query {
  return {
    dataset:  "s2-ard",
    bbox:  [-5, 53, 2, 57],
    start: "2016-05-01",
    end:   "2016-05-31",
  }
}
