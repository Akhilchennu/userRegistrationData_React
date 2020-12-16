import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Dashboard from "../Dashboard";
import { waitFor } from '@testing-library/react';

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

it("render download csv button", async () => {
    const fakeUser = { "success": true, "users": [{ "blocked": false, "loginAttempts": 0, "_id": "5fd92e3a5b37b52b085ff57b", "name": "Akhie", "email": "akhil.chennu@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd936744f10772fd8fd6d36", "name": "test", "email": "test@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd9368d4f10772fd8fd6d37", "name": "testone", "email": "test1@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd9369f4f10772fd8fd6d38", "name": "testtwo", "email": "test2@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd936b74f10772fd8fd6d39", "name": "testthree", "email": "test3@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd936ca4f10772fd8fd6d3a", "name": "testfour", "email": "test4@gmail.com" }, { "blocked": false, "loginAttempts": 0, "_id": "5fd991c74f10772fd8fd6d3b", "name": "Akhil", "email": "princeakhil705@gmail.com" }] }
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );
    act(() => {
        render(<Provider store={store}><Dashboard /></Provider>, container);
    });
    await waitFor(() => {
        expect(container.querySelector("[test-button='button']").textContent).toBe("Download Excel");
    })
});
