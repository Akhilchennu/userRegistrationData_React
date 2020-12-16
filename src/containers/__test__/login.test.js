import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Login from "../Login";
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
    const fakeUser = {
        success: false,
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );
    act(() => {
        render(<Provider store={store}><Login /></Provider>, container);
    });
    await waitFor(() => {

        expect(container.querySelector("[name='userMail']").getAttribute('type')).toBe("text");
        expect(container.querySelector("[name='userMail']").getAttribute('id')).toBe("email");
    })
});

it("render password field", async () => {
    const fakeUser = {
        success: false,
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );
    act(() => {
        render(<Provider store={store}><Login /></Provider>, container);
    });
    await waitFor(() => {

        expect(container.querySelector("[name='password']").getAttribute('type')).toBe("password");
        expect(container.querySelector("[name='password']").getAttribute('id')).toBe("password");
    })
});

it("render login button", async () => {
    const fakeUser = {
        success: false,
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );
    act(() => {
        render(<Provider store={store}><Login /></Provider>, container);
    });
    await waitFor(() => {
        expect(container.querySelector("[test-button='button']").textContent).toBe("LogIn");
    })
});
