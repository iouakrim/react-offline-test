import React from 'react';
import {render} from '@testing-library/react';
import {DoughnutChart} from './DoughnutChart';
import EnergyData from '../../api/EnergyData';

jest.mock('react-chartjs-2', () => ({
    Doughnut: jest.fn(),
}));

jest.mock('chartjs-plugin-datalabels', () => jest.fn());
jest.mock('chartjs-plugin-autocolors', () => jest.fn());

const mockData: EnergyData = {
    from: '2024-03-01T00:00Z',
    to: '2024-03-01T23:59Z',
    generationmix: [
        {fuel: 'Solar', perc: 15},
        {fuel: 'Wind', perc: 30},
        {fuel: 'Hydro', perc: 20},
        {fuel: 'Natural Gas', perc: 10},
    ],
};

describe('DoughnutChart Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders without crashing', () => {
        render(<DoughnutChart data={mockData}/>);
        expect(require('react-chartjs-2').Doughnut).toHaveBeenCalledWith(
            {
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: '#FFFFF',
                        },
                        legend: {
                            display: true,
                        },
                        autocolors: {
                            mode: 'data',
                        },
                    },
                },
                data: {
                    labels: ['Solar', 'Wind', 'Hydro', 'Natural Gas'],
                    datasets: [
                        {
                            label: 'Percentage(%)',
                            data: [15, 30, 20, 10],
                        },
                    ],
                },
                height: 500,
                'data-testid': 'doughnut-chart'
            },
            {}
        );
    });

});
