import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fUnixTime(epochs, timeOnly) {
  const d = new Date(0)
  d.setUTCSeconds(epochs);

  if (!timeOnly)
    return fDateTime(d, 'MMM dd yyyy\xa0\xa0-\xa0\xa0HH:mm:ss')
  return fDateTime(d, 'HH:mm:ss')
}