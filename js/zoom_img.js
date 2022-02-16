       const origin = document.getElementById("zoom-pic");
       
       var width = origin.offsetWidth;
       var height = origin.offsetHeight;
       const ratio = width / height;

       

        var canvas = d3.select("canvas")
            .attr("width", width)
            .attr("height", height); 
            

        var context = canvas.node().getContext("2d");        
        var image = new Image();
        var url = 'https://texty.org.ua/media/images/scheme2_cNttWen.original.jpg';

        image.onload = function () {
            context.drawImage(image, 0, 0, width, height);  
            origin.remove();
        };

        image.src = url;

        /* додаємо зум */
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
        d3.select("canvas")
            .attr("width", window.innerWidth)
            .attr("height", window.innerWidth / ratio);    


        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0,  window.innerWidth, window.innerWidth / ratio);
        context.restore();             
    });