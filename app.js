var http=require('http');
var fs=require('fs');

var usernames = [];
var numUsers = 0;

var server= http.createServer( function (req,res){
    fs.readFile('./index.html','utf-8',function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data)
    })
})

var io=require('socket.io').listen(server)
io.sockets.on("connection",function (socket){
    numUsers++;
    socket.emit("message","connexion réussie id: "+socket.id)
    console.log('Un client est connecté !')
    socket.broadcast.emit('message','Un autre client vient de se connecter !');
    socket.broadcast.emit('connecteds',numUsers);

    socket.on('message',function(message){
        console.log('Message Client: '+message);
        socket.broadcast.emit('message',socket.pseudo+':'+message)
    });
    socket.on('pseudo',function(pseudo){
        socket.pseudo=pseudo;
        usernames[socket.id]=pseudo
        console.log('pseudo: '+pseudo);
        socket.broadcast.emit('message',pseudo+' est en ligne.');


    });
})


server.listen(8081)
