import React, { useState } from "react";

function CreateExamRoom({ examConfig, goToQuizApp, currentUser }) {
  const [inputCode, setInputCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  const [selectedExamInfo, setSelectedExamInfo] = useState(null); // ✅ Lưu đề đã chọn

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  // ❌ Chặn admin không được vào phòng thi
  if (currentUser?.role === "admin") {
    return (
      <div className="center-screen">
        <div className="form-box">
          <h2>Không thể vào phòng thi</h2>
          <p style={{ color: "red" }}>
            Tài khoản quản trị viên không được phép tham gia thi.
          </p>
        </div>
      </div>
    );
  }

  const handleCheckCode = (e) => {
    e.preventDefault();
    const examIndex = parseInt(inputCode) - 1;

    if (
      examConfig?.examCodes &&
      examIndex >= 0 &&
      examIndex < examConfig.examCodes.length
    ) {
      const selected = examConfig.examCodes[examIndex];
      setSelectedExamInfo(selected); // ✅ Lưu thông tin đề
      setIsCodeValid(true);
    } else {
      alert("❌ Mã đề không hợp lệ.");
    }
  };

  const handleStartExam = (e) => {
    e.preventDefault();
    const studentData = {
      roomName,
      examCode: inputCode,
      studentName,
      studentId,
    };

    console.log("✅ Vào thi với:", studentData);
    alert("✅ Vào thi thành công!");

    // Gọi hàm cha để chuyển trang sang QuizApp
    goToQuizApp(studentData);
  };

  return (
    <div className="center-screen">
      <div className="form-box">
        <h3>Vào phòng thi</h3>

        {!isCodeValid ? (
          <form onSubmit={handleCheckCode}>
            <label>Nhập mã đề:</label>
            <input
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              required
              placeholder="VD: 1"
            />
            <label>Tên phòng thi:</label>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
            <button className="submit-button">Kiểm tra mã đề</button>
          </form>
        ) : (
          <form onSubmit={handleStartExam}>
            <p style={{ color: "green" }}>✅ Mã đề hợp lệ</p>

            {/* ✅ Thông báo chi tiết đề */}
            <div className="exam-info-box">
              <p>
                <strong>Số câu hỏi:</strong> {selectedExamInfo?.questionsData?.length || 0}
              </p>
              <p>
                <strong>Thời gian làm bài 30 phút</strong> {examConfig.duration} 
              </p>
            </div>

            <label>Họ tên sinh viên:</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <label>MSSV:</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <button className="submit-button">Bắt đầu thi</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateExamRoom;
