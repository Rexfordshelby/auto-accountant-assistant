
# Accountly - Accounting Web Application Documentation

## Overview

Accountly is a comprehensive accounting web application designed to help businesses manage their finances efficiently. The application provides tools for expense tracking, invoice management, financial reporting, tax calculations, and client management.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Authentication, Database, Storage, Edge Functions)
- **Payments**: Stripe integration
- **State Management**: React Context API and TanStack Query
- **Charts**: Recharts
- **Routing**: React Router

## Core Features

### 1. Authentication System

The application uses Supabase Authentication with the following features:
- Email/password login and registration
- Session management
- Protected routes with AuthGuard component
- User profile management

### 2. Expense Tracking

- Record and categorize expenses
- Upload and attach receipts
- Filter and search functionality
- Basic and advanced expense reporting

### 3. Invoice Management

- Create, edit, and delete invoices
- Add line items to invoices
- Track payment status
- Send invoices to clients
- Generate PDF invoices

### 4. Financial Reporting

- Dashboard with key financial metrics
- Income and expense reports
- Cash flow analysis
- Tax liability estimation
- Customizable reporting periods

### 5. Tax Calculator

- Basic and advanced tax calculations
- Support for different business structures
- Tax deduction recommendations
- Estimated tax payment schedules

### 6. Client Management

- Add and manage client information
- Client dashboard with activity summary
- Client-specific reports
- Communication history

### 7. Subscription System (Currently Disabled for Testing)

The application has a subscription system with tiered access to features:
- Free: Basic reporting, basic tax calculator, view invoices, basic expense tracking
- Starter: Advanced reporting, invoice creation, advanced expense tracking
- Professional: Financial forecasting, advanced tax calculator, priority support
- Enterprise: Custom API integration, dedicated account manager, compliance assistance

Note: All features are currently accessible without subscription for testing purposes.

## Database Schema

### Main Tables:

1. **profiles**
   - User profile information
   - Linked to auth.users via id

2. **clients**
   - Client information (name, contact details, business info)
   - Linked to user_id from auth.users

3. **invoices**
   - Invoice details (number, dates, amounts, status)
   - Linked to user_id and client_id

4. **invoice_items**
   - Line items for invoices
   - Linked to invoice_id

5. **transactions**
   - Financial transactions (expenses, income)
   - Categorized and linked to user_id

6. **subscriptions**
   - User subscription information
   - Tier, status, and billing details

7. **financial_documents**
   - Uploaded financial documents
   - Metadata and processing status

## File Structure

- **/src/components**: Reusable UI components
- **/src/contexts**: React context providers (Auth, Subscription, Notification)
- **/src/hooks**: Custom React hooks
- **/src/lib**: Utility functions and libraries
- **/src/pages**: Main page components
- **/src/services**: API and service layer
- **/src/components/ui**: UI component library (Shadcn UI)
- **/supabase/functions**: Supabase Edge Functions for backend operations

## Key Components

### AuthGuard

Protects routes from unauthenticated access. Redirects to login if no valid session exists.

### SubscriptionGuard

Controls access to premium features based on subscription tier. Currently modified to grant access to all features.

### Navbar

Main navigation component with links to dashboard, clients, reports, tools, and user settings.

### Dashboard

Main dashboard with financial summary, recent transactions, and quick actions.

### SubscriptionPlans

Displays available subscription tiers with features and pricing.

## Supabase Edge Functions

### check-subscription

Verifies the user's subscription status with Stripe and returns tier information.

### create-checkout

Creates a Stripe checkout session for subscription upgrades.

### webhook-handler

Handles Stripe webhook events for subscription management.

## Integration Points

### Stripe Integration

- Payment processing for subscriptions
- Webhook handling for subscription lifecycle events
- Customer management linked to Supabase auth users

### Supabase Integration

- Authentication and user management
- Database for all application data
- Storage for uploaded documents and receipts
- Edge Functions for secure backend operations

## Future Improvements

1. **Mobile Responsiveness Enhancement**: Further improve the mobile experience 
2. **Advanced Reporting**: Add more sophisticated financial reports and visualizations
3. **Data Export Options**: Add CSV, Excel, and PDF export functionality
4. **Multi-Currency Support**: Handle transactions in different currencies
5. **API Integrations**: Connect with banking, payroll, and other financial services
6. **Document OCR**: Implement optical character recognition for receipts and invoices
7. **Audit Trail**: Track all changes to financial data for compliance

## Extending the Application

To add new features to the application:

1. Create new components in the appropriate folders
2. Update the database schema if needed
3. Add new API endpoints via Supabase Edge Functions
4. Update the routing in App.tsx
5. Add new context providers if required
6. Ensure proper authentication and access control

## Current Testing Mode

The application is currently configured to provide full access to all features without requiring subscription payments. This is temporary for testing and development purposes.

To restore the subscription-based access model:
1. Revert changes in SubscriptionService.ts
2. Restore tier checks in the hasAccess method of SubscriptionContext.tsx
3. Configure Stripe with appropriate products and prices

## Deployment

The application is deployed using the Supabase platform and can be accessed at the associated domain. For local development, use:

```
npm install
npm run dev
```

Edge Functions can be deployed using the Supabase CLI:

```
supabase functions deploy
```
