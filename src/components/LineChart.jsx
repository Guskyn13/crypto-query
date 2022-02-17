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

    coinHistoryDates?.map((date) => {
        coinTimestamp.push(date[0])
        return coinTimestamp;
    }
    )

    coinHistoryDates?.map((date) => {
        coinPrice.push(date[1])
        return coinPrice;
    }
    )

    const data = {
        labels: coinTimestamp,
        datasets: [{
            label: `${coinName} price in USD`,
            data: coinPrice,
            fill: false,
            backgroundColor: '#000',
            borderColor: '#fff',
            lineTension: 0.1
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Price'
                },
                max: coinPrice.max
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                }
            }
        }
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center w-screen pl-4 pr-4 pt-8 pb-20 xl:w-5/6'>
                <p className='text-white text-lg'>Current {coinName} Price: ${currentPrice}</p>
                <Line data={data} options={options} />
            </div>
        </>

    );
};

export default LineChart;