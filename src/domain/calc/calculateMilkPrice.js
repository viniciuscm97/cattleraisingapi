export default function calculateMilkPrice(volume = 0, farmDistance = 0, month = 0) {
    const basePrice = month <= 6 ? 1.8 : 1.95;
    const costPerFarmDistance = farmDistance <= 50 ? 0.5 : 0.6;
    const bonus = month > 6 && volume > 10000 ? 0.01 : 0;

    return (volume * basePrice) - (costPerFarmDistance * farmDistance) + (volume * bonus);
}