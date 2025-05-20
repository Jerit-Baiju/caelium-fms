"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { ProgressBar } from "./progress-bar";

export function SavingsSummary() {
  // Mock savings data
  const savingsData = {
    minimum_balance: 2000,
    total_amount: 12580,
    saving_percent: 0.3,
    available: 6806,
  };
  
  // Calculate saving amount: total * saving_percent
  const savingAmount = savingsData.total_amount * savingsData.saving_percent;
  
  // Calculate available amount: total - (minimum + saving)
  const availableAmount = savingsData.total_amount - (savingsData.minimum_balance + savingAmount);
  
  // Calculate percentages
  const minimumPercent = (savingsData.minimum_balance / savingsData.total_amount) * 100;
  const savingPercent = (savingAmount / savingsData.total_amount) * 100;
  const availablePercent = (availableAmount / savingsData.total_amount) * 100;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="col-span-2"
    >
      <Card className="h-[420px]">
        <CardHeader>
          <CardTitle>Savings Summary</CardTitle>
          <CardDescription>Breakdown of your account savings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Total Balance</span>
              <span className="text-xl font-bold">₹{savingsData.total_amount.toFixed(2)}</span>
            </div>
            <ProgressBar className="h-2" value={100} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Minimum Balance</span>
                <span className="text-sm font-medium">₹{savingsData.minimum_balance.toFixed(2)}</span>
              </div>
              <ProgressBar 
                className="h-2" 
                value={minimumPercent} 
                variant="default" 
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Savings ({(savingsData.saving_percent * 100)}%)</span>
                <span className="text-sm font-medium">₹{savingAmount.toFixed(2)}</span>
              </div>
              <ProgressBar 
                className="h-2" 
                value={savingPercent} 
                variant="success" 
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Available to Spend</span>
                <span className="text-sm font-medium">₹{availableAmount.toFixed(2)}</span>
              </div>
              <ProgressBar 
                className="h-2" 
                value={availablePercent} 
                variant="info" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Formula:</span> Available = Total - (Minimum + (Total × Saving%))
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{availableAmount.toFixed(2)} = ₹{savingsData.total_amount.toFixed(2)} - (₹{savingsData.minimum_balance.toFixed(2)} + (₹{savingsData.total_amount.toFixed(2)} × {savingsData.saving_percent}))
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            <span>Adjust Savings Plan</span>
            <FiArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
