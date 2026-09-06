import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Sentence } from '../../data/sentences'
import { isExact, isLenientMatch, normalize } from '../../lib/typing'
import { TypingLine } from '../TypingLine'

type Verdict = 'correct' | 'lenient' | 'wrong'

interface Props {
  sentence: Sentence
  onResult: (verdict: Verdict) => void
  onComplete: () => void
}

/** ステージ 3: 日本語だけを見て英文を丸ごと打つ */
export function RecallDrill({ sentence, onResult, onComplete }: Props) {
  const [typed, setTyped] = useState('')
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const composing = useRef(false)

  useEffect(() => {
    setTyped('')
    setVerdict(null)
    inputRef.current?.focus()
  }, [sentence.id])

  const check = () => {
    if (verdict) {
      onComplete()
      return
    }
    const v: Verdict = isExact(sentence.en, typed)
      ? 'correct'
      : isLenientMatch(sentence.en, typed)
        ? 'lenient'
        : 'wrong'
    setVerdict(v)
    onResult(v)
  }

  const reveal = () => {
    if (verdict) return
    setVerdict('wrong')
    onResult('wrong')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !composing.current) {
      e.preventDefault()
      check()
    }
  }

  const tone =
    verdict === 'correct'
      ? 'border-emerald-400 bg-emerald-50'
      : verdict === 'lenient'
        ? 'border-amber-400 bg-amber-50'
        : verdict === 'wrong'
          ? 'border-rose-400 bg-rose-50'
          : 'border-indigo-300 bg-white focus-within:border-indigo-500'

  return (
    <div>
      <p className="text-3xl sm:text-4xl font-semibold text-slate-800 tracking-wide">{sentence.jp}</p>
      <p className="mt-1 text-sm text-slate-500">日本語を見て、英文を丸ごと入力して Enter</p>

      <div className={`mt-8 rounded-2xl border-2 px-5 py-4 transition-colors ${tone}`}>
        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={onKeyDown}
          onCompositionStart={() => (composing.current = true)}
          onCompositionEnd={() => (composing.current = false)}
          readOnly={verdict !== null}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Type in English..."
          aria-label="英文入力"
          className="w-full bg-transparent font-mono text-2xl sm:text-3xl text-slate-900 outline-none placeholder:text-slate-300"
        />
      </div>

      {verdict === null ? (
        <div className="mt-3 flex items-center gap-4 text-sm">
          <button type="button" onClick={reveal} className="text-indigo-600 hover:underline">
            答えを見る（不正解扱い）
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <p
            className={`text-sm font-semibold ${
              verdict === 'correct' ? 'text-emerald-600' : verdict === 'lenient' ? 'text-amber-600' : 'text-rose-600'
            }`}
          >
            {verdict === 'correct' && '正解！'}
            {verdict === 'lenient' && 'ほぼ正解（大文字・句読点を確認）'}
            {verdict === 'wrong' && '不正解。正しい英文はこちら：'}
          </p>
          <div className="rounded-xl bg-white border border-slate-200 px-5 py-4 text-2xl sm:text-3xl">
            <TypingLine target={sentence.en} typed={normalize(typed)} ghost active={false} />
          </div>
          <p className="text-sm text-slate-500">
            <span className="font-mono text-indigo-600">{sentence.word}</span>
            <span className="mx-1.5 text-slate-300">/</span>
            {sentence.wordJp}
            <span className="ml-4 text-slate-400">Enter で次へ</span>
          </p>
        </div>
      )}
    </div>
  )
}
