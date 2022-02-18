
document.addEventListener("DOMContentLoaded", function(event) {
    const url_ru = 'https://texty.org.ua/media/images/scheme2_xBwY4vS.original.jpg';
const url_ua = 'https://texty.org.ua/media/images/scheme_ukr.original.jpg'
       
const origin_ru = document.getElementById("rus-tanks");
const origin_ua = document.getElementById("ukr-tanks");

drawCanvas(origin_ru, "canvas#rus-tanks-canvas", url_ru);

drawCanvas(origin_ua, "canvas#ukr-tanks-canvas", url_ua);


function drawCanvas(origin, container, url){
    const width = origin.offsetWidth;
    const height = origin.offsetHeight;
    const ratio = width / height;

    const canvas = d3.select(container)
    .attr("width", width)
    .attr("height", height); 


    var context = canvas.node().getContext("2d");   
    var image = new Image();
            
    image.onload = function () {
        context.drawImage(image, 0, 0, window.innerWidth, window.innerWidth / ratio);          
    };
    
    image.src = url;
    origin.classList.add('mobile-only');;

    canvas.call(d3.zoom()
        .scaleExtent([1, 5])
        .on("zoom", zoom)
        .filter(function() { if( !isMobile.any() ) {
            !d3.event.button && d3.event.ctrlKey        
            }
        }))
        .on("wheel", function(){ 
            if (d3.event.ctrlKey && !isMobile.any()) {
                 d3.event.preventDefault()} 
                });


    function zoom() {           
            var transform = d3.event.transform;
            context.save();
            context.clearRect(0, 0, width, height);
            context.translate(transform.x, transform.y);
            context.scale(transform.k, transform.k);
            context.drawImage(image, 0, 0, window.innerWidth, window.innerWidth / ratio);
            context.restore();              
    }

    window.addEventListener("resize", function(){

        d3.select(container)
            .attr("width", window.innerWidth)
            .attr("height", window.innerWidth / ratio);

        context.clearRect(0, 0, window.innerWidth,  window.innerWidth);
        context.drawImage(image, 0, 0,  window.innerWidth, window.innerWidth / ratio);
        context.restore();             
    });
}
});


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

