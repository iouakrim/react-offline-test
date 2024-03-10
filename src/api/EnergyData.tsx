interface EnergyData {
    from: string;
    to: string;
    generationmix: {
        fuel: string;
        perc: number;
    }[];
}

export default EnergyData;
