/**
 * Re-exports the type system from @toolorbit/tool-types.
 *
 * The actual definitions live in @toolorbit/tool-types (a dependency-free
 * leaf package) specifically so that tools-* packages can import the
 * ToolDefinition type without depending on this registry package - which
 * would create a circular package dependency, since this registry package
 * depends ON every tools-* package to assemble ALL_TOOLS.
 *
 * Every existing `import { ToolDefinition, CATEGORIES } from '@toolorbit/tool-registry'`
 * across the app continues to work unchanged because of this re-export.
 */
export * from '@toolorbit/tool-types';
