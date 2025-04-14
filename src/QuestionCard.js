export default function QuestionCard({
    question,
    selectedOption,
    setSelectedOption,
  }) {
    return (
      <div className="question-card">
        <h3>{question.question}</h3>
        <ul className="options-list">
          {question.options.map((option, index) => (
            <li key={index} className="option-item">
              <label>
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  