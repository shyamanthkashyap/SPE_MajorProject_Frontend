import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Post from "./Post";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import QuestionService from "../service/QuestionService";
import AnswerPost from "./AnswerPost";
import AnswerService from "../service/AnswerService";
import NewAnswer from "./NewAnswer";

const Answer = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await QuestionService.listOne(id);
                const responswAnswer= await AnswerService.listAnswers(id);
                setAnswers(responswAnswer.data.data);
				setQuestions([response.data.data]);
                
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<div>
			<NavBar />
			{!loading && <Post questions={questions} />}
            {!loading && <AnswerPost answers={answers}/>}
            {!loading && <NewAnswer questions={questions} />}
		</div>
	);
};

export default Answer;
