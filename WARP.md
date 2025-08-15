# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
bun dev
# Starts Next.js dev server with Turbopack for faster builds
```

**Build for production:**
```bash
bun run build
```

**Start production server:**
```bash
bun run start
```

**Lint code:**
```bash
bun run lint
```

**Add new UI components (shadcn/ui):**
```bash
npx shadcn@latest add [component-name]
# Components are configured with "new-york" style and stone base color
```

## Architecture Overview

This is a **Next.js 15 App Router** application built with **React 19**, **TypeScript**, and **Tailwind CSS** for generating professional invoices with PDF export functionality.

### Core Architecture Pattern

The application follows a **Context + Hooks pattern** for state management:
- **InvoiceContext** (`context/invoice.context.tsx`) - Central state management for invoice data
- **useInvoice** hook (`hooks/invoice.ts`) - Provides safe access to invoice context
- All invoice operations (CRUD for items, calculations) are handled through context methods

### Data Flow

1. **Invoice State**: Managed in `InvoiceContext` with automatic total calculations
2. **Form Components**: Individual sections that update context via `updateInvoice`, `addItem`, `removeItem`, `updateItem`
3. **Preview**: Reads context state and generates PDF using jsPDF
4. **Calculations**: Automatic recalculation of subtotal, tax, and total when items or tax rate change

### Key Components Structure

- **Page Layout**: Single-page app with form/preview toggle
- **Form Sections**: Modular components (`BasicDetails`, `ContactDetails`, `ItemsList`, `TaxAndTotals`)
- **Preview**: Real-time preview with PDF generation capability
- **UI Components**: shadcn/ui components with customized theme

### State Management Details

The `InvoiceContext` handles:
- Invoice metadata (number, date, from/to details)
- Dynamic item management with automatic amount calculation (`quantity * rate`)
- Tax calculations (percentage-based)
- Total calculations (subtotal + tax)

### PDF Generation

Uses **jsPDF** library to generate downloadable PDFs with:
- Professional invoice layout
- Dynamic item rendering
- Formatted currency and dates
- Auto-generated filename based on invoice number

### Technology Stack

- **Next.js 15** with App Router
- **React 19** with client-side rendering for form interactions
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style, Stone color scheme)
- **Lucide React** for icons
- **jsPDF** for PDF generation
- **Bun** as package manager and runtime

### Path Aliases

```
@/* -> ./*
@/components -> ./components
@/lib -> ./lib
@/hooks -> ./hooks
@/types -> ./types
@/context -> ./context
```

## File Structure Patterns

- **Components**: Functional, focused components with clear single responsibility
- **Types**: Centralized TypeScript definitions in `/types`
- **Context**: Global state management patterns
- **Hooks**: Custom hooks for context access and validation
- **Utils**: Shared utilities including calculations and PDF generation
- **Constants**: Initial values and configuration

## Development Notes

- The app uses **client-side rendering** for interactive form functionality
- Invoice numbers are auto-generated using timestamp-based randomization
- Tax calculations support both number and string inputs with automatic conversion
- Items list maintains minimum of 1 item (cannot delete last item)
- PDF generation happens client-side with immediate download

## Key Dependencies

- **bun**: Package manager and dev server
- **@radix-ui**: Base components for shadcn/ui
- **jspdf**: PDF generation
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management
- **clsx + tailwind-merge**: Utility class management
