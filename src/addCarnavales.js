import substractOutdated from './modifyData/sustractOutdated.js'
import { colors, getDatefromArray } from './utils/utils.js'

export default function addCarnavales (currentDate, carnavales, calendar) {
  const { actualized } = substractOutdated(currentDate, carnavales)
  actualized.sort((a, b) => getDatefromArray (currentDate, a.from) - getDatefromArray (currentDate, b.from))

  let divisor = 8
  let gap = 3

  let color = 0

  actualized.forEach(c => {
    const dif = 1 + Math.round((getDatefromArray (currentDate, c.to) - getDatefromArray (currentDate, c.from)) / 86400000)
    for (let h = 0; h < dif; h++) {
      // Recorre cada uno de los dias para agregar el carnaval a los eventos porque ajá
      const day = c.from[0] + h
      const month = c.from[1]
      const fullDate = getDatefromArray (currentDate, [day, month])
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

    // Ahora los PRECARNAVALES
    let first = 0
    c.dates.forEach(d => {
      first = Math.min(d.day, first)
    })

    if (first < 0) {
      for (let h = first; h < 0; h++) {
        // Recorre cada uno de los dias para agregar el precarnaval a los eventos
        const day = c.from[0] + h
        const month = c.from[1]
        const fullDate = getDatefromArray (currentDate, [day, month])
        const event = {
          title: `Pre-${c.type} ${c.name}`,
          city: c.city,
          state: c.state,
          subEvents: c.dates.filter(d => h == d.day),
          color: colors[color]
        }
        calendar[fullDate.getFullYear()][fullDate.getMonth()][
          fullDate.getDate() - 1
        ].events.push(event)
      }
    }

    color = (color + gap) % 24
  })

  return calendar
}
