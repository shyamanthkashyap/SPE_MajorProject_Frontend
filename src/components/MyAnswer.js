import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import AnswerService from "../service/AnswerService";
import MyAnswerPost from "./MyAnswerPost";


const MyAnswer = () => {
	const [loading, setLoading] = useState(true);
	const [answers, setAnswers] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await AnswerService.listMyAnswers();
				setAnswers(response.data.data);
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
				My Answers:
			</blockquote>

			{!loading && <MyAnswerPost answers={answers} />}
		</div>
	);
}

export default MyAnswer