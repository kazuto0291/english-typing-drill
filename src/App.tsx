import { useCallback, useState } from 'react'
import { FRAMES } from './data/frames'
import { countSentences } from './data/sentences'
import type { Level } from './data/words'
import { DrillScreen } from './components/drills/DrillScreen'
import { DashboardScreen } from './components/DashboardScreen'
import { HomeScreen } from './components/HomeScreen'
import { ResultScreen, type DrillSummary } from './components/ResultScreen'
import { clearProgress, loadProgress, loadSettings, saveResult, saveSettings, type Settings } from './lib/progress'
import type { Stage } from './lib/stages'
import { wpm } from './lib/typing'
import type { DrillStats } from './lib/useDrillSession'

type View =
  | { kind: 'home' }
  | { kind: 'dashboard' }
  | { kind: 'drill'; stage: Stage; run: number }
  | { kind: 'result'; summary: DrillSummary }

export default function App() {
  const [level, setLevel] = useState<Level>('beginner')
  const [frameId, setFrameId] = useState<string>(FRAMES[0].id)
  const [view, setView] = useState<View>({ kind: 'home' })
  const [progress, setProgress] = useState(loadProgress)
  const [settings, setSettings] = useState(loadSettings)

  const updateSettings = (s: Settings) => {
    setSettings(s)
    saveSettings(s)
  }

  const start = (stage: Stage) => setView({ kind: 'drill', stage, run: Date.now() })
  const goHome = useCallback(() => setView({ kind: 'home' }), [])

  const finish = useCallback(
    (stage: Stage) => (stats: DrillStats) => {
      const total = stats.totalChars
      const accuracy =
        stage === 'recall'
          ? 1 - stats.sentenceErrors / Math.max(1, sentenceTotal(level, frameId))
          : stats.keystrokes === 0
            ? 1
            : (stats.keystrokes - stats.mistakes) / stats.keystrokes
      const summary: DrillSummary = {
        ...stats,
        level,
        frameId,
        stage,
        total: sentenceTotal(level, frameId),
        accuracy: Math.max(0, accuracy),
        wpm: wpm(total, stats.elapsedMs),
      }
      setProgress(saveResult(level, frameId, stage, summary))
      setView({ kind: 'result', summary })
    },
    [level, frameId],
  )

  if (view.kind === 'drill') {
    return (
      <DrillScreen
        key={`${level}/${frameId}/${view.stage}/${view.run}`}
        level={level}
        frameId={frameId}
        stage={view.stage}
        shuffle={settings.shuffle}
        speech={settings.speech}
        onExit={goHome}
        onFinish={finish(view.stage)}
      />
    )
  }

  if (view.kind === 'dashboard') {
    return <DashboardScreen level={level} onLevel={setLevel} onHome={goHome} />
  }

  if (view.kind === 'result') {
    return (
      <ResultScreen
        summary={view.summary}
        onRetry={() => start(view.summary.stage)}
        onNextStage={start}
        onHome={goHome}
      />
    )
  }

  return (
    <HomeScreen
      level={level}
      frameId={frameId}
      progress={progress}
      settings={settings}
      onLevel={setLevel}
      onFrame={setFrameId}
      onSettings={updateSettings}
      onStart={start}
      onDashboard={() => setView({ kind: 'dashboard' })}
      onClearProgress={() => setProgress(clearProgress())}
    />
  )
}

function sentenceTotal(level: Level, frameId: string): number {
  return countSentences(level, frameId)
}
