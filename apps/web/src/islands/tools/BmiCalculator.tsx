import * as React from 'react';
import { ToolShell, ToolShellSection, Input } from '@toolorbit/ui';

type Unit = 'metric' | 'imperial';

interface Category { label: string; range: string; color: string }
const CATEGORIES: Category[] = [
  { label: 'Underweight', range: '< 18.5',    color: '#60a5fa' },
  { label: 'Normal',      range: '18.5–24.9', color: '#4ade80' },
  { label: 'Overweight',  range: '25.0–29.9', color: '#facc15' },
  { label: 'Obese',       range: '≥ 30.0',    color: '#f87171' },
];

export function getCategory(bmi: number): Category {
  if (bmi < 18.5) return CATEGORIES[0];
  if (bmi < 25)   return CATEGORIES[1];
  if (bmi < 30)   return CATEGORIES[2];
  return CATEGORIES[3];
}

export default function BmiCalculator() {
  const [unit, setUnit] = React.useState<Unit>('metric');
  const [kg, setKg] = React.useState('');
  const [cm, setCm] = React.useState('');
  const [lb, setLb] = React.useState('');
  const [ft, setFt] = React.useState('');
  const [inch, setInch] = React.useState('');

  const { bmi, minW, maxW } = React.useMemo(() => {
    let weightKg = 0, heightM = 0;
    if (unit === 'metric') {
      weightKg = parseFloat(kg); heightM = parseFloat(cm) / 100;
    } else {
      weightKg = parseFloat(lb) * 0.453592;
      heightM = (parseFloat(ft) * 12 + parseFloat(inch || '0')) * 0.0254;
    }
    if (!weightKg || !heightM || heightM <= 0) return { bmi: 0, minW: 0, maxW: 0 };
    const b = weightKg / (heightM * heightM);
    const minW = unit === 'metric' ? +(18.5 * heightM * heightM).toFixed(1) : +(18.5 * heightM * heightM / 0.453592).toFixed(1);
    const maxW = unit === 'metric' ? +(24.9 * heightM * heightM).toFixed(1) : +(24.9 * heightM * heightM / 0.453592).toFixed(1);
    return { bmi: parseFloat(b.toFixed(1)), minW, maxW };
  }, [unit, kg, cm, lb, ft, inch]);

  const cat = bmi > 0 ? getCategory(bmi) : null;

  return (
    <ToolShell state="idle">
      <div className="flex gap-2">
        {(['metric', 'imperial'] as Unit[]).map((u) => (
          <button key={u} type="button" onClick={() => setUnit(u)}
            className={`flex-1 rounded-md border py-2 text-sm font-medium capitalize transition-colors ${unit === u ? 'border-interactive bg-interactive-muted text-interactive' : 'border-base-700 bg-base-900 text-base-300 hover:border-base-500'}`}>
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'}
          </button>
        ))}
      </div>

      {unit === 'metric' ? (
        <div className="grid grid-cols-2 gap-4">
          <ToolShellSection label="Weight (kg)"><Input value={kg} onChange={(e) => setKg(e.target.value)} placeholder="70" type="number" /></ToolShellSection>
          <ToolShellSection label="Height (cm)"><Input value={cm} onChange={(e) => setCm(e.target.value)} placeholder="175" type="number" /></ToolShellSection>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <ToolShellSection label="Weight (lb)"><Input value={lb} onChange={(e) => setLb(e.target.value)} placeholder="154" type="number" /></ToolShellSection>
          <ToolShellSection label="Height (ft)"><Input value={ft} onChange={(e) => setFt(e.target.value)} placeholder="5" type="number" /></ToolShellSection>
          <ToolShellSection label="Inches"><Input value={inch} onChange={(e) => setInch(e.target.value)} placeholder="9" type="number" /></ToolShellSection>
        </div>
      )}

      {bmi > 0 && cat && (
        <div className="rounded-xl border border-base-700 bg-base-800/50 p-5 space-y-4">
          <div className="text-center">
            <p className="text-xs text-base-400 uppercase tracking-wide mb-1">Your BMI</p>
            <p className="text-5xl font-mono font-bold" style={{ color: cat.color }}>{bmi}</p>
            <p className="mt-1 text-sm font-medium" style={{ color: cat.color }}>{cat.label}</p>
          </div>
          <div className="relative h-3 rounded-full overflow-hidden bg-base-800">
            {[['#60a5fa','0%','23.3%'],['#4ade80','23.3%','31.2%'],['#facc15','31.2%','50%'],['#f87171','50%','100%']].map(([c,l,w],i) => (
              <div key={i} className="absolute top-0 h-full" style={{ background: c, left: l, width: w }} />
            ))}
            <div className="absolute top-0 w-2 h-full bg-white rounded-full -translate-x-1/2 shadow"
              style={{ left: `${Math.min(Math.max(((bmi - 10) / 40) * 100, 0), 100)}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="rounded-lg border border-base-700 p-2">
              <p className="text-xs text-base-400">Healthy range</p>
              <p className="font-mono text-base-100">{minW}–{maxW} {unit === 'metric' ? 'kg' : 'lb'}</p>
            </div>
            <div className="rounded-lg border border-base-700 p-2">
              <p className="text-xs text-base-400">BMI category</p>
              <p className="font-mono" style={{ color: cat.color }}>{cat.range}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-base-500 text-center">BMI is a screening tool, not a diagnosis. Consult a healthcare professional for medical advice.</p>
    </ToolShell>
  );
}
