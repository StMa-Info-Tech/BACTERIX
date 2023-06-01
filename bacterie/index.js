// js bact
var ListBact = [];
var ListVir = [];
var ListGraph = [];
var nb_bact_init = 100;
var taille = 50;
var posix
var posigrek
var vy
var x
var Th_Death = 75;
var food = 1000;
var space = 300;
var Th_Repro = 25;
var MortBact = false ;
var Augm = true;
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
        },{
        label: 'Scatter Dataset 2',
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
        },
		animation: false
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
        },{
          label: 'My Second Dataset',
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
        },
		animation:false
      }
    });
	
function addData(chart, label, x, y, num) {
    if (!chart.data.datasets) {
        chart.data.datasets = [];
    }
    const labelIndex = chart.data.labels.indexOf(label);
    const numericX = Number(x);
    const numericY = Number(y);

    if (!isNaN(numericX) && !isNaN(numericY)) {
        const dataPoint = { x: numericX, y: numericY };

        if (labelIndex !== -1) {
            chart.data.dataset.data[labelIndex] = dataPoint;
            ;
        } else {
            chart.data.labels.push(label);
            chart.data.datasets[num].data.push(dataPoint);
            ;
        }

        chart.update();
    } else {
		console.log('x : '+x+' - y : '+y)
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
    deplace: function() {
		const dx= (-1)**rdmint(100);
		const dy= (-1)**rdmint(100);
		this.posx=this.posx+dx;
		this.posy=this.posy+dy;
    }
  };
  return Bact;
}
let nb_tour = 0;
let nb_max_tour = 30;
function Main(){
	if(nb_tour<nb_max_tour){
		console.log('taile :'+ListBact.length);
		nb_tour++
		console.log('tour :'+nb_tour);
		if(space<=ListBact.length && Augm==true){
			Augm=false;
		}
		for(let j=0;j<ListBact.length;j++){
			ListBact[j].deplace();
			Repro = rdmint(100);
			if(Repro<=Th_Repro && Augm == true){
				x = ListBact[j].posx ;
				y = ListBact[j].posy ;
				ListBact.push(NewBact(x,y,0,0));
			}
		}
		removeData(chart1)
		for(let i=0; i<ListBact.length;i++){
			addData(chart1,i,ListBact[i].posx,ListBact[i].posy,0)
		}
		ListGraph.push(ListBact.length);
		updateCourbe();
		if(ListBact.length>=space || MortBact == true){
			MortBact = true
			Death_Bact()
		}
		var t = setTimeout(function(){ Main() }, 1000)
	}
	else{console.log('fin')}
	
}
function Death_Bact(){
	for(let i=0;i<ListBact.length;i++){
		if(rdmint(100)>Th_Death){
			Delete_Item = ListBact.splice(i,1);
		}
	}
}
function updateCourbe(){
	removeData(chart2);
	for(let i=0;i<ListGraph.length;i++){
		addData(chart2, i, i, ListGraph[i],0);
	}
}
function init(){
	removeData(chart1)
	for(let i=0;i<=nb_bact_init;i++){
		posix = rdmint(taille);
		posigrek = rdmint(taille);
		vy = rdmint(5);
		addData(chart1, i, posix, posigrek,0);
		let x = NewBact(posix,posigrek,vy,0)
		ListBact.push(x);
		removeData(chart2);
 	}
	addData(chart2, 0, 0, 0,0);
	addData(chart2, 1, 1, nb_bact_init,0);
	ListGraph.push(0);
	ListGraph.push(nb_bact_init);
	Main()
}
init()