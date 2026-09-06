import { useMemo, useState } from 'react'
import { FRAME_GROUPS } from '../data/frame-groups'
import { FRAMES } from '../data/frames'
import { getSentences, type Sentence } from '../data/sentences'
import { LEVELS, LEVEL_IDS, type Level } from '../data/words'
import { loadProgress, progressKey } from '../lib/progress'
import {
  clearSentenceLog,
  judge,
  JUDGEMENT_LABEL,
  loadSentenceLog,
  RECENT_MAX,
  totalAttempts,
  type Judgement,
  type SentenceRecord,
} from '../lib/sentenceLog'
import { STAGES } from '../lib/stages'

interface Props {
  level: Level
  onLevel: (l: Level) => void
  onHome: () => void
}

interface Row {
  sentence: Sentence
  rec: SentenceRecord | undefined
  judgement: Judgement
}

const JUDGE_STYLE: Record<Judgement, string> = {
  none: 'bg-slate-100 text-slate-500',
  solid: 'bg-emerald-100 text-emerald-700',
  almost: 'bg-orange-100 text-orange-700',
  shaky: 'bg-yellow-100 text-yellow-700',
  weak: 'bg-rose-100 text-rose-700',
}

const SUMMARY: { id: Judgement; color: string }[] = [
  { id: 'solid', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  { id: 'almost', color: 'border-orange-200 bg-orange-50 text-orange-700' },
  { id: 'shaky', color: 'border-yellow-200 bg-yellow-50 text-yellow-700' },
  { id: 'weak', color: 'border-rose-200 bg-rose-50 text-rose-700' },
]

type SortKey = 'frame' | 'last' | 'total' | 'judge'

function fmtDate(iso: string): string {
  if (!iso) return '-'
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** 学習ダッシュボード: 文ごとのクリア回数・繰り返し回数・判定 */
export function DashboardScreen({ level, onLevel, onHome }: Props) {
  const [log, setLog] = useState(loadSentenceLog)
  const [progress, setProgress] = useState(loadProgress)
  const [frameFilter, setFrameFilter] = useState<string>('all')
  const [judgeFilter, setJudgeFilter] = useState<'all' | Judgement | 'answered'>('all')
  const [sort, setSort] = useState<SortKey>('frame')

  const rows = useMemo<Row[]>(() => {
    const frames = frameFilter === 'all' ? FRAMES : FRAMES.filter((f) => f.id === frameFilter)
    return frames.flatMap((f) =>
      getSentences(level, f.id).map((sentence) => {
        const rec = log[sentence.id]
        return { sentence, rec, judgement: judge(rec) }
      }),
    )
  }, [level, frameFilter, log])

  const counts = useMemo(() => {
    const c: Record<Judgement, number> = { none: 0, solid: 0, almost: 0, shaky: 0, weak: 0 }
    let answered = 0
    for (const r of rows) {
      c[r.judgement] += 1
      if (r.rec) answered += 1
    }
    return { ...c, answered, total: rows.length }
  }, [rows])

  const visible = useMemo(() => {
    let list = rows
    if (judgeFilter === 'answered') list = list.filter((r) => r.rec)
    else if (judgeFilter !== 'all') list = list.filter((r) => r.judgement === judgeFilter)
    const order: Record<Judgement, number> = { weak: 0, shaky: 1, almost: 2, solid: 3, none: 4 }
    return [...list].sort((a, b) => {
      if (sort === 'last') return (b.rec?.lastAt ?? '').localeCompare(a.rec?.lastAt ?? '')
      if (sort === 'total') return totalAttempts(b.rec) - totalAttempts(a.rec)
      if (sort === 'judge') return order[a.judgement] - order[b.judgement]
      return 0
    })
  }, [rows, judgeFilter, sort])

  const refresh = () => {
    setLog(loadSentenceLog())
    setProgress(loadProgress())
  }

  const clearLevel = () => {
    if (window.confirm(`${LEVELS[level].label}の文ごとの記録をすべて削除しますか？`)) {
      setLog(clearSentenceLog(level))
    }
  }

  const pct = (n: number) => (counts.total ? Math.round((n / counts.total) * 100) : 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500">DASHBOARD</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">学習ダッシュボード</h1>
        </div>
        <button
          type="button"
          onClick={onHome}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200/70"
        >
          ← 型をえらぶ
        </button>
      </header>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl bg-slate-200 p-1">
            {LEVEL_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onLevel(id)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                  level === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {LEVELS[id].label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            型
            <select
              value={frameFilter}
              onChange={(e) => setFrameFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-mono text-sm text-slate-800"
            >
              <option value="all">すべて</option>
              {FRAME_GROUPS.map((g) => (
                <optgroup key={g.id} label={g.label}>
                  {g.frames.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.tpl}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            表示
            <select
              value={judgeFilter}
              onChange={(e) => setJudgeFilter(e.target.value as typeof judgeFilter)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800"
            >
              <option value="all">すべての文</option>
              <option value="answered">回答済みのみ</option>
              {SUMMARY.map((s) => (
                <option key={s.id} value={s.id}>
                  {JUDGEMENT_LABEL[s.id]}のみ
                </option>
              ))}
              <option value="none">未判定のみ</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            並び順
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800"
            >
              <option value="frame">型の順</option>
              <option value="last">最終回答が新しい順</option>
              <option value="total">回数が多い順</option>
              <option value="judge">苦手な順</option>
            </select>
          </label>

          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={refresh}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-100"
            >
              更新
            </button>
            <button
              type="button"
              onClick={clearLevel}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm text-rose-600 hover:bg-rose-100"
            >
              {LEVELS[level].label}の記録を削除
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 flex flex-wrap gap-3">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <span className="text-2xl font-bold text-slate-900">{counts.answered}</span>
          <span className="ml-1.5 text-sm text-slate-500">/ {counts.total} 文 回答済み</span>
        </div>
        {SUMMARY.map((s) => (
          <div key={s.id} className={`rounded-xl border px-4 py-3 ${s.color}`}>
            <span className="text-2xl font-bold">{counts[s.id]}</span>
            <span className="ml-1.5 text-sm">
              {JUDGEMENT_LABEL[s.id]} ({pct(counts[s.id])}%)
            </span>
          </div>
        ))}
      </section>
      <p className="mt-2 text-xs text-slate-500">
        ※ 各文を 2 回以上答えると判定が付きます。直近 3 回連続○で「定着」、直近 2 回○で「ほぼ定着」、直近 2 回×で「苦手」。
        なぞり・穴埋めはミスなしで打ち切ると○、瞬間英作文は正解・ほぼ正解で○です。
      </p>

      <section className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="px-4 py-2.5 font-semibold">文</th>
              <th className="px-4 py-2.5 font-semibold">直近 {RECENT_MAX} 回</th>
              <th className="px-4 py-2.5 font-semibold text-right">クリア / 回数</th>
              <th className="px-4 py-2.5 font-semibold">ステージ別回数</th>
              <th className="px-4 py-2.5 font-semibold">最終回答</th>
              <th className="px-4 py-2.5 font-semibold">判定</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  該当する文がありません
                </td>
              </tr>
            )}
            {visible.map(({ sentence, rec, judgement }) => (
              <tr key={sentence.id} className="border-t border-slate-100">
                <td className="px-4 py-2">
                  <p className="font-mono text-slate-900">{sentence.en}</p>
                  <p className="text-xs text-slate-500">{sentence.jp}</p>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-1">
                    {Array.from({ length: RECENT_MAX }).map((_, i) => {
                      const r = rec?.recent[i]
                      return (
                        <span
                          key={i}
                          className={`inline-flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${
                            r === 'o'
                              ? 'border-rose-300 bg-white text-rose-500'
                              : r === 'x'
                                ? 'border-slate-300 bg-slate-100 text-slate-500'
                                : 'border-dashed border-slate-200 bg-slate-50'
                          }`}
                        >
                          {r === 'o' ? '○' : r === 'x' ? '×' : ''}
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="px-4 py-2 text-right tabular-nums text-slate-700">
                  {rec ? (
                    <>
                      <span className="font-semibold text-slate-900">{rec.ok}</span>
                      <span className="text-slate-400"> / {totalAttempts(rec)}</span>
                    </>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="px-4 py-2 tabular-nums text-xs text-slate-500">
                  {rec
                    ? STAGES.map((s) => `${s.step}:${rec.byStage[s.id] ?? 0}`).join('  ')
                    : '-'}
                </td>
                <td className="px-4 py-2 tabular-nums text-slate-600">{fmtDate(rec?.lastAt ?? '')}</td>
                <td className="px-4 py-2">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${JUDGE_STYLE[judgement]}`}>
                    {JUDGEMENT_LABEL[judgement]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-slate-600">ドリルの実施回数（{LEVELS[level].label}）</h2>
        <div className="mt-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-semibold">型</th>
                {STAGES.map((s) => (
                  <th key={s.id} className="px-4 py-2.5 font-semibold">
                    Step {s.step} {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FRAMES.map((f) => (
                <tr key={f.id} className="border-t border-slate-100">
                  <td className="px-4 py-2 font-mono text-slate-900">{f.tpl}</td>
                  {STAGES.map((s) => {
                    const rec = progress[progressKey(level, f.id, s.id)]
                    return (
                      <td key={s.id} className="px-4 py-2 tabular-nums text-slate-700">
                        {rec ? (
                          <>
                            <span className="font-semibold">{rec.completed}</span> 回
                            <span className="ml-2 text-xs text-slate-400">
                              最高 {Math.round(rec.bestAccuracy * 100)}% ・ {rec.bestWpm} WPM
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
