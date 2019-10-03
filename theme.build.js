var find = require('find');
const fs = require('fs');
const concat = require('concat');

find.file(/\.theme.scss$/, 'src', function(files) {
  const distDir = './src/dist/lib/scss';
  const distFile = `${distDir}/sprinkles.scss`;

  if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir, { recursive: true });
  }

  concat(files, distFile).then(() => {
    var data = fs.readFileSync(distFile);
    var fd = fs.openSync(distFile, 'w+');
    var buffer = new Buffer(`@import '~@ipreo/cupcake/src/scss/config/_tokens.scss';\n`);
  
    fs.writeSync(fd, buffer, 0, buffer.length, 0); 
    fs.writeSync(fd, data, 0, data.length, buffer.length);
    fs.close(fd, (error) => {
      if(error) console.log(error);
    });
  })
});
