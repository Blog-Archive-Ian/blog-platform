export function shortUrl(url?: string) {
  if (!url) return ''
  const normalized = url.startsWith('http') ? url : `https://${url}`
  try {
    return new URL(normalized).host
  } catch {
    return url
  }
}

export function isValidUrlOrEmpty(v: string) {
  if (!v) return false
  try {
    new URL(v)
    return true
  } catch {
    return false
  }
}

export const formatKoreanDate = (iso: string) => {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}년 ${mm}월 ${dd}일 ${hh}:${min}`
}
