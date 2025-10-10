import fs from 'fs/promises'
// import fs from "fs";

// fs.readFile("./test.tst", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });


// const data =   fs.readFileSync('./test.tst', 'utf8')
// console.log(data)

// fs.readFile('./test.tst', 'utf8')
// .then((data) => console.log(data))
// .catch((err) => console.warn(err))

const readFile = async () => {
  try {
    const data = await  fs.readFile('./test.tst', 'utf8')
    console.log(data);
  } catch(err) {
    console.warn(err);
  }
}

const writeFile = async () => {
  try {
    await fs.writeFile('./test.tst', 'Hello write file')
    console.log('file written')
  } catch (error) {
    
  }
}

writeFile()
readFile();