'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { OrderStatus, OrderRow, DataGridDemoProps, testData } from '../interfaces/data';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return 'default';
        case 'packaging':
            return 'secondary';
        case 'delivering':
            return 'primary';
        case 'complete':
            return 'success';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const getOrderDateColor = (dateString: string): string => {
    const today = new Date();
    const orderDate = new Date(dateString);
    const diffInDays = (today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 3) {
        return 'green';
    } else if (diffInDays <= 7) {
        return 'orange';
    } else
        return 'red';
};


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productId', headerName: 'Product ID', width: 100 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'address', headerName: 'Address', width: 260, sortable: false },
    { field: 'phone', headerName: 'Phone', width: 100, sortable: false },
    {
        field: 'createdAt',
        headerName: 'Order Date',
        width: 150,
        renderCell: (params) => (
            <span style={{ color: getOrderDateColor(params.value) }}>
                {params.value}
            </span>
        ),
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['pending', 'packaging', 'delivering', 'complete', 'cancelled'],
        renderCell: (params) => (
            <Chip
                label={params.value}
                color={getStatusColor(params.value)}
                variant="filled"
            />
        ),
    },
    {
        field: 'totalPrice',
        headerName: 'Total Price',
        width: 100,
        renderCell: (params) => (
            <Chip
                label={`$${params.value}`}
                variant="outlined"
            />
        )
    }


];

const theme = createTheme();

export default function DataGridDemo({ rows: propRows }: DataGridDemoProps) {
    const [rows, setRows] = useState<OrderRow[]>(propRows ?? testData);

    const handleProcessRowUpdate = (newRow: OrderRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleProcessRowUpdateError = (error: unknown) => {
        console.error("Error updating row:", error);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '80vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    processRowUpdate={handleProcessRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                />
            </Box>
        </ThemeProvider>
    );
}