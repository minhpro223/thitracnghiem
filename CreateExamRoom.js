import React, { useState } from "react";

function CreateExamRoom({ examConfig, goToQuizApp }) {
  const [inputCode, setInputCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleCheckCode = (e) => {
    e.preventDefault();
    const validCodes = examConfig?.examCodes?.map((_, i) => `${i + 1}`);
    if (validCodes?.includes(inputCode)) {
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

    // Gọi hàm cha để chuyển trang
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
              placeholder="VD:1"
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
