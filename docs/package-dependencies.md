# Package Dependencies & Setup Guide

Cập nhật: 2025-09-26  
Phạm vi: Complete package.json with all required dependencies for modern Next.js architecture

## 1. Complete Package.json

```json
{
  "name": "tempra-client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true npm run build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.2",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@sentry/nextjs": "^7.81.1",
    "@tanstack/react-query": "^5.8.4",
    "@tanstack/react-query-devtools": "^5.8.4",
    "axios": "^1.6.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^0.2.0",
    "date-fns": "^2.30.0",
    "framer-motion": "^10.16.5",
    "lucide-react": "^0.544.0",
    "next": "15.5.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.48.2",
    "react-intersection-observer": "^9.5.3",
    "react-window": "^1.8.8",
    "recharts": "^2.8.0",
    "sonner": "^1.2.4",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.7.9",
    "web-vitals": "^3.5.0",
    "zod": "^3.22.4",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@next/bundle-analyzer": "^14.0.4",
    "@playwright/test": "^1.40.1",
    "@storybook/addon-essentials": "^7.6.3",
    "@storybook/addon-interactions": "^7.6.3",
    "@storybook/addon-links": "^7.6.3",
    "@storybook/blocks": "^7.6.3",
    "@storybook/nextjs": "^7.6.3",
    "@storybook/react": "^7.6.3",
    "@storybook/testing-library": "^0.2.2",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.8",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/react-window": "^1.8.8",
    "autoprefixer": "^10.4.16",
    "eslint": "^9",
    "eslint-config-next": "15.5.3",
    "eslint-plugin-storybook": "^0.6.15",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.32",
    "storybook": "^7.6.3",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.8",
    "typescript": "^5"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

## 2. Installation Commands

### 2.1 Core Dependencies
```bash
# HTTP Client & State Management
npm install axios @tanstack/react-query @tanstack/react-query-devtools

# Form Handling
npm install react-hook-form @hookform/resolvers zod

# UI Components (shadcn/ui dependencies)
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-toast @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-popover @radix-ui/react-avatar @radix-ui/react-checkbox
npm install @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-switch

# Styling
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate

# Icons & Animations
npm install lucide-react framer-motion

# Utilities
npm install date-fns zustand sonner cmdk vaul

# Performance & Monitoring
npm install web-vitals @sentry/nextjs react-intersection-observer react-window

# Charts (optional)
npm install recharts
```

### 2.2 Development Dependencies
```bash
# Testing
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D jest jest-environment-jsdom @types/jest
npm install -D @playwright/test

# Build Tools
npm install -D @next/bundle-analyzer autoprefixer postcss

# Storybook (optional)
npm install -D @storybook/nextjs @storybook/react @storybook/addon-essentials
npm install -D @storybook/addon-interactions @storybook/testing-library

# Types
npm install -D @types/react-window
```

## 3. Configuration Files

### 3.1 Tailwind CSS Configuration
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3.2 TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 3.3 Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### 3.4 ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@next/eslint-config-next"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "no-console": "warn"
  },
  "overrides": [
    {
      "files": ["**/*.test.{js,jsx,ts,tsx}"],
      "env": {
        "jest": true
      }
    }
  ]
}
```

## 4. Setup Commands

### 4.1 Initial Setup
```bash
# Create new Next.js project
npx create-next-app@latest tempra-client --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd tempra-client

# Install all dependencies
npm install

# Install shadcn/ui
npx shadcn-ui@latest init

# Add shadcn/ui components
npx shadcn-ui@latest add button input textarea form dialog toast
npx shadcn-ui@latest add dropdown-menu select tabs popover avatar
npx shadcn-ui@latest add checkbox switch separator label
```

### 4.2 Development Setup
```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Run e2e tests
npm run e2e

# Analyze bundle
npm run analyze
```

## 5. Environment Setup

### 5.1 Required Environment Variables
```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_GOOGLE_AUTH_URL=http://localhost:8000/api/v1/auth/google
NEXT_PUBLIC_SLACK_AUTH_URL=http://localhost:8000/api/v1/auth/slack

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
```

### 5.2 VS Code Extensions (Recommended)
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-playwright.playwright"
  ]
}
```

This comprehensive package dependencies guide provides everything needed to set up a modern Next.js application with all the recommended tools and libraries for building a production-ready calendar application similar to Reclaim.
