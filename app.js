var mySerial, 
    _e,
    parser_regexp;

var atDining,
    atBedroom,
    atKitchen,
    atLiving,
    temperature = '';

var intervalEvent = function() {
    var output = "温度　"+temperature+"度<br/>";    
  
  output += "ベッドルームに　"+(atBedroom?'います':'いません')+"<br/>";
  output += "キッチンに　"+(atKitchen?'います':'いません')+"<br/>";
  output += "食卓に　"+(atDining?'います':'いません')+"<br/>";
               output += "リビングルームに　"+(atLiving?'います':'いません')+"<br/>";
  
        _e.innerHTML = output;
}

var launchEvent = function() {
  
  console.log("launch");
  mySerial = new TCPSerial();	// オブジェクトの生成
  mySerial.setParams("ttyACM0",9600);	// 接続デバイスと、bitrateの指定
  mySerial.onread = function(msg) {		// キャラクタ受信時の処理
    var recv = msg.replace("\n","").match(parser_regexp);
    if(recv && recv.length > 2){
      temperature = recv[2];
      atDining = recv[1][0]=='1';
      atBedroom = recv[1][1]=='1';
      atKitchen = recv[1][2]=='1';
      atLiving = recv[1][3]=='1';
    }      

//       var _atDining = '';
//         var _atBedroom = '';
//         var _atKitchen = '';
//         var _atLiving = ''; 
      
      
//         if(recv[1].chatAt(0)=='1'){ 
//           _atDining = 'います';
//         }else{ 
//           _atDining = 'いません';
//         }
//       console.log(_atDining);

//       if(recv[1].chatAt(1)=='1'){ 
//         atKitchen = 'います';
//       }else{  
//         atKitchen='いません'; 
//       }
//       if(recv[1].chatAt(2)=='1'){ atDining = 'います'; }else{ atDining='いません'; }
//       if(recv[1].chatAt(3)=='1'){ atLiving = 'います'; }else{ atLiving='いません'; }
      
//       opt += "<br />";
//       opt += "ベッドルームに　"+atBedroom+"<br/>";
//       opt += "キッチンに　"+atKitchen+"<br/>";
//       opt += "食卓に　"+atDining+"<br/>";
//       opt += "リビングルームに　"+atLiving+"<br/>";
//       console.log(output);

//             _e.innerHTML += output;
//             _e.innerHTML += output;
//             _e.innerHTML += output;
//             _e.innerHTML += output;
//     }

  };
  mySerial.connect("127.0.0.1",9943);	// serialdへの接続
  // mySerial.send("a");

  parser_regexp = new RegExp("{n:([0-9]+),t:([\-\+0-9.]+)}");

  _e = document.getElementById('test');
  
  setInterval(intervalEvent, 1000);
  
};
launchEvent();

// ライフサイクルイベント
// 機能しません
// var closeEvent = function() {

//     console.log("close");
//   if(mySerial){
//     console.log("disconnect");
//     mySerial.disconnect();
//   }
// };

//     console.log("fsdfs");
//   window.addEventListener('webapps-launch', launchEvent);
//   window.addEventListener('webapps-close', closeEvent);

