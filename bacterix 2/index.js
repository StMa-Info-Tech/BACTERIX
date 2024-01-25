// Variables global
var nb_bact_1 = randint(20);
var nb_bact_2 = randint(20);
var nb_bact_3 = randint(20);
var nb_bact_tot = nb_bact_1 + nb_bact_2 + nb_bact_3;
var ListBact_Tot = [];
var BactLine_Tot = [];
var AB_List = [];
var AB_act = [];

var taux_muta = 25;
var taux_repro = 25;
var taux_mort = 25;
var space = 200;
var food = 3000;

var Bact2 = false;
var Bact3 = false;

var MutaBact1 = [];
var MutaBact2 = [];
var MutaBact3 = [];
var Muta = [MutaBact1,MutaBact2,MutaBact3]

var nb_tour = 0;
var nb_tour_max = 30;
// Variable Chartjs
const ctx = document.getElementById('myChart2');
const ctx2 = document.getElementById('myChart');

const pointImage = new Image(20, 20)
pointImage.src = './image/Icon_Bact_1.png'
const pointImage2 = new Image(20, 20)
pointImage2.src = './image/Icon_Bact_2.png'
const pointImage3 = new Image(20, 20)
pointImage3.src = './image/Icon_Bact_3.png'
console.log(window.innerHeight);
console.log(window.innerWidth);

