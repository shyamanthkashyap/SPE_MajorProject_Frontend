import React from "react";
import {
	BrowserRouter as Router,
	Link
} from "react-router-dom";

const Post = (props) => {
	const questions = props.questions;
	console.log(questions)

	return (
		<div className="container mx-auto px-4 sm:px-3 md:px-5">
			{questions && questions.map((question) => (
				<div
					className="rounded-xl shadow-lg mt-8 shadow-indigo-100"
					key={question.questionId}
				>
					<div className="bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="px-4 py-5 sm:px-6">
							<p className="max-w-2xl text-sm text-gray-500">
								{question.user.username}
							</p>
							<Link
								to={{ pathname: `/list/${question.questionId}` }}
								className="no-underline hover:underline hover:text-indigo-700 hover:cursor-pointer mt-0.5 leading-6 font-medium text-gray-900 text-xl align-text-top"
							>
								{question.title}
							</Link>
							<p className="max-w-2xl text-sm text-gray-500 align-text-top">
								Posted{" "}
								{Math.floor(
									(new Date() - Date.parse(question.postTime)) /
										1000 /
										3600 /
										24
								)}{" "}
								days ago
							</p>
						</div>
						<div className="border-t border-gray-200">
							<dl>
								<div className="bg-indigo-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">
										Category
									</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										<Link
											className=" bg-indigo-400 hover:bg-indigo-300 text-white font-bold py-1 px-2 leading-4 rounded-full text-xs"
											to={{
												pathname: `/listCategoryQuestion/${question.subCategory.mainCategory.categoryId}`,
											}}
											key={question.subCategory.mainCategory.categoryId}
										>
											{question.subCategory.mainCategory.categoryName}
										</Link>
										<Link
											className=" bg-indigo-300 hover:bg-indigo-400 text-white font-bold py-1 px-2 leading-4 rounded-full text-xs ml-2"
											to={{
												pathname: `/listSubCategoryQuestion/${question.subCategory.subCategoryId}`,
											}}
											key={question.subCategory.subCategoryId}
										>
											{question.subCategory.subCategoryName}
										</Link>
									</dd>
								</div>
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">Detail</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{question.body}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Post;
