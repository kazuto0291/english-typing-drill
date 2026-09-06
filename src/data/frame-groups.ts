import { EXTRA_FRAME_DEFS } from './frame-defs'
import { BASE_FRAMES, type Frame } from './frames'

export interface FrameGroup {
  id: string
  label: string
  frames: Frame[]
}

/** 追加した型の分類（型 ID のリスト） */
const EXTRA_GROUP_IDS: { id: string; label: string; ids: string[] }[] = [
  { id: 'state', label: '状態・感想', ids: ['im', 'its', 'areyou', 'isit', 'thatsounds', 'itlooks'] },
  { id: 'things', label: '好み・物・場所', ids: ['doyoulike', 'ilike', 'doyouhave', 'whereis', 'howabout', 'thankyoufor', 'notsureabout'] },
  { id: 'request', label: '依頼・許可・提案', ids: ['cani', 'couldyou', 'letme', 'dont', 'whydontwe', 'whattimedoyou'] },
  { id: 'feeling', label: '希望・気持ち', ids: ['needto', 'idlike', 'tryingto', 'forgotto', 'usedto', 'gladto', 'sorryto', 'haveyouever'] },
]

function frameById(id: string): Frame {
  const def = EXTRA_FRAME_DEFS.find((d) => d.frame.id === id)
  if (!def) throw new Error(`frame-groups: unknown extra frame "${id}"`)
  return def.frame
}

/** ホームのタブ。元の 10 型 + 追加の型を 4 分類 */
export const FRAME_GROUPS: FrameGroup[] = [
  { id: 'base', label: '元の 10 型', frames: BASE_FRAMES },
  ...EXTRA_GROUP_IDS.map((g) => ({ id: g.id, label: g.label, frames: g.ids.map(frameById) })),
]

/** どのグループにも入っていない追加の型（テストで空であることを確認する） */
export function ungroupedExtraFrameIds(): string[] {
  const grouped = new Set(EXTRA_GROUP_IDS.flatMap((g) => g.ids))
  return EXTRA_FRAME_DEFS.map((d) => d.frame.id).filter((id) => !grouped.has(id))
}
