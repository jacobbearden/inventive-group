import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function View() {
  let { id } = useParams();
  id = Number(id);

  const quizData = useSelector((state) => state.quiz.value).filter(x => x.id === id)[0];

  const [formattedQuiz, setFormattedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);

  useEffect(() => {
    const formatted = {
      ...quizData,
      cards: quizData.cards.map((card) => ({
        ...card,
        randomizedOptions: [card.answer, ...card.incorrectOptions]
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }))
    };
    setFormattedQuiz(formatted);
  }, [quizData]);

  if (!formattedQuiz) return null;
  const totalQuestions = formattedQuiz.cards.length;

  const handleSelect = (option) => {
    setSelectedAnswer(option);
  }

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers.push(selectedAnswer);
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex === totalQuestions - 1) {
      let correctAnswersCount = correctCount;
      updatedAnswers.forEach((answer, index) => {
        if (answer === formattedQuiz.cards[index].answer) {
          correctAnswersCount += 1;
        }
      });
      setCorrectCount(correctAnswersCount);

      setShowEndScreen(true);
      return;
    }

    setSelectedAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>{formattedQuiz.name}</h1>
        </div>
        <div className="col-6 text-end">
          <button className="btn btn-dark" disabled><b>{currentQuestionIndex + 1}</b> / {totalQuestions}</button>
        </div>
      </div>
      {!showEndScreen && (
        <>
          <div className="card my-3">
            <div className="card-body">
              <h5 className="card-title text-danger mb-3">
                {currentQuestionIndex + 1}.
                What is <b>{formattedQuiz.cards[currentQuestionIndex].term}</b>?
              </h5>
              {formattedQuiz.cards[currentQuestionIndex].randomizedOptions.map((option, index) => (
                <a key={index} className={`btn btn-light d-block mt-2 text-start ${selectedAnswer === option ? 'active': ''}`} onClick={() => handleSelect(option)}>{numberToLetter(index + 1)}. {option}</a>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              {selectedAnswer === '' && (
                <span className="text-muted" style={{ marginRight: 15 }}>Please Select an Answer</span>
              )}
              <button className="btn btn-success" onClick={handleNext} disabled={selectedAnswer === ''}>Next</button>
            </div>
          </div>
        </>
      )}
      {showEndScreen && (
        <div className="card my-3 mx-auto" style={{ maxWidth: '45%' }}>
          <div className="card-body text-center">
            <h1 className="card-title mb-3">Quiz Complete</h1>
            <h4 className="card-subtitle mb-2 text-muted">You Scored:</h4>
            <h1 className="m-5">{Math.round((correctCount/totalQuestions) * 100)}%</h1>
            <a className="btn btn-success" href={`/`}><ArrowLeft/> Return Home</a>
          </div>
        </div>
      )}
    </div>
  )
}

function numberToLetter(number) {
  return ((number + 9).toString(36).toUpperCase());
}
