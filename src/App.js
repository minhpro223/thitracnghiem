import React, { useState, useEffect } from "react";
import QuizApp from "./QuizApp";
import CreateExamForm from "./CreateExamForm";
import CreateForm from "./CreateForm";
import CreateExamRoom from "./CreateExamRoom";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [examConfig, setExamConfig] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, remember } = loginFormData;
    const storedUser = JSON.parse(localStorage.getItem("user"));  
    
    if (username === "admin" && password === "1") {
      const user = { username: "admin", password: "1", role: "admin" };
      setCurrentUser(user);
      setLoginError("");
      setShowLogin(false);
  
      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } else {
      setLoginError("❌ Tên đăng nhập hoặc mật khẩu không đúng.");
    }
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setCurrentUser(storedUser);
      setLoginError("");
      setShowLogin(false);

      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } else {
      setLoginError("❌ Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      role: e.target.role.value || "user",
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ Đăng ký thành công!");
    setShowRegister(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleCreateQuiz = () => {
    if (!currentUser) return setShowLogin(true);
    if (currentUser.role !== "admin") {
      return alert("⚠️ Bạn phải là giáo viên để tạo đề thi.");
    }
    setCurrentPage("createExam");
  };

  const handleCreateRoom = () => {
    if (!currentUser) return setShowLogin(true);
    if (currentUser.role !== "admin" && currentUser.role !== "user") {
      return alert("⚠️ Bạn phải là giáo viên mới tạo được phòng thi.");
    }
    setCurrentPage("createRoom");
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setLoginFormData((prev) => ({
        ...prev,
        username: savedUsername,
        password: savedPassword,
        remember: true,
      }));
    }
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <h2>QuizApp</h2>
        </div>
        <div className="navbar-right">
          <button className="nav-button" onClick={() => setCurrentPage("home")}>Trang chủ</button>
          <button className="nav-button" onClick={() => setCurrentPage("result")}>Xem kết quả</button>

          {!currentUser ? (
            <>
              <button className="nav-button" onClick={toggleLogin}>Đăng nhập</button>
              <button className="nav-button" onClick={toggleRegister}>Đăng ký</button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleLogout}>Đăng xuất</button>

              {/* Nếu là admin, hiển thị các nút tạo đề thi và tạo phòng thi */}
              {currentUser.role === "admin" && (
                <>
                  <button className="nav-button" onClick={handleCreateQuiz}>Tạo đề thi</button>
                  
                </>
              )}

              {/* Nếu là user, chỉ hiển thị nút Thi */}
              {currentUser.role === "user" && (
                
                <button className="nav-button" onClick={handleCreateRoom}>Thi</button>
              )}

              <span style={{ marginRight: 10 }}>
                👤 {currentUser.username} ({currentUser.role})
              </span>
            </>
          )}
        </div>
      </div>

      {/* Modal Đăng nhập */}
      {showLogin && (
        <div className="modal">
          <div className="form-box">
            <button className="close-btn" onClick={() => setShowLogin(false)}>&times;</button>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                value={loginFormData.username}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={loginFormData.password}
                onChange={handleLoginChange}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginFormData.remember}
                  onChange={handleLoginChange}
                />
                Lưu mật khẩu
              </label>
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <button type="submit" className="submit-button">Đăng nhập</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Đăng ký */}
      {showRegister && (
        <div className="modal">
          <div className="form-box">
            <button className="close-btn" onClick={() => setShowRegister(false)}>&times;</button>
            <h3>Đăng ký</h3>
            <form onSubmit={handleRegister}>
              <input name="username" placeholder="Tên người dùng" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Mật khẩu" required />
              
              <button className="submit-button">Đăng ký</button>
            </form>
          </div>
        </div>
      )}

      {/* Nội dung các trang */}
      {currentPage === "home" && (
        <div style={{ padding: 20 }}>
          <h3>Chào mừng đến với QuizApp!</h3>
          <p>Vui lòng đăng nhập hoặc đăng ký để bắt đầu.</p>
        </div>
      )}

      {currentPage === "createExam" && (
        <CreateExamForm
          setExamConfig={setExamConfig}
          goToCreateForm={() => setCurrentPage("createForm")}
        />
      )}

      {currentPage === "createForm" && examConfig && (
        <CreateForm examConfig={examConfig}
         />
      )}

      {currentPage === "createRoom" && (
        <CreateExamRoom
          examConfig={examConfig}
          setStudentInfo={setStudentInfo}
          goToQuizApp={() => setCurrentPage("quiz")}
        />
      )}

      {currentPage === "quiz" && (
        <QuizApp
          examConfig={examConfig}
          studentInfo={studentInfo}
          setStudentAnswers={setStudentAnswers}
          goToResult={() => setCurrentPage("result")}
        />
      )}

      {currentPage === "result" && studentInfo && examConfig && (
        <div style={{ padding: 20 }}>
          <h3>📋 Kết quả làm bài</h3>
          <p><strong>Họ tên:</strong> {studentInfo.studentName}</p>
          <p><strong>MSSV:</strong> {studentInfo.studentId}</p>
          <p><strong>Phòng thi:</strong> {studentInfo.roomName}</p>
          <p><strong>Mã đề:</strong> {studentInfo.examCode}</p>

          <h4>Chi tiết bài làm:</h4>
          {(() => {
            const exam = examConfig.examCodes.find(e => e.code === studentInfo.examCode);
            let score = 0;

            return exam.questions.map((q, idx) => {
              const selected = studentAnswers[idx];
              const isCorrect = q.correctAnswer === selected;
              if (isCorrect) score++;

              return (
                <div key={idx} style={{ marginBottom: 10 }}>
                  <p><strong>Câu {idx + 1}:</strong> {q.questionText}</p>
                  <p>✅ Đáp án đúng: {String.fromCharCode(65 + q.correctAnswer)}</p>
                  <p>📝 Bạn chọn: {selected !== undefined ? String.fromCharCode(65 + selected) : "Chưa chọn"} {isCorrect ? "✅" : "❌"}</p>
                  <hr />
                </div>
              );
            });
          })()}

          <p><strong>🎯 Tổng điểm:</strong> {
            (() => {
              const exam = examConfig.examCodes.find(e => e.code === studentInfo.examCode);
              let score = 0;
              exam.questions.forEach((q, idx) => {
                if (q.correctAnswer === studentAnswers[idx]) score++;
              });
              return `${score} / ${exam.questions.length}`;
            })()
          }</p>
        </div>
      )}
    </div>
  );
}

export default App;
