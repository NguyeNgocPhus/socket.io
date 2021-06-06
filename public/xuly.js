var socket=io("http://localhost:4000/")
$(document).ready(()=>{
    $(".login").show();
    $(".chat").hide();
    $(".register").click(()=>{
         socket.emit("client-send-name",$(".nameuser").val());
    })
    $("#logout").click(()=>{
        socket.emit("logout",$(".nameuser").val());
        $(".login").show();
        $(".chat").hide();
    })
    $(".send").click(()=>{
        socket.emit("messenger-send",$(".txtmessenger").val());
    })


})
socket.on("server-send-fail",()=>{
       alert("co nguoi trung ten voi ban");
});
socket.on("dk-thanhcong",(data)=>{
    alert("ban da dk thanh cong");
    $(".login").hide();
    $(".chat").show();
    $(".currenUser").append("<div class='user'>"+data+"</div>")
})
socket.on("server-send-name",(data)=>{
    $(".boxconten").html("");
    data.forEach(element => {
        $(".boxconten").append("<div class='user'>"+element+"</div>");
    });    
})
socket.on("server-send-messenger",(data)=>{
      $(".messenger").append("<div class='use'>"+data.a+" : "+data.b+"</div>")  
})
