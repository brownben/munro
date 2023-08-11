export const scoringShorthandToDescription: Record<string, [string, string]> = {
  position: ['Position Based Scoring', 'System (100 Max)'],
  position50: ['Position Based Scoring', 'System (50 Max)'],
  position99: ['Position Based Scoring', 'System (99 Max)'],
  position99average: [
    'Position Based Scoring',
    'System (99 Max, Reduced in a Draw)',
  ],
  positionDouble: ['Position Based Scoring', 'System (100 Max, Double Points)'],
  position50Double: [
    'Position Based Scoring',
    'System (50 Max, Double Points)',
  ],
  timeAverage: ['Time Relative to Average Scoring', 'System (1000 Average)'],
  timeAverage100: ['Time Relative to Average Scoring', 'System (100 Average)'],
  timeTop3: ['Time Relative to the Average Time of the Top 3', ''],
  timeTop3Adjusted: [
    'Time Relative to the Average Time of the Top 3',
    '(Adjusted by Course/Age Class)',
  ],
  timeTopAdjustedWelsh: [
    'Time Relative to Winner',
    'System (Adjusted by Course/Age Class - Welsh Multipliers)',
  ],
  positionStaggered: ['Position Based Scoring', 'System (Staggered, 60 Max)'],
  file: ['Points from File', ''],
}

export const scoringOptions = [
  { value: 'position', text: 'Position Based (100 Max)' },
  { value: 'position50', text: 'Position Based (50 Max)' },
  { value: 'position99', text: 'Position Based (99 Max)' },
  {
    value: 'position99average',
    text: 'Position Based (99 Max, Reduced in a Draw)',
  },
  {
    value: 'positionDouble',
    text: 'Position Based (100 Max, Double Points)',
  },
  {
    value: 'position50Double',
    text: 'Position Based (50 Max, Double Points)',
  },
  {
    value: 'positionStaggered',
    text: 'Position Based (Staggered, 60 Max)',
  },
  {
    value: 'timeAverage',
    text: 'Relative to Average Time (1000 Average)',
  },
  {
    value: 'timeAverage100',
    text: 'Relative to Average Time (100 Average)',
  },
  { value: 'timeTop3', text: 'Relative to Top 3 Times' },
  {
    value: 'timeTopAdjustedWelsh',
    text: "Relative to Winner's Time (Welsh Multipliers)",
  },
  { value: 'file', text: 'From Upload File' },
]
