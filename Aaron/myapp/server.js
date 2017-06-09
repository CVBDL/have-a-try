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

app.get('/vm_get', function (req, res) {
  var readline = require('readline'); 
  var fs = require('fs');
  var os = require('os');

  var fReadName = 'public/assets/data/vm.txt';   
  var fRead = fs.createReadStream(fReadName);  
  var objReadline = readline.createInterface({  
    input: fRead,
    });
  var tmp = "";
  objReadline.on('line', (line)=>{
    tmp += line + ',';
  });

  objReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log('readline close...');  
    //console.log(newdata); 
    res.end(newdata);
  });
  
})
 
app.get('/member_get', function (req, res) {
  var readline = require('readline'); 
  var fs = require('fs');
  var uReadMem = 'public/assets/data/user.txt';   
  var uRead = fs.createReadStream(uReadMem);  
  var memReadline = readline.createInterface({  
     input: uRead,
     });
  var tmp = "";
  memReadline.on('line', (line)=>{
    tmp += line + ',';
  });

  memReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log(newdata);  
    res.end(newdata);
  }); 
})

app.post('/member_post', urlencodedParser, function (req, res) {
   // Output JSON
   var response = {
       "text":req.body.text
   };
   console.log(response);
   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/user.txt';

    fs.appendFile(outputFilename, '\n' + JSON.stringify(myData), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });
   res.end(JSON.stringify(response));
})

app.post('/vm_post', urlencodedParser, function (req, res) {
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
   //console.log(response);

   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/vm.txt';

    fs.appendFile(outputFilename, '\n' + JSON.stringify(myData), function(err) {
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