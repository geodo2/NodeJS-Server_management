module.exports = {

 chart_bar: function(){
   return new Chart(ctx, {
     type: 'line',
     data: {
       labels: ["09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10"],
       datasets: [{
         label: "Sessions",
         lineTension: 0.3,
         backgroundColor: "rgba(2,117,216,0.2)",
         borderColor: "rgba(2,117,216,1)",
         pointRadius: 5,
         pointBackgroundColor: "rgba(2,117,216,1)",
         pointBorderColor: "rgba(255,255,255,0.8)",
         pointHoverRadius: 5,
         pointHoverBackgroundColor: "rgba(2,117,216,1)",
         pointHitRadius: 50,
         pointBorderWidth: 2,
         data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
       }],
     },
     options: {
       scales: {
         xAxes: [{
           time: {
             unit: 'date'
           },
           gridLines: {
             display: false
           },
           ticks: {
             maxTicksLimit: 7,
             fontSize : 0
           }
         }],
         yAxes: [{
           ticks: {
             min: 0,
             max: 40000,
             maxTicksLimit: 5,
             fontSize : 0
           },
           gridLines: {
             display: false
           }
         }],
       },
       legend: {
         display: false
       }
     }
   });
 }

}
