import { useCallback, useEffect, useRef, useState } from 'react'
import type { Sentence } from '../data/sentences'
import { shuffle } from './typing'

export interface DrillStats {
  /** 打鍵数（ステージ 1・2） */
  keystrokes: number
  /** ミスタイプ数（ステージ 1・2） */
  mistakes: number
  /** 文単位の不正解数（ステージ 3） */
  sentenceErrors: number
  /** 「ほぼ正解」の数（ステージ 3） */
  lenient: number
  elapsedMs: number
  totalChars: number
}

export function useDrillSession(sentences: Sentence[], shuffleOn: boolean) {
  const [order] = useState(() => (shuffleOn ? shuffle(sentences) : sentences))
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState<DrillStats | null>(null)
  const counters = useRef({ keystrokes: 0, mistakes: 0, sentenceErrors: 0, lenient: 0 })
  const startedAt = useRef<number>(Date.now())

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const recordKeystroke = useCallback((correct: boolean) => {
    counters.current.keystrokes += 1
    if (!correct) counters.current.mistakes += 1
  }, [])

  const recordSentence = useCallback((result: 'correct' | 'lenient' | 'wrong') => {
    if (result === 'wrong') counters.current.sentenceErrors += 1
    if (result === 'lenient') counters.current.lenient += 1
  }, [])

  const advance = useCallback(() => {
    setIndex((i) => {
      if (i + 1 >= order.length) {
        setFinished({
          ...counters.current,
          elapsedMs: Date.now() - startedAt.current,
          totalChars: order.reduce((n, s) => n + s.en.length, 0),
        })
        return i
      }
      return i + 1
    })
  }, [order])

  return {
    order,
    index,
    current: order[index],
    total: order.length,
    finished,
    recordKeystroke,
    recordSentence,
    advance,
  }
}
