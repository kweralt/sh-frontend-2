import React from "react";
import Login from "../pages/Login";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Login component input validation", () => {
  describe("login with invalid email and password", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email: "thisisnotavaliduser@mail.com",
        password: "invaliduser",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("special characters", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email: "thisis^&*()`~notavaliduser@mail.com",
        password: "invaliduser",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("unicode characters", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email:
          "thisЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя@mail.com",
        password: "invaliduser",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("quotation marks", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email: "thisisnotavaliduser@mail.com",
        password: "<foo val=`bar' />",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("script injection", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email:
          "<a href='\x0Bjavascript:javascript:alert(1)' id='fuzzelement1'>test</a>",
        password: "<script>alert(123)</script>",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("SQL injection", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email: "1; SELECT 1",
        password: "1'; SELECT 1-- 1",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("Server Code Injection", () => {
    it("server returns 404 status", async () => {
      async function loginUser(credentials) {
        return fetch("http://localhost:8080/auth", {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }).then((data) => data.json());
      }
      const data = await loginUser({
        email: "--version",
        password: "$USER",
      });
      expect(data.status).toBe(404);
    });
  });

  describe("with invalid email", () => {
    it("renders the email validation error", async () => {
      const { getByLabelText, container } = render(<Login />);

      await act(async () => {
        const emailInput = getByLabelText("Email Address *");
        fireEvent.change(emailInput, { target: { value: "invalid email" } });
        fireEvent.blur(emailInput);
      });

      expect(container.innerHTML).toMatch("Email is not valid.");
    });
  });

  describe("with invalid password", () => {
    it("renders the password validation error", async () => {
      const { getByLabelText, container } = render(<Login />);

      await act(async () => {
        const passwordInput = getByLabelText("Password *");
        fireEvent.change(passwordInput, { target: { value: "1" } });
        fireEvent.blur(passwordInput);
      });

      expect(container.innerHTML).toMatch("Minimum 3 characters required.");
    });
  });
});
