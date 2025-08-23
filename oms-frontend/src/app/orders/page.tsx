"use client";
import TelegramIcon from "@mui/icons-material/Telegram";
import Button from "@mui/material/Button";
import { useOrders } from "../hooks/orderHooks/useOrder";
import OrdersTable from "./_partials/OrdersTable";

export default function Orders() {
  const { rows, loading, error, telegramOrders } = useOrders();
  return (
    <div>
      <OrdersTable loading={loading} error={error} rows={rows} />
      <Button
        fullWidth
        startIcon={<TelegramIcon />}
        onClick={() => telegramOrders()}
      >
        SEND
      </Button>
    </div>
  );
}
