'use client'

import { useEffect, useState } from 'react'

type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

type CompletionLog = {
  id: string
  playerName: string
  completedAt: string
  livesLeft: number
}

const pieceRewards = [
  { word: 'IS', video: '/video/is_1.mp4' },
  { word: 'THE', video: '/video/the_2.mp4' },
  { word: 'ONLY', video: '/video/only_3.mp4' },
  { word: 'CONSTANT', video: '/video/constant_4.mp4' },
  { word: 'IN', video: '/video/in_5.mp4' },
  { word: 'LIFE', video: '/video/live_6.mp4' },
  { word: 'CHANGE', video: '/video/change_7.mp4' },
]

const questions: QuizQuestion[] = [
  {
    question: 'Nhận định nào đúng nhất về phạm vi của sự phát triển?',
    options: [
      'Sự phát triển chỉ có trong một số lĩnh vực riêng.',
      'Sự phát triển diễn ra trong tự nhiên, xã hội và tư duy.',
      'Sự phát triển chỉ xuất hiện khi con người mong muốn.',
      'Sự phát triển chỉ có ở những quốc gia phát triển.',
    ],
    correctIndex: 1,
    explanation: 'IS: Sự phát triển mang tính phổ biến, hiện hữu ở mọi lĩnh vực của thế giới vật chất và đời sống xã hội.',
  },
  {
    question: 'Con đường phát triển của sự vật được hiểu đúng như thế nào?',
    options: [
      'Mọi sự vật đều đi qua một mô hình giống nhau.',
      'Mỗi sự vật có điều kiện riêng nên đường phát triển khác.',
      'Sự khác biệt chỉ là tên gọi chứ không có bản chất.',
      'Đa dạng là cảm giác chủ quan, không có cơ sở khách quan.',
    ],
    correctIndex: 1,
    explanation: 'THE: Tính đa dạng nhấn mạnh con đường phát triển mang đặc thù của từng sự vật, không đồng nhất máy móc.',
  },
  {
    question: 'Vì sao nói phát triển là xu hướng tất yếu dù có bước lùi?',
    options: [
      'Bước lùi luôn làm sự vật trở về điểm khởi đầu.',
      'Phát triển luôn đi thẳng, không có quanh co trung gian.',
      'Xu hướng đi lên giữ vai trò chủ đạo giữa nhiều khả năng.',
      'Ý chí cá nhân có thể thay thế hoàn toàn quy luật khách quan.',
    ],
    correctIndex: 2,
    explanation: 'ONLY: Sự phát triển phong phú có thể quanh co, nhưng xu hướng tất yếu vẫn hướng lên qua các nấc thang mới.',
  },
  {
    question: 'Hình ảnh nào mô tả đúng nhất quy luật phát triển?',
    options: [
      'Đường tròn khép kín lặp lại y nguyên qua mọi giai đoạn.',
      'Đường thẳng bất biến, không có bước chuyển hóa về chất.',
      'Đường xoáy ốc liên tục, lặp ở mức cao hơn trước.',
      'Đường gấp khúc ngẫu nhiên, không có tính quy luật ổn định.',
    ],
    correctIndex: 2,
    explanation: 'CONSTANT: Phát triển có tính liên tục, kế tiếp qua chu kỳ mới ở trình độ cao hơn theo hình xoáy ốc.',
  },
  {
    question: 'Cái mới kế thừa cái cũ như thế nào?',
    options: [
      'Cái mới phải xóa toàn bộ yếu tố của cái cũ.',
      'Cái mới giữ nguyên toàn bộ cái cũ, không chỉnh sửa.',
      'Cái mới loại bỏ lỗi thời, kế thừa nhân tố hợp lý.',
      'Kế thừa chỉ có trong ý niệm, không diễn ra thực tế.',
    ],
    correctIndex: 2,
    explanation: 'IN: Phát triển diễn ra từ bên trong sự vật, trong đó cái mới kế thừa có chọn lọc các giá trị tích cực của cái cũ.',
  },
  {
    question: 'Tư duy biện chứng giúp ích gì trong đời sống?',
    options: [
      'Chỉ dùng để tranh luận lý thuyết, ít giá trị thực tiễn.',
      'Giúp nhận diện xu hướng để chọn hành động phù hợp.',
      'Chủ yếu để phê phán, không cần đưa ra giải pháp.',
      'Làm giảm vai trò thực tiễn trong quá trình nhận thức.',
    ],
    correctIndex: 1,
    explanation: 'LIFE: Giá trị của lý luận nằm ở khả năng soi đường cho thực tiễn, giúp hành động đúng xu hướng phát triển.',
  },
  {
    question: 'Khẳng định nào đúng về sự thay đổi?',
    options: [
      'Thay đổi chỉ diễn ra khi con người chủ động mong muốn.',
      'Thay đổi phụ thuộc hoàn toàn vào cảm xúc từng cá nhân.',
      'Thay đổi diễn ra khách quan, không lệ thuộc ý muốn chủ quan.',
      'Thay đổi chỉ tồn tại trong tư duy, không có trong vật chất.',
    ],
    correctIndex: 2,
    explanation: 'CHANGE: Toàn bộ tiến trình phát triển mang tính khách quan, diễn ra theo quy luật vốn có của sự vật.',
  },
]

