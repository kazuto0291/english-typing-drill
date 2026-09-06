import { useState } from 'react'
import type { Frame } from '../data/frames'
import { GRAMMAR } from '../data/grammar'
import { FRAME_KANA } from '../data/readings'

const OPEN_KEY = 'etd:grammar-open'

function loadOpen(): boolean {
  try {
    return localStorage.getItem(OPEN_KEY) !== '0'
  } catch {
    return true
  }
}

interface Props {
  frame: Frame
}

/** 型ごとの文法解説（入力欄の下に表示） */
export function GrammarCard({ frame }: Props) {
  const [open, setOpen] = useState(loadOpen)
  const note = GRAMMAR[frame.id]
  if (!note) return null

  const toggle = () => {
    const next = !open
    setOpen(next)
    try {
      localStorage.setItem(OPEN_KEY, next ? '1' : '0')
    } catch {
      // ignore
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <span className="text-sm font-semibold text-slate-700">
          <span className="mr-2 rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700">文法</span>
          <span className="font-mono">{frame.tpl}</span>
          <span className="ml-2 font-normal text-slate-500">{frame.jp}</span>
        </span>
        <span className="text-xs text-slate-400">{open ? '隠す ▲' : '表示 ▼'}</span>
      </button>

      {open && (
        <div className="space-y-5 border-t border-slate-100 px-5 py-5 text-sm leading-relaxed text-slate-700">
          <p>
            <span className="mr-2 text-xs text-slate-400">読み</span>
            <span className="tracking-wider text-slate-500">{FRAME_KANA[frame.id]}</span>
          </p>
          <p>{note.meaning}</p>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-indigo-600">使う場面</h4>
            <ul className="list-disc space-y-1 pl-5">
              {note.scenes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-indigo-600">例文</h4>
            <ul className="space-y-1.5">
              {note.examples.map((ex) => (
                <li key={ex.en} className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-slate-900">{ex.en}</span>
                  <span className="text-slate-500">{ex.jp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-indigo-600">注意点</h4>
            <ul className="list-disc space-y-1 pl-5">
              {note.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {note.polite && (
            <p className="rounded-lg bg-slate-50 px-3 py-2">
              <span className="mr-2 text-xs font-semibold text-slate-500">丁寧に言うなら</span>
              {note.polite}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
