import { getFrame } from '../data/sentences'
import { LEVELS, type Level } from '../data/words'
import { getStage, nextStage, type Stage } from '../lib/stages'
import type { DrillStats } from '../lib/useDrillSession'

export interface DrillSummary extends DrillStats {
  level: Level
  frameId: string
  stage: Stage
  total: number
  accuracy: number
  wpm: number
}

interface Props {
  summary: DrillSummary
  onRetry: () => void
  onNextStage: (stage: Stage) => void
  onHome: () => void
}

export function ResultScreen({ summary, onRetry, onNextStage, onHome }: Props) {
  const frame = getFrame(summary.frameId)
  const stage = getStage(summary.stage)
  const next = nextStage(summary.stage)
  const sec = Math.round(summary.elapsedMs / 1000)
  const pct = Math.round(summary.accuracy * 100)
  const grade = pct >= 98 ? 'S' : pct >= 90 ? 'A' : pct >= 80 ? 'B' : 'C'

  const stats: { label: string; value: string }[] = [
    { label: '正確さ', value: `${pct}%` },
    { label: '速さ', value: `${summary.wpm} WPM` },
    { label: '時間', value: `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}` },
    summary.stage === 'recall'
      ? { label: '不正解', value: `${summary.sentenceErrors} / ${summary.total} 文` }
      : { label: 'ミスタイプ', value: `${summary.mistakes} / ${summary.keystrokes} 打` },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500">RESULT</p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900">
        {LEVELS[summary.level].label} ・ <span className="font-mono">{frame.tpl}</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Step {stage.step} {stage.label} ・ {summary.total} 文
      </p>

      <div className="mt-8 flex items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-5xl font-bold text-white">
          {grade}
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-slate-500">{s.label}</dt>
              <dd className="text-xl font-semibold text-slate-900">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      {summary.stage === 'recall' && summary.lenient > 0 && (
        <p className="mt-2 text-xs text-amber-600">「ほぼ正解」{summary.lenient} 文は正解として数えています。</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          もう一度
        </button>
        {next && (
          <button
            type="button"
            onClick={() => onNextStage(next)}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Step {getStage(next).step} {getStage(next).label} へ進む →
          </button>
        )}
        <button
          type="button"
          onClick={onHome}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200/70"
        >
          型をえらぶ
        </button>
      </div>
    </div>
  )
}
