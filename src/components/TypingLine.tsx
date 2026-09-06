import { diffChars, normalize } from '../lib/typing'

interface Props {
  target: string
  typed: string
  /** 未入力の文字を薄く表示するか（false なら下線だけ） */
  ghost?: boolean
  active?: boolean
  className?: string
}

/** 目標文字列を 1 文字ずつ、入力状況に応じて色分けして表示する */
export function TypingLine({ target, typed, ghost = true, active = true, className = '' }: Props) {
  const cells = diffChars(target, typed)
  const caret = Math.min(normalize(typed).length, target.length)

  return (
    <span className={`font-mono whitespace-pre-wrap leading-relaxed ${className}`} aria-label={target}>
      {cells.map((c, i) => {
        const isSpace = c.char === ' '
        let cls = ''
        if (c.state === 'correct') cls = 'text-slate-900'
        else if (c.state === 'wrong') cls = 'text-rose-600 bg-rose-100 rounded-sm'
        else if (ghost) cls = 'text-slate-300'
        else cls = 'text-transparent border-b-2 border-slate-300'
        const showCaret = active && i === caret
        return (
          <span key={i} className={`relative ${cls} ${isSpace && !ghost && c.state === 'pending' ? 'border-b-0 mx-1' : ''}`}>
            {showCaret && <span className="caret absolute -left-px top-1 bottom-1 w-0.5 bg-indigo-500" />}
            {isSpace ? ' ' : c.char}
          </span>
        )
      })}
      {active && caret >= target.length && (
        <span className="caret inline-block w-0.5 h-[1em] align-middle bg-indigo-500" />
      )}
    </span>
  )
}
