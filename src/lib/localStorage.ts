

export function recall<T>(fieldName: string): T | undefined {
  const data = localStorage.getItem(fieldName)
  return data && JSON.parse(data)
}  

export function remember<T>(fieldName: string, data: T): void {
  localStorage.setItem(fieldName, JSON.stringify(data))
}

export function forget(fieldName: string): void {
  localStorage.removeItem(fieldName)
}
