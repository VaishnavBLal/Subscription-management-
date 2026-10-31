# Brightloop Subscription Management System

A unified software platform to manage products, subscription plans, recurring billing, invoices, payments, and financial reporting in one place.

## Overview

Brightloop Subscription Management System is built to handle the end-to-end lifecycle of recurring revenue operations, replacing manual spreadsheets and disconnected invoicing processes with an automated system.

## Key Capabilities

- **Authentication and Role-Based Access Control**:
  - Secure customer account creation with strict password policy (minimum 8 characters, uppercase, lowercase, special character).
  - Password reset mechanism.
  - Three user roles: Admin, Internal Staff, and Customer (with a dedicated Customer Portal).

- **Product Catalog and Variants**:
  - Product configuration with sales price, cost price, and product types.
  - Variant support with attribute-based price adjustments (e.g., brand variants adding price increments).

- **Subscription Plans and Lifecycle Policies**:
  - Billing recurrence frequencies: Daily, Weekly, Monthly, and Yearly.
  - Minimum purchase quantity and availability date windows.
  - Configurable lifecycle rules per plan: auto-close on end date, allow early close, allow pause, and renewal settings.

- **Quotation Templates and Subscription Lifecycle**:
  - Quotation templates with preset plans, products, and validity duration.
  - State machine: Draft -> Quotation -> Confirmed -> Active -> Closed (with Paused state support).

- **Automated Recurring Billing ("Billing Day")**:
  - Batch generation of invoices from active subscriptions due for billing.
  - Idempotent execution preventing duplicate billing or skipped billing cycles.
  - Automatic rollover of subscription lines, taxes, and applicable discounts.

- **Tax and Discount Rules**:
  - Tax calculation based on admin-defined rules.
  - Discount rules with fixed or percentage values, minimum purchase/quantity thresholds, validity periods, and usage caps.
  - Product-level or subscription-level discount scopes.

- **Payment Recording and Accounts Receivable**:
  - Recording payments across multiple methods (Credit Card, Bank Transfer, PayPal, Cash, Cheque).
  - Support for partial payments with real-time balance tracking.
  - Accounts receivable aging tracking to monitor and chase overdue invoices.

- **Finance Lead Analytics Dashboard**:
  - Metrics tracking: Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), total collected revenue, and overdue amounts.
  - Fast query execution ensuring response times remain under two seconds even with thousands of subscriptions.

## Tech Stack

- **Framework**: Next.js (App Router, React, TypeScript)
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: Session-based auth with bcrypt password hashing
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed initial sample data:
   ```bash
   npm run seed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

## Testing

Run automated tests:
```bash
npm run test
```
