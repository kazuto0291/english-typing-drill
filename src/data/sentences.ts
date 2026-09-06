import { FRAMES, type Frame } from './frames'
import { LEVELS, type Level } from './words'
import { ARTICLE_BY_FRAME, JP_TEMPLATE, OBJ_VERBS } from './translations'
import { sentenceKana, slotKana } from './readings'
import { findExtraDef } from './frame-defs'

export interface Sentence {
  id: string
  level: Level
  frameId: string
  /** 差しこむ単語（原形） */
  word: string
  wordJp: string
  /** 100語中の番号 */
  n: number
  /** 完成した英文 */
  en: string
  /** 日本語訳 */
  jp: string
  /** 型の前半（例: "Can I get "） */
  prefix: string
  /** 穴に入る部分（例: "a coffee"） */
  slot: string
  /** 型の後半（例: "?"） */
  suffix: string
  /** 完成文のカタカナ読み */
  kana: string
  /** 穴に入る部分のカタカナ読み */
  slotKana: string
}

export function getFrame(frameId: string): Frame {
  const frame = FRAMES.find((f) => f.id === frameId)
  if (!frame) throw new Error(`unknown frame: ${frameId}`)
  return frame
}

/** 参照サイトと同じロジックで「型 × 単語」の文リストを作る */
export function getSentences(level: Level, frameId: string): Sentence[] {
  const frame = getFrame(frameId)
  const data = LEVELS[level]
  const ok = new Set(data.ok[frame.id] ?? [])
  const [prefix, suffix] = frame.tpl.split('___')

  return data.words
    .map(([en, jp, pos], i) => ({ en, jp, pos, n: i + 1 }))
    .filter((w) => w.pos === frame.slot && ok.has(w.en))
    .map((w) => {
      const article = ARTICLE_BY_FRAME[frame.id]?.[w.en] ?? ''
      const objIt = frame.slot === 'verb' && OBJ_VERBS.includes(w.en) ? 'it' : ''
      // 型ごとに指定した形（活用形や you 付き）があればそれを優先する
      const form = findExtraDef(frame.id)?.wordForm?.[w.en]
      const slot = form ?? [article, w.en, objIt].filter(Boolean).join(' ')
      return {
        id: `${level}:${frame.id}:${w.en}`,
        level,
        frameId: frame.id,
        word: w.en,
        wordJp: w.jp,
        n: w.n,
        en: `${prefix}${slot}${suffix}`,
        jp: JP_TEMPLATE[frame.id](w.jp, w.en),
        prefix,
        slot,
        suffix,
        kana: sentenceKana(frame.id, slot),
        slotKana: slotKana(slot),
      }
    })
}

export function countSentences(level: Level, frameId: string): number {
  return getSentences(level, frameId).length
}
