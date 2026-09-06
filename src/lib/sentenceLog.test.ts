import { describe, expect, it } from 'vitest'
import { applyResult, judge, RECENT_MAX, totalAttempts, type SentenceLog } from './sentenceLog'

function build(results: ('o' | 'x')[]): SentenceLog {
  return results.reduce<SentenceLog>((log, r) => applyResult(log, 's', 'trace', r), {})
}

describe('sentenceLog', () => {
  it('回数・直近の結果・ステージ別回数を積み上げる', () => {
    let log = applyResult({}, 'beginner:wanna:go', 'trace', 'o', new Date('2026-09-06T00:00:00Z'))
    log = applyResult(log, 'beginner:wanna:go', 'recall', 'x', new Date('2026-09-06T01:00:00Z'))
    const rec = log['beginner:wanna:go']
    expect(rec.ok).toBe(1)
    expect(rec.ng).toBe(1)
    expect(rec.recent).toEqual(['o', 'x'])
    expect(rec.byStage).toEqual({ trace: 1, blank: 0, recall: 1 })
    expect(rec.lastAt).toBe('2026-09-06T01:00:00.000Z')
    expect(totalAttempts(rec)).toBe(2)
  })

  it('直近の結果は最大 10 件だけ残す', () => {
    const rec = build(Array(15).fill('o'))['s']
    expect(rec.recent).toHaveLength(RECENT_MAX)
    expect(rec.ok).toBe(15)
  })

  it('判定のルール', () => {
    expect(judge(undefined)).toBe('none')
    expect(judge(build(['o'])['s'])).toBe('none')
    expect(judge(build(['o', 'o'])['s'])).toBe('almost')
    expect(judge(build(['o', 'o', 'o'])['s'])).toBe('solid')
    expect(judge(build(['x', 'o', 'o', 'o'])['s'])).toBe('solid')
    expect(judge(build(['x', 'x'])['s'])).toBe('weak')
    expect(judge(build(['o', 'x'])['s'])).toBe('shaky')
    expect(judge(build(['x', 'o'])['s'])).toBe('shaky')
    expect(judge(build(['o', 'o', 'x', 'o'])['s'])).toBe('shaky')
  })
})
