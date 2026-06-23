import * as React from 'react';
import { ToolShell, ToolShellSection, Button, Input } from '@toolorbit/ui';
import { Plus, Trash2 } from 'lucide-react';

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.00, 'A': 3.75, 'A-': 3.50, 'B+': 3.25, 'B': 3.00,
  'B-': 2.75, 'C+': 2.50, 'C': 2.25, 'D': 2.00, 'F': 0.00,
};
const GRADE_LABELS = Object.keys(GRADE_POINTS);

interface Course { id: string; name: string; credits: string; grade: string }

function gpaColor(gpa: number) {
  if (gpa >= 3.75) return 'text-completion';
  if (gpa >= 3.00) return 'text-interactive';
  if (gpa >= 2.00) return 'text-base-100';
  return 'text-error';
}

export default function GpaCalculator() {
  const [courses, setCourses] = React.useState<Course[]>([
    { id: '1', name: '', credits: '3', grade: 'A' },
  ]);

  function addCourse() {
    setCourses((p) => [...p, { id: Date.now().toString(), name: '', credits: '3', grade: 'A' }]);
  }
  function removeCourse(id: string) {
    setCourses((p) => p.filter((c) => c.id !== id));
  }
  function update(id: string, field: keyof Course, value: string) {
    setCourses((p) => p.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }

  const { gpa, totalCredits, totalPoints } = React.useMemo(() => {
    let pts = 0, cred = 0;
    for (const c of courses) {
      const cr = parseFloat(c.credits);
      const gp = GRADE_POINTS[c.grade];
      if (!isNaN(cr) && cr > 0 && gp !== undefined) { pts += cr * gp; cred += cr; }
    }
    return { gpa: cred > 0 ? pts / cred : 0, totalCredits: cred, totalPoints: pts };
  }, [courses]);

  return (
    <ToolShell state="idle">
      <ToolShellSection label={`Courses (${courses.length})`}>
        <div className="space-y-2">
          {courses.map((c, idx) => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="text-xs text-base-500 w-5 text-right shrink-0">{idx + 1}</span>
              <Input value={c.name} onChange={(e) => update(c.id, 'name', e.target.value)}
                placeholder="Course name (optional)" className="flex-1 min-w-0" />
              <select value={c.credits} onChange={(e) => update(c.id, 'credits', e.target.value)}
                className="rounded-md border border-base-700 bg-base-900 px-2 py-2 text-sm text-base-200 focus:outline-none focus:ring-1 focus:ring-interactive w-16 shrink-0">
                {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} cr</option>)}
              </select>
              <select value={c.grade} onChange={(e) => update(c.id, 'grade', e.target.value)}
                className="rounded-md border border-base-700 bg-base-900 px-2 py-2 text-sm text-base-200 focus:outline-none focus:ring-1 focus:ring-interactive w-16 shrink-0">
                {GRADE_LABELS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <button type="button" onClick={() => removeCourse(c.id)} disabled={courses.length === 1}
                className="shrink-0 text-base-500 hover:text-error transition-colors disabled:opacity-30">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <Button size="sm" variant="secondary" onClick={addCourse} className="mt-2">
          <Plus size={14} /> Add Course
        </Button>
      </ToolShellSection>

      <div className="rounded-xl border border-base-700 bg-base-800/50 p-5 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-base-400 uppercase tracking-wide mb-1">Total Credits</p>
          <p className="text-2xl font-mono font-bold text-base-100">{totalCredits}</p>
        </div>
        <div>
          <p className="text-xs text-base-400 uppercase tracking-wide mb-1">Grade Points</p>
          <p className="text-2xl font-mono font-bold text-base-100">{totalPoints.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-base-400 uppercase tracking-wide mb-1">GPA / CGPA</p>
          <p className={`text-3xl font-mono font-bold ${gpaColor(gpa)}`}>{gpa.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 text-center">
        {[['A+','4.00'],['A','3.75'],['A-','3.50'],['B+','3.25'],['B','3.00'],
          ['B-','2.75'],['C+','2.50'],['C','2.25'],['D','2.00'],['F','0.00']].map(([g, p]) => (
          <div key={g} className="rounded-md border border-base-800 bg-base-900 p-1.5">
            <p className="text-xs font-bold text-base-200">{g}</p>
            <p className="text-xs text-base-500">{p}</p>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}
