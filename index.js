import carnavales from './src/carnavales.json' assert { type: 'json' }
import { createCalendar, addCarnavales } from './src/createCalendar.js'
import { renderCalendar } from './src/rendercalendar.js'
//import jsonToMd from './src/jsonToMd.js'

const bisiestos = {
  2023: false,
  2024: true,
  2025: false
}

const currentDate = new Date()

const calendar = createCalendar(
  currentDate,
  bisiestos[currentDate.getFullYear()],
  bisiestos[currentDate.getFullYear() + 1]
)
const festiveCalendar = addCarnavales(currentDate, carnavales, calendar)
const container = document.getElementById('container')

if (container) {
  renderCalendar(currentDate, container, festiveCalendar)
} else {
  console.log('oops!')
}

// jsonToMd(currentDate, carnavales)