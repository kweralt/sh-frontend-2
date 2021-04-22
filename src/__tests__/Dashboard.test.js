import React from "react";
import Dashboard from "../pages/Dashboard";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Staff dashboard", () => {
  describe("test render all components", () => {
    it("page headers", async () => {
      render(<Dashboard />);
      expect(
        screen.getByText("Audit Records for undefined")
      ).toBeInTheDocument();
    });

    it("cards and fields", async () => {
      render(<Dashboard />);
      expect(screen.getByText("Total non-compliances")).toBeInTheDocument();
      expect(screen.getByText("Since last month")).toBeInTheDocument();
      expect(screen.getByText("Percentage Unresolved")).toBeInTheDocument();
      expect(screen.getByText("Total Audit Score")).toBeInTheDocument();
      expect(screen.getByText("Overview")).toBeInTheDocument();
      expect(
        screen.getByText("Pending and unresolved non-compliances")
      ).toBeInTheDocument();
    });

    it("outlet table headers", async () => {
      render(<Dashboard />);
      expect(screen.getByText("Report Number")).toBeInTheDocument();
      expect(screen.getByText("Report Type")).toBeInTheDocument();
      expect(screen.getByText("Outlet Id")).toBeInTheDocument();
      expect(screen.getByText("Outlet Name")).toBeInTheDocument();
      expect(screen.getByText("Score")).toBeInTheDocument();
    });
  });

  describe("test if data is fetched", () => {
    it("dashboard data fetched", async () => {
      //
    });
  });
});
