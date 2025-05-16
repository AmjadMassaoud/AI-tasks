import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";

export default function App() {
  const marchSales = useQuery(api.orders.getMarchSales);
  const topCustomer = useQuery(api.orders.getTopCustomer);
  const averageOrder = useQuery(api.orders.getAverageOrder);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4">
        <h2 className="text-xl font-semibold accent-text">Sales Analysis</h2>
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold accent-text mb-4">Sales Dashboard</h1>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">March 2024 Sales</h2>
              <p className="text-3xl font-bold">${marchSales?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Top Customer</h2>
              <p className="text-3xl font-bold">{topCustomer?.[0]}</p>
              <p className="text-gray-600">${topCustomer?.[1].toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Average Order Value</h2>
              <p className="text-3xl font-bold">${averageOrder?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
