import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster, toast } from "sonner";

export default function App() {
  const products = useQuery(api.products.listProducts);
  const fetchProducts = useAction(api.products.fetchAndValidateProducts);
  const clearProducts = useMutation(api.products.clearProducts);

  const handleFetch = async () => {
    try {
      await clearProducts();
      const count = await fetchProducts();
      toast.success(`Fetched and validated ${count} products`);
    } catch (error) {
      toast.error("Failed to fetch products: " + error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">API Testing App</h2>
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">API Testing Dashboard</h1>
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={handleFetch}
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Fetch & Validate Products
                </button>
              </div>
              {products && (
                <div className="grid gap-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-4 text-left">Title</th>
                          <th className="p-4 text-left">Price</th>
                          <th className="p-4 text-left">Rating</th>
                          <th className="p-4 text-left">Validation Errors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id} className="border-t">
                            <td className="p-4">{product.title}</td>
                            <td className="p-4">${product.price}</td>
                            <td className="p-4">{product.rating.rate}/5</td>
                            <td className="p-4">
                              {product.validationErrors.length > 0 ? (
                                <ul className="list-disc list-inside text-red-500">
                                  {product.validationErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-green-500">✓ Valid</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
