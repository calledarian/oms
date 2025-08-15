import { OrderRow } from "@/app/interfaces/data";
import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useOrders() {
    const [rows, setRows] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<OrderRow[]>(`${BACKEND_URL}/orders`);
            setRows(response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { rows, loading, error, fetchOrders };
}
