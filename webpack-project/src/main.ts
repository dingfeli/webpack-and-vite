import * as vp from 'vite-project';
import path from 'path';
import 'vite-project/some_file';

function main(): void {
    const a = 1;
    const b = 2;
    const res = vp.add(a, b);
    const filePath = path.join(__dirname, '/assets/some_file');
    vp.printFileContent(filePath);
    vp.helloFromNative();
    console.log(`Ans from operation: ${res}`);
}

main();
