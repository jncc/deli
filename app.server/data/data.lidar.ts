
import { ProductCollection } from './../handlers/products/models'

// dynamically load the json using require
let x = require('./data.lidar.json')

export const collections: ProductCollection[] = x.data
