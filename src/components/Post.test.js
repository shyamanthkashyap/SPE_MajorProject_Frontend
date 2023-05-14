import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "./Post";

describe("<Post />", () => {
  test("renders post with question details", () => {
    const questions = [
      {
        questionId: 1,
        user: {
          username: "JohnDoe",
        },
        title: "Sample Question",
        postTime: new Date(),
        subCategory: {
          mainCategory: {
            categoryId: 7,
            categoryName: "Main Category",
          },
          subCategoryId: 8,
          subCategoryName: "Sub Category",
        },
        body: "This is a sample question.",
      },
    ];

    render(
      <Router>
        <Post questions={questions} />
      </Router>
    );

    const questionTitle = screen.getByText("Sample Question");
    const postedBy = screen.getByText("Posted by JohnDoe");
    const categoryLink = screen.getByText("Main Category");
    const subCategoryLink = screen.getByText("Sub Category");
    const questionDetail = screen.getByText("This is a sample question.");

    expect(questionTitle).toBeInTheDocument();
    expect(postedBy).toBeInTheDocument();
    expect(categoryLink).toBeInTheDocument();
    expect(subCategoryLink).toBeInTheDocument();
    expect(questionDetail).toBeInTheDocument();
  });

  test("renders multiple posts with question details", () => {
    const questions = [
      {
        questionId: 2,
        user: {
          username: "JohnDoe",
        },
        title: "Sample Question 1",
        postTime: new Date(),
        subCategory: {
          mainCategory: {
            categoryId: 5,
            categoryName: "Main Category 1",
          },
          subCategoryId: 6,
          subCategoryName: "Sub Category 1",
        },
        body: "This is a sample question 1.",
      },
      {
        questionId: 3,
        user: {
          username: "JaneDoe",
        },
        title: "Sample Question 2",
        postTime: new Date(),
        subCategory: {
          mainCategory: {
            categoryId: 2,
            categoryName: "Main Category 2",
          },
          subCategoryId: 3,
          subCategoryName: "Sub Category 2",
        },
        body: "This is a sample question 2.",
      },
    ];

    render(
      <Router>
        <Post questions={questions} />
      </Router>
    );

    const questionTitles = screen.getAllByText(/Sample Question/);
    const postedBys = screen.getAllByText(/Posted by/);
    const categoryLinks = screen.getAllByRole("link", {
      name: /Main Category/,
    });
    const subCategoryLinks = screen.getAllByRole("link", {
      name: /Sub Category/,
    });
    const questionDetails = screen.getAllByText(/This is a sample question/);

    expect(questionTitles.length).toBe(2);
    expect(postedBys.length).toBe(2);
    expect(categoryLinks.length).toBe(2);
    expect(subCategoryLinks.length).toBe(2);
    expect(questionDetails.length).toBe(2);
  });
});