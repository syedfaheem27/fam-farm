const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
//FILE Reading and Writing

//Synchronous file reading and writing
// const textInp = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInp);
// fs.writeFileSync("./txt/output.txt", textInp, "utf-8");
//////////////////////////////////////////////////

//Asynchronous file reading and writing
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       const dataAppend = `${data2}\n\n${data3}`;
//       console.log(dataAppend);
//       fs.writeFile("./txt/final.txt", dataAppend, (err) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log("Final.txt written successfully");
//         }
//       });
//     });
//   });
// });

// console.log("Asynchronous reading and writing starts!\n");
/////////////////////////////////////////////////////

//SERVER

//Reading data synchronously
//No point in reading the same data over and over again
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(data => slugify(data.productName, { lower: true }));

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const output = dataObj
      .map(data => {
        return replaceTemplate(cardTemplate, data);
      })
      .join('');
    const overview = overviewTemplate.replace('{%PRODUCT_CARDS%}', output);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(overview);
  } else if (pathname === '/products') {
    const product = dataObj[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Page Not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server running on port 8000');
});
