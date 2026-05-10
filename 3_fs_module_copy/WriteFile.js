import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const htmlCode = `
    <html>
        <head></head>
        <body>
            <div>this is div</div>
        </body>
    </html>
`;

writeFile('./testing.html', htmlCode, 'utf-8');
writeFile('./testing.txt', 'New text', 'utf-8');