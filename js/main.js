d3.csv("data/data.csv").then(function(data){

var level = "Легкий";
var df, unwatched_pics;
var random_pic;

var models_list = d3.map(data, function(d) { return d.model}).keys();

//change level
d3.selectAll(".select-level").on("click", function(d){
    d3.selectAll(".select-level").classed("active", false);
    d3.select(this).classed("active", true);
   
    level = d3.select(this).attr("value");
    
    clearAll()
    changeLevel(level);
    getRandom()  
})

changeLevel(level);
getRandom()

//guess button
d3.selectAll(".guess-model").on("click", function(){
    var result = d3.select(this).attr("value");

    if (result === "correct"){
        d3.select(this)
            .classed("correct", true);
    } else {
        d3.select(this)
            .classed("uncorrect", true);

        d3.selectAll(".guess-model")        
        .each(function(){
            let is_correst = d3.select(this).attr("value");
            if(is_correst === "correct" ) {
                d3.select(this)
                .classed("correct", true);                
            } 
        })
    }
    
    d3.selectAll(".guess-model").style("pointer-events", "none");
    d3.select("#picture").attr("src", "img/marked/"+random_pic.values[0].after);
    d3.select(".explanation").style("display", "block"); 
})



d3.select("#play-again").on("click", function(){
    clearAll();
    getRandom();
})


function changeLevel(level){
    if(level === "Легкий"){
        input_data = data.filter(function(d) { return d.level === "Легкий"});
    } else {
        input_data = data
    }

    df = d3.nest()
        .key(function (d) { return d.file; })
        .entries(input_data);    
    
    unwatched_pics = df;    
}

function getRandom(){ 

    if(unwatched_pics.length === 0){  
        unwatched_pics = df  
    }

    random_pic = unwatched_pics[Math.floor(Math.random() * unwatched_pics.length)];
    
    unwatched_pics = unwatched_pics.filter(function(d){ return d.key != random_pic.key; }); 


    var model_quess = [];

    model_quess.push({"model":random_pic.values[0].model, "value": "correct" });
   
    while(model_quess.length < 3){
        let random_model = models_list[Math.floor(Math.random() * models_list.length)];
        if(!d3.map(model_quess, function(d) { return d.model}).keys().includes(random_model)){
            model_quess.push({"model": random_model, "value": "uncorrect" })
        } 
    }  

    model_quess = model_quess.sort(function() { return  Math.random() - 0.5 });
    

    d3.select("#picture")
        .attr("src", "img/unmarked/"+random_pic.values[0].before);

    d3.selectAll(".guess-model")
        .data(model_quess)       
        .text(function(d){ return d.model})
        .attr("value", function(d){ return d.value });   

    d3.select("#model-name").text(random_pic.values[0].model)
    d3.select("#origin").text(random_pic.values[0].country)

    d3.select("#features").html("");
    random_pic.values.forEach(function(d){
        d3.select("#features")            
            .append("p")
            .html(function() { 
                return d.meaning != "" ? "<b>" + d.n + ".</b> " + d.feature + " = " + d.meaning : "<b>" + d.n + ".</b> " + d.feature  })
    })
}

function clearAll(){    
    d3.select(".explanation").style("display", "none"); 
    d3.selectAll(".guess-model")
        .style("pointer-events", "all")
        .classed("correct", false)
        .classed("uncorrect", false);
}







    
   











})