import { describe, it, expect } from 'vitest';
import { convert } from './CaseConverter';

describe('convert', () => {
  it('uppercases', () => {
    expect(convert('hello world', 'upper')).toBe('HELLO WORLD');
  });

  it('lowercases', () => {
    expect(convert('HELLO WORLD', 'lower')).toBe('hello world');
  });

  it('title-cases while skipping small words (except the first)', () => {
    expect(convert('the lord of the rings', 'title')).toBe('The Lord of the Rings');
  });

  it('sentence-cases after terminal punctuation', () => {
    expect(convert('hello world. how are you?', 'sentence')).toBe('Hello world. How are you?');
  });

  it('converts to camelCase from space-separated words', () => {
    expect(convert('hello world', 'camel')).toBe('helloWorld');
  });

  it('converts to PascalCase', () => {
    expect(convert('hello world', 'pascal')).toBe('HelloWorld');
  });

  it('converts to snake_case, stripping punctuation', () => {
    expect(convert('Hello, World!', 'snake')).toBe('hello_world');
  });

  it('converts to kebab-case, stripping punctuation', () => {
    expect(convert('Hello, World!', 'kebab')).toBe('hello-world');
  });

  it('handles empty input without throwing', () => {
    expect(convert('', 'upper')).toBe('');
  });
});
