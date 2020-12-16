import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PageNotFound from "../PageNotFound";
import { waitFor } from '@testing-library/react'

const mockStore = configureMockStore();
const store = mockStore({ });

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("render not found page syccesfully", async () => {
    act(() => {
        render(<Provider store={store}><PageNotFound /></Provider>, container);
    });
    await waitFor(() => {

        expect(container.querySelector("[data-test='notfound']").textContent).toBe("404 Page Not Found");
    })
});

