import substractOutdated from './sustractOutdated.js'
import { colors, getDate } from './utils.js'
import { monthDays } from './dates.js'

export function createCalendar (
  currentDate,
  isThisYearBisiesto = false,
  isNextYearBisiesto = false
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

  return calendar
}

export function addCarnavales (currentDate, carnavales, calendar) {
  const { actualized } = substractOutdated(currentDate, carnavales)
  // Revisar divisores
  const divisors = [24, 12, 8, 6]
  let numberOfCarnavales = actualized.length
  let divisor = 0;
  let res = 24;
  let i = 0;
  while (res != 0 || i < divisors.length) {
    let currentRes = numberOfCarnavales % divisors[i]
    if (currentRes < res) {
      res = currentRes
      divisor = divisors[i]
    }
    i++
  }

  let gap = 24/divisor;
  let color = 0

  actualized.forEach(c => {
    const dif = 1 + Math.round((getDate(c.to) - getDate(c.from)) / 86400000)
    for (let h = 0; h < dif; h++) {
      // Recorre cada uno de los dias para agregar el carnaval a los eventos porque ajá
      const day = c.from[0] + h
      const month = c.from[1]
      const fullDate = getDate([day, month])
      const event = {
        title: `${c.type} ${c.name}`,
        city: c.city,
        state: c.state,
        subEvents: c.dates.filter(d => h == d.day),
        color: colors[color]
      }
      calendar[fullDate.getFullYear()][fullDate.getMonth()][
        fullDate.getDate() - 1
      ].events.push(event)
    }

    color = (color + gap) % 24
    // Ahora faltan los PRECARNAVALES
  })

  return calendar
}
