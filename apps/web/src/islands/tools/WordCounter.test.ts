import { describe, it, expect } from 'vitest';
import { analyze } from './WordCounter';

describe('analyze', () => {
  it('returns all zeros for empty input', () => {
    expect(analyze('')).toEqual({
      words: 0,
      chars: 0,
      charsNoSpace: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '~1 min',
    });
  });

  it('counts words, chars, and chars-without-spaces correctly', () => {
    const stats = analyze('hello world');
    expect(stats.words).toBe(2);
    expect(stats.chars).toBe(11);
    expect(stats.charsNoSpace).toBe(10);
  });

  it('treats a hyphenated compound as a single word', () => {
    expect(analyze('state-of-the-art design').words).toBe(2);
  });

  it('counts sentences by terminal punctuation', () => {
    expect(analyze('Hello world. How are you? Great!').sentences).toBe(3);
  });

  it('counts paragraphs by blank-line separation', () => {
    expect(analyze('First paragraph.\n\nSecond paragraph.\n\nThird.').paragraphs).toBe(3);
  });

  it('never reports less than ~1 min reading time, even for short text', () => {
    expect(analyze('hi').readingTime).toBe('~1 min');
  });
});
