import React, {useState, useEffect} from 'react';
import EnergyData from '../api/EnergyData';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {BarChart} from './components/BarChart';
import {Button, ButtonGroup, styled} from '@mui/material';
import {DoughnutChart} from "./components/DoughnutChart";
import CachedIcon from '@mui/icons-material/Cached';
import SortIcon from '@mui/icons-material/Sort';
import {fetchEnergyData} from "../api/api";

const App: React.FC = () => {

    const Item = styled(Paper)(({theme}) => ({
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center'
    }));

    const [isLoading, setLoading] = useState(true);
    const [energyData, setEnergyData] = useState<EnergyData>();
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetchEnergyData()
            .then(data => {
                setEnergyData(data)
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const formatDate = (date: string | undefined) => {
        return date ? new Date(date).toLocaleString('en-GB') : '';
    };

    const sortData = () => {
        if (energyData) {
            const sortedData = [...energyData.generationmix].sort((a, b) => b.perc - a.perc);
            setEnergyData({...energyData, generationmix: sortedData});
        }
    };

    const renderLoading = () => <p>Loading data...</p>;
    const renderTitle = () => {
        const startDate = formatDate(energyData?.from);
        const endDate = formatDate(energyData?.to);
        return isLoading ? 'UK Energy Mix' : `UK Energy Mix (${startDate} to ${endDate})`;
    };

    return (
        <Box my={4} margin={2} alignItems="center">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Item>
                        <h1>{renderTitle()}</h1>
                    </Item>
                </Grid>
                <Grid item xs={12} md={12}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button startIcon={<CachedIcon/>} variant="contained" onClick={loadData}>Refresh</Button>
                        <Button startIcon={<SortIcon/>} variant="contained" onClick={sortData}>Sort</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>{isLoading ? renderLoading() : <DoughnutChart data={energyData}/>}</Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>{isLoading ? renderLoading() : <BarChart data={energyData}/>}</Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export {App};
