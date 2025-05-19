export function calculateBMI(weight, heightCm) {
    if (!weight || !heightCm) return null;
    const heightM = heightCm / 100;
    return Number((weight / (heightM * heightM)).toFixed(1));
  }
  