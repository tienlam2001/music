var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const fs = require("fs")

var app = express();

var data = fs.readFileSync('data.json');
var words = JSON.parse(data)

const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", (req, res)=>{
  res.sendFile(__dirname + "/data.json")
})

io.on('connection', (socket) => {
    console.log("Connection Successful")
  	console.log(socket.handshake.time)
  socket.on("disconnect",()=>{
    console.log("user disconneted")
  })
  socket.on('chat message', msg=>{
    console.log('message: ' + msg)
    io.emit("chat message", msg)
   words["message"].push(msg)
   let newData = JSON.stringify(words)
   fs.writeFile('data.json', newData, (err)=>console.log("ok"));
    console.log(newData)
  })
})


// catch 404 and forward to error handler














// This is bull shit















app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
http.listen(4000, () => {
	console.log("connect 4000")
});
// module.exports = app;
