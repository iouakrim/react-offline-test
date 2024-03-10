import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import {App} from "./app";
import mockAxios from 'jest-mock-axios';
import axios from "axios";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
afterEach(() => mockAxios.reset())

describe('App', () => {
    test('renders App component with loading message', async () => {

        render(<App/>);
        const loadingElements = screen.getAllByText('Loading data...');
        expect(loadingElements).toHaveLength(2);
        loadingElements.forEach(element => {
            expect(element).toBeInTheDocument();
        });
    });
    test('renders App component with all charts', async () => {
        mockedAxios.get.mockResolvedValue({
            data: {
                data: {
                    from: "2019-08-12T12:30Z",
                    to: "2019-08-12T13:00Z",
                    generationmix: [
                        {
                            fuel: "biomass",
                            perc: 4.8
                        },
                        {
                            fuel: "coal",
                            perc: 2.5
                        }
                    ]
                }
            },
        });
        await act(async () => {
            render(<App/>);
        });
        await waitFor(() => {
            expect(screen.getByText(/UK Energy Mix/i)).toBeInTheDocument();
            expect(screen.getByText(/Refresh/i)).toBeInTheDocument();
            expect(screen.getByText(/Sort/i)).toBeInTheDocument();
            expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
            expect(screen.getByTestId('bar-chart')).toBeInTheDocument();

        });
    });

})