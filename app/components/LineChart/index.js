import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ textY, nameChart, dataEnergy, labelsEnergy }) => {


    const labels = labelsEnergy;

    // const timeArray = dataEnergy.map(obj => obj.Time);
    // const totalKwhArray = dataEnergy.map(obj => obj.Total_kWh);

    let dataLine = [];
    if (dataEnergy !== undefined) {
        dataLine = dataEnergy;
    }

    // console.log("dataLine", dataLine);


    const data = {
        labels: labels,
        // labels: timeArray,
        datasets: [{
            label: nameChart,
            // data: [65, 59, 80 - null, null, null, 55, 40],
            data: dataLine,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.01,
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: textY // Tiêu đề cho trục y
                    },
                    // ticks: {
                    //   // Đơn vị cho trục y
                    //   callback: function (value, index, values) {
                    //     return value + ' kWh';
                    //   }
                    // }
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    };

    return (
        <Line {...config} />
    )
}

export default LineChart;