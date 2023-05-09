import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";
import { Home } from "./components/Home";
// import Answer from "./components/Answer";
import Register from "./components/Register";
// import SearchResult from "./components/SearchResult";
// import CategoryQuestionResult from "./components/CategoryQuestionResult";
// import SubCategoryQuestionResult from "./components/SubCategoryQuestionResult";
// import MyAnswer from "./components/MyAnswer";
// import MyQuestion from "./components/MyQuestion";
// import Profile from "./components/Profile";

export default function IRouter() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<App />}></Route>
				<Route exact path="/login" element={<App />}></Route>
				<Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/register" element={<Register />}></Route>
				{/* <Route exact path="/list/:id" element={<Answer />} ></Route>
                <Route exact path="/listRelated/:text" element={<SearchResult />} ></Route>
                <Route exact path="/listCategoryQuestion/:ctgyId" element={<CategoryQuestionResult />} ></Route>
                <Route exact path="/listSubCategoryQuestion/:ctgyId" element={<SubCategoryQuestionResult />} ></Route>
                <Route exact path="/myQuestion" element={<MyQuestion />}></Route>
                <Route exact path="/myAnswer" element={<MyAnswer />}></Route>
                <Route exact path="/profile" element={<Profile />}></Route> */}
                {/* <Route exact path="/test" element={<Profile />}></Route> */}
			</Routes>
		</Router>
	);
}
