import type { Level } from '../data/words'
import type { Stage } from './stages'

export interface DrillRecord {
  completed: number
  bestAccuracy: number
  bestWpm: number
  lastAt: string
}

export type ProgressMap = Record<string, DrillRecord>

const PROGRESS_KEY = 'etd:progress:v1'
const SETTINGS_KEY = 'etd:settings:v1'

export function progressKey(level: Level, frameId: string, stage: Stage): string {
  return `${level}/${frameId}/${stage}`
}

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

export function saveResult(
  level: Level,
  frameId: string,
  stage: Stage,
  result: { accuracy: number; wpm: number },
): ProgressMap {
  const map = loadProgress()
  const key = progressKey(level, frameId, stage)
  const prev = map[key]
  map[key] = {
    completed: (prev?.completed ?? 0) + 1,
    bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, result.accuracy),
    bestWpm: Math.max(prev?.bestWpm ?? 0, result.wpm),
    lastAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map))
  } catch {
    // ストレージが使えない環境では無視
  }
  return map
}

export function clearProgress(): ProgressMap {
  try {
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    // ignore
  }
  return {}
}

export interface Settings {
  shuffle: boolean
  speech: boolean
}

const DEFAULT_SETTINGS: Settings = { shuffle: false, speech: true }

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}
