import React, { useState } from "react";
import "./QuizApp.css"; // Đảm bảo file CSS này tồn tại cùng thư mục

function CreateExamForm({ setExamConfig, goToCreateForm }) {
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
      questions: 0, // Giá trị mặc định là 0 để người dùng nhập vào
      totalScore: 0,
      answers: [],
    },
  ]);

  const handleQuestionCountChange = (index, value) => {
    const num = parseInt(value); // Chuyển giá trị nhập thành số nguyên

    // Kiểm tra giá trị nhập vào hợp lệ
    if (isNaN(num) || num <= 0) return; // Nếu không phải số hợp lệ hoặc <= 0 thì không làm gì

    const updated = [...examCodes];
    updated[index].questions = num; // Cập nhật số lượng câu hỏi
    updated[index].answers = Array(num).fill(""); // Tạo mảng answers mới sao cho tương ứng với số câu hỏi
    setExamCodes(updated);
  };

  const handleTotalScoreChange = (index, value) => {
    const updated = [...examCodes];
    const score = parseFloat(value);
    updated[index].totalScore = isNaN(score) ? 0 : score; // Đảm bảo giá trị điểm là số hợp lệ
    setExamCodes(updated);
  };

  const addExamCode = () => {
    const newId = examCodes.length + 1;
    const newCode = {
      id: newId,
      questions: 0, // Để mặc định là 0 câu hỏi
      totalScore: 0,
      answers: [],
    };
    setExamCodes([...examCodes, newCode]);
  };

  const calculateScorePerQuestion = (code) => {
    if (code.questions === 0) return "0";
    return (code.totalScore / code.questions).toFixed(2); // Tính điểm mỗi câu
  };

  const handleSave = () => {
    // Kiểm tra dữ liệu hợp lệ
    if (!examName || !grade || !subject) {
      alert("❗ Vui lòng điền đầy đủ thông tin đề thi.");
      return;
    }

    if (examCodes.some((code) => code.questions <= 0 || code.totalScore <= 0)) {
      alert("❗ Mỗi mã đề cần có số lượng câu hỏi và tổng điểm lớn hơn 0.");
      return;
    }

    const examData = {
      examName,
      grade,
      subject,
      scoring,
      examCodes,
    };

    setExamConfig(examData); // Truyền dữ liệu về App.js
    goToCreateForm(); // Điều hướng sang CreateForm
    console.log("Đề thi đã được lưu:", examData);
  };

  const handleCancel = () => {
    window.location.href = "/"; // Quay về trang chủ nếu hủy
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
            placeholder="Nhập khối học..."
          />
        </div>
        <div>
          <label>Môn học:</label>
          <input
            className="form-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Nhập môn học..."
          />
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
                  handleQuestionCountChange(index, e.target.value) // Chỉ cập nhật khi có thay đổi
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
        + Tạo Mã Đề Mới
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
