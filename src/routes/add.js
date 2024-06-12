import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../state/slice';
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Floppy } from 'react-bootstrap-icons';

export default function View() {
  let { id } = useParams();
  id = Number(id);

  const quizData = useSelector((state) => state.quiz.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    default: false,
    id: quizData.length,
    name: '',
    cards: [
      {
        id: 0,
        term: '',
        answer: '',
        incorrectOptions: ['', '', '']
      }
    ]
  });
  const [editQuiz, setEditQuiz] = useState(false);

  useEffect(() => {
    if (id) {
      const editQuiz = quizData.find(x => x.id === id);
      if (editQuiz) {
        setQuiz(editQuiz);
      }
    }
  }, [id, quizData]);

  const handleTitleChange = (event) => {
    setQuiz({ ...quiz, name: event.target.value });
  };

  const handleQuestionChange = (event, index) => {
    let value = event.target.value;
    let field = event.target.name;

    const updatedQuestions = quiz.cards.map((question, questionIndex) => {
      if (index === questionIndex) {
        return { ...question, [field]: value };
      }
      return question;
    });
    setQuiz({ ...quiz, cards: updatedQuestions });
  };

  const handleIncorrectOptionChange = (event, questionIndex, optionIndex) => {
    let value = event.target.value;

    const updatedQuestions = quiz.cards.map((question, index) => {
      if (questionIndex === index) {
        const updatedOptions = question.incorrectOptions.map((option, i) => {
          if (i === optionIndex) {
            return value;
          }
          return option;
        });
        return { ...question, incorrectOptions: updatedOptions };
      }
      return question;
    });
    setQuiz({ ...quiz, cards: updatedQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: quiz.cards.length,
      term: '',
      answer: '',
      incorrectOptions: ['', '', '']
    };
    setQuiz({ ...quiz, cards: [...quiz.cards, newQuestion] });
  }

  const handleSubmit = () => {
    dispatch(add(quiz));

    navigate('/');
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>
            <input type="text" className="form-control fs-1" placeholder="Quiz Title" name="name" value={quiz.name} onChange={handleTitleChange}></input>
          </h1>
        </div>
        <div className="col-6 text-end">
          Total Question Count:
          <button className="btn btn-dark" style={{ marginLeft: 15 }} disabled><b>{quiz.cards.length}</b></button>
        </div>
      </div>
      {quiz.cards.map((question, index) => (
        <div key={index} className="card my-3">
          <div className="card-body">
            <h5 className="card-title text-danger mb-3">
              <input
                type="text"
                className="form-control fs-5 text-danger"
                placeholder="Term (eg. 'Current State')"
                name="term"
                value={question.term}
                onChange={(event) => handleQuestionChange(event, index)}></input>
            </h5>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Correct Answer"
              name="answer"
              value={question.answer}
              onChange={(event) => handleQuestionChange(event, index)}></input>
            <hr/>
            {question.incorrectOptions.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                className="form-control mt-2"
                placeholder={`Incorrect Option #${optionIndex + 1}`}
                value={option}
                onChange={(event) => handleIncorrectOptionChange(event, index, optionIndex)}></input>
            ))}
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col text-end">
          <button className="btn btn-dark" onClick={handleSubmit}>Save Quiz <Floppy/></button>
          <button className="btn btn-success" style={{ marginLeft: 10 }} onClick={handleAddQuestion}>Add Question <Plus/></button>
        </div>
      </div>
    </div>
  )
}

function numberToLetter(number) {
  return ((number + 9).toString(36).toUpperCase());
}
