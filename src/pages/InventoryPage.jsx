import { statusStyles, priorityStyles, cn } from "../utils/styles";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import { inventory } from "../data/mockData";
import Badge from "../components/ui/Badge";

function InventoryPage({ darkMode }) {
  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Inventory"
        subtitle="Track reserved parts, low-stock items and material availability for active service orders."
      />
      <Card darkMode={darkMode} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead
              className={
                darkMode
                  ? "bg-white/[0.035] text-slate-400"
                  : "bg-slate-50 text-slate-500"
              }
            >
              <tr>
                <th className="px-5 py-3 font-semibold">SKU</th>
                <th className="px-5 py-3 font-semibold">Material</th>
                <th className="px-5 py-3 font-semibold">Available</th>
                <th className="px-5 py-3 font-semibold">Reserved</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody
              className={cn(
                "divide-y",
                darkMode ? "divide-white/10" : "divide-slate-100",
              )}
            >
              {inventory.map((item) => (
                <tr
                  key={item.sku}
                  className={
                    darkMode ? "hover:bg-white/[0.035]" : "hover:bg-slate-50"
                  }
                >
                  <td className="px-5 py-4 font-bold text-indigo-500">
                    {item.sku}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 font-bold",
                      darkMode ? "text-white" : "text-slate-950",
                    )}
                  >
                    {item.name}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4",
                      darkMode ? "text-slate-300" : "text-slate-700",
                    )}
                  >
                    {item.stock}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4",
                      darkMode ? "text-slate-300" : "text-slate-700",
                    )}
                  >
                    {item.reserved}
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      className={
                        item.status === "Critical"
                          ? priorityStyles("Critical", darkMode)
                          : item.status === "Low Stock"
                            ? priorityStyles("High", darkMode)
                            : statusStyles("Completed", darkMode)
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default InventoryPage;
