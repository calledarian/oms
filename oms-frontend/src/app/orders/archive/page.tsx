"use client";
import { useEffect } from "react";
import { useOrders } from "@/app/hooks/orderHooks/useOrder"; // no .ts
import OrdersTable from "./_partials/OrdersTable";

export default function Orders() {
  const orderState = useOrders();

  useEffect(() => {
    orderState.fetchArchivedOrders(); // Only fetch archived orders
  }, []);

  return (
    <div>
      <OrdersTable
        loading={orderState.loading}
        error={orderState.error}
        rows={orderState.rows}
      />
    </div>
  );
}
