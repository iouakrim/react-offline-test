import EnergyData from "./EnergyData";
import axios from "axios";

export const fetchEnergyData = async (): Promise<EnergyData> => {
    try {
        const response = await axios.get('https://api.carbonintensity.org.uk/generation');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
