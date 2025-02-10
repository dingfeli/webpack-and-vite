import fs from 'node:fs';

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function printFileContent(input_path: string): void {
    fs.readFile(input_path, (err, data) => {
        if (err != null) {
            console.log(`error reading file: ${err}`);
            return;
        }
        const content = data.toString();
        console.log(`File content is: ${content}`);
    });
    return;
}
