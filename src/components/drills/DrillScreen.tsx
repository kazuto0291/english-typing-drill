import { useCallback, useEffect, useMemo } from 'react'
import { FRAME_KANA } from '../../data/readings'
import { getFrame, getSentences } from '../../data/sentences'
import { LEVELS, type Level } from '../../data/words'
import { getStage, type Stage } from '../../lib/stages'
import { speak } from '../../lib/speech'
import { useDrillSession, type DrillStats } from '../../lib/useDrillSession'
import { GrammarCard } from '../GrammarCard'
import { BlankDrill } from './BlankDrill'
import { RecallDrill } from './RecallDrill'
import { TraceDrill } from './TraceDrill'

interface Props {
  level: Level
  frameId: string
  stage: Stage
  shuffle: boolean
  speech: boolean
  onExit: () => void
  onFinish: (stats: DrillStats) => void
}

export function DrillScreen({ level, frameId, stage, shuffle, speech, onExit, onFinish }: Props) {
  const sentences = useMemo(() => getSentences(level, frameId), [level, frameId])
  const session = useDrillSession(sentences, shuffle)
  const frame = getFrame(frameId)
  const stageInfo = getStage(stage)

  useEffect(() => {
    if (session.finished) onFinish(session.finished)
  }, [session.finished, onFinish])

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onExit])

  const current = session.current
  const handleComplete = useCallback(() => {
    if (speech && current) speak(current.en)
    session.advance()
  }, [speech, current, session])

  const handleRecallResult = useCallback(
    (v: 'correct' | 'lenient' | 'wrong') => {
      session.recordSentence(v)
      if (speech && current) speak(current.en)
    },
    [session, speech, current],
  )

  if (!current) return null
  const pct = Math.round((session.index / session.total) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200/70"
        >
          ← 戻る <span className="text-slate-400">(Esc)</span>
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-slate-700">{LEVELS[level].label}</span>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
            Step {stageInfo.step} {stageInfo.label}
          </span>
        </div>
      </header>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-lg text-slate-700">
            {frame.tpl}
            <span className="ml-3 font-sans text-sm text-slate-400 tracking-wider">{FRAME_KANA[frame.id]}</span>
          </p>
          <p className="text-sm text-slate-500">
            {session.index + 1} / {session.total}
          </p>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <main className="mt-10">
        {stage === 'trace' && (
          <TraceDrill
            key={current.id}
            sentence={current}
            onKeystroke={session.recordKeystroke}
            onComplete={handleComplete}
          />
        )}
        {stage === 'blank' && (
          <BlankDrill
            key={current.id}
            sentence={current}
            onKeystroke={session.recordKeystroke}
            onComplete={handleComplete}
          />
        )}
        {stage === 'recall' && (
          <RecallDrill
            key={current.id}
            sentence={current}
            onResult={handleRecallResult}
            onComplete={session.advance}
          />
        )}
      </main>

      <GrammarCard frame={frame} />
    </div>
  )
}
