import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Editable from "./Editable";

describe("<Editable />", () => {
  test("renders label by default", () => {
    const { getByText } = render(<Editable text="Sample Text" />);
    const labelElement = getByText("Sample Text");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders input when clicked", () => {
    const { getByTestId } = render(<Editable />);
    const containerElement = getByTestId("editable-container");
    fireEvent.click(containerElement);
    const inputElement = getByTestId("editable-input");
    expect(inputElement).toBeInTheDocument();
  });
})