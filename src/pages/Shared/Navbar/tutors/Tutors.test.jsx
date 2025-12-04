import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Tutors from "./Tutors";

jest.mock("react-helmet-async", () => ({
  HelmetProvider: ({ children }) => <>{children}</>,
  Helmet: ({ children }) => <>{children}</>,
}));
jest.mock("../Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../../Shared/Footer/Footer", () => () => (
  <div data-testid="footer" />
));
jest.mock("../../../../hooks/useAllTutors", () => jest.fn());

const mockUseAllTutors = require("../../../../hooks/useAllTutors");

const renderComponent = (locationState) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: "/tutors", state: locationState }]}>
      <Tutors />
    </MemoryRouter>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders loading spinner while tutors fetch", () => {
  mockUseAllTutors.mockReturnValue({ allTutors: [], isLoading: true });

  const { container } = renderComponent();
  expect(container.querySelector(".animate-spin")).toBeInTheDocument();
});

test("renders tutor cards and allows quick district filtering", async () => {
  mockUseAllTutors.mockReturnValue({
    isLoading: false,
    allTutors: [
      {
        _id: "1",
        role: "tutor",
        name: "Tutor One",
        email: "one@example.com",
        city: "Dhaka",
        preferredLocations: "TestCity",
        preferredClass: "Class 5",
        preferredCategories: "Bangla Medium",
        tuitionPreference: "Home",
      },
    ],
  });

  renderComponent({ className: "Class 5" });

  // Heading changes when a specific class is selected (use role to avoid duplicates)
  expect(
    screen.getByRole("heading", { name: /showing class 5 tutors/i })
  ).toBeInTheDocument();
  expect(screen.getByText("Tutor One")).toBeInTheDocument();

  const quickButton = screen.getByRole("button", { name: /dhaka/i });
  await userEvent.click(quickButton);
  const checkbox = quickButton.querySelector("input[type='checkbox']");
  expect(checkbox.checked).toBe(true);
});

