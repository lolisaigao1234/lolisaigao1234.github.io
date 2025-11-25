# Migration from Jest to Vitest for Angular 21

This guide walks you through migrating from `jest-preset-angular` to `Vitest` for your Angular 21 project.

## Why Vitest?

- **Native Vite integration** - Your project already uses Vite, so Vitest works seamlessly
- **Jest-compatible API** - Minimal test file changes required
- **Excellent ESM support** - Works great with modern Angular
- **Faster execution** - Parallel test running with smart caching
- **No peer dependency conflicts** - Works with Angular 21 out of the box

## Migration Steps

### Step 1: Clean Up Old Jest Files

Delete these files from your project:

```bash
# Remove old Jest config and setup
rm jest.config.cjs
rm setup-jest.ts
rm tsconfig.spec.json
```

### Step 2: Replace package.json

Replace your `package.json` with the provided `package.json` file, or manually make these changes:

**Remove from devDependencies:**
```json
"@types/jest": "^30.0.0",
"jest": "^29.7.0",
"jest-environment-jsdom": "^29.7.0",
"jest-preset-angular": "^14.0.0"
```

**Add to devDependencies:**
```json
"@analogjs/vite-plugin-angular": "^1.14.0",
"@testing-library/dom": "^10.4.0",
"jsdom": "^25.0.1",
"vitest": "^2.1.8",
"zone.js": "^0.15.0"
```

**Update scripts:**
```json
"scripts": {
  "dev": "ng serve",
  "build": "ng build",
  "preview": "ng serve --configuration=production",
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### Step 3: Add New Config Files

Copy these new files to your project root:

1. **vitest.config.ts** - Vitest configuration
2. **setup-test.ts** - Angular testing environment setup
3. **tsconfig.json** - Updated with Vitest types

### Step 4: Update Your Spec Files

The main changes in spec files:

1. **Replace Jasmine spies with Vitest mocks:**
   ```typescript
   // Before (Jasmine)
   const completeSpy = jasmine.createSpy('animationComplete');
   
   // After (Vitest)
   import { vi } from 'vitest';
   const completeSpy = vi.fn();
   ```

2. **Add Vitest imports (optional with globals: true):**
   ```typescript
   import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
   ```

3. **Make createComponent async:**
   ```typescript
   // Before
   const createComponent = (platformId: string = 'browser') => {
     TestBed.configureTestingModule({...});
     fixture = TestBed.createComponent(OpeningScreenComponent);
   };
   
   // After
   const createComponent = async (platformId: string = 'browser') => {
     await TestBed.configureTestingModule({...}).compileComponents();
     fixture = TestBed.createComponent(OpeningScreenComponent);
   };
   ```

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

## File Summary

| Action | File |
|--------|------|
| **DELETE** | `jest.config.cjs` |
| **DELETE** | `setup-jest.ts` |
| **DELETE** | `tsconfig.spec.json` |
| **REPLACE** | `package.json` |
| **REPLACE** | `tsconfig.json` |
| **ADD** | `vitest.config.ts` |
| **ADD** | `setup-test.ts` |
| **REPLACE** | `src/components/opening-screen/opening-screen.component.spec.ts` |

## Troubleshooting

### "Cannot find module 'zone.js'"
Make sure `zone.js` is installed:
```bash
npm install zone.js --save-dev
```

### "Cannot find module '@analogjs/vite-plugin-angular'"
Install the Angular Vite plugin:
```bash
npm install @analogjs/vite-plugin-angular --save-dev
```

### Tests hang or timeout
Ensure you're calling `flush()` at the end of `fakeAsync` tests to clear any pending timers.

### Import errors
Make sure your `tsconfig.json` includes `"types": ["node", "vitest/globals"]`

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [AnalogJS Vite Plugin](https://analogjs.org/)
- [Angular Testing Guide](https://angular.dev/guide/testing)