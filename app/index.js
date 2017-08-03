var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        //socket.broadcast.emit('chat message', msg); // bu foksiyon baglantiyi gonderen kisi disindakilerde client tarafindaki belirtilen fonksiyon calisiyor.
        //socket.emit('chat message',msg); // Bu sadece gonderen client tarafinda calisir.
        io.emit('chat message', msg); // Bu gonderen ve diger client tarafinda calisan client tarafindaki fonksiyonu cagirir.
        //io.sockets.emit('chat message', msg); // io.emit ile ayni gorevi yapar.

        /*
        *
        * Senaryo client tarafinda olusturan fonksiyonlar socket.on ile baglaniyor sonrasinda  client tarafindan socket.emit ile
        * server tarafindaki belirtilen methoda erisiyor bu method icerisinde kullanilan socket.emit yada io.emit gibi parametreler ile
        * sadece gonderen client mi yoksa diger clientlara da mi yoksa gonderen haricinde tum clientlara mi gonderilcek veri bununu uygun
        * erisim codu kullanarak client tarafina gonderiyoruz.
        *
        */
    });
});

http.listen(3000, function(){
    console.log('Listening on :3000');
});