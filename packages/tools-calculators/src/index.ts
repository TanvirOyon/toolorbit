import type { ToolDefinition } from '@toolorbit/tool-types';

export const calculatorTools: ToolDefinition[] = [
  {
    slug: 'gpa-calculator',
    name: 'GPA / CGPA Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'graduation-cap',
    description: 'Calculate your GPA or CGPA from course grades and credit hours.',
    component: 'GpaCalculator',
    seo: {
      title: 'GPA & CGPA Calculator - Calculate Your GPA Free Online',
      description: 'Calculate your semester GPA or cumulative CGPA from grades and credit hours. Supports 4.0 and 5.0 scales. Free, instant, works in your browser.',
      keywords: ['gpa calculator', 'cgpa calculator', 'cumulative gpa calculator', 'semester gpa', 'calculate gpa online free', 'grade point average calculator'],
      faq: [
        { q: 'What is the difference between GPA and CGPA?', a: 'GPA (Grade Point Average) typically refers to the average for a single semester. CGPA (Cumulative Grade Point Average) is the weighted average across all semesters completed, accounting for different credit loads per semester. This calculator handles both.' },
        { q: 'How is GPA calculated?', a: 'Each course grade is converted to a grade point (e.g., A = 4.0, B = 3.0). Each grade point is multiplied by the course\'s credit hours to get quality points. GPA = total quality points ÷ total credit hours attempted.' },
        { q: 'Does this support 4.0 and 5.0 scales?', a: 'Yes. The tool supports both the standard 4.0 scale used in most US universities and the 5.0 scale used in some institutions. Toggle the scale before entering grades.' },
        { q: 'How do I calculate CGPA from multiple semesters?', a: 'Enter each semester\'s GPA and total credit hours. The tool weights each semester\'s contribution by its credit hour load and computes the cumulative average. A semester with more credits has more influence on the CGPA.' },
      ],
      content: `<p>GPA (Grade Point Average) and CGPA (Cumulative Grade Point Average) are the primary academic performance metrics used by universities worldwide for scholarship eligibility, academic standing, graduate school applications, and certain competitive job applications. Calculating them correctly - especially across multiple semesters with different credit loads - is less straightforward than it appears, and manual calculation errors are common. This tool handles the arithmetic automatically.</p>

<h2>How GPA is calculated</h2>
<p>Each course grade is first converted to a grade point value on a numerical scale. On the standard 4.0 scale: A or A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0. Each grade point is then multiplied by the number of credit hours for that course - a 3-credit course with a B+ contributes 3 × 3.3 = 9.9 quality points. GPA is then total quality points divided by total credit hours: if you have 36.9 quality points from 12 credit hours, your GPA is 36.9 ÷ 12 = 3.075, typically rounded to 2 decimal places.</p>

<h2>Cumulative GPA across semesters</h2>
<p>CGPA cannot be calculated by simply averaging semester GPAs - this gives incorrect results whenever semester credit loads differ. The correct approach is to weight each semester's GPA by its credit hour count, or equivalently, to sum all quality points across all semesters and divide by total credit hours across all semesters. A 3.8 GPA from a 12-credit semester and a 3.2 GPA from a 18-credit semester produce a CGPA of (3.8×12 + 3.2×18) ÷ (12+18) = (45.6 + 57.6) ÷ 30 = 3.44 - not the arithmetic average of 3.5.</p>

<h2>Grade scales across countries</h2>
<p>The 4.0 scale is standard in the United States, Canada, and many universities in South and Southeast Asia. Some institutions in Bangladesh, Pakistan, and India use a 5.0 scale where an A+ corresponds to 5.0. The UK, Australia, and continental Europe typically use percentage marks or classification systems (First, Upper Second, etc.) rather than GPA scales, though some institutions convert for international applications. This calculator supports 4.0 and 5.0 scales directly.</p>

<h2>Impact on graduate school applications</h2>
<p>Most graduate programs in the United States, Canada, and the UK specify a minimum GPA for consideration - typically 3.0 (on a 4.0 scale) for most programs, and 3.5 or higher for competitive programs at top institutions. Some programs accept students below the minimum GPA threshold if other elements of the application (GRE/GMAT scores, research experience, recommendation letters) are exceptionally strong. Understanding your CGPA accurately is important for identifying which programs you are competitive for.</p>

<h2>Strategies for improving your GPA</h2>
<p>Because CGPA is a weighted average, retaking a failed or low-grade course can have a significant positive impact - the new grade replaces or averages with the old one depending on your institution's policy, and additional credit hours of strong performance dilute the impact of earlier poor grades. The marginal impact of each new grade decreases as your total credit hours increase, which means GPA improvement is easiest in your first year and requires more sustained effort in later years. This calculator can model scenarios: enter hypothetical grades for future courses to see the impact on your projected CGPA.</p>
<h2>International GPA equivalencies</h2>
<p>GPA systems vary significantly across countries, creating conversion challenges for international applications. The UK uses a classification system: First Class (typically GPA 3.7+), Upper Second (2:1, roughly 3.3–3.7), Lower Second (2:2, roughly 2.7–3.3), Third Class (roughly 2.0–2.7). Germany uses a 1.0–5.0 scale where 1.0 is the best grade - the opposite direction from the US scale. France uses 0–20 where 10 is a pass and 16+ is excellent. When converting for graduate school applications, most US institutions accept third-party credential evaluation services (WES, ECE, NACES members) that convert foreign GPAs to the US 4.0 scale. Self-reported converted GPAs without credential evaluation are often not accepted for official admissions purposes.</p>
<h2>Grade replacement policies</h2>
<p>Many universities allow students to retake failed or low-grade courses with the new grade replacing the old one in CGPA calculation - sometimes called academic forgiveness or fresh-start policies. Policies vary considerably: some replace the grade entirely (only the new grade counts), some average both attempts, and some show both on the transcript but use only the better one for CGPA. Understanding your institution's policy before retaking a course is important because the GPA impact depends entirely on which calculation method applies. Some institutions also distinguish between core major courses (where higher grades are required for major standing) and electives where grade replacement is freely permitted.</p>
`,
    },
    related: ['percentage-calculator', 'scientific-calculator', 'age-calculator', 'date-diff-calculator'],
  },

  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'calculator',
    description: 'Full scientific calculator with trigonometry, logarithms, and constants in your browser.',
    component: 'ScientificCalculator',
    seo: {
      title: 'Scientific Calculator - Free Online Scientific Calculator',
      description: 'Full-featured scientific calculator with trig functions, logarithms, factorials, and scientific notation. Runs in your browser, no app needed.',
      keywords: ['scientific calculator', 'online scientific calculator', 'calculator with sin cos tan', 'scientific calculator free', 'scientific notation calculator', 'math calculator online'],
      faq: [
        { q: 'What functions does this calculator support?', a: 'Trigonometric functions (sin, cos, tan and their inverses), hyperbolic functions (sinh, cosh, tanh), logarithms (log₁₀, ln, log₂), square root, cube root, nth root, powers, factorial, absolute value, floor, ceiling, and the constants π and e.' },
        { q: 'Does it work in degrees or radians?', a: 'Toggle between degrees and radians using the DEG/RAD button. The default is degrees. Make sure to select the correct mode before computing trigonometric functions, as sin(90°) = 1 but sin(90 radians) ≈ 0.894.' },
        { q: 'Can I use it for scientific notation?', a: 'Yes. Enter numbers in scientific notation using the EXP button (e.g., 1.5 EXP 6 = 1.5 × 10⁶ = 1500000). Results in scientific notation are displayed in the standard E-notation format.' },
        { q: 'What is the order of operations?', a: 'Standard mathematical order: parentheses first, then exponents, then multiplication/division, then addition/subtraction (PEMDAS/BODMAS). Use parentheses to override the default order when needed.' },
      ],
      content: `<p>A scientific calculator handles the mathematical functions needed for high school and university mathematics, physics, chemistry, and engineering. Beyond the four basic arithmetic operations, scientific calculations require trigonometry, logarithms, exponential functions, roots, factorial, and access to mathematical constants like π and Euler's number e. This browser-based calculator provides all of these functions without installation, account, or app download.</p>

<h2>Trigonometric functions</h2>
<p>The six trigonometric functions - sine, cosine, tangent, and their reciprocals cosecant, secant, and cotangent - and their inverse functions (arcsin, arccos, arctan) are the foundation of geometry, physics, and signal processing. This calculator supports all six primary trig functions and their inverses. Critically, you can toggle between degree mode and radian mode before computing - this is the most common source of trigonometry errors in calculator use. In degree mode, sin(30) = 0.5; in radian mode, sin(30) ≈ -0.988. Exam problems specify the mode; always verify the calculator is set correctly.</p>

<h2>Logarithms</h2>
<p>Three logarithmic bases are supported: log₁₀ (common logarithm, written log), log₂ (binary logarithm), and ln (natural logarithm, base e). The common logarithm is used in chemistry (pH scale, where pH = -log₁₀[H⁺]), acoustics (decibels, where dB = 10 × log₁₀(P₂/P₁)), and the Richter earthquake magnitude scale. The natural logarithm appears throughout calculus, differential equations, probability theory, and financial mathematics (continuous compounding). The binary logarithm is used in information theory and computer science (the number of bits needed to represent n values is log₂n).</p>

<h2>Factorials and combinatorics</h2>
<p>The factorial of a non-negative integer n (written n!) is the product of all positive integers from 1 to n: 5! = 5 × 4 × 3 × 2 × 1 = 120. Factorials appear in probability and combinatorics - the number of ways to choose k items from n (a combination) is n! ÷ (k! × (n-k)!), and the number of ways to arrange n items (a permutation) is n!. Factorials grow extremely rapidly - 20! = 2,432,902,008,176,640,000, close to the limits of standard floating-point arithmetic. The calculator handles factorials up to 170! (the largest whose result fits in a 64-bit float).</p>

<h2>Scientific notation</h2>
<p>Very large and very small numbers are expressed in scientific notation: a × 10ⁿ where 1 ≤ a < 10. The mass of a proton is 1.673 × 10⁻²⁷ kg; the distance from Earth to the sun is approximately 1.496 × 10¹¹ meters. Scientific notation makes these numbers tractable for calculation. Enter a number in scientific notation by typing the coefficient, pressing EXP, and typing the exponent (positive or negative). The calculator handles all arithmetic operations on numbers in scientific notation and displays results in standard or scientific notation depending on their magnitude.</p>

<h2>Tips for exam use</h2>
<p>Calculators on standardized exams (SAT, ACT, A-level, IB, university finals) are subject to policies about which types are permitted. Browser-based calculators are generally not permitted in traditional exam halls where devices are restricted to approved physical calculators. This tool is designed for homework, problem sets, research, and general computation - not as a substitute for an approved exam calculator. For exam preparation, practice with the specific calculator model permitted in your exam to become familiar with its interface and key layout.</p>
<h2>Floating-point precision in calculations</h2>
<p>JavaScript (and most programming languages) uses 64-bit IEEE 754 floating-point arithmetic, which cannot exactly represent most decimal fractions. The infamous <code>0.1 + 0.2 === 0.30000000000000004</code> in JavaScript is a consequence of this representation. For scientific calculations where you need many decimal places of precision, this imprecision accumulates. The calculator displays results to a reasonable number of significant figures to avoid showing spurious digits. For applications requiring higher precision than 64-bit floating point provides - certain financial calculations, cryptographic applications, or high-precision physics simulations - dedicated arbitrary-precision libraries (decimal.js, Decimal.js, or Python's <code>decimal</code> module) are needed.</p>
<h2>Common calculator errors and how to avoid them</h2>
<p>The most frequent calculator errors are: wrong angle mode (computing <code>sin(90)</code> in radian mode instead of degree mode - the results differ wildly), missing parentheses that change order of operations (entering <code>2+3×4</code> expecting 20 but getting 14 because multiplication has higher precedence), and premature rounding of intermediate results (using a 4-decimal approximation of π in a calculation that requires more precision). When in doubt, use more parentheses than necessary, verify the angle mode before trigonometric calculations, and use the stored constant buttons (π, e) rather than typing approximations.</p>
`,
    },
    related: ['gpa-calculator', 'percentage-calculator', 'bmi-calculator', 'date-diff-calculator'],
  },

  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'percent',
    description: 'Calculate percentages, percentage change, and percentage of a total instantly.',
    component: 'PercentageCalculator',
    seo: {
      title: 'Percentage Calculator - Calculate % Increase Decrease Free',
      description: 'Calculate what % of a number is, percentage increase/decrease, or what percentage one number is of another. Free, instant, works in your browser.',
      keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage increase calculator', 'percentage change calculator', 'what percent of'],
      faq: [
        { q: 'How do I calculate what percentage one number is of another?', a: 'Divide the first number by the second and multiply by 100. For example: 45 is what percent of 180? Answer: (45 ÷ 180) × 100 = 25%. Use the "X is what % of Y" mode in this calculator.' },
        { q: 'How do I calculate percentage increase?', a: 'Percentage increase = ((new value - old value) ÷ old value) × 100. If a price increased from 200 to 250: ((250 - 200) ÷ 200) × 100 = 25% increase.' },
        { q: 'How do I find the original value before a percentage was applied?', a: 'Divide the final value by (1 + percentage/100) for an increase, or (1 - percentage/100) for a decrease. If a price of 225 is after a 25% increase: 225 ÷ 1.25 = 180 (the original price).' },
        { q: 'What is percentage point versus percent?', a: 'A percentage point is an absolute difference between two percentages. If inflation is 4% one year and 6% the next, it increased by 2 percentage points (6 - 4 = 2) but increased by 50% in relative terms ((6-4)/4 × 100 = 50%). These two ways of describing the change are often confused in reporting.' },
      ],
      content: `<p>Percentage calculations appear in everyday financial decisions, academic scoring, data analysis, and business metrics. Calculating a discount at a store, understanding how much a salary increase represents, interpreting a test score as a percentage, working out tax amounts, tracking metric changes in a business dashboard - all of these involve percentage operations that this tool handles instantly with multiple calculation modes.</p>

<h2>The three fundamental percentage calculations</h2>
<p>All percentage problems reduce to three fundamental forms. First, "what is X% of Y?" - finding a part given the whole and the percentage. Example: what is 15% of 80? Answer: 0.15 × 80 = 12. This covers tax calculations, tip calculations, discount calculations, and grade calculations. Second, "X is what percent of Y?" - finding the percentage given the part and the whole. Example: 30 is what percent of 120? Answer: (30 ÷ 120) × 100 = 25%. This covers test scores, market share calculations, and proportion analysis. Third, "X is Y% of what number?" - finding the whole given the part and the percentage. Example: 45 is 30% of what? Answer: 45 ÷ 0.30 = 150. This covers reverse calculations where you know the discounted price and the discount rate and need the original price.</p>

<h2>Percentage change</h2>
<p>Percentage change (also called percentage increase or percentage decrease) measures how much a value changed relative to its original value: ((new − old) ÷ |old|) × 100. A positive result is an increase; a negative result is a decrease. This is used constantly in business reporting (month-over-month revenue growth), science (comparing experimental results to baselines), finance (investment returns), and statistics (year-over-year comparisons). The most important thing to remember about percentage change is that it is not symmetrical: a 50% increase followed by a 50% decrease does not return you to the original value - 100 × 1.5 = 150, then 150 × 0.5 = 75.</p>

<h2>Percentage points versus percent</h2>
<p>Percentage points and relative percent are two different ways to describe how a percentage changes. If market share grows from 20% to 25%, it grew by 5 percentage points but by 25% in relative terms ((25-20)/20 × 100 = 25%). Journalists and analysts sometimes confuse or conflate these two measures, which can significantly misrepresent data. "Interest rates rose 1%" could mean from 4.0% to 4.04% (relative) or from 4.0% to 5.0% (1 percentage point) - a tenfold difference in meaning. This calculator clearly distinguishes between absolute difference in percentage points and relative percentage change.</p>

<h2>Compound versus simple percentage</h2>
<p>In finance, the distinction between simple and compound interest matters greatly. Simple interest calculates the percentage on the original principal only: 10% of 1000 per year for 3 years = 300 interest. Compound interest calculates each period's interest on the running total: 1000 × 1.1³ = 1331, so 331 in interest. The difference grows dramatically over time and is the mechanism behind both investment growth and debt accumulation. This calculator handles simple percentage calculations; for compound interest over time, use a dedicated compound interest calculator.</p>

<h2>Percentage in everyday decisions</h2>
<p>Understanding percentage calculations quickly makes you a better consumer and decision-maker. A 20% discount on a 150-unit item saves 30 units - trivial to calculate, but surprising how many people estimate incorrectly. A salary increase from 45,000 to 47,500 is a 5.6% increase - knowing this number lets you compare offers on a like-for-like basis. A restaurant bill of 84 with a 15% tip means adding 12.60 - most people over or under-tip because they estimate rather than calculate. These are all standard "what is X% of Y" or "X is what % of Y" calculations this tool resolves instantly.</p>`,
    },
    related: ['gpa-calculator', 'scientific-calculator', 'bmi-calculator', 'age-calculator'],
  },

  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'activity',
    description: 'Calculate your Body Mass Index from height and weight in metric or imperial units.',
    component: 'BmiCalculator',
    seo: {
      title: 'BMI Calculator - Body Mass Index Calculator Free Online',
      description: 'Calculate your BMI (Body Mass Index) from height and weight in metric or imperial. See your BMI category and understand what the number means.',
      keywords: ['bmi calculator', 'body mass index calculator', 'calculate bmi online', 'bmi metric imperial', 'healthy weight calculator', 'bmi chart'],
      faq: [
        { q: 'How is BMI calculated?', a: 'BMI = weight(kg) ÷ height²(m). In imperial: BMI = 703 × weight(lb) ÷ height²(in). For example, a person 1.75m tall weighing 75kg has BMI = 75 ÷ (1.75²) = 75 ÷ 3.0625 ≈ 24.5.' },
        { q: 'What do the BMI categories mean?', a: 'WHO standard categories: Underweight < 18.5, Normal weight 18.5–24.9, Overweight 25–29.9, Obese Class I 30–34.9, Obese Class II 35–39.9, Obese Class III ≥ 40. These are population-level categories with known limitations for individuals.' },
        { q: 'Is BMI accurate for everyone?', a: 'BMI has significant limitations. It does not distinguish between muscle and fat mass - athletes often have high BMIs but low body fat. It may be less accurate for elderly populations, children (who use age-specific charts), and different ethnic groups. Some populations carry metabolic risk at lower BMI thresholds than the standard Western categories suggest.' },
        { q: 'What is a healthy BMI range?', a: 'The WHO defines 18.5–24.9 as the normal range, but health outcomes at the population level vary continuously rather than jumping at these thresholds. Consult a healthcare provider for a complete health assessment rather than relying on BMI alone.' },
      ],
      content: `<p>Body Mass Index (BMI) is a simple formula relating height and weight that is widely used as a preliminary screening tool for weight categories associated with health risks. While BMI has well-documented limitations as an individual health metric, it remains the standard first-pass measure in public health research, clinical screening, and health surveys. This calculator computes your BMI from height and weight in either metric or imperial units and places the result in the WHO standard category framework.</p>

<h2>The BMI formula</h2>
<p>BMI was developed by Belgian statistician Adolphe Quetelet in the 1830s as a population-level measure of obesity, not as a clinical individual diagnostic tool. The formula: BMI = weight in kilograms ÷ (height in meters)². In imperial units: BMI = 703 × weight in pounds ÷ (height in inches)². For a person 175cm (1.75m) tall and 75kg: BMI = 75 ÷ (1.75²) = 75 ÷ 3.0625 ≈ 24.5. The result is a dimensionless number - the units cancel - which is why it can be compared across populations regardless of the measurement system used.</p>

<h2>WHO BMI categories</h2>
<p>The World Health Organization defines five categories for adults. Underweight is BMI below 18.5, associated with increased risk of nutritional deficiencies, immune system impairment, and in women, menstrual disruption and fertility issues. Normal weight is 18.5 to 24.9, the range associated with lowest all-cause mortality risk in large population studies. Overweight is 25 to 29.9. Obese Class I is 30 to 34.9. Obese Class II is 35 to 39.9. Obese Class III (sometimes called morbidly obese) is 40 and above. The obese range is associated with increased risk of type 2 diabetes, cardiovascular disease, certain cancers, and sleep apnea at the population level.</p>

<h2>BMI limitations</h2>
<p>BMI is a population statistic, not an individual body composition measurement. Its most significant limitation is the inability to distinguish between fat mass and muscle mass. A highly trained athlete with substantial muscle mass may have a BMI of 28 (technically "overweight") with very low body fat and excellent metabolic health. Conversely, a sedentary individual with a BMI of 23 (technically "normal") may have high body fat percentage and poor metabolic markers. Research has also found that standard WHO BMI categories underestimate risk for some South and East Asian populations, who show increased metabolic risk at lower BMI values than Caucasian populations. The WHO has published alternative thresholds for Asian populations, and some countries use country-specific BMI cutoffs.</p>

<h2>Children and adolescents</h2>
<p>The adult BMI categories are not appropriate for children and adolescents because BMI varies substantially with age and differs between boys and girls during development. Children and teenagers use BMI-for-age percentile charts, where a BMI below the 5th percentile for age and sex is classified as underweight, 5th to 85th percentile as healthy weight, 85th to 95th as overweight, and above the 95th as obese. This calculator computes BMI for adults; pediatric BMI requires age-specific reference data.</p>

<h2>BMI as one data point</h2>
<p>BMI is most useful as a population screening tool and as one data point among several when evaluating individual health. More complete assessments consider waist circumference (a better predictor of abdominal fat, which is most strongly associated with metabolic risk), body fat percentage (measured by DEXA scan, bioimpedance, or skinfold measurement), blood pressure, fasting glucose, and lipid panel results. If your BMI falls outside the normal range, the appropriate response is a conversation with a healthcare provider, not conclusions drawn from a single number.</p>
<h2>Alternative body composition measures</h2>
<p>Several alternatives to BMI address its limitations in distinguishing fat mass from muscle mass. Waist circumference is a direct measure of abdominal fat (the metabolically most significant depot) without the muscle-mass confound - health risk increases substantially at waist measurements above 80cm for women and 94cm for men. Waist-to-height ratio (waist circumference divided by height) has stronger associations with cardiovascular risk than BMI in some studies, with a threshold of 0.5 often cited. Body fat percentage measured by DEXA (dual-energy X-ray absorptiometry) scan directly measures fat and lean mass distribution but is expensive and not routinely available. Bioelectrical impedance (BIA) scales estimate body fat from the resistance of a small electrical current passed through the body - less accurate than DEXA but accessible for home use.</p>
<h2>BMI in research contexts</h2>
<p>Despite its individual-level limitations, BMI remains the dominant metric in epidemiological research because it is easy to measure at scale, requires no specialized equipment, and has 50+ years of reference data enabling comparison across cohorts and time periods. When researchers discuss "obesity rates" in a population, they are almost always using BMI thresholds. The limitations for individual clinical assessment (muscle mass confound, ethnic variation in risk thresholds) are real but less problematic at the population level where the distribution of muscle mass to fat mass is similar across large random samples. For self-assessment, BMI is most useful as one data point in a broader picture that includes waist measurement, physical fitness assessment, and metabolic lab values.</p>
`,
    },
    related: ['percentage-calculator', 'age-calculator', 'scientific-calculator', 'gpa-calculator'],
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
      title: 'Age Calculator - Calculate Exact Age Free Online',
      description: 'Calculate exact age in years, months, days, hours, and minutes from any date of birth. Also shows the next birthday countdown. Free, instant.',
      keywords: ['age calculator', 'calculate age from date of birth', 'how old am i calculator', 'exact age calculator', 'age in days calculator', 'birthday age calculator'],
      faq: [
        { q: 'How is the exact age calculated?', a: 'The calculator computes the difference between the birth date and today by finding how many complete years, then complete months of the remaining partial year, then complete days of the remaining partial month have elapsed. Leap years are handled correctly - a birthday of February 29 ages on February 28 in non-leap years.' },
        { q: 'Can I calculate age at a specific past or future date?', a: 'Yes. The "target date" field defaults to today but can be changed to any past or future date to calculate age at that point.' },
        { q: 'What is the age in days count useful for?', a: 'Age in days is useful for pediatric medicine (infant milestones are tracked in days for the first year), actuarial calculations, specific contract terms that measure in exact days, and astronomy (your approximate age in various planetary "years").' },
        { q: 'How does the calculator handle leap year birthdays?', a: 'People born on February 29 are considered to have birthdays on February 28 in non-leap years, and on February 29 in leap years. This matches the legal convention used in most jurisdictions.' },
      ],
      content: `<p>Calculating exact age sounds simple but has surprisingly many edge cases: the correct handling of leap years, the varying lengths of different months, and the question of whether you count the birthday day itself. This calculator computes age precisely - down to years, months, days, hours, and minutes - and handles all the calendar arithmetic correctly, including February 29 birthdays.</p>

<h2>How the calculation works</h2>
<p>Age is calculated by finding the number of complete calendar years that have passed since the birth date, then the number of complete months of the remaining partial year, then the complete days of the remaining partial month. For a birth date of March 15, 1995 and a target date of June 28, 2026: the person has completed 31 full years (up to March 15, 2026). From March 15 to June 15 is 3 complete months. From June 15 to June 28 is 13 days. So the age is 31 years, 3 months, and 13 days.</p>

<h2>Leap year handling</h2>
<p>Leap years add complexity for anyone born on February 29. This occurs once every four years (with exceptions for century years not divisible by 400). Most legal systems and the calculator treat February 28 as the "birthday" in non-leap years. In leap years, the birthday falls on February 29 as it did at birth. The exact rule: if born on Feb 29, the birthday year increments on Feb 28 in non-leap years and Feb 29 in leap years. This means someone born on February 29, 2000 turned 26 on February 28, 2026 (not a leap year).</p>

<h2>Age in total days</h2>
<p>The total-days count provides a perspective on lifespan that the years-months-days representation does not: a 30-year-old has lived approximately 10,957 days. This count is surprisingly evocative - it emphasizes that individual days are a limited and tangible resource. Total days is also mathematically precise in a way that year counts are not, because it does not depend on the varying lengths of months and the irregular occurrence of leap years. It is used in pediatric medicine to track infant development (growth milestones in the first year are measured in days), in legal contracts with day-precise terms, and in astronomy (your age in Martian days is simply your age in Earth days divided by 1.02749).</p>

<h2>Next birthday countdown</h2>
<p>The calculator also shows how many days remain until the next birthday. This is useful for planning celebrations, but it also has some interesting mathematical properties: people often feel more motivated or reflective when a birthday is approaching or just passed, which behavioral economists study in the context of financial decisions (people are more likely to make major life changes - start a gym membership, quit smoking, save more money - around round-number birthdays). The effect of upcoming milestone ages on behavior is sometimes called the "fresh start effect."</p>

<h2>Legal age calculations</h2>
<p>Many legal thresholds are defined in years: the age of majority for contracting, voting age, minimum driving age, retirement eligibility age, and alcohol purchase age. Age calculators are used to determine exactly when someone reaches these thresholds. The legal convention in most jurisdictions is that a person reaches a specified age at the start of the day before their birthday (i.e., a person turns 18 on the day before their 18th birthday, allowing them to legally act as an adult on that day). This is different from what the calculator shows, which is the calendar-math age. For legal determinations, always verify the specific jurisdiction's convention.</p>
<h2>Age in different cultural contexts</h2>
<p>Not all cultures calculate age the same way. The Western system (counting completed years since birth) is the most common internationally. The traditional Korean age system (seollal) adds one year at birth and another at each Lunar New Year - a newborn born in December might be considered 2 years old in January. Japan officially uses the Western system since 1902 but certain traditional contexts still use the older Japanese age system. China officially uses the Western system but traditional Chinese age reckoning (xusui) counts the current year of life rather than completed years, making everyone one year older than the Western calculation. South Korea formally abolished the seollal age system in 2023 and standardized to the Western system. This calculator uses the Western system standard.</p>
<h2>Age calculation in software systems</h2>
<p>Age calculation in software has several known edge cases that have caused real bugs. The naive approach (<code>currentYear - birthYear</code>) is wrong if the birthday has not yet occurred this year. The correct approach requires comparing month and day, not just year. February 29 birthdays need special handling - this calculator treats Feb 28 as the birthday in non-leap years, matching SQL's <code>ADD_MONTHS</code> behavior and most legal systems. In SQL, age calculation: <code>FLOOR(DATEDIFF(day, birthdate, GETDATE()) / 365.2425)</code> is approximately correct but off by a day near February 29. The Python <code>relativedelta</code> function from <code>dateutil</code> handles all these cases correctly for production code.</p>
`,
    },
    related: ['date-diff-calculator', 'percentage-calculator', 'bmi-calculator', 'scientific-calculator'],
  },

  {
    slug: 'date-diff-calculator',
    name: 'Date Difference Calculator',
    category: 'calculator',
    kind: 'client-pure',
    icon: 'calendar-range',
    description: 'Calculate the exact number of days, weeks, or months between two dates.',
    component: 'DateDiffCalculator',
    seo: {
      title: 'Date Difference Calculator - Days Between Dates Free',
      description: 'Calculate exact days, weeks, months, and years between two dates. Excludes weekends option. Free, instant, works in your browser.',
      keywords: ['date difference calculator', 'days between dates', 'calculate days between two dates', 'date duration calculator', 'how many days between dates', 'workdays calculator'],
      faq: [
        { q: 'How does the calculator count the days?', a: 'The standard count is exclusive of the start date and inclusive of the end date - this matches how most calendar and legal systems count durations. For example, from Monday to Friday is 4 days (Tue, Wed, Thu, Fri). Toggle to inclusive/exclusive to match your specific use case.' },
        { q: 'Can I exclude weekends from the count?', a: 'Yes. Enable "business days only" to count only Monday–Friday, skipping Saturdays and Sundays. This is useful for project timelines and contract deadlines. Public holiday exclusion depends on jurisdiction and is not currently included.' },
        { q: 'What is the maximum date range?', a: 'The calculator handles any dates within the Gregorian calendar range, including dates across multiple centuries and negative years (BC dates are not supported). The practical limit is computational precision of JavaScript\'s Date object, which is accurate from 100 AD to 9999 AD.' },
        { q: 'How do I convert days to weeks and months?', a: 'The calculator shows all units simultaneously. Weeks = total days ÷ 7 (rounded down, with remaining days shown). Months are approximated as 30.4375 days (average month length including leap years) for the "approximate months" display, while the exact year-month-day breakdown uses calendar month counting.' },
      ],
      content: `<p>Calculating the exact number of days between two dates is deceptively complex when it must account for months of different lengths, leap years, and calendar edge cases. This tool computes the precise duration between any two dates, displaying the result in multiple units simultaneously - total days, weeks and remaining days, approximate months, and years-months-days breakdown - and optionally filters out weekends for business-day calculations.</p>

<h2>Where date difference calculations matter</h2>
<p>Project management requires knowing exactly how many days remain until a deadline, how many calendar days a phase has taken, and whether a timeline is realistic given the business-day count (which excludes weekends and, for more sophisticated calculations, public holidays). Contract law often specifies performance periods in calendar days or business days, and the difference can be significant for a 30-day payment term that spans a period with several weekends. Insurance policies and rental agreements specify coverage or tenancy periods that must be calculated exactly. Loan terms specify the exact number of days for interest accrual. Academic deadlines, trial periods for software subscriptions, visa validity periods, and passport expiry checks all require precise date difference calculations.</p>

<h2>Calendar day counting conventions</h2>
<p>The exact start and end inclusion rule varies by context. The most common convention - exclusive of start, inclusive of end - counts the number of intervening days: from Monday to Friday is 4 days (Tuesday, Wednesday, Thursday, Friday). The inclusive-inclusive convention counts both endpoints: Monday to Friday would be 5 days. Loan interest calculations often use inclusive start, exclusive end. Legal "within X days" deadlines typically count from the day after the triggering event (exclusive start). The tool lets you toggle the convention to match your specific use case.</p>

<h2>Business days versus calendar days</h2>
<p>For project timelines and business processes, calendar days overestimate the available working time. A 30-calendar-day period contains approximately 21–22 business days (depending on which day the period starts), because weekends account for roughly 2 out of every 7 days. For a project estimate or deadline commitment, using business days for the planning timeline and converting to a calendar date for external communication is the accurate approach. The business day calculation in this tool counts Monday through Friday, excluding Saturdays and Sundays.</p>

<h2>Months as an approximation</h2>
<p>Months are not a fixed number of days - they range from 28 to 31 days. This makes "X months between two dates" an inherently approximate measure unless you count calendar months specifically. The tool provides two month representations: an approximate decimal count (dividing total days by 30.4375, the average month length) and an exact calendar-month count (the number of complete months that have elapsed between the start and end dates, using the same logic as the age calculator). Use the approximate count for general communication ("about 3 months") and the exact breakdown for precise legal or contractual needs.</p>

<h2>Long-term planning applications</h2>
<p>Long-term date calculations appear in retirement planning (how many days until a target retirement date, to frame savings contributions as daily amounts), in pregnancy tracking (how many days since conception or last menstrual period, converting to weeks and trimesters), in historical research (how many days elapsed between two historical events), and in anniversary and milestone planning. The calculator handles all of these by accepting any dates in both fields - the order does not matter, as the calculator computes the absolute difference regardless of which date is earlier.</p>
<h2>Time zones and date arithmetic</h2>
<p>Date difference calculations across time zones introduce complexity that catches many developers off guard. A flight departing at 11pm on December 31 in New York and arriving at 2am on January 1 in London is a 3-hour flight, not a 3-day flight - but naive date subtraction on the departure and arrival dates suggests 1 day. The correct approach is to always work in UTC timestamps when computing time differences across time zones, converting to local time only for display. This calculator works with calendar dates, not timestamps - it is appropriate for date-only arithmetic (how many days between two calendar dates) but not for time-of-day arithmetic across time zones. For the latter, use a library like Luxon, date-fns-tz, or Temporal (the upcoming JavaScript standard for date/time).</p>
<h2>ISO 8601 duration notation</h2>
<p>The international standard for expressing durations is ISO 8601 duration notation: <code>P1Y2M3DT4H5M6S</code> means 1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds. The P prefix (for "period") is required; T separates the date and time portions. Machine-readable duration strings in this format appear in calendar applications (iCalendar format), REST APIs (particularly those following JSON:API or HAL conventions), and FHIR healthcare data standards. This calculator outputs the duration in human-readable format; the ISO 8601 notation can be constructed from the year/month/day components: <code>P\${years}Y\${months}M\${days}D</code>.</p>
`,
    },
    related: ['age-calculator', 'percentage-calculator', 'scientific-calculator', 'gpa-calculator'],
  },
];
