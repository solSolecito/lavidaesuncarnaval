import { weekDays } from './utils/dates.js'
import findElement from './utils/findElement.js'
import weeklize from './utils/weeklize.js'
import weekEvents from './utils/weekEvents.js'

export default function renderCalendar (currentDate, container, calendar, firstDay = 0) {
  // Ahora debo renderizar un calendario. Podria hacerlo con una tabla o con divs
  // La tabla parece mejor opción

  // Creo la tabla y su header

  const table = findElement(container, 'table')
  const header = findElement(table, 'tr', 'header-row')

  for (let i = 0; i < 7; i++) {
    findElement(header, 'th', 'header-' + i, 'week-header', weekDays[i])
  }

  // Separo en semanas
  const weeks = weeklize(calendar, currentDate, firstDay)

  // Para cada semana
  weeks.forEach((week, wIndex) => {
    // La primera fila son los dias
    const dates = document.createElement('tr')
    week.forEach((d, dIndex) => {
      let day = findElement(
        dates,
        'td',
        'date-' + wIndex + '-' + dIndex,
        'date',
        d.hasOwnProperty('date') ? d.date : ''
      )
      if (d.holliday) {
        day.classList.add(['holliday'])
      }
    })

    dates.classList.add(['dates-row'])
    table.appendChild(dates)

    // Las siguientes, los eventos

    // Contar la cantidad de eventos
    const evn = weekEvents(week)

    let eventsEnds = []

    evn.forEach((e, eIndex) => {
      let min = Math.min(7, ...eventsEnds)
      // Si el inicio de este carnaval es mayor a alguno de los valores en eventsEnds, entonces uso ese, si no, uso un nuevo index
      let [index, start, delCount] =
        min < e.from
          ? [eventsEnds.findIndex(v => v == min), e.from, 7 - e.from]
          : [eventsEnds.length, 0, 0]
      const mainTr = findElement(
        table,
        'tr',
        `events-row-${wIndex}-${index}`,
        'events-row'
      )
      const subTr = findElement(
        table,
        'tr',
        `subevents-row-${wIndex}-${index}`,
        'subevents-row'
      )

      for (let k = 0; k < delCount; k++) {
        mainTr.removeChild(mainTr.lastChild)
        subTr.removeChild(subTr.lastChild)
      }

      for (let d = start; d < 7; d++) {
        if (d < e.from || d > e.to) {
          mainTr.appendChild(document.createElement('td'))
        } else if (d == e.from) {
          const titleCell = document.createElement('td')
          titleCell.setAttribute('colspan', 1 + e.to - e.from)
          mainTr.appendChild(titleCell)
          const titleDiv = document.createElement('div')
          const titleP = findElement(
            titleDiv,
            'p',
            `event-title-${wIndex}-'${eIndex}`,
            'event-title',
            e.title
          )
          const locP = findElement(
            titleDiv,
            'p',
            `event-location-${wIndex}-'${eIndex}`,
            'smallText',
            `${e.city}, ${e.state}`
          )
          titleP.classList.add([
            `${e.title[3] == '-' ? 'dark' : 'light'}-title`
          ])
          titleDiv.classList.add([`${e.color}${e.title[3] == '-' ? '-l' : ''}`])
          titleCell.appendChild(titleDiv)
        }
        const auxTd = document.createElement('td')
        e.sub
          .filter(s => s.i == d)
          .forEach(s => {
            findElement(auxTd, 'p', s.name, `${e.color}-l`, s.name)
          })
        subTr.appendChild(auxTd)
      }
      eventsEnds[index] = e.to
    })
  })
}
