"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUp, FiDollarSign } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  trendLabel: string;
  icon: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, description, trend, trendLabel, icon, delay = 0 }: StatCardProps) {
  const isPositive = trend > 0;
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center text-xs">
            <CardDescription>{description}</CardDescription>
            <div className={`flex items-center ml-auto ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
              <span>{Math.abs(trend)}% {trendLabel}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BalanceCard() {
  return (
    <StatCard
      title="Account Balance"
      value="₹12,58,000.00"
      description="Available to spend"
      trend={+5.2}
      trendLabel="from last month"
      icon={<FiDollarSign className="h-4 w-4 text-primary" />}
      delay={0.1}
    />
  );
}

export function SavingsCard() {
  return (
    <StatCard
      title="Savings"
      value="₹4,209.50"
      description="Total saved"
      trend={+12.5}
      trendLabel="from target"
      icon={<FiArrowUp className="h-4 w-4 text-emerald-500" />}
      delay={0.2}
    />
  );
}

export function SpendingCard() {
  return (
    <StatCard
      title="Monthly Spend"
      value="₹2,850.75"
      description="This month"
      trend={-3.4}
      trendLabel="vs. previous month"
      icon={<FiArrowDown className="h-4 w-4 text-red-500" />}
      delay={0.3}
    />
  );
}
