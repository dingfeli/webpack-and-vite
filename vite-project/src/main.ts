import fs from 'node:fs';

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

// This export function makes use of an asset that is povided by the library itself. 
// However, the location of said asset is managed by the consuming package. Thus it 
// will take path as an argument since the library would have no idea where said asset
// will be moved to during the final build. 
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