eff1 = document.getElementsByClassName("in_eff1");
eff1[0].addEventListener('change', function(){
	val1=document.getElementsByClassName('value1')
	val1[0].innerHTML=eff1[0].value;
});
eff2 = document.getElementsByClassName("in_eff2");
eff2[0].addEventListener('change', function(){
	val2=document.getElementsByClassName('value2')
	val2[0].innerHTML=eff2[0].value;
});
eff3 = document.getElementsByClassName("in_eff3");
eff3[0].addEventListener('change', function(){
	val3=document.getElementsByClassName('value3')
	val3[0].innerHTML=eff3[0].value;
});
var chart1 = new Chart(ctx2, {
	type: 'scatter',
    data: {
		datasets: [{
        label: 'Bactérie 1',
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
        label: 'Bactérie 2',
        data: [{
			    x: -20,
                y: 1
            }, {
                x: 0,
                y: 30
            }, {
                x: 17,
                y: 2
            }, {
                x: 7,
                y: 8
            }],
            backgroundColor: 'rgb(99, 200, 165)',
            pointHitRadius: 15,
			pointStyle: pointImage2
        },{
        label: 'Bactérie 3',
        data: [{
			    x: 20,
                y: 14
            }, {
                x: 30,
                y: 30
            }, {
                x: 47,
                y: 2
            }, {
                x: 87,
                y: 4
            }],
            backgroundColor: 'rgb(112, 87, 255)',
            pointHitRadius: 15,
			pointStyle: pointImage3
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

var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          label: 'Bacterie 1',
          data: [2, 3, 5, 10, 10, 6, 5],
          borderColor: 'rgb(255,99,132)',
          backgroundColor: 'rgb(255,99,132)',
          tension:0.1
        }, {
          label: 'Bacterie 2',
          data: [4, 6, 11, 11, 7, 4, 3],
          borderColor: 'rgb(99,200,165)',
          backgroundColor: 'rgb(99,200,165)',
          tension:0.1
        }, {
          label: 'Bacterie 3',
          data: [1, 2, 5, 9, 9, 5, 4],
          borderColor: 'rgb(112,87,255)',
          backgroundColor: 'rgb(112,87,255)',
          tension:0.1
        }]
      },
      options: {
		animation: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
	
	function addData(chart, label, x, y, num) {
    if (!chart.data.datasets) {
        chart.data.datasets = [];
    }
    const labelIndex = chart.data.labels.indexOf(label);
    const X = Number(x);
    const Y = Number(y);

    if (!isNaN(X) && !isNaN(Y)) {
        const dataPoint = { x: X, y: Y };
		chart.data.labels.push(label);
        chart.data.datasets[num].data.push(dataPoint);
        chart.update();
    }
}



function removeData(chart) {
    chart.data.labels = [];

    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    chart.update();
}

function Update_Courbe1(){
	removeData(chart1);
	for(let e=0;e<ListBact_Tot.length;e++){
		for(let u=0;u<ListBact_Tot[e].length;u++){
			if(ListBact_Tot[e][u].mort==0){
				addData(chart1,u,ListBact_Tot[e][u].posx,ListBact_Tot[e][u].posy,e);
			}
		}
	}
}
function Update_Courbe2(DataList) {
	removeData(lineChart);
    for(let t=0;t<DataList[0].length;t++){
		lineChart.data.labels.push(t);
		for(let a=0;a<DataList.length;a++){
			const dataPoint = { x: t, y: DataList[a][t] };
			lineChart.data.datasets[a].data.push(dataPoint);
			lineChart.update();
		}
	}
	
}

function NewBact(posx, posy, vie, muta) {
  const Bact = {
    posx: posx,
    posy: posy,
    vie: 0,
    mort: 0,
	muta: muta,
    deplace: function() {
		const dx= 4*(-1)**randint(100);
		const dy= 4*(-1)**randint(100);
		this.posx=this.posx+dx;
		this.posy=this.posy+dy;
    }
  };
  return Bact;
}

function NewAB(id, taux) {
  const AB = {
    id: id,
    taux: taux,
    mort: 0,
  };
  return AB;
}
function taille(list){
	nb=0;
	for(let elt of list){
		if(elt.mort==0){
			nb++
		}
	}
	return nb;
}

function randint(max) {
  return Math.floor(Math.random() * max);
}
	
function add_ab(nb){
	elt = document.getElementsByClassName('in_eff'+nb);
	elt[0].disabled = true;
	if(!(nb in AB_act)){
		AB_act.push(nb);
		AB_List.push(NewAB(nb,elt[0].value));
	}
	}

function addBact2(){
	Bact2 = true;
	document.getElementsByClassName('add_bact2')[0].remove();
}
function addBact3(){
	Bact3 = true;
	document.getElementsByClassName('add_bact3')[0].remove();
}
function MutationBact(nb){
	console.log(ListBact_Tot);
	ab= document.getElementsByClassName('sel_bact'+(nb+1))[0].value;
	Muta[nb].push(ab);
	for(let bact of ListBact_Tot[nb]){
		if(randint(100)>taux_muta){
				bact.muta.push(ab);
		}
	}
	document.getElementById('MuAb'+ab+'B'+(nb+1)).remove();
	if(document.getElementsByClassName('sel_bact'+(nb+1))[0].options.length==0){
		document.getElementsByClassName('muta_bact'+(nb+1))[0].remove();
		document.getElementsByClassName('sel_bact'+(nb+1))[0].remove();
	}
}



function init(){
	removeData(chart1)
	removeData(lineChart)
	ListBact_Tot.push([]);
	for(let i=0;i<nb_bact_1;i++){
		x=randint(100);
		y=randint(100);
		addData(chart1,i,x,y,0);
		ListBact_Tot[0].push(NewBact(x,y,0,[]));
	}
	BactLine_Tot.push([nb_bact_1]);
	addData(lineChart,1,1,nb_bact_1,0);
	if(Bact2 == true){
	ListBact_Tot.push([]);
	for(let i=0;i<nb_bact_2;i++){
		x=randint(100);
		y=randint(100);
		addData(chart1,i,x,y,1);
		ListBact_Tot[1].push(NewBact(x,y,0,[]));
	}	
	BactLine_Tot.push([nb_bact_2]);
	addData(lineChart,1,1,nb_bact_2,1);
	}
	if(Bact3 == true){
	ListBact_Tot.push([]);
	for(let i=0;i<nb_bact_3;i++){
		x=randint(100);
		y=randint(100);
		addData(chart1,i,x,y,2);
		ListBact_Tot[2].push(NewBact(x,y,0,[]));
	}	
	BactLine_Tot.push([nb_bact_3]);
	addData(lineChart,1,1,nb_bact_3,2);
	}
	Main()
}
function Main(){
	nb_tour++
	if(nb_tour<nb_tour_max){
		console.log(nb_tour);
		for(let Pop_Bact of ListBact_Tot){
			for(let Bact of Pop_Bact){
				for(let AB of AB_List){
					if(!(AB in Bact.muta)){
						if(randint(100)<AB.taux){
							Bact.mort=1;
							nb_bact_tot--
						}
					}
				}
				if(Bact.mort==0){
					Bact.deplace();
					food-=1;
					if(randint(100)<taux_repro && nb_bact_tot<space && food > 5){
						Pop_Bact.push(NewBact(Bact.posx,Bact.posy,0,Bact.muta));
						nb_bact_tot++
						food-=5
					}
					if(food<0){
						if(randint(100)<taux_mort){
							Bact.mort=1;
							nb_bact_tot--
						}
					}
				}
			}
		}
		BactLine_Tot[0].push(taille(ListBact_Tot[0]));
		if(Bact2){
			BactLine_Tot[1].push(taille(ListBact_Tot[1]));
		}
		if(Bact3){
			BactLine_Tot[2].push(taille(ListBact_Tot[2]));
		}
		Update_Courbe1();
		Update_Courbe2(BactLine_Tot);
		var t = setTimeout(function(){ Main() }, 1000);
	}
	
}
function start(){
	if(Bact2==false){
		document.getElementsByClassName('Bact2')[0].remove();
	}
	if(Bact3==false){
		document.getElementsByClassName('Bact3')[0].remove();
	}
	init()
}
/*
removeData(chart1)
addData(chart1,"1",4,5,0)
addData(chart1,"2",5,6,1)
addData(chart1,"3",6,7,2)
*/

