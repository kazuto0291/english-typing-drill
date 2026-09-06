export type Stage = 'trace' | 'blank' | 'recall'

export interface StageInfo {
  id: Stage
  step: number
  label: string
  en: string
  desc: string
}

export const STAGES: StageInfo[] = [
  {
    id: 'trace',
    step: 1,
    label: 'なぞり',
    en: 'Trace',
    desc: '薄く表示された英文をなぞってタイピング。打った文字から濃くなる。',
  },
  {
    id: 'blank',
    step: 2,
    label: '穴埋め',
    en: 'Fill in',
    desc: '型は表示されたまま、___ に入る単語だけをタイピング。',
  },
  {
    id: 'recall',
    step: 3,
    label: '瞬間英作文',
    en: 'Recall',
    desc: '日本語だけを見て英文を丸ごとタイピング。Enter で答え合わせ。',
  },
]

export function getStage(id: Stage): StageInfo {
  return STAGES.find((s) => s.id === id)!
}

export function nextStage(id: Stage): Stage | null {
  const i = STAGES.findIndex((s) => s.id === id)
  return STAGES[i + 1]?.id ?? null
}
