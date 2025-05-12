export function calculateBMI(weight, heightCm) {
    if (!weight || !heightCm) return null;
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    return Number(bmi.toFixed(1));  
  }
  