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
import { idlike } from './idlike'
import { tryingto } from './tryingto'
import { forgotto } from './forgotto'
import { usedto } from './usedto'
import { ilike } from './ilike'
import { howabout } from './howabout'
import { thankyoufor } from './thankyoufor'
import { isit } from './isit'

/** 元サイトの 10 型に追加した型（1 型 1 ファイル）。ここに並べた順にホームへ表示される */
export const EXTRA_FRAME_DEFS: FrameDef[] = [im, its, areyou, doyoulike, doyouhave, whereis, cani, couldyou, letme, dont, needto, idlike, tryingto, forgotto, usedto, ilike, howabout, thankyoufor, isit]

export function findExtraDef(frameId: string): FrameDef | undefined {
  return EXTRA_FRAME_DEFS.find((d) => d.frame.id === frameId)
}
