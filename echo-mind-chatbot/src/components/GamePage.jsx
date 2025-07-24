import { useState, useEffect} from 'react';

function GamePage() {
  const questions = [
    {
      question: "What is a stock?",
      options: [
        "A type of bond",
        "A share in the ownership of a company",
        "A government-issued currency",
        "A loan to a company",
      ],
      correct: 1,
    },
    {
      question: "What does IPO stand for?",
      options: [
        "International Portfolio Option",
        "Initial Public Offering",
        "Investment Profit Objective",
        "Internal Private Organization",
      ],
      correct: 1,
    },
    {
      question: "What is a dividend?",
      options: [
        "A loan repayment",
        "A tax on investments",
        "A portion of a company's profits paid to shareholders",
        "A type of stock option",
      ],
      correct: 2,
    },
    {
      question: "What is the primary purpose of a stock exchange?",
      options: [
        "To regulate banks",
        "To facilitate the buying and selling of securities",
        "To issue government bonds",
        "To set interest rates",
      ],
      correct: 1,
    },
    {
      question: "What is a bear market?",
      options: [
        "A market with rising prices",
        "A market with declining prices",
        "A stable market",
        "A market for commodities",
      ],
      correct: 1,
    },
    {
      question: "What does P/E ratio stand for?",
      options: [
        "Profit/Earnings",
        "Price/Earnings",
        "Portfolio/Equity",
        "Payment/Expense",
      ],
      correct: 1,
    },
    {
      question: "What is a mutual fund?",
      options: [
        "A single stock investment",
        "A pool of money from multiple investors to buy securities",
        "A government savings bond",
        "A type of insurance policy",
      ],
      correct: 1,
    },
    {
      question: "What is compound interest?",
      options: [
        "Interest paid only on the principal",
        "Interest earned on both principal and accumulated interest",
        "A type of loan",
        "A stock market index",
      ],
      correct: 1,
    },
    {
      question: "What is a blue-chip stock?",
      options: [
        "A new tech company stock",
        "A stock from a well-established, financially sound company",
        "A government-backed stock",
        "A high-risk stock",
      ],
      correct: 1,
    },
    {
      question: "What does ETF stand for?",
      options: [
        "Equity Trading Fund",
        "Exchange-Traded Fund",
        "Electronic Transfer Fund",
        "Emerging Technology Fund",
      ],
      correct: 1,
    },
    {
      question: "What is a bull market?",
      options: [
        "A market with declining prices",
        "A market with rising prices",
        "A market with no changes",
        "A market for bonds",
      ],
      correct: 1,
    },
    {
      question: "What is diversification in investing?",
      options: [
        "Investing all money in one stock",
        "Spreading investments across various assets",
        "Selling all investments at once",
        "Buying only government bonds",
      ],
      correct: 1,
    },
    {
      question: "What is a bond?",
      options: [
        "A share of company ownership",
        "A loan made to a borrower, typically a company or government",
        "A type of stock",
        "A mutual fund investment",
      ],
      correct: 1,
    },
    {
      question: "What is market capitalization?",
      options: [
        "The total value of a company's outstanding shares",
        "The annual profit of a company",
        "The total debt of a company",
        "The number of employees in a company",
      ],
      correct: 0,
    },
    {
      question: "What is a 401(k)?",
      options: [
        "A type of stock",
        "A retirement savings plan",
        "A government bond",
        "A hedge fund",
      ],
      correct: 1,
    },
    {
      question: "What does NASDAQ stand for?",
      options: [
        "National Association of Securities Dealers Automated Quotations",
        "North American Stock Dealers Association",
        "National Automated Stock and Quotations",
        "New American Securities and Derivatives",
      ],
      correct: 0,
    },
    {
      question: "What is a hedge fund?",
      options: [
        "A government-backed investment",
        "A pooled investment with aggressive strategies",
        "A savings account",
        "A type of bond",
      ],
      correct: 1,
    },
    {
      question: "What is a stock split?",
      options: [
        "Dividing a company's stock into multiple shares",
        "Selling all shares at once",
        "Merging two companies' stocks",
        "Buying back company shares",
      ],
      correct: 0,
    },
    {
      question: "What is inflation?",
      options: [
        "A decrease in prices",
        "An increase in the general price level of goods and services",
        "A stable economy",
        "A stock market crash",
      ],
      correct: 1,
    },
    {
      question: "What is a margin account?",
      options: [
        "An account for saving money",
        "An account allowing borrowing to purchase securities",
        "A type of mutual fund",
        "A fixed-income investment",
      ],
      correct: 1,
    },
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Select 5 random questions on component mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 5));
  }, []);

  const handleAnswer = (optionIndex) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    setSelectedOption(optionIndex);
    if (optionIndex === selectedQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    // Delay to show feedback before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < 4) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 5));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedOption(null);
  };

  if (selectedQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return (
      <div className="game-container">
        <h2>Quiz Results</h2>
        <p>Your Score: {score} / 5</p>
        <p>{score >= 3 ? 'Great job!' : 'Try again to improve your score!'}</p>
        <button className="game-button" onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="game-container">
      <h2>Finance Quiz</h2>
      <p>Question {currentQuestionIndex + 1} of 5 | Score: {score}</p>
      <div className="question">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`game-button ${
                selectedOption !== null
                  ? index === currentQuestion.correct
                    ? 'correct'
                    : selectedOption === index
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePage;