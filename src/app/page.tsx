import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { SavingsSummary } from "@/components/dashboard/savings-summary";
import { BalanceCard, SavingsCard, SpendingCard } from "@/components/dashboard/stat-cards";
import { TransactionChart } from "@/components/dashboard/transaction-chart";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Your financial overview for today.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <BalanceCard />
          <SavingsCard />
          <SpendingCard />
        </div>
        
        {/* Charts and Transactions */}
        <div className="grid gap-6 lg:grid-cols-6">
          <TransactionChart />
          <RecentTransactions />
          <SavingsSummary />
        </div>
      </div>
    </DashboardLayout>
  );
}
