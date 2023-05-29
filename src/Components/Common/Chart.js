
import React, { useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./ChartsDynamicColor";
import Loader from './Loader';
import {  Container } from 'reactstrap';
const  Chart=({ dataColors, datasale, datadate })=>{
    var PopularityChartColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'Volume',
        data: datasale
    }];
    //console.log("Datajson chart",datasale);
    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        // markers: {
        //     size: 4,
        // },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: PopularityChartColors,
        xaxis: {
            categories: datadate,
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={260}
                className="apex-charts mt-n4"
            />
        </React.Fragment>
    );
}
const Chart2 = ({ dataColors, dataseries , datausers }) => {
    const chartRef = useRef(null);
    const sum = dataseries.reduce((acc, val) => acc + val, 0);
    const average = sum / dataseries.length;


    var barchartCountriesColors = getChartColorsArray(dataColors);
    const series = [{
        name: 'Volume',
        data: dataseries
    }];
    
    var options = {
        chart: {
            type: 'bar',
            height: 736,
            toolbar: {
                show: false,
            },
            events: {
                xAxisLabelClick: function(event, chartContext, config) {
                  
                  const index = config.labelIndex;
                  const link = '/profile/' + datausers[index];
                    window.open(link, "_parent");
                },
              },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        colors: barchartCountriesColors,
        dataLabels: {
            enabled: true,
            offsetX: 32,
            style: {
                fontSize: '16px',
                fontWeight: 400,
                colors: ['#adb5bd']
            }
        },

        legend: {
            show: false,
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: datausers,
            
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '16px', // Customize the font-size here
                    fontWeight: 400,
                    colors: ['#adb5bd'],
                },
            },
   
        },
        annotations: {
            xaxis: [{
              x: average,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
                text: 'Average',
              }
            }],
          },
    };

    useEffect(() => {
        if (chartRef.current && chartRef.current.container) {
          const xAxisLabels = chartRef.current.container.querySelectorAll(".apexcharts-xaxis-label");
          xAxisLabels.forEach((label, index) => {
            label.style.cssText = "cursor: pointer !important"; // Change the cursor to indicate the labels are clickable
            label.style.cursor = "pointer"; // Change the cursor to indicate the labels are clickable
            label.addEventListener("click", () => {
              const link = '/profile/' + datausers[index];
              window.open(link, "_blank");
            });
          });
        }
      }, [chartRef, datausers]);

      if (!series) {
        return <div className="page-content">
            <Container fluid={true}>
                <Loader />
            </Container>
        </div>
    }
      
    
      return (
        <React.Fragment>
          <ReactApexChart
            ref={chartRef}
            dir="ltr"
            options={options}
            series={series}
            type="bar"
            height="736"
            className="apex-charts "
          />
        </React.Fragment>
      );
    };
export { Chart,Chart2  };
