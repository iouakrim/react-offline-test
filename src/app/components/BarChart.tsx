import React from 'react';
import {Bar} from 'react-chartjs-2';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import EnergyData from "../../api/EnergyData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const BarChart: React.FC<{ data: EnergyData }> = ({data}) => {

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                color: '#FFFFF'
            },
            legend: {
                display: true
            },
            autocolors: {
                mode: 'data' as 'data'
            }
        }
    };

    const labels = data ? data.generationmix.map((item) => item.fuel) : [];

    const datasets = [
        {
            label: 'Percentage(%)',
            data: data ? data.generationmix.map((item) => item.perc) : []
        }
    ];
    return <Bar options={barOptions} data={{labels, datasets}} height={500} data-testid='bar-chart'/>
};
