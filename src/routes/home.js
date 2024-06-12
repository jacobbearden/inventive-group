import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../state/slice';
import { Pencil, Trash, ArrowRight } from 'react-bootstrap-icons';

export default function Home() {
  const quizData = useSelector((state) => state.quiz.value);
  const dispatch = useDispatch();

  const handleDelete = (event, id) => {
    dispatch(remove(id));
  }

  return(
    <div className="container">
      <div className="row">
        {quizData.map((quiz, index) => (
          <div key={quiz.id} className="col-4">
            <div className="card mb-5" id={quiz.id}>
              <div className="card-body">
                <h2 className="card-title text-center text-danger mb-3">{quiz.name}</h2>
                <div className="text-end mt-2">
                  {quiz.default ? null : (
                    <>
                      <a href={`#/edit/${quiz.id}`} className="card-link btn btn-dark" title="Edit"><Pencil/></a>
                      <a href="#" className="card-link btn btn-danger" title="Delete" onClick={(event) => handleDelete(event, quiz.id)}><Trash/></a>
                    </>
                  )}
                  <a href={`#/view/${quiz.id}`} className="card-link btn btn-success">Take Quiz <ArrowRight/></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
