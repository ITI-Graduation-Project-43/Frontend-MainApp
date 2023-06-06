export function mapEnumValue(enumObject: any, value: number) {
  return enumObject[value] || 'Unknown';
}
