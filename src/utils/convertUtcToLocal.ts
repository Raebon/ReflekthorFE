export function convertUtcToLocal(date: Date): Date {
  let utcTime = new Date(date);
  const localTime = new Date(
    utcTime.getTime() - utcTime.getTimezoneOffset() * 60000
  );
  return localTime;
}
