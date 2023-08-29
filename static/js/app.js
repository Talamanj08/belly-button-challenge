// URL of the JSON data
const link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function updateBarChart(selectedName, data) {
  let samples = data.samples;
  let selectedData = samples.find(sample => sample.id === selectedName);
  let otuIds = selectedData.otu_ids.slice(0, 10);
  let sampleValues = selectedData.sample_values.slice(0, 10);
  let otuLabels = selectedData.otu_labels.slice(0, 10);
  otuIds = otuIds.reverse();
  sampleValues = sampleValues.reverse();
  otuLabels = otuLabels.reverse();

  console.log(sampleValues);
  console.log(otuIds);
  console.log(otuLabels);

  let trace = {
    x: sampleValues,
    y: otuIds.map(id => `OTU ${id}`), // Use "OTU" prefix for labels
    text: otuLabels,
    type: "bar",
    orientation: "h"
  };
  let layout = {
    title: "Top 10 OTUs",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  Plotly.newPlot("bar", [trace], layout);
}
//Create Bubble Chart
function createBubbleChart(data) {
  let selectedData = data.samples[0]; // Use the first sample as an example
  let otuIds = selectedData.otu_ids;
  let sampleValues = selectedData.sample_values;
  let otuLabels = selectedData.otu_labels;

  let trace = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: 'Viridis', // You can choose a different colorscale
      colorbar: {
        title: 'OTU ID'
      }
    }
  };

  let layout = {
    title: 'OTU Bubble Chart',
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Values',
    }
  };

  Plotly.newPlot('bubble', [trace], layout);
}
// Create optionChanged function to update Charts
function optionChanged() {
  // Fetch the JSON data and populate the dropdown menu
  d3.json(link).then(function (data) {
    let names = data.names;
    let dropdown = d3.select("#selDataset");    

    // Populate the dropdown with individual names
    dropdown.selectAll("option")
      .data(names)
      .enter()
      .append("option")
      .text(function (d) { return d; });

    // Add an event listener to the dropdown to update the charts
    dropdown.on("change", function () {
      let selectedName = dropdown.property("value");
      updateBarChart(selectedName, data); // Call the function to update the bar chart
      createBubbleChart(data); // Call the function to create the bubble chart
    });

    // Initialize the page with the default selection
    let defaultName = names[0];
    updateBarChart(defaultName, data);
    createBubbleChart(data); // Create the bubble chart initially
  });
}

// Call the optionChanged function 
optionChanged();
