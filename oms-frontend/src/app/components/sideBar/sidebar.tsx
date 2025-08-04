"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Link from 'next/link';

const drawerWidth = 240;

export default function SideBar() {
    const DrawerList = (
        <Box
            sx={{ width: drawerWidth }}
            role="navigation"
            aria-label="main navigation"
        >
            <List>
                {['Dashboard', 'Order'].map((text, index) => (
                    <ListItem
                        component={Link}
                        key={text}
                        href={text === 'Order' ? '/order-form' : '/'}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <DashboardIcon /> : <ProductionQuantityLimitsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            {DrawerList}
        </Drawer>
    );
}
