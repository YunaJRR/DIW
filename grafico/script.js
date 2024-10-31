const selGraphic = document.querySelector(".sel-graphics");
const barDiv = document.getElementById("bar-chart");
const donutDiv = document.getElementById("donut-chart");
let barChart, donutChart;

// Al seleccionar el tipo de gráfico deseado se llama a la función de creación de 
selGraphic.addEventListener("change", (event) => {
    let json;
    if (event.target.value === "opt-videojuegos") {
        json = "videojuegos.JSON";
        drawGraphics(json, "ventas");
    } else if (event.target.value === "opt-poblacion") {
        json = "poblacion.JSON";
        drawGraphics(json, "población");
    }
});

function drawGraphics(json, chartText) {
    // Comprobar si los gráficos están creados, si no lo están se crean
    if (!barChart) {
        // Configuracion del gráfico de barras
        let dataBarChart = {
            chart: {
                height: 350,
                type: 'bar',
            },
            dataLabels: {
                enabled: false
            },
            series: [],
            title: {
                text: chartText,
            },
            xaxis: {
                categories: []
            },
            noData: {
                text: 'Loading...'
            }
        };

        // Crear el gráfico de barras
        barChart = new ApexCharts(barDiv, dataBarChart);
        barChart.render();
    }

    if (!donutChart) {
        // Configuracion del gráfico de donut
        let dataDonutChart = {
            chart: {
                height: 350,
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            series: [],
            title: {
                text: chartText,
            },
            noData: {
                text: 'Loading...'
            },
            labels: []
        };

        // Configuracion del gráfico de donut
        donutChart = new ApexCharts(donutDiv, dataDonutChart);
        donutChart.render();
    }

    // Recibir los datos del json seleccionado
    fetch(json)
        .then(response => response.json())
        .then(data => {
            let dato1 = data.map(item => item.dato1);
            let dato2 = data.map(item => item.dato2);

            // Actualizar el gráfico de barras
            barChart.updateOptions({
                series: [{
                    name: chartText,
                    data: dato2 
                }],
                xaxis: {
                    categories: dato1
                }
            });

            // Actualizar el gráfico de donut
            donutChart.updateOptions({
                series: dato2, 
                labels: dato1 
            });
        });
}