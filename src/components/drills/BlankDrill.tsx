import { useEffect, useState } from 'react'
import type { Sentence } from '../../data/sentences'
import { TypingLine } from '../TypingLine'
import { useTypedInput } from './useTypedInput'

interface Props {
  sentence: Sentence
  onKeystroke: (correct: boolean) => void
  onComplete: () => void
}

/** ステージ 2: 型は見せて ___ の部分だけ打つ */
export function BlankDrill({ sentence, onKeystroke, onComplete }: Props) {
  const [hint, setHint] = useState(false)
  const { typed, focused, done, missed, inputProps, focus } = useTypedInput({
    target: sentence.slot,
    onKeystroke,
    onComplete,
  })

  useEffect(() => setHint(false), [sentence.id])

  return (
    <div className="relative cursor-text select-none" onClick={focus}>
      <input {...inputProps} />
      <p className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-wide">{sentence.jp}</p>
      <p className="mt-1 text-sm text-slate-500">
        ___ に入るのは <span className="font-medium text-slate-700">{sentence.wordJp}</span>
        <span className="text-slate-400">（{sentence.slot.length} 文字）</span>
      </p>
      <div
        className={`mt-8 rounded-2xl border-2 bg-white px-6 py-6 font-mono text-3xl sm:text-4xl leading-relaxed transition-colors ${
          done
            ? 'border-emerald-400 bg-emerald-50'
            : missed
              ? 'miss-shake border-rose-400 bg-rose-50'
              : focused
                ? 'border-indigo-300'
                : 'border-slate-200'
        }`}
      >
        <span className="text-slate-900 whitespace-pre">{sentence.prefix}</span>
        <span className="inline-block min-w-[2ch] rounded-md bg-indigo-50 px-1">
          <TypingLine target={sentence.slot} typed={typed} ghost={hint} active={!done && focused} />
        </span>
        <span className="text-slate-900 whitespace-pre">{sentence.suffix}</span>
        <p className="mt-3 text-base sm:text-lg font-sans text-slate-500 tracking-wider">
          <span className="mr-2 text-xs text-slate-400">読み</span>
          {sentence.kana}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-4 text-sm">
        {!done && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setHint(true)
              focus()
            }}
            className="text-indigo-600 hover:underline"
          >
            ヒントを見る
          </button>
        )}
        {!focused && !done && <span className="text-amber-600">クリックして入力を再開（半角英数）</span>}
      </div>
    </div>
  )
}
