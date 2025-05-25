'use client';
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
// import { SavingsSummary } from "@/components/dashboard/savings-summary";
import { BalanceCard, SavingsCard, SpendingCard } from "@/components/dashboard/stat-cards";
import { TransactionChart } from "@/components/dashboard/transaction-chart";
import Wrapper from "./Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <div className="h-[calc(100vh-10rem)] mt-4 p-4 md:p-4 overflow-scroll">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          
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
              {/* <SavingsSummary /> */}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
