var mySerial, 
    _e,
    parser_regexp,
    cookImage,
    audio,
    musictitle;

var atDining,
    atBedroom,
    atKitchen,
    atLiving,
    temperature = '';

var _playFlag = false;
var current_song = "";

var intervalEvent = function() {
    var output = "温度　"+temperature+"度<br/>";    
  
//   output += "ベッドルームに　"+(atBedroom?'います':'いません')+"<br/>";
//   output += "キッチンに　"+(atKitchen?'います':'いません')+"<br/>";
//   output += "食卓に　"+(atDining?'います':'いません')+"<br/>";
//   output += "リビングルームに　"+(atLiving?'います':'いません')+"<br/>";
  
  if(atKitchen){
    cookImage.className = 'animated fadeInLeft';
  }else{
    cookImage.className = 'animated fadeOutLeft';
  }
  
  _e.innerHTML = output;
  
  _background_style = function(url){
    return "url\("+url+"\) no-repeat fixed center center / cover transparent"
  };
  
  if(atKitchen){
    playAudio("music/kitchen.mp3");
    document.body.style.background = _background_style("house/house_00010.png");
  }else if(atLiving){
    playAudio("music/living.mp3");
    document.body.style.background = _background_style("house/house_01000.png");
  }else if(atBedroom){
    playAudio("music/bedroom.mp3"); 
    document.body.style.background = _background_style("house/house_10000.png");
  }else if(atDining){
    playAudio("music/kakusei.mp3"); 
    document.body.style.background = _background_style("house/house_00100.png");
  }else{
    pauseAudio();
    document.body.style.background = _background_style("house/house_00000.png");
  }
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


  };
  mySerial.connect("127.0.0.1",9943);	// serialdへの接続
  // mySerial.send("a");

  parser_regexp = new RegExp("{n:([0-9]+),t:([\-\+0-9.]+)}");

  _e = document.getElementById('test');
  cookImage = document.getElementById('cook');
  audio = document.getElementsByTagName("audio")[0];
  musictitle = document.getElementById('musictitle');
  
  // loadImage
  var img_url = ['house/house_00000.png','house/house_00010.png','house/house_00100.png','house/house_01000.png','house/house_10000.png'];
  for(var i = 0; i < img_url.length; i++){
    new Image().src=img_url[i];
  }
  
  setInterval(intervalEvent, 500);
  
};
launchEvent();

var playAudio = function(song) {
  
  if(!_playFlag || current_song !== song){
    if(audio){
        _playFlag = true;
        current_song = song;
        audio.src = song;
       audio.addEventListener("canplay",function(){
         audio.removeEventListener("canplay",self);
         audio.currentTime = 0;
         
         switch(song){
           case "music/bedroom.mp3":
             musictitle.innerHTML = "目覚め用ベッド-仮想都市OZ.mp3";
             break;
           case "music/kitchen.mp3":
             musictitle.innerHTML = "キューピー3分クッキング　テーマ曲　（Full　Version).mp3";
             break;
           case "music/living.mp3":
             musictitle.innerHTML = "ルパン三世のテーマ\(ルパン三世\).mp3";
             break;
           case "music/kakusei.mp3":
             musictitle.innerHTML = "覚醒.mp3";
             break;
           default:
             break;
         }
         
         console.log("canplay");
       });
        audio.play(); 
    }
  }
};
var pauseAudio = function() {
  if(_playFlag){
    if(audio){
      musictitle.innerHTML = "";
        _playFlag = false;
        audio.pause();
    }
  }
};

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

