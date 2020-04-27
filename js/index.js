$('#items li').on("click", function () {
  console.log('123')
})

var mySwiper = new Swiper('.swiper-container', {
  loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  }
})
var stage = new createjs.Stage("demoCanvas");
function init() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    var title = new createjs.Text("动画特效", "normal 18px microsoft yahei", "#fff");
    title.x = 65;
    title.y = 90;
    stage.addChild(title);
}
createjs.Ticker.addEventListener("tick", handleTicker);
function handleTicker() {
    stage.update();
}
$('.btn').on('click',function() {
  document.documentElement.setAttribute('data-theme', 'dark')
  localStorage.setItem('theme', 'dark')
})
window.onload = function () {
    let theme = localStorage.getItem('theme')
    if(theme) {
        document.documentElement.setAttribute('data-theme', theme)
    }else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
}