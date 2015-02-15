var cnt = 0;

var mySerial = new TCPSerial();	// オブジェクトの生成
mySerial.setParams("ttyACM0",9600);	// 接続デバイスと、bitrateの指定
mySerial.onread = function(msg) {		// キャラクタ受信時の処理
  var _e = document.getElementById('test');
  _e.innerHTML = "Recv: "+ msg +" <br />Count "+cnt;
};
mySerial.connect("127.0.0.1",9943);	// serialdへの接続
// mySerial.send("a");
  
var _e = document.getElementById('test');
_e.innerHTML = "Recv: <br />Count ";

$.get("https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20121121?format=json&applicationId=1049700679784035775",
function(data){
    var img = new Image();
    img.src=data.result[0].foodImageUrl;
    document.body.appendChild(img);
});
