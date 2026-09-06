import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CompositionEvent } from 'react'
import { isExact, isNewCharCorrect } from '../../lib/typing'

interface Options {
  target: string
  onKeystroke: (correct: boolean) => void
  onComplete: () => void
  /** 完了後に次へ進むまでの待ち時間 */
  delayMs?: number
}

/** 隠し input で 1 文字ずつ入力を受け取り、目標文字列と照合するフック */
export function useTypedInput({ target, onKeystroke, onComplete, delayMs = 400 }: Options) {
  const [typed, setTyped] = useState('')
  const [focused, setFocused] = useState(true)
  const [done, setDone] = useState(false)
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

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (done) return
      const next = e.target.value
      if (composing.current) {
        setTyped(next)
        return
      }
      if (next.length > typed.length) {
        onKeystroke(isNewCharCorrect(target, typed, next))
      }
      setTyped(next)
      if (isExact(target, next)) setDone(true)
    },
    [done, typed, target, onKeystroke],
  )

  const onCompositionStart = useCallback(() => {
    composing.current = true
  }, [])

  const onCompositionEnd = useCallback(
    (e: CompositionEvent<HTMLInputElement>) => {
      composing.current = false
      const next = e.currentTarget.value
      setTyped(next)
      if (isExact(target, next)) setDone(true)
    },
    [target],
  )

  const focus = useCallback(() => inputRef.current?.focus(), [])

  const inputProps = {
    ref: inputRef,
    value: typed,
    onChange,
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

  return { typed, focused, done, inputProps, focus }
}
