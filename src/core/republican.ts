export interface RepublicanDate {
  year: number
  month: number
  day: number
}

const YEAR_STARTS: [number, number, number][] = [
  [1792, 9, 22],
  [1793, 9, 22],
  [1794, 9, 22],
  [1795, 9, 23],
  [1796, 9, 22],
  [1797, 9, 22],
  [1798, 9, 22],
  [1799, 9, 23],
  [1800, 9, 23],
  [1801, 9, 23],
  [1802, 9, 23],
  [1803, 9, 24],
  [1804, 9, 23],
  [1805, 9, 23],
]

const MONTHS = [
  'vendémiaire',
  'brumaire',
  'frimaire',
  'nivôse',
  'pluviôse',
  'ventôse',
  'germinal',
  'floréal',
  'prairial',
  'messidor',
  'thermidor',
  'fructidor',
]

const COMPLEMENTARY_DAYS = ['jour de la Vertu', 'jour du Génie', 'jour du Travail', "jour de l'Opinion", 'jour des Récompenses', 'jour de la Révolution']

const DAY_MS = 86_400_000
const LAST_DAY = Date.UTC(1805, 11, 31)

function dayNumber(year: number, month: number, day: number): number {
  return Date.UTC(year, month - 1, day)
}

export function toRepublican(year: number, month: number, day: number): RepublicanDate | null {
  const date = dayNumber(year, month, day)
  if (date > LAST_DAY) return null
  const index = YEAR_STARTS.findLastIndex(([y, m, d]) => dayNumber(y, m, d) <= date)
  const start = YEAR_STARTS[index]
  if (!start) return null
  const offset = Math.round((date - dayNumber(...start)) / DAY_MS)
  return { year: index + 1, month: Math.floor(offset / 30) + 1, day: (offset % 30) + 1 }
}

function romanYear(value: number): string {
  const digits: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let rest = value
  let text = ''
  for (const [amount, symbol] of digits) {
    while (rest >= amount) {
      text += symbol
      rest -= amount
    }
  }
  return text
}

export function formatRepublican(date: RepublicanDate): string {
  const year = `an ${romanYear(date.year)}`
  if (date.month === 13) return `${COMPLEMENTARY_DAYS[date.day - 1]} ${year}`
  return `${date.day === 1 ? '1er' : date.day} ${MONTHS[date.month - 1]} ${year}`
}

export function republicanLabel(year: number, month?: number, day?: number): string | null {
  if (month === undefined || day === undefined) return null
  const date = toRepublican(year, month, day)
  return date ? formatRepublican(date) : null
}

export function isJulianDate(year: number, month?: number, day?: number): boolean {
  if (year !== 1582) return year < 1582
  if (month === undefined) return true
  return month < 12 || (day !== undefined && day <= 9)
}
