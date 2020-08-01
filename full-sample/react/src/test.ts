// Edit this file only if you know what you are doing

// Tests do not work for now so this file is useless

// Find and load all `.spec.ts` and `.spec.tsx` files
export const context = (require as any).context('./', true, /\.spec\.tsx?$/);
context.keys().map(context);
