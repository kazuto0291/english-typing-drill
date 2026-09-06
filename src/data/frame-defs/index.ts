import type { FrameDef } from './types'
import { im } from './im'
import { its } from './its'
import { areyou } from './areyou'
import { doyoulike } from './doyoulike'
import { doyouhave } from './doyouhave'
import { whereis } from './whereis'
import { cani } from './cani'
import { couldyou } from './couldyou'
import { letme } from './letme'
import { dont } from './dont'
import { needto } from './needto'

/** 元サイトの 10 型に追加した型（1 型 1 ファイル）。ここに並べた順にホームへ表示される */
export const EXTRA_FRAME_DEFS: FrameDef[] = [im, its, areyou, doyoulike, doyouhave, whereis, cani, couldyou, letme, dont, needto]

export function findExtraDef(frameId: string): FrameDef | undefined {
  return EXTRA_FRAME_DEFS.find((d) => d.frame.id === frameId)
}
