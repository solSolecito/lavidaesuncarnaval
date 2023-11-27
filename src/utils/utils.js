export const colors = [
  'yellow-1',
  'red-4',
  'red-3',
  'red-2',
  'red-1',
  'magenta-4',
  'magenta-3',
  'magenta-2',
  'magenta-1',
  'blue-4',
  'blue-3',
  'blue-2',
  'blue-1',
  'cyan-4',
  'cyan-3',
  'cyan-2',
  'cyan-1',
  'green-4',
  'green-3',
  'green-2',
  'green-1',
  'yellow-4',
  'yellow-3',
  'yellow-2',
]

export function getDatefromArray (currentDate, arrayDate) {
  const today = new Date()
  if (arrayDate.length < 2) {
    return today
  }
  const day = arrayDate[0]
  const month = arrayDate[1] - 1
  let year = today.getFullYear()

  if (arrayDate.length < 3) {
    const difM = today.getMonth() - month
    if (difM == 0) {
      const difD = today.getDate() - day
      if (difD > 0) {
        year++
      }
    } else if (difM > 0) {
      year++
    }
  } else {
    year = arrayDate[2]
  }
  return new Date(year, month, day)
}

export function alreadyPassed (currentDate, arrayDate = []) {
  if (arrayDate.length < 2) {
    return true
  } else {
    return Math.floor((currentDate - getDatefromArray (currentDate, arrayDate)) / 86400000) > 0
  }
}
