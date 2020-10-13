function init() {

    d3.json('./static/data/samples.json').then((data) => {
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;

        var sample_values = samples[0].sample_values;
        var otu_ids = samples[0].otu_ids.map(otu_id => 'OTU ' + otu_id);

        var dropdownMenu = d3.selectAll('#selDataset');
            .append(names);

        var sorted_values = samples[0].sample_values.sort((a, b) => b - a).slice(0, 10).reverse();
        console.log(sorted_values);

        var trace = {
            x: sorted_values,
            y: otu_ids,
            name: 'Sample_Values',
            type: 'bar',
            orientation: 'h'
        };

        var data = [trace];

        var layout = {
            title: "Sample_Values",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        
        Plotly.newPlot('bar', data, layout);
    });
};

init();