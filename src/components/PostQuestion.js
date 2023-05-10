import React, { useState, useEffect } from "react";
import CaDrop from "./CaDrop";
import { Link, useNavigate } from "react-router-dom";

const PostQuestion = () => {
	var user = JSON.parse(localStorage.getItem("user"));
	var id = user.id;

	const navigate = useNavigate();
	const [categoryId, setCategoryId] = useState("");
	const [ctgy, setCtgy] = useState();

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch(`http://172.18.0.20:8000/api/question/post/${id}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + user.accessToken,
			},
			body: JSON.stringify({
				title: formData.get("title"),
				body: formData.get("detail"),
				subCategory: ctgy,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.code === 200) {
					alert("Post success");
					navigate("/home", { refresh: Math.random() });
					window.location.reload();
				}
			})
			.catch((err) => err);
	};

	return (
		<div className="px-48 pt-6 ">
			<div className="container shadow-lg shadow-indigo-100 px-8 py-8 bg-gradient-to-r from-indigo-100 via-indigo-100 to-pink-100 rounded-3xl">
				<div>
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Post My Question
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									IIITB QA - Modern Problems require Modern Solutions
								</p>
							</div>
						</div>
						<div className="mt-5 md:mt-0 md:col-span-2">
							<form onSubmit={onSubmit} method="POST">
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
										<div className="grid grid-cols-3 gap-6">
											<div className="col-span-3 sm:col-span-2">
												<label className="block text-sm font-medium text-gray-700">
													Title
												</label>
												<div className="mt-1 flex">
													<input
														type="text"
														name="title"
														id="title"
														className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300"
														placeholder="Title"
													/>
												</div>
											</div>
										</div>
										<div>
											<CaDrop
												categoryId={categoryId}
												setCategoryId={setCategoryId}
												ctgy={ctgy}
												setCtgy={setCtgy}
											></CaDrop>
										</div>

										<div>
											<label
												htmlFor="about"
												className="block text-sm font-medium text-gray-700"
											>
												About
											</label>
											<div className="mt-1">
												<textarea
													id="detail"
													name="detail"
													rows={3}
													className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
													placeholder="Please provide detail description of your question"
													defaultValue={""}
												/>
											</div>
										</div>
									</div>

									<div className="px-4 py-3 bg-gradient-to-r from-indigo-50 via-indigo-50 to-pink-50 text-right sm:px-6">
										<button
											type="submit"
											className="tracking-wider inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
};

export default PostQuestion;
