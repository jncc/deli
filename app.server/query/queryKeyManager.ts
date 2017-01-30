
import { Query } from "./query";


export function getKey(query: Query) {
    return "js3hf9ag5";
}

export function getQuery(key: string): Query {

    if (key == "may2016demo") {
        return {
            dataset: "s2-ard",
            bbox:  [-15, 45, 15, 65],
            start: new Date("2016-05-01"),
            end:   new Date("2016-05-31"),
        }
    } else if (key == "fulldemo") {
        return {
            dataset: "s2-ard",
            bbox:  [-15,45,15,65],
            start: new Date("2014-01-01"),
            end:   new Date("2020-01-01"),
        }
    } else {
        return {
            dataset: "s2-ard",
            bbox:  [-15,45,15,65],
            start: new Date("2014-01-01"),
            end:   new Date("2020-01-01"),
        }
    }
}
