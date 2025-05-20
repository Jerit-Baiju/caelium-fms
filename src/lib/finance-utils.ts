"use client";

interface FinanceCalculation {
  totalAmount: number;
  minimumBalance: number;
  savingPercent: number;
}

export function calculateSavings({
  totalAmount,
  minimumBalance,
  savingPercent
}: FinanceCalculation) {
  // Calculate saving amount based on the percentage
  const savingAmount = totalAmount * savingPercent;
  
  // Calculate available amount: total - (minimum + savings)
  const availableAmount = totalAmount - (minimumBalance + savingAmount);
  
  // Calculate percentages for visualization
  const minimumPercent = (minimumBalance / totalAmount) * 100;
  const savingPercent2 = (savingAmount / totalAmount) * 100;
  const availablePercent = (availableAmount / totalAmount) * 100;
  
  return {
    savingAmount,
    availableAmount,
    minimumPercent,
    savingPercent: savingPercent2,
    availablePercent,
  };
}
