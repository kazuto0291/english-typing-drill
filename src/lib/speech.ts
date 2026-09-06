let cachedVoice: SpeechSynthesisVoice | null | undefined

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice
  const voices = (window.speechSynthesis?.getVoices() ?? []).filter((v) => v.lang.replace('_', '-').startsWith('en'))
  const us = voices.filter((v) => /en[-_]US/i.test(v.lang))
  // 優先順: 高品質音声（Premium / Enhanced / Natural）→ 定番の自然な声 → en-US → 英語なら何でも
  const quality = (list: SpeechSynthesisVoice[]) => list.find((v) => /premium|enhanced|natural|neural/i.test(v.name))
  const preferred = ['Samantha', 'Ava', 'Allison', 'Zoe', 'Google US English', 'Microsoft Aria', 'Alex', 'Daniel']
  cachedVoice =
    quality(us) ??
    quality(voices) ??
    preferred.map((name) => voices.find((v) => v.name.startsWith(name))).find(Boolean) ??
    us[0] ??
    voices[0] ??
    null
  return cachedVoice
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    cachedVoice = undefined
  })
}

/** 英文を読み上げる（対応ブラウザのみ） */
export function speak(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.95
  const voice = pickVoice()
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}
