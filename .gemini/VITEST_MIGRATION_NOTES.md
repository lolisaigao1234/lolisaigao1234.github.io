# Vitest Migration Notes

## Current Status (2025-11-25)

✅ **Vitest migration completed** with temporary workaround
⚠️ **Using inline templates** instead of external files
🐛 **Known bug** in @analogjs/vite-plugin-angular v2.1.0

## What Works

- ✅ Vitest 2.1.8 installed and configured
- ✅ All test scripts working (`test`, `test:run`, `test:coverage`)
- ✅ Tests discover and run successfully
- ✅ Angular 21 compatible setup with zone.js
- ✅ Vitest syntax migrated (vi.fn(), async beforeEach, etc.)

## Current Workaround

**Converted to inline templates** in `opening-screen.component.ts`:
- Changed from `templateUrl: './opening-screen.component.html'` → `template: \`...\``
- Changed from `styleUrls: ['./opening-screen.component.css']` → `styles: [\`...\`]`

This allows tests to pass without needing the Angular plugin.

## The Bug

**@analogjs/vite-plugin-angular v2.1.0** causes "No test suite found in file" error:

### Without Plugin
- Tests are discovered and parsed ✅
- Template/style resolution fails ❌ (external files)

### With Plugin Enabled
- Tests are NOT discovered ❌
- Plugin transforms `.spec.ts` files incorrectly
- Vitest cannot parse test definitions

### Evidence
```bash
# With plugin enabled:
Error: No test suite found in file
Test Files  1 failed (1)
Tests  no tests

# With plugin disabled + inline templates:
Test Files  1 passed (1)
Tests  30 passed (30)
```

## Future Action Items

### Option 1: Wait for Plugin Fix ⏳
Monitor [@analogjs/analog](https://github.com/analogjs/analog) for updates:
- v2.1.0 was released 2025-11-20 (only 5 days old)
- Bug may be fixed in upcoming patch releases
- File issue if not already reported

**Steps when fixed:**
1. Update `@analogjs/vite-plugin-angular` to fixed version
2. Re-enable plugin in `vitest.config.ts`
3. Convert component back to external template/styles
4. Delete this tracking file

### Option 2: Use Angular CLI Native Vitest 🆕
Angular 21 has built-in Vitest support:
```bash
ng generate @angular/cli:vitest
```

**Pros:**
- Official Angular support
- No third-party plugin needed
- Likely better Angular 21 compatibility

**Cons:**
- Requires Angular CLI configuration changes
- May need to restructure test setup

### Option 3: Keep Inline Templates ✅
**Current solution - works perfectly!**

**Pros:**
- ✅ Tests work now
- ✅ No plugin dependencies
- ✅ Simpler component structure
- ✅ No external file loading overhead

**Cons:**
- Large components harder to read
- Mixing HTML/CSS with TypeScript
- Editor syntax highlighting less ideal

## Files Modified

### Converted to Inline
- `src/components/opening-screen/opening-screen.component.ts`
  - Now contains embedded template and styles
  - Original files kept: `.html` and `.css`

### Configuration
- `vitest.config.ts` - Angular plugin commented out
- `package.json` - Vitest dependencies added
- `setup-test.ts` - Manual TestBed initialization
- `tsconfig.spec.json` - Created for test compilation

### Test Files
- `src/components/opening-screen/opening-screen.component.spec.ts`
  - Migrated to Vitest syntax
  - All 30 tests passing ✅

## Recommendation

**Stay with inline templates** (Option 3) unless:
1. Component becomes >500 lines
2. Need better template tooling/formatting
3. Plugin bug is confirmed fixed

## Resources

- [AnalogJS Vitest Docs](https://analogjs.org/docs/features/testing/vitest)
- [AnalogJS v2.1.0 Release](https://github.com/analogjs/analog/releases/tag/v2.1.0)
- [Angular 21 Vitest Support](https://angular.dev/guide/testing)
- [Stack Overflow: Plugin Bug](https://stackoverflow.com/questions/79346647/vitest-with-analogjs-angular-vite-plugin-error-no-test-suite-found-in-file)

---

**Last Updated:** 2025-11-25
**Vitest Version:** 2.1.8
**Angular Version:** 21.0.0
**Plugin Version:** @analogjs/vite-plugin-angular@2.1.0 (disabled)
