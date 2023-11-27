import { monthDays } from './utils/dates.js'

export default function createCalendar (
  currentDate,
  isThisYearBisiesto = false,
  isNextYearBisiesto = false,
  festivos = []
) {
  const ty = currentDate.getFullYear() // This year
  const ny = ty + 1 // Next year

  const calendar = {}
  calendar[ty] = new Array(12)
  calendar[ny] = new Array(12)

  const currentYear = monthDays(isThisYearBisiesto)
  const nextYear = monthDays(isNextYearBisiesto)

  for (let m = 0; m < 12; m++) {
    calendar[ty][m] = []
    calendar[ny][m] = []
    for (let d = 0; d < currentYear[m]; d++) {
      const fullDate = new Date(ty, m, d + 1)
      calendar[ty][m].push({
        date: d + 1,
        day: fullDate.getDay(),
        holliday: fullDate.getDay() == 0,
        events: []
      })
    }
    for (let d = 0; d < nextYear[m]; d++) {
      const fullDate = new Date(ny, m, d + 1)
      calendar[ny][m].push({
        date: d + 1,
        day: fullDate.getDay(),
        holliday: fullDate.getDay() == 0,
        events: []
      })
    }
  }

  // Añadir festivos

  festivos.forEach(f => {
    if (f.nextMonday) {
      const gap = (8 - calendar[ny][f.date[1] - 1][f.date[0] - 1].day) % 7
      if (f.date[0] + gap <= monthDays(isThisYearBisiesto)[f.date[1] - 1]) {
        calendar[ty][f.date[1] - 1][f.date[0] + gap - 1].holliday = true
      } else {
        calendar[ty][f.date[1]][
          f.date[0] + gap - 1 - monthDays(isThisYearBisiesto)[f.date[1]]
        ].holliday = true
      }
      if (f.date[0] + gap <= monthDays(isNextYearBisiesto)[f.date[1] - 1]) {
        calendar[ny][f.date[1] - 1][f.date[0] + gap - 1].holliday = true
      } else {
        calendar[ny][f.date[1]][
          f.date[0] + gap - 1 - monthDays(isNextYearBisiesto)[f.date[1]]
        ].holliday = true
      }
    } else {
      calendar[ty][f.date[1] - 1][f.date[0] - 1].holliday = true
      calendar[ny][f.date[1] - 1][f.date[0] - 1].holliday = true
    }
  })

  return calendar
}
