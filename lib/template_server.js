
var template_chart = require('./template_chart.js');


module.exports = {
  detail_make_history:function(history){
    var temp = '';
    for(var i = 0; i<history.length; i++){
      temp += `
      <tr>
        <th>${history[i].time}</th>
        <th>${history[i].cpu_usage}</th>
        <th>${history[i].user_num}</th>
        <th>${history[i].power_usage}</th>
      </tr>`;

    }
    return temp;
  },
   history_make_list:function(history){
    var temp = '';
    for(var i = 0; i<history.length; i++){
      temp += `
      <tr>
        <th>${history[i].time}</th>
        <th>${history[i].state}</th>
        <th>${history[i].cpu_usage}</th>
        <th>${history[i].user_num}</th>
        <tb>duration ex</th>
      </tr>`;

    }
    return temp;
  },
  main_make_list:function(history){
    var temp = '';
    for(var i = 0; i<history.length; i++){
      if(history[i].time === null){
        temp += `
          <tr>
            <th>${history[i].name}</th>
            <th>${history[i].id}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
            <form action="/delete" method="post">
              <input type="hidden" name="key" value="${history[i].id}">
              <input type="hidden" name="name" value="${history[i].name}">
              <input id="delete_bt" type="submit" value="Delete">
            </form>
            </th>
          </tr>`;

      }else{
      temp += `
        <tr>
          <th>${history[i].name}</th>
          <th>${history[i].id}</th>
          <th>${history[i].user_num}</th>
          <th>${history[i].cpu_usage}</th>
          <th>${history[i].power_usage}</th>
	  <th>${history[i].state}</th>
          <th>${history[i].time}</th>
          <th>
          <form action="/delete" method="post">
            <input type="hidden" name="key" value="${history[i].id}">
            <input id="delete_bt" type="submit" value="Delete">
          </form>
          </th>
        </tr>`;
      }
    }
    return temp;
  },
  chart_area_cpu:function(temp,data_col,data_row){

    var col ='';
    for(var i = data_col.length-1; i>=0; i--){
       col += `"${data_col[i]}"`;
       if(i-1 !== -1){
         col += ' , ';
       }
    }
    col = `[${col}]`;

    var row ='';
    var buf = [];
    for(var i = data_row.length-1; i>=0; i--){
       buf = data_row[i].split('%');
       row += ` ${buf[0]} `;
       if(i-1 !== -1){
         row += ' , ';
       }
    }
    row = `[${row}]`;
    return `
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';
      var ctx = document.getElementById('chart_'+'${temp}'+'_cpu');
      var chart_${temp}_cpu = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ${col},
            datasets: [{
              label: "%",
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
              data: ${row},
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
                  fontSize : 0,
		  display:false
                }
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 100,
                  maxTicksLimit: 5,
                  fontSize : 15
                },
                gridLines: {
                  display: false
                }
              }],
            },
            legend: {
              display: false
            }
          },
	  
        });
    `;

  },
  chart_area_power:function(temp,data_col,data_row){

    var col ='';
    for(var i = data_col.length-1; i>=0; i--){
       col += `"${data_col[i]}"`;
       if(i-1 !== -1){
         col += ' , ';
       }
    }
    col = `[${col}]`;

    var row ='';
    var buf = [];

    for(var i = data_row.length-1; i>=0; i--){
       buf = data_row[i].split('W');

       row += ` ${buf[0]} `;
       if(i-1 !== -1){
         row += ' , ';
       }
    }
    row = `[${row}]`;
    return `
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';
      var ctx = document.getElementById('chart_'+'${temp}'+'_power');
      var chart_${temp}_power = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ${col},
            datasets: [{
              label: "W",
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
              data: ${row},
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
                  fontSize : 0,
		  display:false
                }
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 50,
                  maxTicksLimit: 5,
                  fontSize : 15
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
    `;

  }  ,
  main_make_block:function(history){
    var temp = ``;
    var block_list = '';
    for(var i = 0 ; i<history.length; i++){
      if(history[i].state === null){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#a9b2bb; height:93%;">
                <div class="card-body" style="margin:auto;"><h3 id="block_title" >${history[i].name}</h3></div>
                <!--Body-->
                <div style="">



                  <p id="block_text" style="font-weight:bold; text-align:center; ">  Please run the server program</p>
                  <div class="donut_black" id="donut_${i}" data-percent="85.4"></div>
                  <script>
                    const donut_${i} = document.getElementById("donut_${i}");
                    donut_${i}.dataset.percent = 'EMPTY';
                    donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% 0%, #F2F2F2 0% 100%)';
                  </script>


                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; padding-bottom:5px; font-weight:bold; font-size:1.2vw" href="http://servmon.cafe24.com/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }
      else if(history[i].state === "off" || history[i].state === "OFF"){
        temp += `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4" style="background-color:#E94560; height:93%;">
                <div class="card-body" style="margin:auto;"><h3 id="block_title">${history[i].name}</h3></div>
                <!--Body-->
                <div style="">

                  <p id="block_text" style="font-weight:bold; text-align:center; ">  Server program off</p>
                  <div class="donut" id="donut_${i}" data-percent="85.4"></div>
                  <script>
                    const donut_${i} = document.getElementById("donut_${i}");
                    donut_${i}.dataset.percent = 'OFF';

                    donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% 0%, #F2F2F2 0% 100%)';
                  </script>


                  </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; padding-bottom:5px; font-weight:bold; font-size:1.2vw" href="http://servmon.cafe24.com/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;
      }else{
	var buf = history[i].cpu_usage.split('%')[0];
        if(buf < 1)
	      buf = 1;
	temp +=`
        <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body" style="margin:auto;"><h3 id="block_title"">${history[i].name}</h3></div>
                <!--Body-->
                <div>
                  <table id="block_table">
                    <tr id="block_tr">
                      <td id="block_td" >CPU USAGE</td>
                      <td id="block_td">${history[i].cpu_usage}</td>
                    </tr>
		    <tr>
		      <td id="block_td">POWER USAGE</td>
		      <td id="block_td">${history[i].power_usage}</td>
		    </tr>
                    <tr>
                      <td id="block_td">USER NUM</td>
                      <td id="block_td">${history[i].user_num}</td>
                    </tr>
                  </table>
                  <div class="donut" id="donut_${i}" data-percent="85.4"></div>
                    <script>
                      const donut_${i} = document.getElementById("donut_${i}");
                      donut_${i}.dataset.percent = '${history[i].cpu_usage}';

                      donut_${i}.style.background = 'conic-gradient(#3F8BC9 0% ${buf}%, #F2F2F2 ${buf}% 100%)';
                    </script>

                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" style=" text-decoration-line: none; font-weight:bold; font-size:1.2vw" href="http://servmon.cafe24.com/server_history?id=${history[i].id}">Server History</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        `;

      }
      if((i+1)%4 === 0 ){
        block_list += `
        <div class="row">
        ${temp}
        </div>
        `;
        temp = '';
      }else if(i+1 === history.length){
        block_list += `
        <div class="row">
        ${temp}
        </div>
        `;
        temp = '';
      }
    }

    return block_list;
  },
  HTML_main:function(history){
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=0.5, shrink-to-fit=no" />

            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Dashboard - SB Admin</title>
            <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
            <link href="/css/styles.css" rel="stylesheet" />
            <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        </head>
        <body class="sb-nav-fixed">
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a class="navbar-brand ps-3" href="http://servmon.cafe24.com/">Server Management</a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4" style="margin-right:2vw;" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <div class="sb-sidenav-menu-heading">Core</div>
                                <a class="nav-link" href="http://servmon.cafe24.com/">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </a>

                                <div class="sb-sidenav-menu-heading">Interface</div>

                                <a class="nav-link" href="http://servmon.cafe24.com/server_register">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Add Server
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Main</li>
                            </ol>


                          ${this.main_make_block(history)}

                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    SERVER LIST
                                </div>
                                <div class="card-body">
                                    <table id="datatablesSimple">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>KEY</th>
                                                <th>USER NUM</th>
                                                <th>CPU USAGE</th>
                                                <th>POWER USAGE</th>
						<th>STATE</th>
                                                <th>LAST UPDATE</th>\
                                                <th>DELETE</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                            <th>NAME</th>
                                            <th>KEY</th>
                                            <th>USER NUM</th>
                                            <th>CPU USAGE</th>
					    <th>POWER USAGE</th>
                                            <th>STATE</th>
                                            <th>LAST UPDATE</th>
                                            <th>DELETE</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                        ${this.main_make_list(history)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="/js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="/assets/demo/chart-area-demo.js"></script>
            <script src="/assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
            <script src="/js/datatables-simple-demo.js"></script>
        </body>
    </html>
    `;
  },
  HTML_login:function(title,body){
    return ``
  },
  HTML_register:function(random_key){
    return `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=0.7, shrink-to-fit=no" />
              <meta name="description" content="" />
              <meta name="author" content="" />
              <title>Register - SB Admin</title>
              <link href="/css/styles.css" rel="stylesheet" />
              <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
          </head>

          <body class="bg-primary">
          <br style="margin:20px;"/>
          <a class="navbar-brand ps-3" href="http://servmon.cafe24.com/" style="background:#323232; padding:15px; border:3px solid;  color:white; font-weight: bold; width:200px; margin:20px; border-radius:100px;">Server Management</a>

              <div id="layoutAuthentication">
                  <div id="layoutAuthentication_content">
                      <main>
                          <div class="container">
                              <div class="row justify-content-center">
                                  <div class="col-lg-7">
                                      <div class="card shadow-lg border-0 rounded-lg mt-5">
                                          <div class="card-header"><h3 class="text-center font-weight-light my-4">Add Server</h3></div>
                                          <div class="card-body">
                                              <form method="post" action="/create_state"  >
                                                  <div class="form-floating mb-3">
                                                      <input class="form-control" name="ip_server_name" id="ip_server_name" type="text" required/>
                                                      <label for="ip_server_name">Server Name</label>
                                                  </div>
                                                  <div class="form-floating mb-3">
                                                      <input class="form-control" name="ip_key" id="ip_key" type="text" value="${random_key}" readonly />
                                                      <label for="ip_key">Key value</label>
                                                  </div>
                                                  <div class="mt-4 mb-0">
                                                      <input type="submit" class="btn btn-primary btn-block" style="width:100%;" value="Create Sever"></input>
                                                  </div>
                                              </form>
                                          </div>
                                          <div class="card-footer text-center py-3">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </main>
                  </div>
                  <div id="layoutAuthentication_footer">
                      <footer class="py-4 bg-light mt-auto">
                          <div class="container-fluid px-4">
                              <div class="d-flex align-items-center justify-content-between small">
                                  <div class="text-muted">Copyright &copy; Your Website 2022</div>
                              </div>
                          </div>
                      </footer>
                  </div>
              </div>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
              <script src="/js/scripts.js"></script>
          </body>
      </html>
    `;
  },
  HTML_history:function(history){
    var cpu_usage_label = [];// chart column data
    var cpu_percent= [];  // chart row data
    var power_usage_label = [];
    var power_usage = [];

    for(var i = 0 ; i<history.length; i++){
          cpu_usage_label.push(history[i].time);
          cpu_percent.push(history[i].cpu_usage);
          power_usage_label.push(history[i].time);
          power_usage.push(history[i].power_usage);
    }

    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=0.5, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Dashboard - SB Admin</title>
            <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
            <link href="/css/styles.css" rel="stylesheet" />
            <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
        </head>
        <body class="sb-nav-fixed">
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a class="navbar-brand ps-3" href="http://servmon.cafe24.com/">Server Management</a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                                <div class="sb-sidenav-menu">
                                    <div class="nav">
                                        <div class="sb-sidenav-menu-heading">Core</div>
                                        <a class="nav-link" href="http://servmon.cafe24.com/">
                                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                            Dashboard
                                        </a>

                                        <div class="sb-sidenav-menu-heading">Interface</div>
                                        <a class="nav-link" href="http://servmon.cafe24.com/server_register">
                                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                            Add Server
                                        </a>
                                    </div>
                                </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <ol class="breadcrumb mb-4">
                                <h1 class="mt-4">${history[0].name} SERVER</1>
                            </ol>
                                <div class="col-xl-10">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <div style="font-weight:bold;">
                                              <i class="fas fa-chart-area me-1"></i>
                                              CPU HISTORY
                                            </div>
                                        </div>
                                        <div class="card-body">
                                          <canvas id="chart_${history[0].name}_cpu" width="100%" height="40"></canvas>
                                        </div>
                                        <script>
                                            ${this.chart_area_cpu(history[0].name,cpu_usage_label,cpu_percent)}
                                        </script>
                                    </div>
                                </div>

                                <div class="col-xl-10">
                                    <div class="card mb-4">
                                        <div class="card-header">
                                          <div style="font-weight:bold;">
                                            <i class="fas fa-chart-bar me-1"></i>
                                            POWER USAGE</div>
                                        </div>
                                        <div class="card-body"><canvas id="chart_${history[0].name}_power" width="100%" height="50"></canvas></div>
                                        <script>
                                        ${this.chart_area_power(history[0].name,power_usage_label,power_usage)}
                                        </script>
                                    </div>
                                </div>

                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    History of Server-1
                                </div>
                                <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Usage</th>
                                      <th>Num of users</th>
                                      <th>Power</th>
                                    </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                  <th>Time</th>
                                  <th>Usage</th>
                                  <th>Num of users</th>
                                  <th>Power</th>
                                </tr>
                            </tfoot>
                            <tbody>
                            ${this.detail_make_history(history)}

                            </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid px-4">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
            <script src="/js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
            <script src="/assets/demo/chart-area-demo.js"></script>
            <script src="/assets/demo/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
            <script src="/js/datatables-simple-demo.js"></script>
        </body>
    </html>`;

  }



}
