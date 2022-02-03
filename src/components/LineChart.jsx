import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Legend,
);

const LineChart = ({ currentPrice, coinName, coinHistory }) => {
    const coinHistoryDates = coinHistory?.prices;
    const coinTimestamp = [];
    const coinPrice = [];

    coinHistoryDates.map((date) => {
        coinTimestamp.push(date[0])
        return coinTimestamp;
    }
    )

    coinHistoryDates.map((date) => {
        coinPrice.push(date[1])
        return coinPrice;
    }
    )

    console.log("x Axis", coinTimestamp);

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: `${coinName} price in USD`,
                data: coinPrice,
                fill: false,
                backgroundColor: '#000',
                borderColor: '#000',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <>
            <div className='w-11/12 pl-60 pt-20 pb-20'>
                <Line data={data} options={options} />
            </div>
        </>

    );
};

export default LineChart;