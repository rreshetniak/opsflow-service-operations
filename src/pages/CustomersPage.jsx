import { cn } from "../utils/styles";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { customers } from "../data/mockData";
import { Building2 } from "lucide-react";

function CustomersPage({ darkMode }) {
  return (
    <div>
      <PageHeader darkMode={darkMode} title="Customers" subtitle="Monitor customers, account health, open work volume and SLA performance." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {customers.map((customer) => (
          <Card key={customer.name} darkMode={darkMode} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white"><Building2 size={21} /></div>
              <div>
                <h3 className={cn("font-bold", darkMode ? "text-white" : "text-slate-950")}>{customer.name}</h3>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>{customer.segment}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>Orders</p><p className="font-bold">{customer.openOrders}</p></div>
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>SLA</p><p className="font-bold">{customer.sla}</p></div>
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>Revenue</p><p className="font-bold">{customer.revenue}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CustomersPage;