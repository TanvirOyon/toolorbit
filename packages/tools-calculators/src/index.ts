import type { ToolDefinition } from '@toolorbit/tool-registry';

export const calculatorTools: ToolDefinition[] = [
  {
    slug: 'gpa-calculator',
    name: 'GPA / CGPA Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'graduation-cap',
    description: 'Calculate your GPA or CGPA using the Bangladeshi 4-point grading scale.',
    component: 'GpaCalculator',
    seo: {
      title: 'GPA & CGPA Calculator — Bangladeshi Grading Scale Online Free',
      description:
        'Calculate your GPA or CGPA using the Bangladesh 4-point grading scale. Add courses with credit hours and grades to get your weighted average instantly.',
      keywords: ['gpa calculator bangladesh', 'cgpa calculator', 'gpa calculator 4 point scale', 'bangladeshi grading system', 'university gpa calculator bd'],
      faq: [
        { q: 'What grading scale does this use?', a: 'This calculator uses the standard Bangladesh university grading scale: A+ = 4.00, A = 3.75, A- = 3.50, B+ = 3.25, B = 3.00, B- = 2.75, C+ = 2.50, C = 2.25, D = 2.00, F = 0.00.' },
        { q: 'How is CGPA calculated?', a: 'CGPA (Cumulative Grade Point Average) is the weighted average of all your course GPAs, where each course is weighted by its credit hours. A 3-credit course counts three times more than a 1-credit course.' },
        { q: 'What happens to F grades?', a: 'F grades carry a grade point of 0.00. The credit hours of failed courses are still counted in the denominator, which lowers the overall GPA significantly.' },
      ],
      content: `<p>Bangladesh universities use the 4-point grading scale standardized by the University Grants Commission, and calculating your GPA or CGPA from letter grades and credit hours is a common need for scholarship applications, job applications, and academic progress tracking.</p><p>This calculator uses the official scale where A+ maps to 4.00, A to 3.75, A- to 3.50, B+ to 3.25, B to 3.00, B- to 2.75, C+ to 2.50, C to 2.25, D to 2.00, and F to 0.00. You add each course with its name, credit hours, and grade, and the calculator computes the weighted GPA instantly. The formula is: sum of (credit hours × grade point) divided by sum of credit hours.</p><p>You can add as many courses as your semester contains. The running GPA updates as you add each course, and a summary shows total credit hours attempted, total grade points earned, and the final GPA to two decimal places. The layout is designed for fast entry: add a course, set its credits and grade, and move to the next one.</p>`.trim(),
    },
    related: ['age-calculator', 'percentage-calculator', 'date-diff-calculator', 'bmi-calculator'],
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'calculator',
    description: 'Full scientific calculator with trigonometry, logarithms, and power functions.',
    component: 'ScientificCalculator',
    seo: {
      title: 'Scientific Calculator — Free Online Scientific Calculator',
      description:
        'A full-featured scientific calculator in your browser. Supports trigonometry, logarithms, powers, roots, and complex expressions. No download required.',
      keywords: ['scientific calculator online', 'calculator online free', 'math calculator', 'trig calculator', 'algebra calculator free'],
      faq: [
        { q: 'What mathematical functions are supported?', a: 'Trigonometric functions (sin, cos, tan and their inverses), logarithms (log base 10 and natural log), square root, power/exponent, factorial, and all standard arithmetic operations.' },
        { q: 'Are angles in degrees or radians?', a: 'By default, trigonometric functions use radians, matching the mathematical convention. A Degrees/Radians toggle switches the input mode.' },
        { q: 'Can I type expressions directly instead of clicking buttons?', a: 'Yes. The expression input field accepts typed expressions like "sin(pi/4) + log(100)" and evaluates them on Enter.' },
      ],
      content: `<p>A scientific calculator handles the full range of mathematical operations needed in engineering, physics, chemistry, and advanced mathematics — beyond the basic arithmetic that a standard calculator provides. This browser-based version provides all common scientific functions without any download or installation.</p><p>Available operations include: the four arithmetic operations, parentheses for grouping, powers and roots (including square root), trigonometric functions (sin, cos, tan) and their inverses (arcsin, arccos, arctan), natural logarithm (ln) and base-10 logarithm (log), the mathematical constants pi and e, factorial (!), absolute value, and modulo. Results are computed using the mathjs library, which provides high-precision evaluation of complex expressions.</p><p>You can enter expressions by clicking the calculator buttons or by typing directly in the expression field. This makes it practical for long calculations where keyboard entry is faster. History is kept in the session so you can scroll back to see previous results, and any result can be clicked to use it as the start of a new expression.</p>`.trim(),
    },
    related: ['percentage-calculator', 'bmi-calculator', 'date-diff-calculator', 'age-calculator'],
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'percent',
    description: 'Calculate percentages: what is X% of Y, percentage change, and reverse percent.',
    component: 'PercentageCalculator',
    seo: {
      title: 'Percentage Calculator — Calculate Percentages Free Online',
      description:
        'Calculate what percent of a number is, percentage change between two values, and reverse percentage problems. Multiple modes, instant results, free.',
      keywords: ['percentage calculator', 'percent calculator online', 'percentage change calculator', 'what percent of', 'calculate percentage free'],
      faq: [
        { q: 'How do I calculate a percentage increase?', a: 'Use the "Percentage Change" mode. Enter the original value and the new value and the calculator computes the percentage increase or decrease between them.' },
        { q: 'What is reverse percentage?', a: 'If you know that X is P% of some unknown original number, reverse percentage finds that original. For example: 30 is 20% of what number? Answer: 150.' },
        { q: 'Can I calculate the original price before a discount?', a: 'Yes. If an item costs 850 after a 15% discount, use the "Reverse Percentage" mode to find the original price before the discount was applied.' },
      ],
      content: `<p>Percentage calculations come up constantly in everyday life: discounts on shopping, interest on loans, tax calculations, grade percentages, tip calculations, and data analysis. Despite how frequently people need them, the three main types of percentage problems each require a slightly different formula, which this tool handles for you.</p><p>Three calculation modes are available. "What is X% of Y" computes a percentage of a number (e.g., what is 15% of 200? = 30). "Percentage Change" computes the percentage increase or decrease between two values (e.g., from 80 to 100 is a 25% increase). "What percent is X of Y" finds the percentage relationship between two numbers (e.g., 30 is 15% of 200). A fourth mode, "Reverse Percentage", finds the original value when you know a value and the percentage it represents.</p><p>All four modes are displayed simultaneously with separate input fields, so you can quickly switch between problem types without navigating menus. Results are shown with up to four significant figures and the calculation is explained in plain text so you can follow the arithmetic.</p>`.trim(),
    },
    related: ['scientific-calculator', 'bmi-calculator', 'gpa-calculator', 'date-diff-calculator'],
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'activity',
    description: 'Calculate your Body Mass Index (BMI) and see which health category you fall into.',
    component: 'BmiCalculator',
    seo: {
      title: 'BMI Calculator — Calculate Body Mass Index Free Online',
      description:
        'Calculate your BMI using metric (kg/cm) or imperial (lb/in) units. See your health category and understand what it means. Free online BMI calculator.',
      keywords: ['bmi calculator', 'body mass index calculator', 'bmi calculator metric', 'bmi calculator kg cm', 'healthy weight calculator'],
      faq: [
        { q: 'What are the BMI categories?', a: 'BMI below 18.5 is underweight, 18.5–24.9 is normal weight, 25.0–29.9 is overweight, and 30.0 and above is obese. These are WHO classifications.' },
        { q: 'Is BMI an accurate measure of health?', a: 'BMI is a population-level screening tool. It can be misleading for athletes (high muscle mass raises BMI), elderly people (muscle loss lowers BMI), and people of certain ethnicities. It should be considered alongside other health indicators.' },
        { q: 'Does the calculator support children?', a: 'No. Adult BMI categories do not apply to children, who require age- and sex-adjusted growth chart comparisons. This calculator is for adults only.' },
      ],
      content: `<p>Body Mass Index (BMI) is a widely used screening tool that estimates whether a person's weight is appropriate for their height. It is calculated by dividing weight in kilograms by the square of height in meters (BMI = kg/m²). Despite its limitations, it is a quick, free, and accessible first indicator of whether weight may be a health concern.</p><p>This calculator supports both metric (kilograms and centimeters) and imperial (pounds and inches) input, converting internally to the metric formula for calculation. The result is displayed alongside the standard WHO BMI categories: underweight (below 18.5), normal weight (18.5–24.9), overweight (25.0–29.9), and obese (30.0 and above).</p><p>A visual indicator shows where your BMI falls on the scale. The calculator also shows the healthy weight range for your height — the range of weights that would produce a normal BMI — so you have a concrete reference point.</p><p>BMI is a starting point, not a diagnosis. Factors like muscle mass, bone density, ethnicity, age, and sex all affect what a healthy weight looks like for an individual, and this tool is intended purely as an informational aid rather than medical advice.</p>`.trim(),
    },
    related: ['age-calculator', 'percentage-calculator', 'scientific-calculator', 'date-diff-calculator'],
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'calendar-days',
    description: 'Calculate exact age in years, months, and days from a date of birth.',
    component: 'AgeCalculator',
    seo: {
      title: 'Age Calculator — Calculate Exact Age from Date of Birth Free',
      description:
        'Calculate your exact age in years, months, and days from your date of birth. Also shows next birthday countdown and age in total days. Free online tool.',
      keywords: ['age calculator', 'calculate age from date of birth', 'exact age calculator', 'how old am i', 'birthday age calculator'],
      faq: [
        { q: 'Is the age calculated to today or a custom date?', a: 'By default, age is calculated to today. You can also enter a custom "as of" date to calculate age at any specific date — useful for determining eligibility or historical age.' },
        { q: 'How are months counted?', a: 'Months are counted as calendar months. February can be 28 or 29 days depending on whether it is a leap year, and this is handled correctly.' },
        { q: 'Can I calculate the age of an organization or event?', a: 'Yes. Enter any past date as the "date of birth" to find how many years, months, and days have passed since then.' },
      ],
      content: `<p>Calculating exact age from a date of birth involves more than simple year subtraction — months and days matter, and leap years complicate the day count. This tool handles all the edge cases correctly and presents the result in the most useful formats.</p><p>Enter a date of birth and the tool immediately shows the exact age in years, months, and days. It also shows the total number of days lived, the day of the week you were born on, and a countdown to the next birthday. The "as of" date defaults to today but can be changed to any date, which is useful for calculating someone's age on a specific past or future date — for instance, to verify they were of legal age at a certain time, or to find out how old they will be on a future date.</p><p>Common uses include filling in forms that ask for exact age in years and months, calculating how old a company or organization is in its anniversary year, determining eligibility for age-restricted activities, or simply satisfying curiosity about exactly how many days old you are.</p>`.trim(),
    },
    related: ['date-diff-calculator', 'gpa-calculator', 'bmi-calculator', 'percentage-calculator'],
  },
  {
    slug: 'date-diff-calculator',
    name: 'Date Difference Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'calendar-range',
    description: 'Find the exact number of days, weeks, months, and years between two dates.',
    component: 'DateDiffCalculator',
    seo: {
      title: 'Date Difference Calculator — Calculate Days Between Dates Free',
      description:
        'Calculate the exact number of days, weeks, months, and years between any two dates. Excludes or includes weekends. Instant, free, runs in your browser.',
      keywords: ['date difference calculator', 'days between dates', 'date calculator online', 'how many days between', 'date to date calculator'],
      faq: [
        { q: 'Does this account for leap years?', a: 'Yes. The day count is computed by subtracting the two date timestamps, which automatically accounts for leap years and different month lengths.' },
        { q: 'Can I calculate business days only?', a: 'Yes. Toggle the "Exclude weekends" option to count only Monday through Friday days in the difference.' },
        { q: 'Can I add or subtract days from a date?', a: 'Yes. A secondary mode lets you enter a start date and a number of days to add or subtract to find the resulting date — useful for calculating deadlines.' },
      ],
      content: `<p>Calculating the difference between two dates comes up in many practical situations: how many days until a project deadline, how long since an event happened, how many working days are left in a contract period, or whether enough time has passed for a legal waiting period. This calculator handles all of these scenarios.</p><p>The primary mode takes two dates and computes the difference in multiple units simultaneously: total days, total weeks and remaining days, total months and remaining days, and total years and remaining months and days. This multi-unit display is more useful than a single number for most planning purposes.</p><p>An "Exclude weekends" toggle filters out Saturday and Sunday from the day count, giving you the number of working days between the two dates. This is useful for planning sprints, calculating contractor day rates, or determining legal deadlines that specify "business days".</p><p>A secondary "Date Add/Subtract" mode works in reverse: given a start date and a number of days, it tells you the resulting date. This is useful for calculating "30 days from today" for payment terms or "90 calendar days" for legal deadlines.</p>`.trim(),
    },
    related: ['age-calculator', 'percentage-calculator', 'bmi-calculator', 'gpa-calculator'],
  },
];
