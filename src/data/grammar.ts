export interface GrammarNote {
  /** 型の意味・成り立ち */
  meaning: string
  /** 使う場面 */
  scenes: string[]
  /** 例文 */
  examples: { en: string; jp: string }[]
  /** 注意点・よくある間違い */
  tips: string[]
  /** 丁寧に言いたいとき */
  polite?: string
}

/** 型ごとの文法解説（日本人の初学者向け） */
export const GRAMMAR: Record<string, GrammarNote> = {
  wanna: {
    meaning:
      'wanna は want to（〜したい）をくだけて発音した形。「I want to go.」を早く言うと「I wanna go.」になります。後ろには動詞の原形（go / eat / sleep）が来ます。',
    scenes: [
      '友達・家族・同僚との気軽な会話で、自分のしたいことを伝える',
      '旅行先で「〜したいんだけど」と希望を切り出す',
      'テキストメッセージやチャットなど、くだけた書き言葉',
    ],
    examples: [
      { en: 'I wanna eat.', jp: '食べたい（お腹すいた）' },
      { en: 'I wanna go home.', jp: '家に帰りたい' },
      { en: 'I wanna try it.', jp: 'それ、やってみたい' },
    ],
    tips: [
      '後ろに名詞は置けません。「コーヒーが欲しい」は I want a coffee.（wanna は使わない）',
      'ビジネスメールや目上の人には wanna を使わず、want to や would like to にする',
      '主語が he / she のときは wants to になるので wanna は使わない（He wants to go.）',
    ],
    polite: "I'd like to ___.（〜したいのですが）",
  },
  canyou: {
    meaning:
      'Can you ___?（あなたは〜できる？）が転じて「〜してくれる？」という軽いお願いになります。日本語の「ちょっと〜してくれる？」に近い感覚です。',
    scenes: [
      '友達や同僚にちょっとしたことを頼む',
      'お店やホテルのスタッフに「〜してもらえますか」と頼む',
      '電話で「もう一度言ってくれる？」など聞き返す',
    ],
    examples: [
      { en: 'Can you help?', jp: '手伝ってくれる？' },
      { en: 'Can you wait?', jp: 'ちょっと待ってくれる？' },
      { en: 'Can you check?', jp: '確認してくれる？' },
    ],
    tips: [
      '返事は Sure. / Of course. / OK.（いいよ）、断るときは Sorry, I can’t.',
      '本来の「〜できる？」の意味にもなる（Can you swim? 泳げる？）。場面で判断されます',
      '文末に please を足すだけでぐっと丁寧になる（Can you help, please?）',
    ],
    polite: 'Could you ___?（〜していただけますか）',
  },
  canget: {
    meaning:
      'Can I get ___?（〜をもらえますか）は注文やお願いの定番フレーズ。get は「手に入れる」なので「〜をいただけますか」という意味になります。Can I have ___? もほぼ同じです。',
    scenes: [
      'カフェ・レストランでの注文（Can I get a coffee?）',
      'お店で袋やレシートをもらう',
      '初対面で相手の名前を聞く（Can I get your name?）',
    ],
    examples: [
      { en: 'Can I get a coffee?', jp: 'コーヒーをひとつもらえますか' },
      { en: 'Can I get the menu?', jp: 'メニューをもらえますか' },
      { en: 'Can I get your name?', jp: 'お名前をうかがえますか' },
    ],
    tips: [
      '数えられるもの 1 つには a を付ける（a coffee = コーヒー 1 杯、a ticket = チケット 1 枚）',
      '数えられないもの（water / food / advice / information）には a を付けない',
      '相手のものには your（your name / your opinion）、決まったものには the（the schedule）',
      'アメリカ英語でとてもよく使う。イギリスでは Can I have ___? が多め',
    ],
    polite: 'Could I get ___, please?（〜をいただけますでしょうか）',
  },
  gonna: {
    meaning:
      "gonna は going to をくだけて発音した形。I'm gonna ___. = I'm going to ___. で「〜するつもり／〜するね」という、すでに決めている予定を表します。",
    scenes: [
      'これからの自分の行動を相手に伝える（「行くね」「寝るね」）',
      '週末や今夜の予定を話す',
      'その場を離れるときの一言（I’m gonna go. そろそろ行くね）',
    ],
    examples: [
      { en: "I'm gonna sleep.", jp: 'もう寝るね' },
      { en: "I'm gonna check.", jp: '確認してみるね' },
      { en: "I'm gonna call you.", jp: 'あとで電話するね' },
    ],
    tips: [
      'will との違い: will は「その場で決めたこと」、going to は「前から決めていたこと」',
      '後ろは動詞の原形。場所に行く意味の going to（I’m going to Tokyo.）は gonna にできない',
      '否定は I’m not gonna ___.（〜しないよ）',
    ],
    polite: "I'm going to ___. / I'm planning to ___.（〜する予定です）",
  },
  dowan: {
    meaning:
      'Do you wanna ___? は Do you want to ___?（〜したい？）のくだけた形で、「〜する？」「〜しない？」と相手を誘う言い方です。',
    scenes: [
      '友達を食事や遊びに誘う',
      '「見てみる？」「やってみる？」と軽く勧める',
      '相手の希望をたずねる（「話す？」「来る？」）',
    ],
    examples: [
      { en: 'Do you wanna eat?', jp: 'ごはん食べる？' },
      { en: 'Do you wanna come?', jp: '一緒に来る？' },
      { en: 'Do you wanna try?', jp: 'やってみる？' },
    ],
    tips: [
      'もっとくだけると Wanna eat? のように Do you を省略することもある（親しい相手だけ）',
      '返事は Sure! / Sounds good.（いいね）、断るときは Maybe next time.（また今度）',
      'Let’s ___. が「一緒にしよう」と決める言い方なのに対し、こちらは相手の気持ちを聞く言い方',
    ],
    polite: 'Would you like to ___?（〜しませんか）',
  },
  haveto: {
    meaning:
      'I have to ___. は「〜しなければならない」「〜しなきゃ」。仕事・ルール・時間など、外からの事情でやる必要があることに使います。',
    scenes: [
      '会話を切り上げるとき（I have to go. もう行かなきゃ）',
      '仕事や用事があって誘いを断る',
      'やるべきことを自分に言い聞かせる（I have to study.）',
    ],
    examples: [
      { en: 'I have to go.', jp: 'もう行かなきゃ' },
      { en: 'I have to work.', jp: '仕事しなきゃ' },
      { en: 'I have to wait.', jp: '待たないといけない' },
    ],
    tips: [
      'must との違い: must は話し手の強い意志。日常会話では have to のほうがずっとよく使う',
      '否定 I don’t have to ___. は「〜しなくてよい」。must not（〜してはいけない）とは意味が違うので注意',
      '過去は I had to ___.（〜しなければならなかった）',
      'くだけた形は I gotta ___.（I have got to の略）',
    ],
    polite: 'I need to ___.（〜する必要があります）',
  },
  lets: {
    meaning:
      "Let's は Let us の短縮形で「（一緒に）〜しよう」という提案。自分と相手を含めて「みんなでやろう」と誘う言い方です。",
    scenes: [
      '出発や食事など、一緒に行動を始めるとき（Let’s go. / Let’s eat.）',
      '会議や作業の開始・終了を仕切る（Let’s start. / Let’s stop.）',
      '待ち合わせや相談を持ちかける（Let’s meet. / Let’s talk.）',
    ],
    examples: [
      { en: "Let's go.", jp: '行こう' },
      { en: "Let's start.", jp: '始めよう' },
      { en: "Let's take a break.", jp: '休憩しよう' },
    ],
    tips: [
      '後ろは動詞の原形。Let’s to go は ×',
      '返事は Yes, let’s. / OK. / Sounds good.',
      '否定は Let’s not ___.（〜するのはやめておこう）',
      '自分だけの行動には使わない（「私は行こう」は I’ll go.）',
    ],
    polite: 'Shall we ___?（〜しましょうか）',
  },
  howdo: {
    meaning:
      'How do I ___? は「どうやって〜すればいい？」と、やり方や手順を聞く言い方。How（どうやって）+ do I（私は〜する）の組み合わせです。',
    scenes: [
      '機械やアプリの使い方を聞く（How do I use it?）',
      '道順や乗り換えを聞く（How do I get to the station?）',
      '英語での言い方を聞く（How do I say this in English?）',
    ],
    examples: [
      { en: 'How do I use it?', jp: 'これ、どうやって使うの？' },
      { en: 'How do I pay?', jp: '支払いはどうすればいい？' },
      { en: 'How do I get there?', jp: 'そこへはどうやって行くの？' },
    ],
    tips: [
      'use / open / find などは「何を」が必要な動詞なので、it（それを）を付ける（How do I open it?）',
      '「どう思う？」は How ではなく What do you think?',
      '相手の行動を聞くなら How do you ___?（あなたはどうやって〜するの？）',
    ],
    polite: 'Could you tell me how to ___?（〜の仕方を教えていただけますか）',
  },
  think: {
    meaning:
      "I think it's ___. は「それは〜だと思う」。I think を頭に付けると断定を避けたやわらかい意見になります。it's = it is で、it は話題になっているものを指します。",
    scenes: [
      '映画・料理・場所などの感想を言う',
      '相手の案に対して自分の意見を伝える',
      '自信がないときに「たぶん〜だと思う」とぼかす',
    ],
    examples: [
      { en: "I think it's good.", jp: 'いいと思う' },
      { en: "I think it's easy.", jp: '簡単だと思う' },
      { en: "I think it's true.", jp: '本当だと思う' },
    ],
    tips: [
      '否定は I don’t think it’s ___.（〜ではないと思う）。英語では think のほうを否定するのが自然',
      'I guess it’s ___.（たぶん〜かな）はもう少し自信がないとき',
      '人について言うなら I think he’s ___. / I think she’s ___.',
    ],
    polite: 'I believe it’s ___. / In my opinion, it’s ___.（私の意見では〜です）',
  },
  interested: {
    meaning:
      "I'm interested in ___. は「〜に興味がある」。interested は「（人が）興味を持っている」という状態を表し、後ろに in + 名詞が続きます。",
    scenes: [
      '自己紹介で趣味や関心を伝える',
      '仕事の応募や面接で興味のある分野を話す',
      '話題を広げる（I’m interested in Japanese history.）',
    ],
    examples: [
      { en: "I'm interested in music.", jp: '音楽に興味があります' },
      { en: "I'm interested in cooking.", jp: '料理に興味があります' },
      { en: "I'm interested in your idea.", jp: 'あなたの案に興味があります' },
    ],
    tips: [
      'interesting（物・事が面白い）と混同しない。It’s interesting.（それは面白い）／ I’m interested.（私は興味がある）',
      'in の後ろは名詞か 〜ing（I’m interested in learning English.）',
      '相手に聞くなら Are you interested in ___?（〜に興味ある？）',
    ],
    polite: 'I’m very interested in ___.（〜に大変興味があります）',
  },
}
