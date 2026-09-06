import type { Frame } from '../frames'
import type { GrammarNote } from '../grammar'
import type { Level } from '../words'

/**
 * 追加の型を 1 ファイルにまとめる定義。
 * 型・使える単語・日本語訳の規則・読み・冠詞・文法解説をひとまとめにする。
 */
export interface FrameDef {
  frame: Frame
  /** レベルごとに、この型に差し込める単語 */
  ok: Record<Level, string[]>
  /** 完成文の日本語訳。w = 単語の日本語、en = 単語の英語 */
  jp: (w: string, en: string) => string
  /** 型のカタカナ読み（___ の位置に単語の読みが入る） */
  kana: string
  /** 単語の前に付ける冠詞など（例: coffee → a, seat → my） */
  articles?: Record<string, string>
  /**
   * 穴に入れる形を単語ごとに差し替える（例: try → "tried it", meet → "meet you"）。
   * 指定した単語は自動の it 付与を行わない。
   */
  wordForm?: Record<string, string>
  /** wordForm で使った活用形などのカタカナ読み（例: tried → トライド） */
  formKana?: Record<string, string>
  grammar: GrammarNote
}
