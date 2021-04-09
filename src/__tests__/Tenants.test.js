import React from "react";
import Tenants from "../pages/Tenants";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Tenants table", () => {
  describe("test render all components", () => {
    it("page headers", async () => {
      render(<Tenants />);
      expect(screen.getByText("New Tenant")).toBeInTheDocument();
      expect(
        screen.getByText("Form design with validation")
      ).toBeInTheDocument();
    });

    it("table headers", async () => {
      render(<Tenants />);
      expect(screen.getByText("Tenant Name")).toBeInTheDocument();
      expect(screen.getByText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });
  });

  describe("test if data is fetched", () => {
    it("tenant data fetched", async () => {
      async function getTenants() {
        return await fetch("http://localhost:8080/users/tenants", {
          mode: "cors",
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }).then((data) => data.json());
      }
      const data = await getTenants();
      expect(data.status).toBe(200);
    });
  });
});
