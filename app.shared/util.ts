
export function flatMap<T, R>(ts: T[], f: (t: T) => R[]) {
    let mapped = ts.map(t => f(t));
    if (mapped.length === 0) {
        return [];
    } else {
        return mapped.reduce((a, b) => a.concat(b));
    }
}


// tests!
interface Shape {
    numbers: number[];
}

let fat: Shape[] = [
    { numbers: [1,2,3] },
    { numbers: [4,5,6] },
];

let flattened = flatMap(fat, a => a.numbers);
console.log(flattened);

let empty: Shape[] = [];
console.log(flatMap(empty, x => x.numbers));
