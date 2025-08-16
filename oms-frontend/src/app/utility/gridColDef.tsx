import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getStatusColor } from "./statusUi";
import { getOrderDateColor } from "./dateUi";

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 90 },
    {
        field: 'products',
        headerName: 'Products',
        width: 300,
        sortable: false,
        renderCell: (params) => (
            <span>
                {params.row.orderItems
                    .map((item: any) => `${item.product.name} (x${item.quantity})`)
                    .join(', ')}
            </span>
        ),
    },
    {
        field: 'totalAmount',
        headerName: 'Total Amount',
        width: 120,
        renderCell: (params) => <Chip label={`$${params.row.totalAmount}`} variant="outlined" />,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => (
            <Chip
                label={params.row.status}
                color={getStatusColor(params.row.status)}
                variant="filled"
            />
        ),
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 190,

    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Order Date',
        width: 150,
        renderCell: (params) => {
            const rawDate = new Date(params.row.createdAt);
            const formattedDate = rawDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            const color = getOrderDateColor(params.row.createdAt);
            return <span style={{ color }}>{formattedDate}</span>;
        },
    },
];