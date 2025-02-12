import * as vp from 'vite-project';
import path from 'path';
import 'vite-project/some_file';
import 'vite-project/hello.node';

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
