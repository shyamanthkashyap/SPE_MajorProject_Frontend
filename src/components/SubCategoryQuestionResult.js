import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Post from "./Post";
import QuestionService from "../service/QuestionService";
import {
	BrowserRouter as Router,
	useParams,
} from "react-router-dom";

const SubCategoryQuestionResult = () => {
	const { ctgyId } = useParams();
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState();

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true);
            try {
                const response = await QuestionService.ListSubCategoryQuestions(ctgyId);
                setQuestions(response.data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchData();  
		
	}, []);

    return (
		<div>
			<NavBar key="uniquevalue"/>
			{!loading && (<Post questions = {questions}/>)}
		</div>
	);
};

export default SubCategoryQuestionResult;
