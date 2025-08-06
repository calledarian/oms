# 🧾 Order Management CMS

A simple order management system built with **NestJS + Next.js + PostgreSQL** to let admins create/manage products and orders, track their statuses, generate reports, and view dashboard analytics.

---

## ✅ Features

### 🔧 Core Features
- Admin can create and manage **Products**
- Admin can create **Orders** by selecting existing products
- Each order stores:
  - Product reference
  - Quantity
  - Price per unit (copied from product)
  - Total price (auto-calculated)
  - Customer address & phone number
- Orders begin with status **"Pending"**
- Status can be updated via dropdown:
  - `Pending` → `Packaging` → `Delivering` → `Completed`
  - Can also be `Cancelled` anytime
- Orders marked `Completed` are **archived**

### 🧩 Side Features
- 📥 **Download orders as CSV** (for billing & status report)
- 📊 **Dashboard** with statistics:
  - Total orders
  - Orders by status
  - Orders this week
  - Most ordered products
- 🔍 **Order filtering**:
  - By status
  - Date range
  - Product
  - Phone or address

---

## 🧱 Planned Pages

| Route            | Purpose                        |
|------------------|--------------------------------|
| `/dashboard`     | Dashboard + CSV export         |
| `/products`      | Create/view/edit products      |
| `/orders`        | List + filter + status update  |
| `/orders/create` | Create new order               |

---

## 🧩 Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | **Next.js**        |
| UI         | **Material UI**    |
| Charts     | **Chart.js**       |
| Backend    | **NestJS**         |
| ORM        | **TypeORM**        |
| Database   | **PostgreSQL**     |

---

## 🗃️ Database Models

### Product
- `id`: number
- `name`: string
- `description`: string (optional)
- `price`: decimal
- `createdAt`: datetime

### Order
- `id`: number
- `productId`: foreign key → Product
- `quantity`: number
- `price`: decimal (copied from product)
- `totalPrice`: decimal
- `phoneNumber`: string
- `address`: string
- `status`: enum [Pending, Packaging, Delivering, Completed, Cancelled]
- `isArchived`: boolean
- `createdAt`: datetime
- `updatedAt`: datetime

---

## 📈 Dashboard Metrics (Examples)
- Total Orders
- Orders by Status (Bar or Pie chart)
- Orders per Day (Line chart)
- Most Ordered Products

---

## 📥 CSV Export Options
- **Bulk report**: Export list of orders
- **Bill-style**: Export one order per file (optional)

---

## 🔐 Authentication
All users are admins – no role system required.
Basic login system to be added if needed.
