export function timeToString(time: number) {
  let now = Date.now()
  let diff = now - time
  if (diff < 1000 * 60) {
    return 'Jetzt'
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.ceil(diff / 1000 / 60)} min`
  } else {
    return 'Später'
  }
}
