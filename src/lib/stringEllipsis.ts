export const stringEllipsis = (value: string, maxLength: number): string => {
  return value.length > maxLength ? value.substring(0, maxLength).concat('...') : value;
}