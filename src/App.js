import "./App.css";
import { useState } from "react";
import questions from "./db.json";
import { Box, Button, Container } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextButtonClick = () => {
    if (selectedOption && selectedOption.isCorrect) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion === questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePrevButtonClick = () => {
    if (currentQuestion === 0) {
      return; // do nothing if we're already at the first question
    }

    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestartButtonClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "lightGrey",
        minHeight: "100vh",
        position: "absolute",
      }}
    >
      <div className="box">
        {showScore ? (
          <div className="score-section">
            <h1>
              Your Score: {score} / {questions.length}
            </h1>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRestartButtonClick}
            >
              Restart Quiz
            </Button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <h1 style={{ color: "" }}>
                Question {currentQuestion + 1} / {questions.length}
              </h1>
              <div className="questionArea">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="options-section">
              {questions[currentQuestion].options.map((option) => (
                <div>
                  <Button
                    key={option.id}
                    variant="contained"
                    color={selectedOption === option ? "success" : "secondary"}
                    onClick={() => handleOptionClick(option)}
                    sx={{
                      marginBottom: "10px",
                      width: "300px",
                      marginTop: "10px",
                    }}
                  >
                    {option.text}
                  </Button>
                </div>
              ))}
            </div>
            <Box sx={{ display: "flex", marginLeft: "3%" }}>
              {currentQuestion !== 0 && (
                <Button
                  variant="contained"
                  sx={{ marginRight: "0px" }}
                  onClick={handlePrevButtonClick}
                >
                  <ArrowLeft />
                  Previous Question
                </Button>
              )}
              <div
                className="next-button"
                onClick={handleNextButtonClick}
                disabled={!selectedOption}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "20%",
                }}
              >
                {currentQuestion === questions.length - 1 ? (
                  <Button variant="contained" color="success">
                    Finish Quiz!
                  </Button>
                ) : (
                  <Button variant="contained">
                    Next Question
                    <ArrowRight />
                  </Button>
                )}
              </div>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
