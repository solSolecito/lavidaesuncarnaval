import { monthNames } from '../dates.js'
import substractOutdated from './sustractOutdated.js'

// Esta función convierte en texto para un archivo md la información proveniente de la lista de carnavales
// Recibe la fecha de hoy (currentDate) y la lista de carnavales (carnavales)

export default function jsonToMd (currentDate, carnavales) {
    const { actualized, outdated } = substractOutdated(currentDate, carnavales)

    let actualizedText = '### Carnavales actualizados en el archivo: '
    actualized.forEach(c => {
        let showDifMonths = c.from[1] != c.to[1]
        let showYear = !c.fixed
        let showDifYears = showYear && c.from[2] != c.to[2]
        let date = `Del ${c.from[0]} ${
        showDifMonths
            ? `de ${monthNames[c.from[1] - 1]} ${
                showDifYears ? `del ${c.from[2]} ` : ''
            }`
            : ''
        } al ${c.to[0]} de ${monthNames[c.from[1] - 1]}  ${
        showYear ? `del ${c.to[2]} ` : ''
        }`
        actualizedText += `

            **${c.type} ${c.name}**
            
            *${c.city}, ${c.state}*
            
            ${date}

            Con ${c.dates.length} eventos
            `
    })

    let outdatedText = '### Carnavales desactualizados:'
    outdated.forEach(c => {
        outdatedText += `

            **${c.type} ${c.name}**
            
            *${c.city}, ${c.state}*

            Con ${c.dates.length} eventos
            `
    })

    console.log(actualizedText)
    console.log(outdatedText)

    return {
        actualizedText,
        outdatedText
    }
}
