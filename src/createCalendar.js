import carnavales from './carnavales.json' assert { type: 'json' }
import { colors, getDate, alreadyPassed } from './utils.js'

const monthDays = (bisiesto = false) => [
  31,
  bisiesto ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

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

export function addCarnavales (currentDate, calendar) {
  const outdated = []
  let color = 0
  const colorsLength = colors.length
  // Debo recorrer uno por uno los objetos

  carnavales.forEach(c => {
    // Si el carnaval no tiene fecha fija y la fecha que tiene ya pasó va a outdated
    if (!c.fixed && alreadyPassed(currentDate, c.to)) {
      outdated.push(c.type + ' ' + c.name)
    } else {
      // Si no, la agrego al calendario

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
      // Ahora faltan los PRECARNAVALES
      color = (color + 1) % colorsLength
    }
  })

  return {
    outdated,
    calendar
  }
}
