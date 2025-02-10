import fs from 'fs';

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function printFileContent() {
    fs.readFile("some_file", (err, data) => {
        if (err != null) {
            console.log(`error reading file: ${err}`);
            return;
        }
        const content = data.toString();
        console.log(`File content is: ${content}`);
    });
}
