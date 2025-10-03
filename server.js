import http from 'http';
import fs from 'fs/promises'
import url from 'url';
import path, { dirname } from 'path';
const PORT = process.env.PORT ;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

const server = http.createServer(async (req, res) => {
try {
  if(req.method === 'GET'){
 let filepath ;
    if (req.url === "/") {
    filepath = path.join(__dirname, 'public', 'index.html');
    } else if (req.url === "/about") {
      filepath = path.join(__dirname, 'public', 'about.html');
    } else {
      filepath = path.join(__dirname, 'public', '404.html');
    }


    const data = await fs.readFile(filepath);
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  } else {
    throw new Error('Unsupported request method');
  }
} catch (error) {
   res.writeHead(500, { "Content-Type": "text/plain" });
   res.end(
     "<h1>500 Internal Server Error</h1><p>Something went wrong.</p>"
   );
}


});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
