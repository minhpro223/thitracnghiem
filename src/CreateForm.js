import React, { useState } from "react";
import "./QuizApp.css";

function CreateForm({ examConfig, onFinish }) {
  const [formData, setFormData] = useState(
    examConfig.examCodes.map((code) => ({
      id: code.id,
      questions: Array(code.questions)
        .fill()
        .map(() => ({
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        })),
    }))
  );

  const handleQuestionChange = (examIndex, qIndex, value) => {
    const updated = [...formData];
    updated[examIndex].questions[qIndex].questionText = value;
    setFormData(updated);
  };

  const handleOptionChange = (examIndex, qIndex, optIndex, value) => {
    const updated = [...formData];
    updated[examIndex].questions[qIndex].options[optIndex] = value;
    setFormData(updated);
  };

  const handleCorrectAnswerChange = (examIndex, qIndex, value) => {
    const updated = [...formData];
    updated[examIndex].questions[qIndex].correctAnswer = parseInt(value);
    setFormData(updated);
  };

  const handleSubmit = () => {
    const fullExam = {
      ...examConfig,
      examCodes: examConfig.examCodes.map((code, index) => ({
        ...code,
        questionsData: formData[index].questions,
      })),
    };

    localStorage.setItem("examConfig", JSON.stringify(fullExam));
    alert("✅ Đề thi đã được tạo và lưu thành công!");

    if (onFinish) {
      onFinish(); // 👉 Quay về trang chủ sau khi lưu
    }
  };

  return (
    <div className="create-exam-container">
      <h2 className="form-title">Nhập Câu hỏi</h2>
      <h4 className="form-subtitle">
        Tên đề: {examConfig.examName} | {examConfig.grade} -{" "}
        {examConfig.subject}
      </h4>

      {formData.map((exam, examIndex) => (
        <div key={exam.id}>
          <h3 className="form-subtitle">Mã đề {exam.id}</h3>
          {exam.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-box">
              <h4>Câu {qIndex + 1}</h4>
              <input
                className="form-input"
                placeholder="Nhập nội dung câu hỏi"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(examIndex, qIndex, e.target.value)
                }
              />

              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  className="form-input"
                  placeholder={`Đáp án ${String.fromCharCode(65 + optIndex)}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(
                      examIndex,
                      qIndex,
                      optIndex,
                      e.target.value
                    )
                  }
                />
              ))}

              <label>Đáp án đúng:</label>
              <select
                className="form-input"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(examIndex, qIndex, e.target.value)
                }
              >
                <option value={0}>A</option>
                <option value={1}>B</option>
                <option value={2}>C</option>
                <option value={3}>D</option>
              </select>
            </div>
          ))}
        </div>
      ))}

      <button className="button-black" onClick={handleSubmit}>
        Hoàn tất và lưu đề
      </button>
    </div>
  );
}

export default CreateForm;
