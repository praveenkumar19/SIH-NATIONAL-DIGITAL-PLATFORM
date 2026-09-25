export function formatArea(sqkm, unit = 'sqkm') {
  if (sqkm === undefined || sqkm === null) return '0 km²';
  if (unit === 'hectares') {
    return `${(sqkm * 100).toLocaleString('en-IN', { maximumFractionDigits: 0 })} Ha`;
  }
  if (unit === 'acres') {
    return `${(sqkm * 247.105).toLocaleString('en-IN', { maximumFractionDigits: 0 })} Acres`;
  }
  return `${sqkm.toLocaleString('en-IN')} km²`;
}

export function formatPercent(val, showSign = true) {
  if (val === undefined || val === null) return '0.0%';
  const num = Number(val);
  const sign = showSign && num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}%`;
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function truncate(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}
