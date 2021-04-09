import React from "react";
import Directory from "../pages/Directory";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Directory table", () => {
  describe("test render all components", () => {
    it("page headers", async () => {
      render(<Directory />);
      expect(
        screen.getByText("Directory of Retail Outlets")
      ).toBeInTheDocument();
    });

    it("table headers", async () => {
      render(<Directory />);
      expect(screen.getByText("Institution")).toBeInTheDocument();
      expect(screen.getByText("Outlet Name")).toBeInTheDocument();
      expect(screen.getByText("Outlet Type")).toBeInTheDocument();
      expect(screen.getByText("Unit Number")).toBeInTheDocument();
      expect(screen.getByText("Tenant Email")).toBeInTheDocument();
      expect(screen.getByText("Tenancy Start")).toBeInTheDocument();
      expect(screen.getByText("Tenancy End")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });
  });

  describe("test if data is fetched", () => {
    it("retail outlet data fetched", async () => {
      async function getOutlets() {
        return await fetch("http://localhost:8080/directory/outlets", {
          mode: "cors",
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }).then((data) => data.json());
      }
      const data = await getOutlets();
      expect(data[0]).toStrictEqual({
        outletid: 4,
        outletname: "Coffee Bean & Tea Leaf",
        outlettypeid: 1,
        outlettypename: "F&B",
        unitnumber: "Block 4 Level 3",
        email: "squidward@squidwardcommunitycollege.edu",
        institutionid: 1,
        institutionname: "Singapore General Hospital",
        tenancystart: "2010-05-24",
        tenancyend: "2021-05-23",
      });
    });
  });
});
