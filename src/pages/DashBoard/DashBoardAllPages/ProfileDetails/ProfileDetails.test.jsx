import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../../provider/AuthProvider";
jest.mock("./ProfileDetails", () => () => <div>Profile Details Page</div>);
import ProfileDetails from "./ProfileDetails";

jest.mock("react-hot-toast", () => {
  const toast = () => {};
  toast.success = jest.fn();
  toast.error = jest.fn();
  return { toast };
});
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
jest.mock("../../../../hooks/useAxiosSecure", () => jest.fn());
jest.mock("../../../../hooks/useCurrentUser", () => jest.fn());

const mockUseAxiosSecure = require("../../../../hooks/useAxiosSecure");
const mockUseCurrentUser = require("../../../../hooks/useCurrentUser");

const renderComponent = () =>
  render(
    <AuthContext.Provider value={{ user: { email: "user@example.com" } }}>
      <ProfileDetails />
    </AuthContext.Provider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAxiosSecure.mockReturnValue({ put: jest.fn() });
});

test("renders placeholder Profile Details page", () => {
  mockUseCurrentUser.mockReturnValue({
    currentUser: null,
    isLoading: false,
    refetch: jest.fn(),
  });

  renderComponent();

  expect(screen.getByText(/profile details page/i)).toBeInTheDocument();
});

