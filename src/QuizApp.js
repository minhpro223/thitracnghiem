import { useState, useEffect } from "react";
import "./QuizApp.css";

const quizData = [
  {
    question: "React là gì?",
    options: [
      "Thư viện JavaScript",
      "Ngôn ngữ lập trình",
      "Hệ điều hành",
      "Phần cứng",
    ],
    answer: "Thư viện JavaScript",
  },
  {
    question: "JSX trong React là gì?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JavaScript Extension",
      "JSON Syntax",
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Hook trong React dùng để làm gì?",
    options: ["Quản lý state", "Tạo component", "Xử lý sự kiện", "Thêm style"],
    answer: "Quản lý state",
  },
  {
    question: "Component trong React là gì?",
    options: [
      "Một chức năng",
      "Một thành phần giao diện",
      "Một biến",
      "Một đối tượng",
    ],
    answer: "Một thành phần giao diện",
  },
  {
    question: "State trong React được sử dụng để làm gì?",
    options: [
      "Lưu trữ dữ liệu động",
      "Định nghĩa CSS",
      "Tạo API",
      "Làm hiệu ứng",
    ],
    answer: "Lưu trữ dữ liệu động",
  },
  {
    question: "Props trong React có tác dụng gì?",
    options: [
      "Truyền dữ liệu giữa các component",
      "Định nghĩa CSS",
      "Tạo sự kiện",
      "Lưu trữ dữ liệu động",
    ],
    answer: "Truyền dữ liệu giữa các component",
  },
  {
    question: "React Router dùng để làm gì?",
    options: [
      "Quản lý route trong ứng dụng",
      "Quản lý state",
      "Tạo component",
      "Gọi API",
    ],
    answer: "Quản lý route trong ứng dụng",
  },
  {
    question: "useEffect trong React được dùng để làm gì?",
    options: [
      "Xử lý side effect",
      "Tạo component",
      "Quản lý state",
      "Xử lý sự kiện",
    ],
    answer: "Xử lý side effect",
  },
  {
    question: "React Virtual DOM có tác dụng gì?",
    options: [
      "Tăng hiệu suất render",
      "Lưu trữ dữ liệu",
      "Tạo API",
      "Quản lý component",
    ],
    answer: "Tăng hiệu suất render",
  },
  {
    question: "useState trong React dùng để làm gì?",
    options: [
      "Quản lý state",
      "Tạo component",
      "Xử lý sự kiện",
      "Định nghĩa CSS",
    ],
    answer: "Quản lý state",
  },
];

export default function QuizApp({ numQuestions }) {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    id: "",
    class: "",
  });
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [questionPage, setQuestionPage] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const questionsPerPage = 5;

  useEffect(() => {
    if (started && !submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [started, submitted, timeLeft]);

  const handleStart = () => {
    if (studentInfo.name && studentInfo.id && studentInfo.class) {
      setStarted(true);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin sinh viên!");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOptions({});
    setSubmitted(false);
    setStarted(false);
    setTimeLeft(30 * 60);
    setQuestionPage(0);
  };

  const handleNextPage = () => {
    if ((questionPage + 1) * questionsPerPage < numQuestions) {
      setQuestionPage(questionPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (questionPage > 0) {
      setQuestionPage(questionPage - 1);
    }
  };

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  const score = Object.keys(selectedOptions).reduce(
    (acc, key) =>
      selectedOptions[key] === quizData[key].answer ? acc + 1 : acc,
    0
  );

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const displayedQuestions = quizData.slice(0, numQuestions); // Only slice based on the selected questions

  const getResult = () => {
    const passingScore = Math.ceil(numQuestions / 2); // Consider passing when user gets more than half right
    if (score >= passingScore) {
      return `Chúc mừng! Bạn đã đạt. Điểm của bạn là ${score}/${numQuestions}.`;
    } else {
      return `Bạn chưa đạt. Điểm của bạn là ${score}/${numQuestions}. Cố gắng lần sau!`;
    }
  };

  return (
    <div className="quiz-container">
      
      
      {started ? (
        <>
          <div className="timer">Thời gian còn lại: {formatTime(timeLeft)}</div>
          <button className="menu-button" onClick={toggleMenu}>
            &#9776;
          </button>

          {isMenuVisible && (
            <div className="question-menu">
              
              <ul>
                {displayedQuestions.map((item, index) => (
                  <ul key={index}>
                    <button
                      className={`question-item ${
                        selectedOptions[index] ? "answered" : "unanswered"
                      } ${currentQuestion === index ? "active" : ""}`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      Câu {index + 1}
                    </button>
                    
                  </ul>
                ))}
              </ul>
              
              
             
              
              
              
              
            </div>
            
            
          )}
        
        
          <div className="question-card">
            <h3>
              Câu {currentQuestion + 1}:{" "}
              {displayedQuestions[currentQuestion].question}
            </h3>
            <ul className="options-list">
              {displayedQuestions[currentQuestion].options.map(
                (option, index) => (
                  <li key={index} className="option-item">
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={selectedOptions[currentQuestion] === option}
                        onChange={() =>
                          setSelectedOptions({
                            ...selectedOptions,
                            [currentQuestion]: option,
                          })
                        }
                      />
                      {option}
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="question-navigation">
            <button onClick={handlePrevPage} disabled={questionPage === 0}>
              &lt;
            </button>
            {displayedQuestions
              .slice(
                questionPage * questionsPerPage,
                (questionPage + 1) * questionsPerPage
              )
              .map((_, index) => (
                <button
                  key={index}
                  className="question-nav-button"
                  onClick={() =>
                    setCurrentQuestion(questionPage * questionsPerPage + index)
                  }
                >
                  {questionPage * questionsPerPage + index + 1}
                </button>
              ))}
            <button
              onClick={handleNextPage}
              disabled={
                (questionPage + 1) * questionsPerPage >=
                displayedQuestions.length
              }
            >
              &gt;
            </button>
          </div>

          <div className="button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Nộp bài
            </button>
          </div>
        </>
      ) : (
        <div className="student-info">
          <h3>Nhập thông tin sinh viên</h3>
          <input
            type="text"
            placeholder="Họ và tên"
            value={studentInfo.name}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Mã sinh viên"
            value={studentInfo.id}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, id: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Tên Lớp"
            value={studentInfo.class}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, class: e.target.value })
            }
          />
          <button className="start-button" onClick={handleStart}>
            Bắt đầu thi
          </button>
        </div>
      )}

      {/* Show the result after submission */}
      {submitted && (
        <div className="result">
          <h3>Kết quả thi</h3>
          <p>Họ và tên: {studentInfo.name}</p>
          <p>Mã sinh viên: {studentInfo.id}</p>
          <p>Lớp: {studentInfo.class}</p>
          <p>{getResult()}</p>
          <button className="retry-button" onClick={handleRetry}>
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
}
