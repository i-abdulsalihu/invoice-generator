# Invoice Generator

A modern, professional invoice generator built with Next.js 15 and React 19. Create, preview, and download invoices as PDFs with an intuitive form-based interface.

## Features

### ✨ **Invoice Creation**
- **Dynamic Form Interface**: Easy-to-use form with sections for basic details, contact information, line items, and tax calculations
- **Auto-Generated Invoice Numbers**: Timestamp-based unique invoice numbering
- **Real-Time Calculations**: Automatic subtotal, tax, and total calculations as you type
- **Multiple Line Items**: Add/remove invoice items with quantity × rate = amount calculations
- **Flexible Tax Rates**: Configurable tax percentage with automatic tax amount calculation

### 📄 **PDF Export**
- **Professional Layout**: Clean, business-ready invoice format
- **Client-Side Generation**: Instant PDF creation using jsPDF (no server required)
- **Auto-Download**: Generated PDFs automatically download with descriptive filenames
- **Formatted Output**: Proper currency formatting, date display, and table structure

### 🎨 **User Experience**
- **Live Preview**: Toggle between form editing and invoice preview
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Form Validation**: Input validation with TypeScript type safety
- **Persistent State**: Invoice data maintained while switching between form and preview

### 🏗️ **Technical Features**
- **Next.js 15 App Router**: Modern React framework with latest features
- **React 19**: Latest React with improved performance
- **TypeScript**: Full type safety throughout the application
- **Context API**: Centralized state management for invoice data
- **Custom Hooks**: Clean abstraction for invoice operations
- **Tailwind CSS v4**: Utility-first styling with custom design system

## Getting Started

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating invoices.

### Build for Production

```bash
bun run build
bun run start
```

## Usage

1. **Fill in Basic Details**: Enter invoice number (auto-generated) and date
2. **Add Contact Information**: Enter sender and recipient details
3. **Add Line Items**: Describe services/products with quantities and rates
4. **Set Tax Rate**: Configure tax percentage (defaults to 10%)
5. **Preview**: Click "Preview" to see the formatted invoice
6. **Download**: Generate and download PDF from the preview screen

## Project Structure

- **`app/`** - Next.js App Router pages and layout
- **`components/`** - React components including form sections and UI elements
- **`context/`** - Invoice context for state management
- **`hooks/`** - Custom React hooks for invoice operations
- **`lib/`** - Utilities, calculations, and PDF generation logic
- **`types/`** - TypeScript type definitions

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Package Manager**: Bun

## Development

This project uses modern development tools:

- **Turbopack**: Fast development builds
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **shadcn/ui**: High-quality, customizable UI components