const part2Questions: QuizQuestion[] = [
  {
    question: 'Ải 1 - Mâu thuẫn là nguồn gốc phát triển: Chọn nhận định đúng nhất.',
    options: [
      'Mâu thuẫn nội tại thúc đẩy sự vật tự vận động và biến đổi.',
      'Vật chất đứng yên, mọi biến đổi chỉ do ý niệm tuyệt đối.',
      'Mọi hiện tượng tách rời nhau, không có xung đột bản chất.',
    ],
    correctIndex: 0,
    explanation: 'Đúng: Trong phép biện chứng duy vật, mâu thuẫn nội tại là động lực của sự phát triển.',
  },
  {
    question: 'Ải 2 - Lượng đổi, chất đổi: Tình huống nào thể hiện đúng quy luật?',
    options: [
      'Tích lũy dần tri thức đến điểm nút sẽ tạo bước nhảy về năng lực.',
      'Bản chất cố định vĩnh viễn, thay đổi chỉ là ảo giác nhận thức.',
      'Đổi tên sự vật là đủ để tạo ra chất mới một cách tự phát.',
    ],
    correctIndex: 0,
    explanation: 'Đúng: Lượng tích lũy đến điểm nút sẽ dẫn đến biến đổi về chất.',
  },
  {
    question: 'Ải 3 - Phủ định của phủ định: Cách tiếp cận nào đúng?',
    options: [
      'Loại bỏ cái lỗi thời, kế thừa hạt nhân hợp lý để nâng cấp cái mới.',
      'Phủ định sạch trơn quá khứ và cắt đứt toàn bộ tính kế thừa.',
      'Quay lại nguyên trạng ban đầu vì lịch sử chỉ lặp tròn khép kín.',
    ],
    correctIndex: 0,
    explanation: 'Đúng: Phủ định biện chứng có tính kế thừa và phát triển ở nấc thang cao hơn.',
  },
]

