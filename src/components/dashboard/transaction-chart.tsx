"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
  { month: "Jan", income: 2400, expenses: 1800 },
  { month: "Feb", income: 2800, expenses: 2100 },
  { month: "Mar", income: 3200, expenses: 2400 },
  { month: "Apr", income: 3600, expenses: 2800 },
  { month: "May", income: 3200, expenses: 2900 },
  { month: "Jun", income: 3800, expenses: 2600 },
  { month: "Jul", income: 4100, expenses: 3000 },
  { month: "Aug", income: 4500, expenses: 3200 },
  { month: "Sep", income: 4800, expenses: 3500 },
  { month: "Oct", income: 5000, expenses: 3800 },
  { month: "Nov", income: 5200, expenses: 4000 },
  { month: "Dec", income: 5500, expenses: 4200 },
];

export function TransactionChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  const config = {
    income: {
      label: "Income",
      color: "var(--chart-1)"
    },
    expenses: {
      label: "Expenses",
      color: "var(--chart-5)"
    }
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border shadow-sm p-3 rounded-lg">
          <p className="font-medium text-sm">{label}</p>
          <div className="flex flex-col gap-1 mt-2">
            {payload.map((entry, index) => (
              <div 
                key={`item-${index}`} 
                className="flex items-center gap-2"
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }} 
                />
                <p className="text-muted-foreground text-xs">
                  {entry.name}: <span className="font-medium text-foreground">${entry.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="col-span-4"
    >
      <Card className="h-[420px]">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <CardDescription>Financial overview for the last 12 months</CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <ChartContainer 
            config={config}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
