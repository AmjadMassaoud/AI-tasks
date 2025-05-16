import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster, toast } from "sonner";
import { FormEvent, useState } from "react";

export default function App() {
  const expenses = useQuery(api.expenses.list);
  const stats = useQuery(api.expenses.stats);
  const addExpense = useMutation(api.expenses.add);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await addExpense({ category, amount: parseFloat(amount) });
      setCategory("");
      setAmount("");
      toast.success("Expense added!");
    } catch (error) {
      toast.error("Failed to add expense");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4">
        <h2 className="text-xl font-semibold">Expense Tracker</h2>
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="border p-2 rounded"
                  required
                  min="0"
                  step="0.01"
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                >
                  Add Expense
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-4">Statistics</h2>
              {stats && (
                <div className="space-y-4">
                  <p className="text-lg">Total: ${stats.total.toFixed(2)}</p>
                  <p className="text-lg">Daily Average: ${stats.dailyAverage.toFixed(2)}</p>
                  <div>
                    <h3 className="font-semibold mb-2">Top 3 Expenses:</h3>
                    <ul className="list-disc list-inside">
                      {stats.top3.map((exp) => (
                        <li key={exp._id}>
                          {exp.category}: ${exp.amount.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">All Expenses</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left">Category</th>
                      <th className="border p-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses?.map((expense) => (
                      <tr key={expense._id}>
                        <td className="border p-2">{expense.category}</td>
                        <td className="border p-2">${expense.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
