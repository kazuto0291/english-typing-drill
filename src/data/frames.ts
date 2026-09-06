import { EXTRA_FRAME_DEFS } from './frame-defs'

export type Slot = 'verb' | 'noun' | 'adj'

export interface Frame {
  id: string
  tpl: string
  jp: string
  slot: Slot
}

// 参照サイト「100単語で1000文 作文マシン」の 10 の型
export const BASE_FRAMES: Frame[] = [
  { id: 'wanna', tpl: 'I wanna ___.', jp: '〜したい', slot: 'verb' },
  { id: 'canyou', tpl: 'Can you ___?', jp: '〜してくれる？', slot: 'verb' },
  { id: 'canget', tpl: 'Can I get ___?', jp: '〜もらえる？', slot: 'noun' },
  { id: 'gonna', tpl: "I'm gonna ___.", jp: '〜するね（予定）', slot: 'verb' },
  { id: 'dowan', tpl: 'Do you wanna ___?', jp: '〜する？（誘い）', slot: 'verb' },
  { id: 'haveto', tpl: 'I have to ___.', jp: '〜しなきゃ', slot: 'verb' },
  { id: 'lets', tpl: "Let's ___.", jp: '〜しよう', slot: 'verb' },
  { id: 'howdo', tpl: 'How do I ___?', jp: 'どうやって〜する？', slot: 'verb' },
  { id: 'think', tpl: "I think it's ___.", jp: '〜だと思う', slot: 'adj' },
  { id: 'interested', tpl: "I'm interested in ___.", jp: '〜に興味がある', slot: 'noun' },
]

/** 元の 10 型 + 追加した型 */
export const FRAMES: Frame[] = [...BASE_FRAMES, ...EXTRA_FRAME_DEFS.map((d) => d.frame)]

export const SLOT_LABEL: Record<Slot, string> = {
  verb: '動詞',
  noun: '名詞',
  adj: '形容詞',
}
