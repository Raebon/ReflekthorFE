export function convertUtcToLocal(date: Date): Date {
  const utcTime = new Date(date);
  const localTime = new Date(
    utcTime.getTime() - utcTime.getTimezoneOffset() * 60 * 1000
  );
  return localTime;
}
