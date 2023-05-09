import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Post from "./Post";
import QuestionService from "../service/QuestionService";


const MyQuestion = () => {
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await QuestionService.ListMyQuestions();
				setQuestions(response.data.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	
	return (
		<div>
			<NavBar key="uniquevalue" />
            <blockquote class="text-xl ml-32 mt-8 font-semibold italic text-left text-slate-900">
				My Questions:
			</blockquote>
			{!loading && <Post questions={questions} />}
		</div>
	);
}

export default MyQuestion