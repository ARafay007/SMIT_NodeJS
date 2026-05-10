import fs from 'fs';
import { promisify } from 'util';

const appendFile = promisify(fs.appendFile);

appendFile('./testing.txt', '. Another new text', 'utf-8');