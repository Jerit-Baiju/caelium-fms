"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUp, FiCoffee, FiHome, FiShoppingBag, FiSmartphone, FiZap } from "react-icons/fi";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const transactionIcons: Record<string, any> = {
  Shopping: FiShoppingBag,
  Groceries: FiShoppingBag,
  Utilities: FiZap,
  Rent: FiHome,
  Salary: FiArrowUp,
  "Coffee Shop": FiCoffee,
  "Mobile Phone": FiSmartphone,
};

export function RecentTransactions() {
  // Mock data for recent transactions
  const transactions: Transaction[] = [
    {
      id: "t1",
      name: "Salary Deposit",
      category: "Salary",
      amount: 3400,
      date: "Today",
      type: "income",
    },
    {
      id: "t2",
      name: "Electric Bill",
      category: "Utilities",
      amount: 120.50,
      date: "Yesterday",
      type: "expense",
    },
    {
      id: "t3",
      name: "Apartment Rent",
      category: "Rent",
      amount: 1200,
      date: "3 days ago",
      type: "expense",
    },
    {
      id: "t4",
      name: "Grocery Store",
      category: "Groceries",
      amount: 85.75,
      date: "4 days ago",
      type: "expense",
    },
    {
      id: "t5",
      name: "Coffee Shop",
      category: "Coffee Shop",
      amount: 12.50,
      date: "5 days ago",
      type: "expense",
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="col-span-2"
    >
      <Card className="h-[420px]">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => {
              const IconComponent = transactionIcons[transaction.category] || 
                (transaction.type === "income" ? FiArrowUp : FiArrowDown);
                
              return (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  key={transaction.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        transaction.type === "income" ? "text-emerald-500" : "text-red-500"
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.type === "income" ? "default" : "outline"} className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className={`text-sm font-semibold ${
                      transaction.type === "income" ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
