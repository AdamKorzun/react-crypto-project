export function prettifyNumber(
  num: number | string | null,
  maxLength = 6,
): string {
  if (isNaN(num as number)) return '';
  if (isNaN(Number(num))) return String(num);
  num = Number(num);

  let abs = Math.abs(num);
  const rounder = Math.pow(10, 1);
  const isNegative = num < 0;
  let key = '';

  const powers = [
    { key: 'Q', value: Math.pow(10, 15) },
    { key: 'T', value: Math.pow(10, 12) },
    { key: 'B', value: Math.pow(10, 9) },
    { key: 'M', value: Math.pow(10, 6) },
    { key: 'K', value: 1000 },
  ];

  for (let i = 0; i < powers.length; i++) {
    let reduced = abs / powers[i].value;
    reduced = Math.round(reduced * rounder) / rounder;
    if (reduced >= 1) {
      abs = reduced;
      key = powers[i].key;
      break;
    }
  }

  return (isNegative ? '-' : '') + abs.toString().slice(0, maxLength) + key;
}
