import { describe, it, expect } from 'vitest';
import { getCategory } from './BmiCalculator';

describe('getCategory', () => {
  it('classifies underweight below 18.5', () => {
    expect(getCategory(18.4).label).toBe('Underweight');
  });

  it('classifies the lower boundary (18.5) as Normal, not Underweight', () => {
    expect(getCategory(18.5).label).toBe('Normal');
  });

  it('classifies the upper Normal boundary correctly', () => {
    expect(getCategory(24.9).label).toBe('Normal');
    expect(getCategory(25).label).toBe('Overweight');
  });

  it('classifies overweight up to just under 30', () => {
    expect(getCategory(29.9).label).toBe('Overweight');
  });

  it('classifies 30 and above as Obese', () => {
    expect(getCategory(30).label).toBe('Obese');
    expect(getCategory(45).label).toBe('Obese');
  });
});
