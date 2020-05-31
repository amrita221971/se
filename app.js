/////ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine' , 'ejs');

var http = require("http").createServer(app);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use('/css',express.static(__dirname + 'public/css'));


const routes = require('./routes/Routes');




//sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
/////////////////////////// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://seLab:selabpwd@cluster0-qlodt.mongodb.net/db';
const mongoDB = dev_db_url;
mongoose.connect(mongoDB,{  useNewUrlParser: true });
const dB = mongoose.connection;
dB.on('error', console.error.bind(console, 'mongoDB connection error:'));
////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////



const Student = require("./models/student");
const Mentor = require("./models/mentor");
const Message = require("./models/messages");

function myDate(){
  var date_ob=new Date();
  let date = date_ob.getDate();
  let mon = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hr = date_ob.getHours();
  let minute = date_ob.getMinutes();
  var month='';
  switch(mon)
  {case 1:month=month+'Jan';break;case 2:month=month+'Feb';break;case 3:month=month+'Mar';break;
   case 4:month=month+'Apr';break;case 5:month=month+'May';break;case 6:month=month+'Jun';break;
   case 7:month=month+'Jul';break;case 8:month=month+'Aug';break;case 9:month=month+'Sep';break;
   case 10:month=month+'Oct';break;case 11:month=month+'Nov';break;case 12:month=month+'Dec';break;
  }

  var d=String(hr)+':'+String(minute)+'  '+String(date)+String(month);
  return String(d);
}

app.get('/chat',function(req,res){
  res.render('index.ejs');
});


app.get('/chatroom/:id', function (req, res) {
  var id = req.params.id;



  Student.findById(id, function (err, user)
    { var info = { id: user._id, user: user,name:user.name };

    Message.find({receiverName:'forum'},function(err,msg){
      res.render("chatroom.ejs", { info: info,msg:msg});

      });

    });




});
app.get('/chatroomm/:id', function (req, res) {
  var id = req.params.id;



  Mentor.findById(id, function (err, user)
    { var info = { id: user._id, user: user,name:user.name };

    Message.find({receiverName:'forum'},function(err,msg){
      res.render("chatroomm.ejs", { info: info,msg:msg});

      });

    });




});



app.get('/chat/:mid/:sid/:mnm' ,function (req, res) {
  // console.log(req.params.sid);
  // console.log(req.params.mid);

  var sid = req.params.sid;
  var mid = req.params.mid;
  var mnm = req.params.mnm;
  Student.findById(sid, function (err, user)
    { var info = { id: user._id, user: user,name:user.name,mnm:mnm,mid:mid };

    Message.find({$or:[{receiverName:mnm,senderName:user.name},{receiverName:user.name,senderName:mnm}]},function(err,msg){
      res.render("chat.ejs", { info: info,msg:msg});

      });

    });

});


app.get('/chatm/:mid/:sid/:snm' ,function (req, res) {
  // console.log(req.params.sid);
  // console.log(req.params.mid);

  var sid = req.params.sid;
  var mid = req.params.mid;
  var snm = req.params.snm;
    // {$or:[{"groupA": data}, {"groupB": data}]}
    Mentor.findById(mid, function (err, user)
      { var info = { id: user._id, user: user,name:user.name,snm:snm };

      Message.find({$or:[{receiverName:snm,senderName:user.name},{receiverName:user.name,senderName:snm}]},function(err,msg){
        res.render("chatm.ejs", { info: info,msg:msg});

        });

      });

});


var io = require("socket.io")(http);
io.on('connection', function(socket){
  // console.log('chatroom');
  var room='';
  socket.join('forum');
  socket.on('mM join',function(x)
    {room=''+x.snm+x.mnm;
      socket.join(room);
      console.log(x.snm + " and "+x.mnm +" joined "+room);
    });
  socket.on('mM message', function(msg)
      {var d=myDate();

        if(msg.s==='0')
        {let output={name:msg.snm,message:msg.message,date:d};
         io.in(room).emit('mM message',output);
         let message = new Message({ senderName:msg.snm,receiverName:msg.mnm ,message: msg.message ,date:d });
           message.save(function (err,message){});
        }
        else{
          let output={name:msg.mnm,message:msg.message,date:d};
           io.in(room).emit('mM message',output);
           let message = new Message({ senderName:msg.mnm,receiverName:msg.snm ,message: msg.message ,date:d });
            message.save(function (err,message){});
        }
      });
  socket.on('forum message', function(msg)
      {var d=myDate();
       let output={name:msg.name,message:msg.message,date:d};
//      if(output.message!=''){
        io.in('forum').emit('forum message',output);
        var d=String(myDate());
        let message = new Message({ senderName:msg.name, receiverId:'forum',receiverName:'forum' ,message: msg.message ,date:d });

        message.save(function (err,message){});
      });


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', routes);


http.listen(3000, function() {
    console.log("Listening on : 3000");
});
