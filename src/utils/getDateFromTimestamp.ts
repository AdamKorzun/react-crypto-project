function isValidTimestamp(timestamp: string): boolean {
  const newTimestamp = new Date(Number(timestamp)).getTime();
  return !isNaN(Number(newTimestamp));
}

function getDate(label: string): string {
  return isValidTimestamp(label) ? new Date(label).toLocaleDateString() : label;
}

export default getDate;
