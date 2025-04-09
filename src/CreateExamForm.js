import React, { useState } from "react";
import "./QuizApp.css"; // Đảm bảo file CSS này tồn tại cùng thư mục
const handleCancel = () => {
  window.location.href = "/";
};

function CreateExamForm() {
  const [examName, setExamName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [scoring, setScoring] = useState({
    correct1: "",
    correct2: "",
    correct3: "",
    correct4: "",
  });

  const [examCodes, setExamCodes] = useState([
    {
      id: 1,
      questions: 5,
      totalScore: 8,
      answers: Array(5).fill(""),
    },
  ]);

  const handleQuestionCountChange = (index, value) => {
    const updated = [...examCodes];
    const num = parseInt(value);
    updated[index].questions = num;
    updated[index].answers = Array(num).fill("");
    setExamCodes(updated);
  };

  const handleTotalScoreChange = (index, value) => {
    const updated = [...examCodes];
    updated[index].totalScore = parseFloat(value);
    setExamCodes(updated);
  };

  const addExamCode = () => {
    setExamCodes([
      ...examCodes,
      {
        id: examCodes.length + 1,
        questions: 5,
        totalScore: 10,
        answers: Array(5).fill(""),
      },
    ]);
  };

  const calculateScorePerQuestion = (code) => {
    return (code.totalScore / code.questions).toFixed(2);
  };

  const handleSave = () => {
    alert("Đề thi đã được lưu!");
    // Xử lý lưu backend nếu cần
  };

  return (
    <div className="create-exam-container">
      <h2 className="form-title">Tạo đề thi</h2>

      <div className="form-group">
        <label>Tên đề:</label>
        <input
          className="form-input"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          placeholder="Nhập tên đề..."
        />
      </div>

      <div className="form-group-row">
        <div>
          <label>Khối học:</label>
          <input
            className="form-input"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Nhập khối học....."
          ></input>
        </div>
        <div>
          <label>Môn học:</label>
          <input
            className="form-input"
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Nhập môn học......"
          ></input>
        </div>
      </div>

      <h4 className="form-subtitle">Danh sách mã đề</h4>
      {examCodes.map((code, index) => (
        <div key={index} className="exam-code-box">
          <div className="form-group-row">
            <label>
              Số lượng câu hỏi:
              <input
                type="number"
                min="1"
                className="form-input"
                value={code.questions}
                onChange={(e) =>
                  handleQuestionCountChange(index, e.target.value)
                }
              />
            </label>
            <label>
              Tổng điểm:
              <input
                type="number"
                min="0"
                className="form-input"
                value={code.totalScore}
                onChange={(e) => handleTotalScoreChange(index, e.target.value)}
              />
            </label>
            <span className="score-per-question">
              Mỗi câu: {calculateScorePerQuestion(code)} điểm
            </span>
          </div>
        </div>
      ))}

      <button onClick={addExamCode} className="button-green">
        + Thêm mã đề
      </button>

      <div className="form-group-row">
        <button onClick={handleSave} className="button-black">
          Lưu
        </button>
        <button onClick={handleCancel} className="button-gray">
          Hủy
        </button>
      </div>
    </div>
  );
}

export default CreateExamForm;
