import { describe, expect, it } from 'vitest'
import { FRAMES } from './frames'
import { getSentences } from './sentences'
import { LEVEL_IDS, LEVELS } from './words'
import { FRAME_KANA, WORD_KANA } from './readings'

describe('readings', () => {
  it('全単語と全型にカタカナ読みがある', () => {
    for (const level of LEVEL_IDS) {
      for (const [en] of LEVELS[level].words) {
        expect(WORD_KANA[en], en).toBeTruthy()
      }
    }
    for (const frame of FRAMES) {
      expect(FRAME_KANA[frame.id], frame.id).toContain('___')
    }
  })

  it('文の読みが組み立てられる', () => {
    const canget = getSentences('beginner', 'canget')
    expect(canget.find((s) => s.word === 'coffee')?.kana).toBe('キャナイ ゲット ア コーフィ？')
    expect(canget.find((s) => s.word === 'name')?.slotKana).toBe('ユア ネイム')
    const howdo = getSentences('beginner', 'howdo')
    expect(howdo.find((s) => s.word === 'use')?.kana).toBe('ハウ ドゥ アイ ユーズ イット？')
    for (const level of LEVEL_IDS) {
      for (const frame of FRAMES) {
        for (const s of getSentences(level, frame.id)) {
          expect(s.kana, s.en).not.toMatch(/[a-z_]/i)
        }
      }
    }
  })
})

describe('getSentences', () => {
  it('各レベルに 100 語ある', () => {
    for (const level of LEVEL_IDS) {
      expect(LEVELS[level].words).toHaveLength(100)
    }
  })

  it('全 10 型 × 2 レベルで文が生成される', () => {
    for (const level of LEVEL_IDS) {
      for (const frame of FRAMES) {
        const list = getSentences(level, frame.id)
        expect(list.length, `${level}/${frame.id}`).toBeGreaterThan(0)
        for (const s of list) {
          expect(s.en).toBe(`${s.prefix}${s.slot}${s.suffix}`)
          expect(s.jp.length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('参照サイトと同じ文になる（冠詞・it・訳）', () => {
    const canget = getSentences('beginner', 'canget')
    expect(canget.find((s) => s.word === 'coffee')?.en).toBe('Can I get a coffee?')
    expect(canget.find((s) => s.word === 'name')?.en).toBe('Can I get your name?')
    expect(canget.find((s) => s.word === 'bag')?.jp).toBe('袋ください')

    const howdo = getSentences('beginner', 'howdo')
    expect(howdo.find((s) => s.word === 'use')?.en).toBe('How do I use it?')
    expect(howdo.find((s) => s.word === 'pay')?.en).toBe('How do I pay?')

    const think = getSentences('intermediate', 'think')
    expect(think.find((s) => s.word === 'available')?.jp).toBe('空いてると思う')
    expect(think.find((s) => s.word === 'difficult')?.jp).toBe('難しいと思う')
    expect(think.find((s) => s.word === 'perfect')?.jp).toBe('完璧だと思う')

    expect(getSentences('beginner', 'wanna')).toHaveLength(22)
    expect(getSentences('intermediate', 'canget').map((s) => s.en)).toEqual([
      'Can I get the schedule?',
      'Can I get the budget?',
      'Can I get your opinion?',
      'Can I get advice?',
      'Can I get information?',
    ])
  })
})
