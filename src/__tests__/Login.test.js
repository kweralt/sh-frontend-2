import React from "react";
import Login from "../pages/Login";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Login component input validation", () => {
  // TODO: Pass setToken prop
  // describe("with valid inputs", () => {
  //   it("calls the onSubmit function", async () => {
  //     const mockOnSubmit = jest.fn();
  //     const { getByLabelText, getByRole } = render(
  //       <Login onSubmit={mockOnSubmit} />
  //     );

  //     await act(async () => {
  //       fireEvent.change(getByLabelText("Email Address *"), {
  //         target: { value: "patrick@squidwardcommunitycollege.edu" },
  //       });
  //       fireEvent.change(getByLabelText("Password *"), {
  //         target: { value: "patrick" },
  //       });
  //     });

  //     await act(async () => {
  //       fireEvent.click(getByRole("button"));
  //     });

  //     expect(mockOnSubmit).toHaveBeenCalled();
  //   });
  // });

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
