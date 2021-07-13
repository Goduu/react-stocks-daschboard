import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Note } from "../Note";
import "@testing-library/jest-dom/extend-expect";


const noteProps = {
    changeParams: p => { },
    h: 2,
    i: "_id00",
    maxW: 5,
    minH: 2,
    minW: 2,
    moved: false,
    onRemoveItem: i => { },
    params: { text: "Initial Text" },
    static: false,
    w: 3,
    x: 8,
    y: 0,
}

test("Initial text renders", () => {
    const { getByTestId } = render(<Note {...noteProps} />)
    const textField = getByTestId("textField")
    expect(textField.textContent).toBe("NoteInitial TextNote")
});

test("On change working", () => {
    const { getByTestId,getByText } = render(<Note {...noteProps} />)
    const textField = getByText('Initial Text')

    fireEvent.change(textField, {
        target: {
            value: 'Changed input'
        }
    })

    expect(textField.textContent).toBe('Changed input')
});