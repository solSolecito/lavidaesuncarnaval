import { alreadyPassed } from './utils.js'

export default function weeklize (calendar, currentDate, firstDay) {
  const weeks = []

  // La primera linea tiene la semana en curso

  for (let d = 0; d < (currentDate.getDay() + 7 - firstDay) % 7; d++) {
    if (d == 0) {
      weeks.push([])
    }
    weeks[0].push({})
  }

  for (let m = 0; m < 12; m++) {
    const days = calendar[currentDate.getFullYear()][m].length
    for (let d = 0; d < days; d++) {
      if (
        !alreadyPassed(currentDate, [d + 1, m + 1, currentDate.getFullYear()])
      ) {
        if (calendar[currentDate.getFullYear()][m][d].day == firstDay) {
          weeks.push([])
        }
        weeks[weeks.length - 1].push(calendar[currentDate.getFullYear()][m][d])
      } else {
        // NOOP
      }
    }
  }

  for (let m = 0; m < 12; m++) {
    const days = calendar[currentDate.getFullYear() + 1][m].length
    for (let d = 0; d < days; d++) {
      if (alreadyPassed(currentDate, [d, m + 1, currentDate.getFullYear()])) {
        if (calendar[currentDate.getFullYear() + 1][m][d].day == firstDay) {
          weeks.push([])
        }
        weeks[weeks.length - 1].push(
          calendar[currentDate.getFullYear() + 1][m][d]
        )
      } else {
        // NOOP
      }
    }
  }
  return weeks
}
