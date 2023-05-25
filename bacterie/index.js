// js bact
var ListBact = [];
var ListVir = [];
var nb_bact_init = 30;
var taille = 50;
var posix
var posigrek
var vy
var x
const ctx = document.getElementById('myChart2');
const ctx2 = document.getElementById('myChart');

function rdmint(max) {
  return Math.floor(Math.random() * max);
}

const pointImage = new Image(20, 20)
pointImage.src = './image/favicon.ico'

var chart1 = new Chart(ctx2, {
	type: 'scatter',
    data: {
		datasets: [{
        label: 'Scatter Dataset',
        data: [{
			    x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 0.5,
                y: 5.5
            }],
            backgroundColor: 'rgb(255, 99, 132)',
            pointHitRadius: 15
        }],
      },
        options: {
        elements: {
            point: {
            pointStyle: pointImage
          }
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false
            },
            type: 'linear',
            position: 'bottom'
          },
          y: {
            beginAtZero: true,
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });

var chart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [65, 59, 80, 81, 56, 55, 40],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
	
function addData(chart, label, x, y) {
    // Check if the datasets array is defined
    if (!chart.data.datasets) {
        chart.data.datasets = [];
    }

    // Check if the label already exists
    const labelIndex = chart.data.labels.indexOf(label);

    // Convert x and y values to numbers
    const numericX = Number(x);
    const numericY = Number(y);

    if (!isNaN(numericX) && !isNaN(numericY)) {
        const dataPoint = { x: numericX, y: numericY };

        if (labelIndex !== -1) {
            // If the label exists, update its corresponding value
            chart.data.datasets.forEach((dataset) => {
                dataset.data[labelIndex] = dataPoint;
            });
        } else {
            // If the label doesn't exist, add a new label and its corresponding value
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(dataPoint);
            });
        }

        chart.update();
    } else {
        console.error('Invalid x or y coordinate. Please provide numerical values.');
    }
}



function removeData(chart) {
    // Remove all labels
    chart.data.labels = [];

    // Remove all data points from each dataset
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    chart.update();
}


function NewBact(posx, posy, vie, mort) {
  const Bact = {
    posx: posx,
    posy: posy,
    vie: vie,
    mort: mort,
    deplacement: function() {
		const dx= (-1)**rdmint(100);
		const dy= (-1)**rdmint(100);
		self.posx=self.posx+dx;
		self.posy=self.posy+dy;
    }
  };
  return Bact;
}
let nb_tour = 0;
let nb_max_tour = 30;
function Main(){
	if(nb_tour<nb_max_tour){
		nb_tour++
		console.log(nb_tour);
	var t = setTimeout(function(){ Main() }, 1000)
	}
	else{console.log('fin')}
}
function init(){
	removeData(chart1)
	for(let i=0;i<=nb_bact_init;i++){
		posix = rdmint(taille);
		posigrek = rdmint(taille);
		vy = rdmint(5);
		addData(chart1, i, posix, posigrek);
		ListBact.push(x);
		removeData(chart2);
		addData(chart2, 0, 0, 0);
		addData(chart2, 1, 1, nb_bact_init);
 	}
	return ListBact
}
init()
Main()
