import React from 'react';
import {render} from '@testing-library/react';
import {BarChart} from './BarChart';
import EnergyData from '../../api/EnergyData';

jest.mock('react-chartjs-2', () => ({
    Bar: jest.fn(),
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

describe('BarChart Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<BarChart data={mockData}/>);
        expect(require('react-chartjs-2').Bar).toHaveBeenCalledWith(
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
                'data-testid': 'bar-chart'
            },
            {}
        );
    });
});
