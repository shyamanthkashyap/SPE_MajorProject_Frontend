import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Post from "./Post";
import QuestionService from "../service/QuestionService";
import PostQuestion from "./PostQuestion";

export const Home = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await QuestionService.listAll();
                setQuestions(response.data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchData();

    }, []);

    return (
        <div >
            <NavBar key="uniquevalue" />
            <PostQuestion></PostQuestion>
            {!loading && (<Post questions={questions} />)}
        </div>
    );
};

export default Home;
