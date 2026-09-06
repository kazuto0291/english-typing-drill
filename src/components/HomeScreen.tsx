import { FRAMES, SLOT_LABEL } from '../data/frames'
import { FRAME_KANA } from '../data/readings'
import { countSentences } from '../data/sentences'
import { LEVELS, LEVEL_IDS, type Level } from '../data/words'
import { progressKey, type ProgressMap, type Settings } from '../lib/progress'
import { STAGES, type Stage } from '../lib/stages'

interface Props {
  level: Level
  frameId: string
  progress: ProgressMap
  settings: Settings
  onLevel: (l: Level) => void
  onFrame: (id: string) => void
  onSettings: (s: Settings) => void
  onStart: (stage: Stage) => void
  onClearProgress: () => void
}

export function HomeScreen({
  level,
  frameId,
  progress,
  settings,
  onLevel,
  onFrame,
  onSettings,
  onStart,
  onClearProgress,
}: Props) {
  const frame = FRAMES.find((f) => f.id === frameId)!
  const total = FRAMES.reduce((n, f) => n + countSentences(level, f.id), 0)
  const doneCount = Object.entries(progress).filter(([k, v]) => k.startsWith(`${level}/`) && v.completed > 0).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500">ENGLISH TYPING DRILL</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
          100単語で1000文 <span className="text-indigo-600">タイピング英作文</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          10 の型 × 100 語の文を、なぞり → 穴埋め → 瞬間英作文の 3 段階でタイピング練習。
        </p>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
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
        <p className="text-sm text-slate-500">
          全 {total} 文 ／ 完了 {doneCount} / {FRAMES.length * STAGES.length} ドリル
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="text-sm font-semibold text-slate-600">型をえらぶ（全 {FRAMES.length} 種）</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {FRAMES.map((f, i) => {
              const selected = f.id === frameId
              const n = countSentences(level, f.id)
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => onFrame(f.id)}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-left transition ${
                      selected ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-base font-semibold text-slate-900">
                          <span className="mr-2 text-xs text-slate-400">{i + 1}</span>
                          {f.tpl}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-500">{f.jp}</p>
                        <p className="mt-0.5 text-xs text-slate-400 tracking-wider">{FRAME_KANA[f.id]}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        {SLOT_LABEL[f.slot]} {n} 文
                      </span>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {STAGES.map((s) => {
                        const rec = progress[progressKey(level, f.id, s.id)]
                        const done = rec && rec.completed > 0
                        return (
                          <span
                            key={s.id}
                            title={`Step ${s.step} ${s.label}${done ? `: 最高 ${Math.round(rec.bestAccuracy * 100)}%` : ''}`}
                            className={`h-1.5 flex-1 rounded-full ${done ? 'bg-emerald-400' : 'bg-slate-200'}`}
                          />
                        )
                      })}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">えらんだ型</p>
            <p className="mt-1 font-mono text-lg font-semibold text-slate-900">{frame.tpl}</p>
            <p className="text-sm text-slate-500">
              {frame.jp} ・ {countSentences(level, frame.id)} 文
            </p>

            <h3 className="mt-5 text-sm font-semibold text-slate-600">ステージをえらんで開始</h3>
            <ul className="mt-2 space-y-2">
              {STAGES.map((s) => {
                const rec = progress[progressKey(level, frame.id, s.id)]
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onStart(s.id)}
                      className="group w-full rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-indigo-400 hover:bg-indigo-50"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">
                          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                            {s.step}
                          </span>
                          {s.label}
                          <span className="ml-1.5 text-xs font-normal text-slate-400">{s.en}</span>
                        </p>
                        <span className="text-indigo-500 opacity-0 transition group-hover:opacity-100">開始 →</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.desc}</p>
                      {rec && rec.completed > 0 && (
                        <p className="mt-1 text-xs text-emerald-600">
                          {rec.completed} 回完了 ・ 最高 {Math.round(rec.bestAccuracy * 100)}% ・ {rec.bestWpm} WPM
                        </p>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <h3 className="mt-5 text-sm font-semibold text-slate-600">設定</h3>
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.shuffle}
                  onChange={(e) => onSettings({ ...settings, shuffle: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600"
                />
                出題順をシャッフル
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.speech}
                  onChange={(e) => onSettings({ ...settings, speech: e.target.checked })}
                  className="h-4 w-4 accent-indigo-600"
                />
                完了した英文を読み上げる
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('学習記録をすべて消去しますか？')) onClearProgress()
            }}
            className="mt-3 text-xs text-slate-400 hover:text-rose-500"
          >
            学習記録をリセット
          </button>
        </aside>
      </div>

      <footer className="mt-10 text-xs text-slate-400">
        文データは
        <a
          href="https://hina-english-417a36.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="mx-1 underline hover:text-slate-600"
        >
          100単語で1000文 作文マシン
        </a>
        の型・単語をもとにしています。個人学習用。
      </footer>
    </div>
  )
}
