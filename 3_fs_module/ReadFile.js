import fs from 'fs';
import { promisify } from 'util';

// READING FILE ASYNCHRONOUSLY WITH CALL BACK FUNCTION
// fs.readFile('./testing.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     }

//     console.log(data);
// });

// READING FILE ASYNCHRONOUSLY WITH THEN CATCH METHOD
// const readFile = promisify(fs.readFile);

// readFile('./testing.html', 'utf-8')
// .then(
//     (data) => {
//         console.log(data);
//     }
// ).catch((error) => {
//     console.log(error);
// });

const readFile = promisify(fs.readFile);

const readFromFile = async () => {
    try{
        const data = await readFile('./testing.html', 'utf-8');
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
};

readFromFile();

// const obj = {
//     name: 'abc',
//     color: 'black',
//     dob: 2000,
//     calcAge: function(){
//         console.log(2026 - this.dob);
//     },
//     // city: function(){
//     //     console.log('thisi is city');
//     // }
// };

// console.log(obj.name);
// obj.calcAge();
// obj?.class
// obj.city?.();