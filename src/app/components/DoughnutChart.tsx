import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import autocolors from 'chartjs-plugin-autocolors';
import EnergyData from "../../api/EnergyData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    autocolors,
);
export const DoughnutChart: React.FC<{ data: EnergyData }> = ({data}) => {

    const pieOptions = {
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
    return <Doughnut options={pieOptions} data={{labels, datasets}} height={500} data-testid='doughnut-chart'/>
};
