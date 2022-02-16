const url_ru = 'https://texty.org.ua/media/images/scheme2_HYXdH2f.original.jpg';
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
        context.drawImage(image, 0, 0, width, height);  
        origin.remove();
    };
    image.src = url;

    canvas.call(d3.zoom()
        .scaleExtent([1, 5])
        .on("zoom", zoom)
        .filter(() => !d3.event.button && d3.event.ctrlKey)
        )
        .on("wheel", () => { if (d3.event.ctrlKey) d3.event.preventDefault() });


    function zoom() {           
            var transform = d3.event.transform;
            context.save();
            context.clearRect(0, 0, width, height);
            context.translate(transform.x, transform.y);
            context.scale(transform.k, transform.k);
            context.drawImage(image, 0, 0, width, height);
            context.restore();              
    }

    window.addEventListener("resize", function(){

        d3.select(container)
            .attr("width", window.innerWidth)
            .attr("height", window.innerWidth / ratio);

        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0,  window.innerWidth, window.innerWidth / ratio);
        context.restore();             
    });
}