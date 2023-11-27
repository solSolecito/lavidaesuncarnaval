import { alreadyPassed } from '../utils/utils.js'

// Esta función separa los eventos que no tienen fecha fija y las fechas ingresadas en el archivo json ya pasaron (outdated) y los tienen fechas fijas o su fecha actualizada (actualized)
// Recibe la fecha de hoy (currentDate) y la lista de carnavales (carnavales)

export default function substractOutdated (currentDate, carnavales) {
  const actualized = []
  const outdated = []
  carnavales.forEach(c => {
    if (c.fixed || !alreadyPassed(currentDate, c.to)) {
      actualized.push(c)
    } else {
      outdated.push(c)
    }
  })

  return {
    actualized,
    outdated
  }
}
