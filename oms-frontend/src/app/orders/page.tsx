'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { OrderRow, DataGridDemoProps, testData } from '../interfaces/data';
import { renderCellExpand } from '../utility/expandGrid';
import { getOrderDateColor } from '../utility/dateUi';
import { getStatusColor } from '../utility/statusUi';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, resizable: false, sortingOrder: ['desc', 'asc'] },
    { field: 'productId', headerName: 'Product ID', width: 100, resizable: false, sortingOrder: ['desc', 'asc']  },
    { field: 'quantity', headerName: 'Quantity', width: 100, resizable: false, sortingOrder: ['desc', 'asc'] },
    { field: 'address', headerName: 'Address', width: 260, sortable: false, renderCell: renderCellExpand, },
    { field: 'phone', headerName: 'Phone', width: 100, sortable: false, resizable: false },
    {
    field: 'createdAt',
    headerName: 'Order Date',
    renderCell: (params) => {
        const rawDate = new Date(params.value);
        const formattedDate = rawDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        });

        const color = getOrderDateColor(params.value); // or pass `rawDate` if needed

            return (
            <span style={{ color }}>
                {formattedDate}
            </span>
            );
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
        type: 'singleSelect',
        resizable: false,
        sortingOrder: ['desc', 'asc'],
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
        resizable: false,
        sortingOrder: ['desc', 'asc'],
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