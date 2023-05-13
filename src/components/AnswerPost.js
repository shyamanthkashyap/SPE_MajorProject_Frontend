import React, { useState } from "react";
import avator from "../pics/boxer.png";
import { Link, NavLink } from "react-router-dom";
import AnswerService from "../service/AnswerService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuestionService from "../service/QuestionService";
import UserService from "../service/UserService";

const AnswerPost = (props) => {
  var user = JSON.parse(localStorage.getItem("user"));
  var id = user.id;
  const navigate = useNavigate();
  const answers = props.answers;
  const question = props.questions;

  console.log(question);

  const refreshPage = () => {
    window.location.reload();
    navigate(0);
  };

  const handleBestAnswer = async (questionId, answerId, answer) => {
    var response = await QuestionService.listOne(questionId);
    //console.log(response.data.data);
    response.data.data.bestAnswerId = answerId;
    // console.log(response.data.data);
    // console.log(answer.user.userId);
    UserService.updatePoints(answer.user.userId);
    fetch(`http://localhost:8000/api/question/updateBestAnswer/${questionId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify(response.data.data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshPage();
      })
      .catch((err) => err);
  };

  const handleLike = (answer) => {
    fetch(`http://localhost:8000/api/answer/like/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify(answer),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshPage();
      })
      .catch((err) => err);
  };

  return (
    <div className="container mx-auto px-4 sm:px-3 md:px-5 py-8 overflow-hidden">
      <ul className="space-y-8">
        {answers.map((answer) => (
          <li className="text-sm leading-6 " key={answer.answerId}>
            <figure className="relative flex flex-col-reverse bg-gradient-to-r from-violet-50 to-violet-100 shadow-sm rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
              <div className="flex mt-2 justify-between">
                <div className="mt-3 ml-3 text-slate-700 dark:text-slate-300 self-baseline">
                  {question[0].user.userId === user.id ? (
                    !answer.questions.bestAnswerId ? (
                      answer.user.userId === user.id ? (
                        <div></div>
                      ) : (
                        <button
                          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          onClick={() => {
                            handleBestAnswer(
                              answer.questions.questionId,
                              answer.answerId,
                              answer
                            );
                          }}
                        >
                          Best Answer
                        </button>
                      )
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div></div>
                  )}
                  {answer.questions.bestAnswerId === answer.answerId ? (
                    <div class="flex space-x-4">
                      <svg
                        class="w-9 h-9 dark:text-white"
                        fill="none"
                        color="green"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Link
                    style={{ marginLeft: "30px" }}
                    to={{ pathname: `/list/${answer.questions.questionId}` }}
                  >
                    Posted in "{answer.questions.title}"
                  </Link>
                </div>
                <div className="flex ">
                  <button
                    onClick={() => {
                      handleLike(answer);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#c084fc"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                  <div className="h-8 w-8 ml-2 text-xl subpixel-antialiased text-indigo-400 mt-1">
                    {answer.likes}
                  </div>
                </div>
              </div>

              <figcaption className="flex items-center space-x-4">
                <img
                  src={avator}
                  alt=""
                  className="flex-none w-14 h-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex-auto">
                  <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                    <a>{answer.body}</a>
                  </div>
                  <div style={{display:"inline-flex"}}>
                  <div className="mt-0.5">
                    Posted by {answer.user.username}{" "}
                    {answer.user.points >= 7 ? (
                      <img src={require("../pics/gold.png")} alt="goldie" style={{width:"20px",height:"20px"}}></img>
                    ) : answer.user.points >= 5 ? (
                      <div><img src={require("../pics/silver.png")} alt="silver" style={{width:"20px",height:"20px"}}></img></div>
                    ) : answer.user.points >= 2 ? (
                      <img src={require("../pics/bronze.png")} alt="bronze" style={{width:"20px",height:"20px"}}></img>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerPost;
