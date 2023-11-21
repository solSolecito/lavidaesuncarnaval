import { createCalendar, addCarnavales } from './src/createCalendar.js'
import { renderCalendar } from './src/rendercalendar.js'

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
const festiveCalendar = addCarnavales(currentDate, calendar)
const container = document.getElementById('container')

console.log(festiveCalendar)

if (container) {
  renderCalendar(currentDate, container, festiveCalendar.calendar)
} else {
  console.log('oops!')
}