export default function ChallengeGame() {
  const [phase, setPhase] = useState<'intro' | 'rulesMenu' | 'upgradePreview' | 'video' | 'quiz' | 'reward' | 'piecesReveal' | 'decision' | 'part2Video' | 'part2Quiz' | 'part2Complete' | 'gameOverVideo' | 'result'>('intro')
  const [gameOverReason, setGameOverReason] = useState<'failed' | 'stopped'>('failed')
  const [playerName, setPlayerName] = useState('')
  const [nameError, setNameError] = useState('')
  const [lives, setLives] = useState(3)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizError, setQuizError] = useState('')
  const [answerText, setAnswerText] = useState('')
  const [part2Index, setPart2Index] = useState(0)
  const [part2Selected, setPart2Selected] = useState<number | null>(null)
  const [part2Error, setPart2Error] = useState('')
  const [part2AnswerText, setPart2AnswerText] = useState('')
  const [part2AnswerState, setPart2AnswerState] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [part2PendingNext, setPart2PendingNext] = useState(false)
  const [unlockedPieces, setUnlockedPieces] = useState(0)
  const [rewardVideo, setRewardVideo] = useState<string | null>(null)
  const [hallOfFame, setHallOfFame] = useState<CompletionLog[]>([])
  const [hallOfFameHasMore, setHallOfFameHasMore] = useState(false)
  const [logStatus, setLogStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [hasLoggedCompletion, setHasLoggedCompletion] = useState(false)
  const bgAspectRatio = 1024 / 687
  const introBgSrc = '/image/intro_game_v2.jpg'
  const upgradeImageSrc = '/image/Nang_cap.jpg'
  const quizBgSrc = '/image/challenge-page-177.png'
  const allPiecesBgSrc = '/image/7_manh_ghep.jpg'
  const gameVideoSrc = '/video/vao_game.mp4'
  const part2VideoSrc = '/video/part_2_game.mp4'
  const gameOverVideoSrc = '/video/game_over.mp4'
  const badgeSrc = '/image/huy_hieu.png'

  useEffect(() => {
    if (phase !== 'piecesReveal') return

    const timer = window.setTimeout(() => {
      setPhase('decision')
    }, 2000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'part2Complete' || hasLoggedCompletion) return

    const saveCompletion = async () => {
      try {
        setLogStatus('saving')
        const response = await fetch('/api/challenge/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerName,
            livesLeft: lives,
          }),
        })

        if (!response.ok) {
          throw new Error('Unable to save completion log')
        }

        const logsResponse = await fetch('/api/challenge/logs', { cache: 'no-store' })
        if (logsResponse.ok) {
          const data = (await logsResponse.json()) as { logs: CompletionLog[]; hasMore?: boolean }
          setHallOfFame(data.logs)
          setHallOfFameHasMore(Boolean(data.hasMore))
        }

        setHasLoggedCompletion(true)
        setLogStatus('saved')
      } catch {
        setLogStatus('error')
      }
    }

    void saveCompletion()
  }, [phase, hasLoggedCompletion, playerName, lives])

  const startGame = () => {
    const name = playerName.trim()
    if (!name) {
      setNameError('Vui lòng nhập tên trước khi bắt đầu hành trình.')
      return
    }

    setNameError('')
    setLives(3)
    setQuestionIndex(0)
    setSelectedOption(null)
    setQuizError('')
    setAnswerText('')
    setUnlockedPieces(0)
    setRewardVideo(null)
    setGameOverReason('failed')
    setPart2Index(0)
    setPart2Selected(null)
    setPart2Error('')
    setPart2AnswerText('')
    setPart2AnswerState('idle')
    setPart2PendingNext(false)
    setHasLoggedCompletion(false)
    setLogStatus('idle')
    setHallOfFame([])
    setHallOfFameHasMore(false)
    setPhase('video')
  }

  const startQuestionsFlow = () => {
    setPhase('quiz')
  }

  const returnToChallengeStart = () => {
    window.location.href = '/challenge'
  }

  const openUpgradePreview = () => {
    setPhase('upgradePreview')
  }

  const backToRulesMenu = () => {
    setPhase('rulesMenu')
  }

  const submitAnswer = () => {
    if (selectedOption === null) {
      setQuizError('Hãy chọn một đáp án trước khi xác nhận.')
      return
    }

    const current = questions[questionIndex]
    const isCorrect = selectedOption === current.correctIndex

    setQuizError('')
    setAnswerText(current.explanation)

    if (isCorrect) {
      if (questionIndex < pieceRewards.length) {
        const reward = pieceRewards[questionIndex]
        setUnlockedPieces((prev) => Math.max(prev, questionIndex + 1))
        setRewardVideo(reward.video)
        setPhase('reward')
      } else {
        setRewardVideo(null)
      }
      return
    }

    setRewardVideo(null)
    const nextLives = Math.max(0, lives - 1)
    setLives(nextLives)
    setAnswerText('Sai. Bạn mất 1 viên triết, hãy chọn lại đến khi đúng.')
    if (nextLives === 0) {
      setGameOverReason('failed')
      setPhase('gameOverVideo')
    }
  }

  const handleRewardEnded = () => {
    setRewardVideo(null)

    if (questionIndex >= questions.length - 1) {
      setPhase('piecesReveal')
      return
    }

    setQuestionIndex((prev) => prev + 1)
    setSelectedOption(null)
    setAnswerText('')
    setQuizError('')
    setPhase('quiz')
  }

  const restartQuiz = () => {
    window.location.href = '/challenge'
    setQuestionIndex(0)
    setSelectedOption(null)
    setAnswerText('')
    setQuizError('')
    setRewardVideo(null)
    setUnlockedPieces(0)
    setLives(3)
    setPart2Index(0)
    setPart2Selected(null)
    setPart2Error('')
    setPart2AnswerText('')
    setPart2AnswerState('idle')
    setPart2PendingNext(false)
    setHasLoggedCompletion(false)
    setLogStatus('idle')
    setHallOfFame([])
    setHallOfFameHasMore(false)
  }

  const chooseContinueJourney = () => {
    setPart2Index(0)
    setPart2Selected(null)
    setPart2Error('')
    setPart2AnswerText('')
    setPart2AnswerState('idle')
    setPart2PendingNext(false)
    setPhase('part2Video')
  }

  const chooseStopJourney = () => {
    setGameOverReason('stopped')
    setPhase('gameOverVideo')
  }

  const submitPart2Answer = () => {
    if (part2PendingNext) {
      return
    }

    if (part2Selected === null) {
      setPart2Error('Hãy chọn một đáp án trước khi xác nhận.')
      return
    }

    const current = part2Questions[part2Index]
    const isCorrect = part2Selected === current.correctIndex

    setPart2Error('')

    if (isCorrect) {
      setPart2AnswerState('correct')
      setPart2AnswerText(`Đúng! ${current.explanation}`)

      if (part2Index >= part2Questions.length - 1) {
        setPart2PendingNext(true)
        window.setTimeout(() => {
          setPart2PendingNext(false)
          setPhase('part2Complete')
        }, 900)
        return
      }

      setPart2PendingNext(true)
      window.setTimeout(() => {
        setPart2Index((prev) => prev + 1)
        setPart2Selected(null)
        setPart2AnswerText('')
        setPart2AnswerState('idle')
        setPart2PendingNext(false)
      }, 900)
      return
    }

    setPart2AnswerState('incorrect')
    const nextLives = Math.max(0, lives - 1)
    setLives(nextLives)
    setPart2AnswerText('Sai! Bạn mất 1 viên triết, hãy chọn lại đúng tinh thần biện chứng duy vật.')
    if (nextLives === 0) {
      setGameOverReason('failed')
      setPhase('gameOverVideo')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      background: '#0c111b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Stage theo đúng tỉ lệ ảnh gốc để không bị crop */}
      <div
        style={{
          position: 'absolute',
          top: '1%',
          left: '1%',
          width: '98%',
          height: '98%',
          overflow: 'hidden',
        }}
      >
        {(phase === 'intro' || phase === 'rulesMenu' || phase === 'upgradePreview' || phase === 'result' || phase === 'piecesReveal' || phase === 'part2Complete') && (
          <img
            src={
              phase === 'piecesReveal'
                ? allPiecesBgSrc
                : (phase === 'rulesMenu' || phase === 'upgradePreview')
                  ? quizBgSrc
                  : introBgSrc
            }
            alt="The Constant Change"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        )}

        {phase === 'video' && (
          <video
            key={playerName}
            src={gameVideoSrc}
            poster={introBgSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              setPhase('rulesMenu')
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              background: '#05070c',
            }}
          />
        )}

        {phase === 'rulesMenu' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '45.4%',
                left: '56%',
                transform: 'translate(-50%, -50%)',
                width: 'min(520px, calc(100% - 56px))',
                color: '#1b1106',
                textAlign: 'left',
                pointerEvents: 'auto',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '28px', textAlign: 'center', fontWeight: 800 }}>Luật Chơi</h3>
              <p style={{ margin: '10px 0 0', lineHeight: 1.6 }}>
                1. Bạn có 3 viên triết. Trả lời sai sẽ mất 1 viên.
              </p>
              <p style={{ margin: '6px 0 0', lineHeight: 1.6 }}>
                2. Trả lời đúng từng câu để nhận video mảnh ghép theo thứ tự và mở khóa phần tiếp theo.
              </p>
              <p style={{ margin: '6px 0 0', lineHeight: 1.6 }}>
                3. Mất hết 3 viên triết sẽ Game Over.
              </p>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  onClick={startQuestionsFlow}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '10px 18px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #2f8f4f 0%, #20663a 100%)',
                    cursor: 'pointer',
                  }}
                >
                  Chơi và bắt đầu câu hỏi
                </button>
                <button
                  onClick={returnToChallengeStart}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '10px 18px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #9f3e2d 0%, #7f2e20 100%)',
                    cursor: 'pointer',
                  }}
                >
                  Không
                </button>
                <button
                  onClick={openUpgradePreview}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '10px 18px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #345fd8 0%, #243d97 100%)',
                    cursor: 'pointer',
                  }}
                >
                  Nâng cấp trước khi chơi
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === 'upgradePreview' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '16px',
              background: 'rgba(5, 8, 16, 0.58)',
            }}
          >
            <div style={{ width: 'min(1100px, 96%)', textAlign: 'center' }}>
              <img
                src={upgradeImageSrc}
                alt="Nang cap"
                style={{
                  width: '100%',
                  maxHeight: '76vh',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
                }}
              />
              <button
                onClick={backToRulesMenu}
                style={{
                  marginTop: '12px',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #9f3e2d 0%, #7f2e20 100%)',
                  cursor: 'pointer',
                }}
              >
                Không đủ sức nâng cấp
              </button>
            </div>
          </div>
        )}

        {phase === 'part2Video' && (
          <video
            src={part2VideoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              setPhase('part2Quiz')
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              background: '#05070c',
            }}
          />
        )}

        {phase === 'part2Quiz' && (
          <>
            <img
              src={quizBgSrc}
              alt="Part 2 background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '45.2%',
                left: '56%',
                transform: 'translate(-50%, -50%)',
                width: 'min(470px, calc(100% - 52px))',
                color: '#120b03',
                display: 'grid',
                gap: '8px',
                maxHeight: '62%',
                overflowY: 'auto',
              }}
            >
              <p style={{ margin: 0, textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>
                Phần 2 - Câu {part2Index + 1}/3
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
                {[0, 1, 2].map((idx) => {
                  const active = idx < lives
                  return (
                    <img
                      key={idx}
                      src={badgeSrc}
                      alt="badge"
                      style={{
                        width: '28px',
                        height: '28px',
                        objectFit: 'contain',
                        filter: active ? 'none' : 'grayscale(1) opacity(0.35)',
                      }}
                    />
                  )
                })}
              </div>

              <div
                style={{
                  border: '1px solid rgba(18, 11, 3, 0.28)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.28)',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '22px', lineHeight: 1.25, textAlign: 'center' }}>
                  {part2Questions[part2Index].question}
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '6px' }}>
                {part2Questions[part2Index].options.map((option, idx) => {
                  const selected = part2Selected === idx
                  const hasAnswered = part2AnswerState !== 'idle'
                  const isCorrectOption = idx === part2Questions[part2Index].correctIndex
                  const isWrongSelected = hasAnswered && selected && !isCorrectOption
                  const isCorrectMarked = hasAnswered && isCorrectOption

                  const borderColor = isCorrectMarked
                    ? 'rgba(31, 122, 60, 0.85)'
                    : isWrongSelected
                      ? 'rgba(152, 28, 28, 0.85)'
                      : selected
                        ? 'rgba(18,11,3,0.55)'
                        : 'rgba(18,11,3,0.28)'

                  const backgroundColor = isCorrectMarked
                    ? 'rgba(203, 243, 220, 0.82)'
                    : isWrongSelected
                      ? 'rgba(255, 224, 224, 0.82)'
                      : selected
                        ? 'rgba(255,235,184,0.6)'
                        : 'rgba(255,255,255,0.34)'

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        if (part2PendingNext) return
                        setPart2Selected(idx)
                        setPart2Error('')
                        setPart2AnswerText('')
                        setPart2AnswerState('idle')
                      }}
                      disabled={part2PendingNext}
                      style={{
                        textAlign: 'left',
                        padding: '8px 9px',
                        border: `1px solid ${borderColor}`,
                        background: backgroundColor,
                        color: '#0f0802',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: part2PendingNext ? 'not-allowed' : 'pointer',
                        opacity: part2PendingNext ? 0.85 : 1,
                      }}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {part2Error && (
                <p style={{ margin: '6px 0 0', color: '#7d1e11', fontWeight: 700, fontSize: '12px', textAlign: 'center' }}>
                  {part2Error}
                </p>
              )}

              {part2AnswerText && (
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: '12px',
                    lineHeight: 1.45,
                    color: part2AnswerState === 'correct' ? '#0f6a30' : '#7d1e11',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {part2AnswerText}
                </p>
              )}

              <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                  onClick={submitPart2Answer}
                  disabled={part2PendingNext}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #345fd8 0%, #243d97 100%)',
                    cursor: part2PendingNext ? 'not-allowed' : 'pointer',
                    opacity: part2PendingNext ? 0.72 : 1,
                  }}
                >
                  {part2PendingNext ? 'Đang chuyển câu...' : 'Xác nhận đáp án'}
                </button>
              </div>
            </div>
          </>
        )}

        {phase === 'gameOverVideo' && (
          <video
            src={gameOverVideoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              if (gameOverReason === 'stopped') {
                window.location.href = '/'
                return
              }

              setPhase('result')
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              background: '#05070c',
            }}
          />
        )}

        {phase === 'quiz' && (
          <>
            <img
              src={quizBgSrc}
              alt="Quiz background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: '45.2%',
                left: '56%',
                transform: 'translate(-50%, -50%)',
                width: 'min(450px, calc(100% - 50px))',
                color: '#120b03',
                display: 'grid',
                gap: '8px',
                maxHeight: '62%',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
                {[0, 1, 2].map((idx) => {
                  const active = idx < lives
                  return (
                    <img
                      key={idx}
                      src={badgeSrc}
                      alt="badge"
                      style={{
                        width: '28px',
                        height: '28px',
                        objectFit: 'contain',
                        filter: active ? 'none' : 'grayscale(1) opacity(0.35)',
                      }}
                    />
                  )
                })}
              </div>

              <div
                style={{
                  border: '1px solid rgba(18, 11, 3, 0.28)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.28)',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '22px', lineHeight: 1.25, textAlign: 'center' }}>
                  {questions[questionIndex].question}
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '6px' }}>
                {questions[questionIndex].options.map((option, idx) => {
                  const selected = selectedOption === idx
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedOption(idx)
                        setQuizError('')
                        setAnswerText('')
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '7px 8px',
                        border: selected ? '1px solid rgba(18,11,3,0.55)' : '1px solid rgba(18,11,3,0.28)',
                        background: selected ? 'rgba(255,235,184,0.6)' : 'rgba(255,255,255,0.34)',
                        color: '#0f0802',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {quizError && (
                <p style={{ margin: '6px 0 0', color: '#7d1e11', fontWeight: 700, fontSize: '12px', textAlign: 'center' }}>
                  {quizError}
                </p>
              )}

              {answerText && (
                <p
                  style={{
                    margin: '6px 0 0',
                    fontSize: '12px',
                    lineHeight: 1.45,
                    color: '#7d1e11',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {answerText}
                </p>
              )}

              <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                  onClick={submitAnswer}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #d0770d 0%, #a85a06 100%)',
                    cursor: 'pointer',
                  }}
                >
                  Xác nhận đáp án
                </button>
              </div>
            </div>
          </>
        )}

        {phase === 'reward' && rewardVideo && (
          <>
            <img
              src={quizBgSrc}
              alt="Quiz background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(5,8,16,0.55)',
                display: 'grid',
                placeItems: 'center',
                padding: '12px',
              }}
            >
              <video
                key={rewardVideo}
                src={rewardVideo}
                autoPlay
                muted
                playsInline
                onEnded={handleRewardEnded}
                style={{
                  width: 'min(900px, 88%)',
                  maxHeight: '82%',
                  borderRadius: '14px',
                  background: '#02040a',
                }}
              />
            </div>
          </>
        )}

        {phase === 'decision' && (
          <>
            <img
              src={quizBgSrc}
              alt="Quiz background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '45.5%',
                  left: '56%',
                  transform: 'translate(-50%, -50%)',
                  width: 'min(610px, calc(100% - 64px))',
                  color: '#1a1005',
                  textAlign: 'center',
                  pointerEvents: 'auto',
                }}
              >
                <p style={{ margin: 0, fontSize: '32px', lineHeight: 1.1, fontWeight: 800 }}>
                  CHÚC MỪNG
                </p>
                <p style={{ margin: '8px 0 0', fontSize: '17px', lineHeight: 1.4, fontWeight: 700 }}>
                  Chúc mừng bạn đã hoàn thành phần 1 và đã nắm sơ bộ về
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '24px', lineHeight: 1.25, fontWeight: 900 }}>
                  NGUYÊN LÝ VỀ SỰ PHÁT TRIỂN.
                </p>
                <p style={{ margin: '8px 0 0', fontSize: '17px', lineHeight: 1.4, fontWeight: 700 }}>
                  Bạn có muốn tiếp tục hành trình?
                </p>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button
                    onClick={chooseContinueJourney}
                    style={{
                      border: 'none',
                      borderRadius: '999px',
                      padding: '10px 18px',
                      fontWeight: 700,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #2f8f4f 0%, #20663a 100%)',
                      cursor: 'pointer',
                    }}
                  >
                    Có
                  </button>
                  <button
                    onClick={chooseStopJourney}
                    style={{
                      border: 'none',
                      borderRadius: '999px',
                      padding: '10px 18px',
                      fontWeight: 700,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #9f3e2d 0%, #7f2e20 100%)',
                      cursor: 'pointer',
                    }}
                  >
                    Không
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {phase === 'intro' && (
          <div style={{
            position: 'absolute',
            top: '41%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(300px, calc(100% - 44px))',
            textAlign: 'center',
            color: '#2a1a08',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 16px 16px',
            background: 'rgba(244, 232, 211, 0.26)',
            border: '1px solid rgba(72, 46, 17, 0.26)',
            borderRadius: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}>
            <p style={{
              margin: 0,
              fontSize: '12px',
              letterSpacing: '2.2px',
              textTransform: 'uppercase',
              color: 'rgba(54,32,10,0.76)',
              fontWeight: 700,
            }}>
              Web Game
            </p>

            <h2 style={{
              margin: 0,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.02,
              fontWeight: 900,
              color: '#1f1004',
            }}>
              THE CONSTANT
              <br />
              CHANGE
            </h2>

            <div style={{ width: '100%' }}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value)
                  if (nameError) setNameError('')
                }}
                placeholder="Nhập tên của bạn..."
                maxLength={30}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(50,30,10,0.35)',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#2a1a08',
                  background: 'rgba(255,255,255,0.72)',
                }}
              />
              {nameError && (
                <p style={{
                  margin: '8px 0 0',
                  color: '#7d1e11',
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  {nameError}
                </p>
              )}
            </div>

            <button
              onClick={startGame}
              style={{
                marginTop: '4px',
                width: '100%',
                padding: '12px 38px',
                fontSize: '17px',
                fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(135deg, #c8720a 0%, #a85a06 100%)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 3px 12px rgba(160,80,0,0.35)',
                transition: 'all 0.22s ease',
              }}
            >
              Bắt đầu hành trình
            </button>
          </div>
        )}

        {phase === 'part2Complete' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'auto',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '42%',
                left: '50.5%',
                transform: 'translate(-50%, -50%)',
                width: 'min(620px, calc(100% - 56px))',
                color: '#1a1005',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 800, letterSpacing: '1px' }}>
                HOÀN THÀNH HÀNH TRÌNH
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '26px', fontWeight: 900, lineHeight: 1.05 }}>
                <span style={{
                  color: '#cc0000',
                  textShadow: '0 0 0 #000, 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                  WebkitTextStroke: '1.5px #000',
                }}>{playerName.toUpperCase()}</span>
              </p>
              <p style={{ margin: '6px 0 0', fontSize: '13px', fontWeight: 800 }}>
                Đã chinh phục trọn vẹn
              </p>
              <p style={{ margin: '3px 0 0', fontSize: '16px', fontWeight: 900, lineHeight: 1.15 }}>
                PHÉP BIỆN CHỨNG DUY VẬT
              </p>

              <div
                style={{
                  marginTop: '14px',
                  border: '1px solid rgba(26,16,5,0.2)',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.42)',
                  padding: '10px 12px',
                }}
              >
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Bảng Danh Vọng</p>
                {hallOfFame.length === 0 && logStatus !== 'error' && (
                  <p style={{ margin: '6px 0 0', fontSize: '14px', fontWeight: 600 }}>
                    {logStatus === 'saving' ? 'Đang cập nhật log hoàn thành...' : 'Chưa có dữ liệu danh vọng.'}
                  </p>
                )}
                {logStatus === 'error' && (
                  <p style={{ margin: '6px 0 0', fontSize: '14px', fontWeight: 700, color: '#7d1e11' }}>
                    Không thể ghi log cho admin. Vui lòng thử lại.
                  </p>
                )}
                {hallOfFame.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'grid', gap: '4px' }}>
                    {hallOfFame.map((entry, idx) => (
                      <div
                        key={entry.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '42px 1fr auto',
                          gap: '8px',
                          alignItems: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                        }}
                      >
                        <span>#{idx + 1}</span>
                        <span style={{ textAlign: 'left' }}>{entry.playerName}</span>
                        <span>{entry.livesLeft} huy hiệu</span>
                      </div>
                    ))}
                    {hallOfFameHasMore && (
                      <p style={{ margin: '6px 0 0', fontSize: '13px', fontWeight: 700, textAlign: 'left' }}>
                        7+,....
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 13, 24, 0.72)',
              display: 'grid',
              placeItems: 'center',
              padding: '18px',
            }}
          >
            <div
              style={{
                width: 'min(460px, calc(100% - 24px))',
                borderRadius: '14px',
                background: 'rgba(0,0,0,0.52)',
                border: '1px solid rgba(255,255,255,0.24)',
                color: '#f1f6ff',
                padding: '16px 14px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '28px' }}>
                Game Over
              </h3>
              <p style={{ margin: '10px 0 0', lineHeight: 1.6 }}>
                {playerName} đã dừng lại với {unlockedPieces}/7 mảnh ghép.
              </p>
              <button
                onClick={restartQuiz}
                style={{
                  marginTop: '14px',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '11px 20px',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #d0770d 0%, #a85a06 100%)',
                  cursor: 'pointer',
                }}
              >
                Thử lại hành trình
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
