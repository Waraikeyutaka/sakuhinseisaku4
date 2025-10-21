import { useState, useMemo } from 'react';

type Difficulty = '初級' | '中級' | '上級' | '超級';

type Quiz = {
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
};

const quizData: Quiz[] = [
  {
    question: 'プロ野球の正式名称は？',
    options: ['NPB', 'MLB', 'Jリーグ', 'FIFA'],
    correctIndex: 0,
    difficulty: '初級',
  },
  {
    question: '野球は1チーム何人でプレーする？',
    options: ['7人', '8人', '9人', '10人'],
    correctIndex: 2,
    difficulty: '初級',
  },
  {
    question: 'バッターが3回空振りした場合の処理は？',
    options: ['三振', 'フォアボール', 'アウト', 'ストライク'],
    correctIndex: 0, // 修正：正しくは「三振」(index 0)
    difficulty: '初級',
  },
  {
    question: 'プロ野球のセ・リーグとパ・リーグ、合計何球団？',
    options: ['6球団', '10球団', '12球団', '14球団'],
    correctIndex: 2,
    difficulty: '初級',
  },
  {
    question: '2024年のセ・リーグ優勝チームは？',
    options: ['阪神タイガース', '読売ジャイアンツ', '横浜DeNAベイスターズ', '中日ドラゴンズ'],
    correctIndex: 1,
    difficulty: '初級',
  },
  {
    question: 'プロ野球で打者が3回ストライクを取られると？',
    options: ['フォアボール', 'アウト', 'ホームラン', 'デッドボール'],
    correctIndex: 1,
    difficulty: '初級',
  },
  {
    question: 'ホームランとはどこに打つこと？',
    options: ['三塁', 'スタンドの外', '二塁', 'バント'],
    correctIndex: 1,
    difficulty: '初級',
  },
  {
    question: 'プロ野球でボールを投げる選手は？',
    options: ['ピッチャー', 'キャッチャー', 'バッター', 'ランナー'],
    correctIndex: 0,
    difficulty: '初級',
  },
  {
    question: '東京に本拠地を置く球団は？',
    options: ['阪神タイガース', 'オリックス・バファローズ', '読売ジャイアンツ', '福岡ソフトバンクホークス'],
    correctIndex: 2,
    difficulty: '初級',
  },
  {
    question: '野球の守備で一番最初に守る番号は？',
    options: ['1番', '3番', '5番', '9番'],
    correctIndex: 0,
    difficulty: '初級',
  },

  // 中級
  {
    question: 'パ・リーグの本拠地が福岡にある球団は？',
    options: ['福岡ソフトバンクホークス', '北海道日本ハムファイターズ', '埼玉西武ライオンズ', 'オリックス・バファローズ'],
    correctIndex: 0,
    difficulty: '中級',
  },
  {
    question: 'ランナーを一人も出さずに完封勝利をすることを何というか？',
    options: ['ノーヒットノーラン', 'ノック', '完全試合', 'ストライク'],
    correctIndex: 2,
    difficulty: '中級',
  },
  {
    question: '9回裏、同点でランナーが三塁にいる。この状況で一番勝利に直結するプレーは？',
    options: ['バント', 'フォアボール', '犠牲フライ', '三振'],
    correctIndex: 2,
    difficulty: '中級',
  },
  {
    question: '「完全試合」とは？',
    options: ['三者連続三振', '誰も出塁させない試合', 'ノーヒット試合', '1点も取られない試合'],
    correctIndex: 1,
    difficulty: '中級',
  },
  {
    question: '「代打」とは何をする選手？',
    options: ['守備だけする選手', '投手の代わりに打席に立つ選手', 'ランナー専門', '監督の補佐'],
    correctIndex: 1,
    difficulty: '中級',
  },
  {
    question: 'イチローが最初に所属した日本の球団は？',
    options: ['読売ジャイアンツ', '近鉄バファローズ', 'オリックス・ブルーウェーブ', 'ヤクルトスワローズ'],
    correctIndex: 1,
    difficulty: '中級',
  },
  {
    question: 'オールスターゲームはいつ開催される？',
    options: ['開幕直後', '交流戦の後', 'シーズン中盤の7月ごろ', '日本シリーズの前'],
    correctIndex: 2,
    difficulty: '中級',
  },
  {
    question: '「送りバント」の目的は？',
    options: ['打者が出塁するため', 'ランナーを進めるため', '盗塁を成功させるため', '守備を乱すため'],
    correctIndex: 1,
    difficulty: '中級',
  },
  {
    question: 'クライマックスシリーズは何のために行われる？',
    options: ['人気向上', 'リーグ戦のおまけ', '日本シリーズ出場チームを決めるため', '育成選手の起用'],
    correctIndex: 2,
    difficulty: '中級',
  },
  {
    question: '「ビジターゲーム」とは？',
    options: ['観客が少ない試合', '地方で行う試合', '相手チームの本拠地での試合', 'テレビ中継がない試合'],
    correctIndex: 2,
    difficulty: '中級',
  },

  // 上級
  {
    question: '日本プロ野球で通算ホームラン最多記録を持つ選手は？',
    options: ['落合博満', '王貞治', '長嶋茂雄', '清原和博'],
    correctIndex: 1,
    difficulty: '上級',
  },
  {
    question: 'ノーヒットノーランは次のうちどれ？',
    options: ['安打を1本許す', '四球なし', 'ヒットを許さず完封する', '三振を10個以上取る'],
    correctIndex: 2,
    difficulty: '上級',
  },
  {
    question: '2023年WBCで決勝戦でトラウトを三振に取った日本代表投手は？',
    options: ['ダルビッシュ有', '佐々木朗希', '山本由伸', '大谷翔平'],
    correctIndex: 3,
    difficulty: '上級',
  },
  {
    question: '通算2000本安打を達成すると与えられる称号は？',
    options: ['殿堂入り', '特別表彰選手', 'ゴールデングラブ', '名球会'],
    correctIndex: 3,
    difficulty: '上級',
  },
  {
    question: 'セイバーメトリクスで投手の評価指標「FIP」が示すのは？',
    options: ['防御率', '真の防御率（守備の影響を除く）', '打率', '奪三振率'],
    correctIndex: 1,
    difficulty: '上級',
  },
  {
    question: 'パ・リーグで1950年代に「黄金時代」を築いた球団は？',
    options: ['西鉄ライオンズ', '南海ホークス', '阪急ブレーブス', 'ロッテオリオンズ'],
    correctIndex: 0,
    difficulty: '上級',
  },
  {
    question: '次のうち「プロ野球ドラフト会議」の1位指名が最多の大学は？',
    options: ['早稲田大学', '慶應義塾大学', '東海大学', '駒澤大学'],
    correctIndex: 0,
    difficulty: '上級',
  },
  {
    question: 'NPB史上、投手が打者としても出場しMVPを受賞した例は？',
    options: ['江川卓', '大谷翔平', '斎藤佑樹', '村上宗隆'],
    correctIndex: 1,
    difficulty: '上級',
  },
  {
    question: '1959年の日本シリーズで初めてナイターが導入されたのは？',
    options: ['第1戦', '第3戦', '第4戦', '第6戦'],
    correctIndex: 3,
    difficulty: '上級',
  },
  {
    question: '日本プロ野球において外国人選手が同一球団に8年以上在籍した例として有名な選手は？',
    options: ['ラミレス', 'バレンティン', 'ブライアント', 'タフィ・ローズ'],
    correctIndex: 0,
    difficulty: '上級',
  },

  // 超級
  {
    question: '日本プロ野球で通算勝利数が最多の投手は？',
    options: ['稲尾和久', '野茂英雄', '金田正一', '桑田真澄'],
    correctIndex: 2,
    difficulty: '超級',
  },
  {
    question: 'プロ野球の1試合最多本塁打記録は？',
    options: ['4本', '5本', '6本', '7本'],
    correctIndex: 0,
    difficulty: '超級',
  },
  {
    question: '次のうち、ドラフト1位で指名されていない選手は？',
    options: ['イチロー', '松坂大輔', '田中将大', '大谷翔平'],
    correctIndex: 0,
    difficulty: '超級',
  },
  {
    question: 'プロ野球でサイクルヒットを最も多く達成した選手は？',
    options: ['福留孝介', 'イチロー', '山田哲人', '張本勲'],
    correctIndex: 2,
    difficulty: '超級',
  },
  {
    question: '2006年のWBC決勝戦で日本が対戦した国は？',
    options: ['韓国', 'キューバ', 'アメリカ', 'ドミニカ共和国'],
    correctIndex: 1,
    difficulty: '超級',
  },
  {
    question: 'NPB史上最長試合（延長含む）は何回まで続いた？',
    options: ['18回', '21回', '25回', '23回'],
    correctIndex: 1,
    difficulty: '超級',
  },
  {
    question: '「打率.400以上」でシーズンを終えた日本人選手は？',
    options: ['王貞治', 'イチロー', 'ブーマー・ウェルズ', 'いない'],
    correctIndex: 3,
    difficulty: '超級',
  },
  {
    question: 'セ・パ交流戦が始まったのは何年？',
    options: ['2000年', '2002年', '2005年', '2007年'],
    correctIndex: 2,
    difficulty: '超級',
  },
  {
    question: '日本人でMLB年間最多安打記録を持つ選手は？',
    options: ['松井秀喜', '大谷翔平', 'イチロー', '福留孝介'],
    correctIndex: 2,
    difficulty: '超級',
  },
  {
    question: '次のうち、プロ野球と関係が最も深い“川上哲治”の肩書きは？',
    options: ['初代パ・リーグ会長', 'V9監督', 'セ・リーグ初代MVP', '野球殿堂初代会長'],
    correctIndex: 1,
    difficulty: '超級',
  },
];

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Audio オブジェクト（ブラウザ環境でのみ動作）
  const correctSE = useMemo(() => new Audio('/se/クイズ正解1.mp3'), []);
  const wrongSE = useMemo(() => new Audio('/se/クイズ不正解1.mp3'), []);
  const levelSE = useMemo(() => new Audio('/se/プレゼンタイトル表示1.mp3'), []);

  const filteredQuiz = useMemo(() => quizData.filter((q) => q.difficulty === difficulty), [difficulty]);
  const currentQuiz = filteredQuiz[currentIndex];

  const handleOptionClick = (index: number) => {
    if (!currentQuiz) return;
    setSelected(index);
    if (index === currentQuiz.correctIndex) {
      correctSE.currentTime = 0;
      correctSE.play().catch((e) => console.warn('正解音声再生エラー', e));
      setScore((prev) => prev + 1);
    } else {
      wrongSE.currentTime = 0;
      wrongSE.play().catch((e) => console.warn('不正解音声再生エラー', e));
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (currentIndex + 1 < filteredQuiz.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!difficulty) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h1>プロ野球クイズ</h1>
        <p>難易度を選んでください</p>
        {(['初級', '中級', '上級', '超級'] as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => {
              levelSE.currentTime = 0;
              levelSE.play().catch((e) => console.warn('難易度選択音声再生エラー', e));
              setDifficulty(level);
              setCurrentIndex(0);
              setScore(0);
              setSelected(null);
              setShowResult(false);
            }}
            style={{
              margin: '10px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '8px',
              border: '1px solid gray',
            }}
          >
            {level}
          </button>
        ))}
      </div>
    );
  }

  if (filteredQuiz.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>この難易度の問題が見つかりません。</p>
        <button
          onClick={() => {
            setDifficulty(null);
          }}
          style={{ padding: '8px 16px' }}
        >
          戻る
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>結果発表！</h2>
        <p>
          {filteredQuiz.length}問中 {score}問正解（正答率{' '}
          {Math.round((score / filteredQuiz.length) * 100)}%）
        </p>
        <button
          onClick={() => {
            setDifficulty(null);
            setCurrentIndex(0);
            setScore(0);
            setShowResult(false);
            setSelected(null);
          }}
          style={{ padding: '10px 20px', marginTop: '20px' }}
        >
          最初に戻る
        </button>
      </div>
    );
  }

  // 現在の問題が存在することを保証
  if (!currentQuiz) {
    return null;
  }

  const getOptionBackground = (i: number) => {
    if (selected === null) return 'white';
    // 選択後は正解を緑、選択した誤答を赤で明示
    if (i === currentQuiz.correctIndex) return 'lightgreen';
    if (i === selected) return 'salmon';
    return 'white';
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h2>
        {currentIndex + 1} / {filteredQuiz.length} 問 — {currentQuiz.question}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentQuiz.options.map((option, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <button
              onClick={() => handleOptionClick(i)}
              disabled={selected !== null}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: getOptionBackground(i),
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: selected === null ? 'pointer' : 'default',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {selected !== null && (
        <div style={{ marginTop: 12 }}>
          {selected === currentQuiz.correctIndex ? (
            <div style={{ fontWeight: 'bold' }}>大正解! 🎉</div>
          ) : (
            <div style={{ fontWeight: 'bold' }}>
              不正解。正しい答え：{currentQuiz.options[currentQuiz.correctIndex]}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={selected === null}
        style={{ marginTop: 20, padding: '8px 16px' }}
      >
        次の問題へ
      </button>
    </div>
  );
}

export default App;
