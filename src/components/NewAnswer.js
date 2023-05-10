import React, { useState, useEffect } from "react";
import CaDrop from "./CaDrop";
import { Link, useNavigate } from "react-router-dom";

const NewAnswer = (props) => {
	var user = JSON.parse(localStorage.getItem("user"));
	var id = user.id;
    const questions = props.questions;
    const question = questions[0];

    const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch(`http://192.168.5.6:8000/api/answer/post/${id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + user.accessToken,
			},
			body: JSON.stringify({
                questions: question,
				body: formData.get("detail")
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.code === 200) {
					alert("Post success");
					navigate(`/list/${question.questionId}`, { refresh: Math.random() });
					window.location.reload();
				}
			})
			.catch((err) => err);
	};

    return (
		<div className="px-48 pt-4 pb-24">
			<div className="container shadow-lg shadow-indigo-100 px-8 py-8 bg-gradient-to-r from-rose-100 via-pink-100 to-fuchsia-100 rounded-3xl">
				<div>
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Post My Answer
								</h3>
								<p className="mt-1 text-sm text-gray-600">
								IIITB QA - Modern Problems require Modern Solutions
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form onSubmit={onSubmit} method="POST">
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="px-4 py-3 bg-white space-y-6 sm:p-6">
										<div>
											<label
												htmlFor="My Answer"
												className="block text-sm font-medium text-gray-700"
											>
												My Answer
											</label>
											<div className="mt-1">
												<textarea
													id="detail"
													name="detail"
													rows={5}
													className="shadow-sm focus:ring-pink-300 focus:border-pink-300 mt-2 block w-full sm:text-sm border border-gray-300 rounded-md"
													placeholder="Please provide detail description of your answer"
													defaultValue={""}
												/>
											</div>
										</div>
									</div>

									<div className="px-4 py-2 bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 text-right sm:px-6">
										<button
											type="submit"
											className="tracking-wider inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-300 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
										>
											POST
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewAnswer