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
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });

  objReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log('readline close...');
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
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });

  memReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    res.end(newdata);
  });
})

app.post('/member_post', urlencodedParser, function (req, res) {
   // Output JSON
   var response = {
       "text":req.body.text
   };
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

app.post('/member_del', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/user.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/user.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
}
res.end(JSON.stringify(response));
})

app.post('/vm_del', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/vm.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/vm.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
}
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

app.get('/pc_get', function (req, res) {
  var readline = require('readline');
  var fs = require('fs');
  var os = require('os');

  var fReadName = 'public/assets/data/pc.txt';
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
    input: fRead,
    });
  var tmp = "";
  objReadline.on('line', (line)=>{
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });
  objReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log('readline close...');
    res.end(newdata);
  });
})

app.post('/pc_post', urlencodedParser, function (req, res) {
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

   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/pc.txt';

    fs.appendFile(outputFilename, '\n' + JSON.stringify(myData), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });

   res.end(JSON.stringify(response));
})

app.post('/pc_del', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/pc.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/pc.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
}
res.end(JSON.stringify(response));
})

app.get('/mobile_get', function (req, res) {
  var readline = require('readline');
  var fs = require('fs');
  var os = require('os');

  var fReadName = 'public/assets/data/mobile.txt';
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
    input: fRead,
    });
  var tmp = "";
  objReadline.on('line', (line)=>{
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });
  objReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log('readline close...');
    res.end(newdata);
  });
})

app.post('/mobile_post', urlencodedParser, function (req, res) {
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


   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/mobile.txt';

    fs.appendFile(outputFilename, '\n' + JSON.stringify(myData), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });

   res.end(JSON.stringify(response));
})

app.post('/mobile_del', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/mobile.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/mobile.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
}
res.end(JSON.stringify(response));
})

app.get('/mac_get', function (req, res) {
  var readline = require('readline');
  var fs = require('fs');
  var os = require('os');

  var fReadName = 'public/assets/data/mac.txt';
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
    input: fRead,
    });
  var tmp = "";
  objReadline.on('line', (line)=>{
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });
  objReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    console.log('readline close...');
    res.end(newdata);
  });
})

app.post('/mac_post', urlencodedParser, function (req, res) {
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


   var fs = require('fs');

    var myData = response;

    var outputFilename = 'public/assets/data/mac.txt';

    fs.appendFile(outputFilename, '\n' + JSON.stringify(myData), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });

   res.end(JSON.stringify(response));
})

app.post('/mac_del', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/mac.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/mac.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
}
res.end(JSON.stringify(response));
})

app.get('/task_get', function (req, res) {
  var readline = require('readline');
  var fs = require('fs');
  var uReadMem = 'public/assets/data/task_todos.txt';
  var uRead = fs.createReadStream(uReadMem);
  var memReadline = readline.createInterface({
     input: uRead,
     });
  var tmp = "";
  memReadline.on('line', (line)=>{
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });
  memReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    res.end(newdata);
  });
})

app.get('/done_get', function (req, res) {
  var readline = require('readline');
  var fs = require('fs');
  var uReadMem = 'public/assets/data/task_dones.txt';
  var uRead = fs.createReadStream(uReadMem);
  var memReadline = readline.createInterface({
     input: uRead,
     });
  var tmp = "";
  memReadline.on('line', (line)=>{
    if(line=="")
      console.log("blank line");
    else
      tmp += line + ',';
  });
  memReadline.on('close', ()=>{
    var data=tmp.substring(0,tmp.length-1);
    var newdata = '[' + data + ']';
    res.end(newdata);
  });
})

app.post('/task_dones', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/task_dones.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
  }
  res.end(JSON.stringify(response));
})

app.post('/task_todos', urlencodedParser, function (req, res) {
  var response = req.body;
  var fs = require('fs');

  fs.writeFileSync('public/assets/data/task_todos.txt',"");
  for (var i = 0; i < response.length; i++) {
    fs.appendFile('public/assets/data/task_todos.txt', '\n' + JSON.stringify(response[i]), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved Successed");
        }
    })
  }
  res.end(JSON.stringify(response));
})

var server = app.listen(8282, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Address: http://%s:%s", host, port)

})