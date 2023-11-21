import { alreadyPassed } from './utils.js'

const weekDays = [
  'Dom',
  'Lun',
  'Mar',
  'Mié',
  'H_ue',
  'Vie',
  'Sáb'
]

function createElement (type, content = '', className = '') {
  const element = document.createElement(type)
  if (content) {
    const textNode = document.createTextNode(content)
    element.appendChild(textNode)
  }
  if (className) {
    element.classList.add([className])
  }
  return element
}

function weeklize (calendar, currentDate, firstDay) {
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
      if (calendar[currentDate.getFullYear() + 1][m][d].day == firstDay) {
        weeks.push([])
      }
      weeks[weeks.length - 1].push(
        calendar[currentDate.getFullYear() + 1][m][d]
      )
    }
  }
  return weeks
}

function weekEvents (week) {
  // Obtengo los eventos
  const evn = []
  week.forEach((d, i) => {
    if (d.hasOwnProperty('events')) {
      d.events.forEach(e => {
        const thisEvent = evn.find(event => e.title == event.title)
        if (!thisEvent) {
          evn.push({
            title: e.title,
            from: i,
            to: i,
            sub: e.subEvents.map(s => {
              return { i, name: s.name }
            }),
            city: e.city,
            state: e.state,
            color: e.color
          })
        } else {
          thisEvent.to = i
          e.subEvents.forEach(s => {
            thisEvent.sub.push({ i, name: s.name })
          })
        }
      })
    } else {
      // NOOP
    }
  })
  return evn
}

export function renderCalendar (currentDate, container, calendar, firstDay = 0) {

  // Ahora debo renderizar un calendario. Podria hacerlo con una tabla o con divs

  // La tabla parece mejor opción

  // Creo la tabla y su header

  const table = document.createElement('table')
  const header = document.createElement('tr')

  for (let i = 0; i < 7; i++) {
    header.appendChild(createElement('th', weekDays[i]))
  }
  table.appendChild(header)

  // Separo en semanas
  const weeks = weeklize(calendar, currentDate, firstDay)

  // Para cada semana
  weeks.forEach(week => {
    // Contar la cantidad de eventos
    const evn = weekEvents(week)

    // La primera fila son los dias
    const dates = document.createElement('tr')
    week.forEach(d => {
      if (d.hasOwnProperty('date')) {
        dates.appendChild(createElement('td', d.date))
      } else {
        dates.appendChild(createElement('td'))
      }
    })
    dates.classList.add(['dates-row'])
    table.appendChild(dates)

    // Las siguientes, los eventos
    evn.forEach(e => {
      const mainTr = document.createElement('tr')
      mainTr.classList.add([`events-row`])

      const subTr = document.createElement('tr')
      subTr.classList.add(['subevents-row'])
      for (let d = 0; d < 7; d++) {
        const auxTd = document.createElement('td')
        e.sub
          .filter(s => s.i == d)
          .forEach(s => {
            auxTd.appendChild(createElement('p', s.name, `${e.color}-l`))
          })
        subTr.appendChild(auxTd)
        if (d < e.from || d > e.to) {
          mainTr.appendChild(document.createElement('td'))
        } else if (d == e.from) {
          const titleCell = document.createElement('td')
          titleCell.appendChild(createElement('p', e.title))
          titleCell.appendChild(createElement('p', `${e.city}, ${e.state}`, 'smallText'))
          titleCell.setAttribute('colspan', 1 + e.to - e.from)
          titleCell.classList.add([e.color])
          mainTr.appendChild(titleCell)
        }
      }
      table.appendChild(mainTr)
      if (e.sub.length) {
        table.appendChild(subTr)
      }
    })
  })

  container.appendChild(table)
}
