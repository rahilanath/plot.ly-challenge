// load json data
d3.json('./static/data/samples.json').then((data) => {
    // dataset variables
    var names = data.names;
    var samples = data.samples;
    var metadata = data.metadata;

    // variable for dropdown element
    var dropdownMenu = d3.select('#selDataset');

    // fill dropdown element with option elements
    dropdownMenu.selectAll('option')
        .data(names)
        .enter().append('option')
        .attr('value', d => d)
        .text(d => d);

    // variable for selected_id in dropdown
    var selected_id = dropdownMenu.property('value');

    // update page
    update_page(selected_id, samples, metadata);
});

function optionChanged(changed_id) {
    d3.json('./static/data/samples.json').then((data) => {
        // dataset variables
        var samples = data.samples;
        var metadata = data.metadata;
        
        update_page(changed_id, samples, metadata);
    })
};

function update_page(selected_id, samples, metadata){
    // filter values based on selected_id
    var filtered_values = samples.filter(d => d.id === selected_id);
    var filtered_metadata = metadata.filter(d => d.id == selected_id);

    // get sample_values, otu_ids, otu_labels and metadata from samples
    var sample_values = filtered_values[0].sample_values;
    var otu_ids = filtered_values[0].otu_ids.map(otu_id => 'OTU ' + otu_id);
    var otu_labels = filtered_values[0].otu_labels;
    var sample_metadata = filtered_metadata[0];

    // variables for demographic panel element
    var demographics = d3.select('#sample-metadata');

    // clear demographics
    demographics.selectAll('text').remove();
    demographics.selectAll('br').remove();

    // fill demographics
    demographics.append('text').attr('class', 'demo_text').text('Id: ' + sample_metadata.id);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('ethnicity: ' + sample_metadata.ethnicity);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('gender: ' + sample_metadata.gender);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('age: ' + sample_metadata.age);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('location: ' + sample_metadata.location);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('bbtype: ' + sample_metadata.bbtype);
    demographics.append('br');
    demographics.append('text').attr('class', 'demo_text').text('wfreq: ' + sample_metadata.wfreq);

    // slice and reverse sample_values for bar plot
    var sorted_values = sample_values.sort((a, b) => b - a).slice(0, 10).reverse();

    // bar plot
    var bar_plot = {
        x: sorted_values,
        y: otu_ids,
        text: otu_labels,
        type: 'bar',
        orientation: 'h'
    };

    // bar layout
    var bar_layout = {
        width: 1000,
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }
    };
    
    bar_data = [bar_plot];
    Plotly.newPlot('bar', bar_data, bar_layout);

    // bubble plot
    var bubble_plot = {
        x: otu_ids,
        y: sorted_values,
        marker: {
            size: sorted_values,
            color: otu_ids * 10,
            sizeref: 1.5
        },
        mode: 'markers',
        text: otu_labels
    };

    // bubble layout
    var bubble_layout = {
        height: 500
    };
    
    bubble_data = [bubble_plot];
    Plotly.newPlot('bubble', bubble_data, bubble_layout);
};