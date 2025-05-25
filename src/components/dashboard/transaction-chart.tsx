"use client";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Sample data - this would come from your API in production
const transactionData = [
	{ month: 'Jan', income: 2400, expense: 1800 },
	{ month: 'Feb', income: 3100, expense: 2300 },
	{ month: 'Mar', income: 2900, expense: 2100 },
	{ month: 'Apr', income: 3600, expense: 2800 },
	{ month: 'May', income: 3300, expense: 2600 },
	{ month: 'Jun', income: 3700, expense: 2900 },
	{ month: 'Jul', income: 4100, expense: 3200 },
];

// Chart configuration
const chartConfig: ChartConfig = {
	income: {
		label: "Income",
		theme: {
			light: "hsl(143, 72%, 46%)", // Green
			dark: "hsl(143, 72%, 46%)",
		},
	},
	expense: {
		label: "Expense",
		theme: {
			light: "hsl(358, 75%, 59%)", // Red
			dark: "hsl(358, 75%, 59%)",
		},
	},
};

// Define a type for the tooltip entry
interface ChartTooltipEntry {
  name: string;
  value: number;
  color: string;
}

// Custom tooltip
const CustomTooltip = ({ 
	active, 
	payload, 
	label 
}: TooltipProps<ValueType, NameType>) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg border bg-background p-2 shadow-sm">
				<div className="text-xs text-muted-foreground">{label}</div>
				{payload.map((entry, index: number) => {
					// Cast the entry to our interface that has the expected properties
					const typedEntry = entry as unknown as ChartTooltipEntry;
					return (
						<div
							key={`item-${index}`}
							className="flex items-center justify-between gap-2 text-sm"
						>
							<span
								className="h-2 w-2 rounded-full"
								style={{ backgroundColor: typedEntry.color }}
							/>
							<span className="font-medium">{typedEntry.name}: </span>
							<span>₹{typedEntry.value.toLocaleString()}</span>
						</div>
					);
				})}
			</div>
		);
	}
	return null;
};

export function TransactionChart() {
	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 0.3 }}
			className="col-span-2"
		>
			<Card className="h-[420px]">
				<CardHeader>
					<CardTitle>Income vs. Expense</CardTitle>
					<CardDescription>Monthly transaction activity overview</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 flex flex-col overflow-hidden p-4">
					<div className="w-full h-full min-h-[260px]">
						<ChartContainer config={chartConfig} className="w-full h-full">
							<LineChart
								data={transactionData}
								margin={{ top: 0, right: 0, left: 0, bottom: -10 }}
							>
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: '12px' }}
									dy={0}
								/>
								<YAxis
									tickFormatter={(value) => `₹${value}`}
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: '12px' }}
									width={45}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Line
									type="monotone"
									dataKey="income"
									stroke="var(--color-income)"
									strokeWidth={2}
									dot={{ r: 3 }}
									activeDot={{ r: 5, strokeWidth: 0 }}
								/>
								<Line
									type="monotone"
									dataKey="expense"
									stroke="var(--color-expense)"
									strokeWidth={2}
									dot={{ r: 3 }}
									activeDot={{ r: 5, strokeWidth: 0 }}
								/>
							</LineChart>
						</ChartContainer>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
