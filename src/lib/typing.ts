/** 入力文字の正規化（全角クォート・全角スペースなどを半角へ） */
export function normalize(s: string): string {
  return s
    .replace(/[‘’ʼ＇]/g, "'")
    .replace(/[“”＂]/g, '"')
    .replace(/　/g, ' ')
    .replace(/[！-～]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
}

export type CharState = 'correct' | 'wrong' | 'pending'

export interface CharCell {
  char: string
  state: CharState
}

/** 目標文字列と入力文字列を 1 文字ずつ比較して表示用の配列にする */
export function diffChars(target: string, typed: string): CharCell[] {
  const t = normalize(typed)
  return Array.from(target).map((char, i) => {
    if (i >= t.length) return { char, state: 'pending' }
    return { char, state: t[i] === char ? 'correct' : 'wrong' }
  })
}

/** 完全一致か（正規化後・末尾の空白は無視） */
export function isExact(target: string, typed: string): boolean {
  return normalize(typed).trim() === target.trim()
}

/** 大文字小文字と末尾の句読点を無視した「ほぼ正解」判定 */
export function isLenientMatch(target: string, typed: string): boolean {
  const clean = (s: string) => normalize(s).trim().replace(/[.?!]+$/, '').toLowerCase().replace(/\s+/g, ' ')
  return clean(target) === clean(typed)
}

/** 新しく 1 文字追加されたときに、その文字が正しいか */
export function isNewCharCorrect(target: string, prev: string, next: string): boolean {
  const p = normalize(prev)
  const n = normalize(next)
  if (n.length !== p.length + 1) return true
  const idx = n.length - 1
  return target[idx] === n[idx]
}

/** WPM（1 単語 = 5 文字換算） */
export function wpm(chars: number, ms: number): number {
  if (ms <= 0) return 0
  return Math.round((chars / 5) / (ms / 60000))
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
