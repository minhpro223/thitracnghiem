import React, { useEffect, useState } from "react";

function QuizApp() {
  const [studentData, setStudentData] = useState(null);
  const [examConfig, setExamConfig] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 phút = 30 * 60 giây
  const [isExamOver, setIsExamOver] = useState(false); // Kiểm tra xem thời gian đã hết chưa
  const [studentAnswers, setStudentAnswers] = useState([]);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("studentData"));
    const storedExam = JSON.parse(localStorage.getItem("examConfig"));
    setStudentData(storedStudent);
    setExamConfig(storedExam);

    // Tạo bộ đếm thời gian giảm dần mỗi giây
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Dừng bộ đếm khi hết thời gian
          setIsExamOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi component unmount
  }, []);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...studentAnswers];
    newAnswers[questionIndex] = answerIndex;
    setStudentAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Lưu kết quả làm bài hoặc chuyển đến trang kết quả
    localStorage.setItem("studentAnswers", JSON.stringify(studentAnswers));
    alert("Bài thi đã được nộp!");
    // Chuyển đến trang kết quả nếu có
  };

  if (!studentData || !examConfig) return <p>Đang tải dữ liệu...</p>;

  const exam = examConfig.examCodes.find(
    (e) => e.code === studentData.examCode
  );

  if (!exam || !exam.questionsData)
    return <p>Không tìm thấy đề thi phù hợp!</p>;

  // Hàm chuyển đổi thời gian còn lại sang định dạng MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="quiz-container">
      <h2>
        Đề {studentData.examCode} - Phòng {studentData.roomName}
      </h2>
      <p>
        Họ tên: {studentData.studentName} - MSSV: {studentData.studentId}
      </p>
      <p>Số câu hỏi: {exam.questionsData.length}</p>

      <div className="timer">
        <h4>Thời gian còn lại: {formatTime(timeLeft)}</h4>
        {isExamOver && <p>Thời gian đã hết!</p>}
      </div>

      {exam.questionsData.map((q, index) => (
        <div key={index} className="question-box">
          <h4>
            Câu {index + 1}: {q.questionText}
          </h4>
          {q.options.map((opt, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`q${index}`}
                  value={i}
                  checked={studentAnswers[index] === i}
                  onChange={() => handleAnswerChange(index, i)}
                  disabled={isExamOver} // Disable câu hỏi khi hết thời gian
                />
                {String.fromCharCode(65 + i)}. {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {!isExamOver && (
        <button className="submit-button" onClick={handleSubmit}>
          Nộp bài
        </button>
      )}
    </div>
  );
}

export default QuizApp;
