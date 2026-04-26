export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isBeforeToday(dateValue: string) {
  return new Date(dateValue) < startOfToday();
}
