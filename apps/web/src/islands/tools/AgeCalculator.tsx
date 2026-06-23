import * as React from 'react';
import { ToolShell, ToolShellSection, Input } from '@toolorbit/ui';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function calcAge(dob: Date, asOf: Date) {
  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();
  if (days < 0) { months--; const prev = new Date(asOf.getFullYear(), asOf.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((asOf.getTime() - dob.getTime()) / 86400000);
  return { years, months, days, totalDays };
}

function nextBirthday(dob: Date, today: Date): { date: Date; daysLeft: number } {
  const thisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  const nextYear = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
  const date = thisYear > today ? thisYear : nextYear;
  const daysLeft = Math.ceil((date.getTime() - today.getTime()) / 86400000);
  return { date, daysLeft };
}

export default function AgeCalculator() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = React.useState('');
  const [asOf, setAsOf] = React.useState(todayStr);

  const result = React.useMemo(() => {
    if (!dob || !asOf) return null;
    const dobDate = new Date(dob + 'T00:00:00');
    const asOfDate = new Date(asOf + 'T00:00:00');
    if (isNaN(dobDate.getTime()) || isNaN(asOfDate.getTime())) return null;
    if (dobDate >= asOfDate) return null;
    const age = calcAge(dobDate, asOfDate);
    const bornOn = DAYS[dobDate.getDay()];
    const next = asOf === todayStr ? nextBirthday(dobDate, asOfDate) : null;
    return { ...age, bornOn, dobDate, next };
  }, [dob, asOf]);

  return (
    <ToolShell state="idle">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolShellSection label="Date of birth">
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={todayStr}
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>
        <ToolShellSection label="As of date">
          <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)}
            className="w-full rounded-lg border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:outline-none focus:ring-1 focus:ring-interactive" />
        </ToolShellSection>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl border border-base-700 bg-base-800/50 p-5 text-center">
            <p className="text-xs text-base-400 uppercase tracking-wide mb-2">Exact Age</p>
            <p className="text-3xl font-mono font-bold text-interactive">
              {result.years} <span className="text-base font-normal text-base-300">yr</span>{' '}
              {result.months} <span className="text-base font-normal text-base-300">mo</span>{' '}
              {result.days} <span className="text-base font-normal text-base-300">day{result.days !== 1 ? 's' : ''}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-base-700 bg-base-900 p-3">
              <p className="text-xs text-base-400 mb-1">Total days</p>
              <p className="font-mono text-base-100 font-semibold">{result.totalDays.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-base-700 bg-base-900 p-3">
              <p className="text-xs text-base-400 mb-1">Born on</p>
              <p className="font-mono text-base-100 font-semibold">{result.bornOn}</p>
            </div>
            {result.next && (
              <div className="rounded-lg border border-base-700 bg-base-900 p-3">
                <p className="text-xs text-base-400 mb-1">Next birthday</p>
                <p className="font-mono text-base-100 font-semibold">
                  {result.next.daysLeft === 0 ? '🎂 Today!' : `${result.next.daysLeft} days`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {dob && !result && (
        <p className="text-sm text-base-400 text-center">Date of birth must be before the "as of" date.</p>
      )}
    </ToolShell>
  );
}
