var http=require('http');
var fs=require('fs');

var server= http.createServer( function (req,res){
    fs.readFile('./index.html','utf-8',function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data)
    })
})

var io=require('socket.io').listen(server)
io.sockets.on("connection",function (socket){
    socket.emit("message","connexion réussie id: "+socket.id)
    console.log('Un client est connecté !')
    socket.broadcast.emit('message','Un autre client vient de se connecter !');
    socket.on('message',function(message){
        console.log('Un client me parle ! Il me dit : '+message);
        socket.broadcast.emit('message',message)
    });
})


server.listen(80)
