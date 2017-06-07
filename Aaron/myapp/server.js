var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
// Create application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
  var readline = require('readline'); 
  var fs = require('fs');
  var os = require('os');

  var fReadName = 'public/assets/data/vm.txt';  
  var fWriteName = 'public/assets/data/vm.json';  
  var fRead = fs.createReadStream(fReadName);  
  var fWrite = fs.createWriteStream(fWriteName);
  var objReadline = readline.createInterface({  
    input: fRead,
    });

  //fWrite.write('[' + os.EOL);
  objReadline.on('line', (line)=>{   
    var tmp = line + ',';  
    fWrite.write(tmp + os.EOL); 
  });

  // objReadline.on('myevent', function(arg) {
    
  // });
  
  objReadline.on('close', ()=>{
    // objReadline.emit('myevent', 'test');
    // fWrite.write(']' + os.EOL);
    var data=fs.readFileSync("public/assets/data/vm.json","utf-8");
    var newdata=data.substring(0,data.length-3);
    console.log(newdata); 
    fs.writeFile("public/assets/data/vm.json",newdata,function(err){
      if(err) {
          return console.log(err);
      } else {
      console.log("The file was saved!");
      }
    });
    fs.writeFile("public/assets/data/vm.json",'['+newdata+']',function(err){
      if(err) {
          return console.log(err);
      } else {
      console.log("The file was saved!");
      }
    });
    console.log('readline close...');  
  });
  //var response = JSON.parse(fs.readFileSync('public/assets/data/vm.json'));
  //console.log(response);
  //res.end(JSON.stringify(response));
})
 
app.post('/process_post', urlencodedParser, function (req, res) {
   // Output JSON
   var response = {
       "host_name":req.body.host_name,
       "ip_address":req.body.ip_address,
       "op_system": req.body.op_system,
       "owner": req.body.owner,
       "email": req.body.email,
       "production": req.body.production,
       "notes": req.body.notes
   };
   console.log(response);

   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/vm.txt';

    fs.appendFile(outputFilename, JSON.stringify(myData), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });

   res.end(JSON.stringify(response));
})
 
var server = app.listen(8282, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Address: http://%s:%s", host, port)
 
})