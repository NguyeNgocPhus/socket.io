var express = require("express");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./view");
var server = require("http").Server(app);

var io = require("socket.io")(server);
var a=["aaa"];

server.listen(4000);
io.on("connection",(socket)=>{
    console.log("co nguoi ket noi : "+socket.id);
    socket.on("client-send-name",(data)=>{
        if(a.indexOf(data)>=0){//tra ve vi tri cua date
             socket.emit("server-send-fail")
        }
        else{
            a.push(data);
            socket.name=data;
            socket.emit("dk-thanhcong",data);
            io.sockets.emit("server-send-name",a);
        }
    });
    socket.on("messenger-send",(data)=>{
        io.sockets.emit("server-send-messenger",{a:socket.name,b:data});
    });
    socket.on("logout",(data)=>{
        a.splice(a.indexOf(data),1);
        io.sockets.emit("server-send-name",a);
        //socket.broadcast.emit("vetrangchu",data);
        
    });
})
app.get("/",(req,res)=>{
     res.render("trangchu");
});
