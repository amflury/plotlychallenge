var jsonFile = "samples.json";
var id = 940;
function dashboard(){

var selection = d3.select("#selDataset");

d3.json(jsonFile).then(function(d){
    console.log(d);
    var name = d.names;
    
    name.forEach((sample)=>{
        selection.append("option")
        .text(sample)
        .property("value", sample);
    });
});
}
function buildBar(id){
console.log(id);
};
dashboard();

function buildBar(id){
    console.log("Build Graph")
   d3.json(jsonFile).then(function(d){
       var samples = d.samples;
       var results = samples.filter(s => s.id == id);
       var sampleValues = results[0].sample_values.slice(0, 10).reverse();
       var otu_id = results[0].otu_ids.slice(0, 10).map(otu => `OTU: ${otu}`).reverse();
       var otu_label = results[0].otu_labels.slice(0, 10).reverse();

       var barData = {
           x: sampleValues,
           y: otu_id,
           type: "bar",
           text: otu_label,
           orientation: "h"
       }
       var data = [barData];
       var layout =  {
           title: `Sample Values on Subject ${id}.`
       };
       Plotly.newPlot("bar", data, layout);
   }); 
}
function buildBubble(id){
    console.log("Bubble Chart")
    d3.json(jsonFile).then(function(d){
        var samples = d.samples;
        var results = samples.filter(s => s.id == id);
        var sampleValues =results[0].sample_values;
        var otu_ids = results[0].otu_ids;
        var otu_labels = results[0].otu_labels;

        var bubbleData = {
            x: otu_ids,
            y: sampleValues,
            mode:"markers",
            marker:{
                size: sampleValues,
                color: otu_ids
            },
            text: otu_labels

        };
        var data = [bubbleData];
        var layout = {
            title: `Subject #${id} Belly Button Samples`
        };
        Plotly.newPlot("bubble", data, layout);

    })

}
function metaData(id){
    console.log("Let's get Meta!!!");
    d3.json(jsonFile).then(function(d){
        var metaData = d.metadata;
        var subject = metaData.filter(s=>s.id==id)[0];
        console.log(subject);
        var metaloc =  d3.select("#sample-metadata").append("ul")
        Object.entries(subject).forEach(([key, value]) =>{
            console.log(`${key}: ${value}`);
            metaloc.append("li")
            .classed("item", true)
            .text(`${key}: ${value}`)
        });
        
        
    })
}
metaData(id);
buildBar(id);
buildBubble(id);
function optionChanged(){

    var id = d3.select("#selDataset").node().value;
    console.log(id);
    buildBar(id);
    buildBubble(id);
    var metaloc = d3.select("#sample-metadata")
    metaloc.html("")
    metaData(id);
}