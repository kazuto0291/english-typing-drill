import type { FrameDef } from './types'

/** 元サイトの 10 型に追加した型（1 型 1 ファイル）。ここに並べた順にホームへ表示される */
export const EXTRA_FRAME_DEFS: FrameDef[] = []

export function findExtraDef(frameId: string): FrameDef | undefined {
  return EXTRA_FRAME_DEFS.find((d) => d.frame.id === frameId)
}
