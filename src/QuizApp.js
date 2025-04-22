import React, { useEffect, useState } from "react";

function QuizApp({ onRetry, onCreateNewRoom }) {
  const [studentData, setStudentData] = useState({
    studentName: "Nguyễn Văn B",
    studentId: "123456789",
    examCode: "EX123",
    roomName: "Phòng 1",
  });

  const [examConfig, setExamConfig] = useState({
    examCodes: [
      {
        code: "EX123",
        questionsData: [
          {
            questionText: "Câu hỏi 1: question la cai cho gi === ?",
            options: [
              "mot cai gi do rat xam lz",
              "dung hoi nưa khong muon biet",
              "len chatgpt di choi ",
              "hahahahahahaha",
            ],
            correctAnswer: 1,
          },
          {
            questionText: "Câu hỏi 2: 3 + 5 = ?",
            options: ["7", "8", "9", "10"],
            correctAnswer: 1,
          },
          {
            questionText: "Câu hỏi 3: 5 + 7 = ?",
            options: ["11", "12", "13", "14"],
            correctAnswer: 1,
          },
        ],
      },
    ],
  });

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isExamOver, setIsExamOver] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isPassed, setIsPassed] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menu toggle

  useEffect(() => {
    if (isExamOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamOver]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...studentAnswers];
    newAnswers[questionIndex] = answerIndex;
    setStudentAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsExamOver(true);
    const exam = examConfig.examCodes.find(
      (e) => e.code === studentData.examCode
    );

    let correctCount = 0;
    exam.questionsData.forEach((q, index) => {
      if (studentAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = exam.questionsData.length;
    const passed = correctCount >= Math.ceil(total / 2);

    setScore(correctCount);
    setIsPassed(passed);
  };

  const handleRetry = () => {
    setTimeLeft(30 * 60);
    setIsExamOver(false);
    setStudentAnswers([]);
    setScore(null);
    setIsPassed(null);

    if (onRetry) onRetry();
  };

  const handleCreateNewRoom = () => {
    setStudentData({
      studentName: "",
      studentId: "",
      examCode: "",
      roomName: "",
    });

    if (onCreateNewRoom) onCreateNewRoom();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const currentQuestions = examConfig.examCodes[0].questionsData;

  return (
    <div className="quiz-container relative p-4">
      {/* Menu icon fixed top-right */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        title="Xem danh sách câu hỏi"
      >
        ☰
      </button>

      {/* Menu content */}
      {isMenuOpen && (
        <div className="question-menu">
          <h4>Danh sách câu hỏi</h4>
          <ul>
            {currentQuestions.map((_, index) => (
              <li key={index}>Câu {index + 1}</li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="text-xl font-bold mt-2">
        Đề {studentData.examCode} - Phòng {studentData.roomName}
      </h2>
      <p>
        Họ tên: {studentData.studentName} - MSSV: {studentData.studentId}
      </p>
      <p>Số câu hỏi: {currentQuestions.length}</p>

      <div className="timer mt-2">
        <h4 className="text-red-500 font-semibold">
          Thời gian còn lại: {formatTime(timeLeft)}
        </h4>
        {isExamOver && <p className="text-red-600">Thời gian đã hết!</p>}
      </div>

      {currentQuestions.map((q, index) => (
        <div key={index} className="question-box1 my-4">
          <h4 className="font-semibold">
            Câu {index + 1}: {q.questionText}
          </h4>
          <div className="answer-grid grid grid-cols-1 gap-2 mt-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q${index}`}
                  value={i}
                  checked={studentAnswers[index] === i}
                  onChange={() => handleAnswerChange(index, i)}
                  disabled={isExamOver}
                />
                <span>
                  {String.fromCharCode(65 + i)}. {opt}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {!isExamOver && (
        <button
          className="submit-button bg-blue-500 text-white p-2 mt-4 rounded"
          onClick={handleSubmit}
        >
          Nộp bài
        </button>
      )}

      {isExamOver && score !== null && (
        <div className="result mt-4">
          <h3>Thông tin thí sinh:</h3>
          <p>
            <strong>Họ tên:</strong> {studentData.studentName}
          </p>
          <p>
            <strong>MSSV:</strong> {studentData.studentId}
          </p>
          <p>
            <strong>Mã đề:</strong> {studentData.examCode}
          </p>
          <p>
            <strong>Phòng thi:</strong> {studentData.roomName}
          </p>
          <h3>
            Kết quả:{" "}
            <span
              style={{
                color: isPassed ? "green" : "red",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {isPassed ? "ĐẠT" : "KHÔNG ĐẠT"}
            </span>{" "}
            ({score}/{currentQuestions.length} câu đúng)
          </h3>
          <button
            onClick={handleRetry}
            className="retry-button bg-yellow-500 text-white p-2 mt-2 rounded"
          >
            Thi lại
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
