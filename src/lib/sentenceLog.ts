import type { Level } from '../data/words'
import type { Stage } from './stages'

export type Result = 'o' | 'x'

/** 文ごとの学習記録 */
export interface SentenceRecord {
  /** 直近の結果（新しいものが末尾。最大 10 件） */
  recent: Result[]
  /** クリア（ミスなし／正解）した回数 */
  ok: number
  /** ミスあり／不正解の回数 */
  ng: number
  /** ステージ別の回答回数 */
  byStage: Record<Stage, number>
  /** 最終回答日時（ISO） */
  lastAt: string
}

export type SentenceLog = Record<string, SentenceRecord>

export type Judgement = 'none' | 'solid' | 'almost' | 'shaky' | 'weak'

export const JUDGEMENT_LABEL: Record<Judgement, string> = {
  none: '未判定',
  solid: '定着',
  almost: 'ほぼ定着',
  shaky: 'うろ覚え',
  weak: '苦手',
}

const LOG_KEY = 'etd:sentence-log:v1'
export const RECENT_MAX = 10

export function emptyRecord(): SentenceRecord {
  return { recent: [], ok: 0, ng: 0, byStage: { trace: 0, blank: 0, recall: 0 }, lastAt: '' }
}

export function loadSentenceLog(): SentenceLog {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? (JSON.parse(raw) as SentenceLog) : {}
  } catch {
    return {}
  }
}

function save(log: SentenceLog): void {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(log))
  } catch {
    // ストレージが使えない環境では無視
  }
}

/** 純粋な更新関数（テストしやすいように localStorage を触らない） */
export function applyResult(log: SentenceLog, sentenceId: string, stage: Stage, result: Result, at = new Date()): SentenceLog {
  const prev = log[sentenceId] ?? emptyRecord()
  const recent = [...prev.recent, result].slice(-RECENT_MAX)
  return {
    ...log,
    [sentenceId]: {
      recent,
      ok: prev.ok + (result === 'o' ? 1 : 0),
      ng: prev.ng + (result === 'x' ? 1 : 0),
      byStage: { ...prev.byStage, [stage]: (prev.byStage[stage] ?? 0) + 1 },
      lastAt: at.toISOString(),
    },
  }
}

/** 1 文の結果を記録して保存する */
export function recordSentence(sentenceId: string, stage: Stage, result: Result): SentenceLog {
  const next = applyResult(loadSentenceLog(), sentenceId, stage, result)
  save(next)
  return next
}

/** レベル（または全体）の記録を消す。文 ID は "level:frame:word" 形式 */
export function clearSentenceLog(level?: Level): SentenceLog {
  if (!level) {
    save({})
    return {}
  }
  const log = loadSentenceLog()
  const next = Object.fromEntries(Object.entries(log).filter(([id]) => !id.startsWith(`${level}:`)))
  save(next)
  return next
}

/**
 * 判定。2 回以上答えると判定が付く。
 * 直近 3 回すべて○ → 定着、直近 2 回○ → ほぼ定着、直近 2 回× → 苦手、それ以外 → うろ覚え
 */
export function judge(rec: SentenceRecord | undefined): Judgement {
  if (!rec || rec.recent.length < 2) return 'none'
  const r = rec.recent
  const last = (n: number) => r.slice(-n)
  if (r.length >= 3 && last(3).every((x) => x === 'o')) return 'solid'
  if (last(2).every((x) => x === 'o')) return 'almost'
  if (last(2).every((x) => x === 'x')) return 'weak'
  return 'shaky'
}

export function totalAttempts(rec: SentenceRecord | undefined): number {
  return rec ? rec.ok + rec.ng : 0
}
