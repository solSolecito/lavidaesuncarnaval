export default function weekEvents (week) {
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
