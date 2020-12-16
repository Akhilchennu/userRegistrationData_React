import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import BlockedUser from "../BlockedUser";
import { waitFor } from '@testing-library/react'

const mockStore = configureMockStore();
const store = mockStore({ loginSession: false });

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

it("render email field", async () => {
    act(() => {
        render(<Provider store={store}><BlockedUser /></Provider>, container);
    });
    await waitFor(() => {

        expect(container.querySelector("[name='userMail']").getAttribute('type')).toBe("text");
        expect(container.querySelector("[name='userMail']").getAttribute('id')).toBe("email");
    })
});


it("render Unblock button", async () => {
    act(() => {
        render(<Provider store={store}><BlockedUser /></Provider>, container);
    });
    await waitFor(() => {
        expect(container.querySelector("[test-button='button']").textContent).toBe("Unblock");
    })
});
