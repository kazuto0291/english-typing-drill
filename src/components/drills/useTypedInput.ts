import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type CompositionEvent,
  type KeyboardEvent,
} from 'react'
import { isExact, normalize } from '../../lib/typing'

interface Options {
  target: string
  onKeystroke: (correct: boolean) => void
  onComplete: () => void
  /** 完了後に次へ進むまでの待ち時間 */
  delayMs?: number
}

/** 入力候補のうち、目標文字列の先頭と一致する最長の部分を返す */
function acceptedPrefix(target: string, candidate: string): string {
  const c = normalize(candidate)
  let i = 0
  while (i < c.length && i < target.length && c[i] === target[i]) i++
  return c.slice(0, i)
}

const CARET_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'])

/**
 * 隠し input で 1 文字ずつ入力を受け取り、目標文字列と照合するフック。
 * 間違った文字は受け付けず（入力欄に残らず）、ミスとして数えるだけ。
 */
export function useTypedInput({ target, onKeystroke, onComplete, delayMs = 400 }: Options) {
  const [typed, setTyped] = useState('')
  const [focused, setFocused] = useState(true)
  const [done, setDone] = useState(false)
  const [missTick, setMissTick] = useState(0)
  const [missed, setMissed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const composing = useRef(false)

  // 目標が変わったらリセット
  useEffect(() => {
    setTyped('')
    setDone(false)
    inputRef.current?.focus()
  }, [target])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(onComplete, delayMs)
    return () => clearTimeout(t)
  }, [done, onComplete, delayMs])

  // ミス時に短く赤く揺らす
  useEffect(() => {
    if (missTick === 0) return
    setMissed(true)
    const t = setTimeout(() => setMissed(false), 220)
    return () => clearTimeout(t)
  }, [missTick])

  const apply = useCallback(
    (candidate: string) => {
      if (done) return
      const prev = typed
      if (candidate.length < prev.length) {
        // Backspace などの削除はそのまま受け付ける
        setTyped(normalize(candidate))
        return
      }
      const accepted = acceptedPrefix(target, candidate)
      const added = accepted.length - prev.length
      for (let i = 0; i < added; i++) onKeystroke(true)
      if (normalize(candidate).length > accepted.length) {
        onKeystroke(false)
        setMissTick((n) => n + 1)
      }
      setTyped(accepted)
      if (isExact(target, accepted)) setDone(true)
    },
    [done, typed, target, onKeystroke],
  )

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (composing.current) {
        setTyped(e.target.value)
        return
      }
      apply(e.target.value)
    },
    [apply],
  )

  const onCompositionStart = useCallback(() => {
    composing.current = true
  }, [])

  const onCompositionEnd = useCallback(
    (e: CompositionEvent<HTMLInputElement>) => {
      composing.current = false
      apply(e.currentTarget.value)
    },
    [apply],
  )

  // カーソル移動キーは無効化して常に末尾に固定する
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (CARET_KEYS.has(e.key)) e.preventDefault()
  }, [])

  const onPaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }, [])

  const focus = useCallback(() => inputRef.current?.focus(), [])

  const inputProps = {
    ref: inputRef,
    value: typed,
    onChange,
    onKeyDown,
    onPaste,
    onCompositionStart,
    onCompositionEnd,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    autoFocus: true,
    autoComplete: 'off',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    spellCheck: false,
    'aria-label': 'タイピング入力',
    className: 'absolute opacity-0 w-px h-px -z-10',
  } as const

  return { typed, focused, done, missed, inputProps, focus }
}
