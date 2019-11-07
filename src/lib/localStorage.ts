

export function recall<T>(fieldName: string): T | undefined {
  const data = localStorage.getItem(fieldName)
  return data ? JSON.parse(data) : undefined
}  

export function remember<T>(fieldName: string, data: T): void {
  localStorage.setItem(fieldName, JSON.stringify(data))
}
