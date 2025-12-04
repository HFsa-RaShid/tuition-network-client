import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import SearchByMap from "./SearchByMap";
import { AuthContext } from "../../../../provider/AuthProvider";

jest.mock("axios");
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
jest.mock("react-helmet-async", () => ({
  HelmetProvider: ({ children }) => <>{children}</>,
  Helmet: ({ children }) => <>{children}</>,
}));
jest.mock("../Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../../Shared/Footer/Footer", () => () => (
  <div data-testid="footer" />
));
jest.mock("../../../../hooks/useCurrentUser", () => jest.fn());
jest.mock("../../../../hooks/useAllJobs", () => jest.fn());
jest.mock("../../../../hooks/useMultipleJobPayments", () => jest.fn());
jest.mock("../../../../hooks/useAxiosSecure", () => jest.fn());
jest.mock("../../../utils/bdDistricts", () => ["TestDistrict"]);
jest.mock("../../../utils/cityAreaMap", () => ({
  TestDistrict: ["TestCity"],
}));
jest.mock("react-leaflet", () => {
  const noop = () => null;
  return {
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: noop,
    Marker: ({ children }) => <div>{children}</div>,
    Tooltip: ({ children }) => <div>{children}</div>,
    useMap: () => ({ setView: jest.fn() }),
  };
});

const mockUseCurrentUser = require("../../../../hooks/useCurrentUser");
const mockUseAllJobs = require("../../../../hooks/useAllJobs");
const mockUseMultipleJobPayments = require("../../../../hooks/useMultipleJobPayments");
const mockUseAxiosSecure = require("../../../../hooks/useAxiosSecure");

const renderComponent = () =>
  render(
    <AuthContext.Provider value={{ user: { email: "auth@user.com" } }}>
      <SearchByMap />
    </AuthContext.Provider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAxiosSecure.mockReturnValue({ put: jest.fn() });
  mockUseMultipleJobPayments.mockReturnValue({ paidJobsByJobIds: [] });
  axios.get.mockResolvedValue({ data: [{ lat: "23.7", lon: "90.4" }] });
});

test("shows loader while hooks are resolving", () => {
  mockUseCurrentUser.mockReturnValue({
    currentUser: null,
    isLoading: true,
    isError: false,
  });
  mockUseAllJobs.mockReturnValue({
    allJobs: [],
    isLoading: true,
    isError: false,
  });

  const { container } = renderComponent();

  expect(
    screen.queryByRole("heading", { name: /find tuition by location/i })
  ).not.toBeInTheDocument();
  expect(container.querySelector(".animate-spin")).toBeInTheDocument();
});

test("renders search controls and triggers geocode on search", async () => {
  mockUseCurrentUser.mockReturnValue({
    currentUser: { location: "Initial location" },
    isLoading: false,
    isError: false,
  });
  mockUseAllJobs.mockReturnValue({
    allJobs: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  });

  renderComponent();

  expect(
    screen.getByRole("heading", { name: /find tuition by location/i })
  ).toBeInTheDocument();

  const districtSelect = screen.getByDisplayValue("District");
  await userEvent.selectOptions(districtSelect, "TestDistrict");

  const citySelect = screen.getByDisplayValue("Location");
  await userEvent.selectOptions(citySelect, "TestCity");

  await userEvent.click(screen.getByRole("button", { name: /search/i }));

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent("TestCity, TestDistrict, Bangladesh"))
    );
  });
});

