import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Form", () => {
  describe("Fill firstName input", () => {
    afterEach(() => {
      cleanup();
    });
    it("Should be valid if input is filled", async () => {
      render(<App />);
      const firstName = screen.getByTestId("firstName");
      const lastName = screen.getByTestId("lastName");
      const email = screen.getByTestId("email");
      const submitFormButton = screen.getByTestId("submitButton");

      fireEvent.change(firstName, { target: { value: "Artur" } });
      fireEvent.change(lastName, { target: { value: "Bruno" } });
      fireEvent.change(email, { target: { value: "artur@mail.com" } });

      fireEvent.click(submitFormButton);

      await waitFor(() => {
        expect(screen.queryAllByTestId("formError")).toHaveLength(0);
      });
    });

    it("Should not be valid if the inputs are empty", async () => {
      render(<App />);
      const firstName = screen.getByTestId("firstName");
      const lastName = screen.getByTestId("lastName");
      const email = screen.getByTestId("email");
      const submitFormButton = screen.getByTestId("submitButton");

      expect(firstName).toBeEmptyDOMElement();
      expect(lastName).toBeEmptyDOMElement();
      expect(email).toBeEmptyDOMElement();

      fireEvent.click(submitFormButton);

      await waitFor(() => {
        expect(screen.getAllByTestId("formError")).toHaveLength(3);
      });
    });
  });
});
