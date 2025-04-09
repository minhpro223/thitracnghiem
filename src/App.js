import React, { useState } from "react";
import QuizApp from "./QuizApp";
import CreateExamForm from "./CreateExamForm";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [showCreateExam, setShowCreateExam] = useState(false); // Hiện giao diện tạo đề
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, password, email, role })
    );
    setShowRegister(false);
    alert("Đăng ký thành công!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setCurrentUser(storedUser);
      setLoginError("");
      setShowLogin(false);
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStartQuiz(false);
    setShowCreateExam(false);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleCreateQuiz = () => {
    if (!currentUser) {
      setShowLogin(true);
    } else if (currentUser.role !== "admin") {
      alert("Bạn phải là quản trị viên để tạo đề thi.");
    } else {
      setShowCreateExam(true); // Hiện giao diện tạo đề
      setStartQuiz(false);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <h2>QuizApp</h2>
        </div>
        <div className="navbar-right">
          <button className="nav-button" onClick={handleGoHome}>
            Trang chủ
          </button>
          {!currentUser ? (
            <>
              <button className="nav-button" onClick={toggleLogin}>
                Đăng nhập
              </button>
              <button className="nav-button" onClick={toggleRegister}>
                Đăng ký
              </button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          )}
          <button className="nav-button" onClick={handleCreateQuiz}>
            Tạo đề thi
          </button>
          <button className="nav-button">Xem Kết Quả</button>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="form-box">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h3>Đăng nhập</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                required
              />
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <button className="submit-button" type="submit">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal">
          <div className="form-box">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h3>Đăng ký</h3>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="username"
                placeholder="Tên người dùng"
                required
              />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                required
              />
              <select name="role" required>
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị viên</option>
              </select>
              <button className="submit-button" type="submit">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Giao diện tạo đề nếu là admin */}
      {showCreateExam && currentUser?.role === "admin" && <CreateExamForm />}

      {/* Giao diện làm bài thi */}
      {startQuiz && numberOfQuestions && (
        <div className="quiz-container">
          <h1 className="quiz-title">Thi Giữa Kỳ - năm học 2025-2026</h1>
          <h2 className="quiz-subtitle">
            Môn: Xây Dựng Phần Mềm Web - Thời gian: 30 phút
          </h2>
          <p className="quiz-warning">Lưu ý: Không sử dụng tài liệu</p>
          <QuizApp numQuestions={numberOfQuestions} />
        </div>
      )}
    </div>
  );
}

export default App;
