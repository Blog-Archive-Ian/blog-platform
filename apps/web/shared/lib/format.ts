export const stripMarkdown = (markdown: string) => {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/(\n?\|.*\|\n?)+/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[-+*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    .replace(/^-{3,}$/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

export const extractApiMessage = (error: Error) => {
  try {
    const jsonStart = error.message.indexOf('{')
    if (jsonStart === -1) return error.message

    const jsonString = error.message.slice(jsonStart)
    const parsed = JSON.parse(jsonString)

    return parsed.message ?? error.message
  } catch {
    return error.message
  }
}
