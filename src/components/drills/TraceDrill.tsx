import type { Sentence } from '../../data/sentences'
import { TypingLine } from '../TypingLine'
import { useTypedInput } from './useTypedInput'

interface Props {
  sentence: Sentence
  onKeystroke: (correct: boolean) => void
  onComplete: () => void
}

/** ステージ 1: 薄い英文をなぞる */
export function TraceDrill({ sentence, onKeystroke, onComplete }: Props) {
  const { typed, focused, done, missed, inputProps, focus } = useTypedInput({
    target: sentence.en,
    onKeystroke,
    onComplete,
  })

  return (
    <div className="relative cursor-text select-none" onClick={focus}>
      <input {...inputProps} />
      <p className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-wide">{sentence.jp}</p>
      <p className="mt-1 text-sm text-slate-500">
        <span className="font-mono text-indigo-600">{sentence.word}</span>
        <span className="mx-1.5 text-slate-300">/</span>
        {sentence.wordJp}
      </p>
      <div
        className={`mt-8 rounded-2xl border-2 bg-white px-6 py-6 text-3xl sm:text-4xl transition-colors ${
          done
            ? 'border-emerald-400 bg-emerald-50'
            : missed
              ? 'miss-shake border-rose-400 bg-rose-50'
              : focused
                ? 'border-indigo-300'
                : 'border-slate-200'
        }`}
      >
        <TypingLine target={sentence.en} typed={typed} ghost active={!done && focused} />
        <p className="mt-3 text-base sm:text-lg font-sans text-slate-500 tracking-wider">
          <span className="mr-2 text-xs text-slate-400">読み</span>
          {sentence.kana}
        </p>
      </div>
      {!focused && !done && (
        <p className="mt-3 text-sm text-amber-600">クリックして入力を再開（半角英数で入力してください）</p>
      )}
    </div>
  )
}
