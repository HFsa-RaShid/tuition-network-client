import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

jest.mock("../../../../firebase/firebase.config.js", () => ({ app: {} }));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

import SignIn from "./SignIn";
import { AuthContext } from "../../../../provider/AuthProvider";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const renderSignIn = (contextValue) => {
  const defaultValue = {
    user: null,
    signInUser: jest.fn(() => Promise.resolve()),
  };

  const utils = render(
    <HelmetProvider>
      <AuthContext.Provider value={contextValue || defaultValue}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthContext.Provider>
    </HelmetProvider>
  );

  return { ...utils, signInUser: (contextValue || defaultValue).signInUser };
};

const getPasswordInput = () =>
  screen.getByLabelText(/password/i, { selector: "input" });

describe("SignIn Page", () => {
  test("renders email and password fields", () => {
    renderSignIn();
    expect(screen.getByLabelText(/email or phone/i)).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
  });

  test("renders Sign In button", () => {
    renderSignIn();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("allows typing into inputs", async () => {
    renderSignIn();
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email or phone/i);
    const passwordInput = getPasswordInput();

    await user.type(emailInput, "aiman@gmail.com");
    await user.type(passwordInput, "mypassword");

    expect(emailInput).toHaveValue("aiman@gmail.com");
    expect(passwordInput).toHaveValue("mypassword");
  });

  test("submits the form with typed values", async () => {
    const mockSignIn = jest.fn(() => Promise.resolve());
    renderSignIn({ user: null, signInUser: mockSignIn });
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email or phone/i), "aiman@gmail.com");
    await user.type(getPasswordInput(), "mypassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith("aiman@gmail.com", "mypassword")
    );
  });
});
