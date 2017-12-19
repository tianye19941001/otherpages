
// rem自动计算
fnResize();
window.addEventListener("resize", function() {
    fnResize()
}, false);

function fnResize(){
    var docWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        body = document.getElementsByTagName('html')[0];
    body.style.fontSize = docWidth / 25 + 'px';
}