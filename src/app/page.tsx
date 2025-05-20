'use client';
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SavingsSummary } from "@/components/dashboard/savings-summary";
import { BalanceCard, SavingsCard, SpendingCard } from "@/components/dashboard/stat-cards";
import { TransactionChart } from "@/components/dashboard/transaction-chart";
import Wrapper from "./Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <div className="h-[calc(100vh-4rem)] p-3 md:p-4 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Welcome back! Your financial overview for today.
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            <BalanceCard />
            <SavingsCard />
            <SpendingCard />
          </div>
          
          {/* Charts and Transactions */}
          <div className="grid gap-3 md:gap-4 grid-cols-1 xl:grid-cols-3">
            {/* Left Column - Transaction Chart */}
            <TransactionChart />
            
            {/* Right Column - Stack on mobile, side by side on medium screens */}
            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
              <RecentTransactions />
              <SavingsSummary />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
