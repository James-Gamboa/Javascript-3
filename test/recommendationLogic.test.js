// @ts-nocheck
/* eslint-disable no-undef */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/dom";
import { renderRecommendation } from "../js/modules/renderRecommendation.js";
import { getPlantRecommendation } from "../js/modules/recommendationLogic.js";

jest.mock("../js/modules/recommendationLogic.js", () => ({
  getPlantRecommendation: jest.fn(),
}));

describe("Form submission and recommendation", () => {
  test("Submitting the form displays the correct recommendation", () => {
    const expectedRecommendation = {
      name: "Boston Fern",
      potMaterial: "clay",
      potDecorations: "simple",
      potColor: "unpainted",
      soil: "premium",
      extras: ["pebbles"],
      potStyle: "simple",
    };

    getPlantRecommendation.mockReturnValue(expectedRecommendation);

    const container = document.createElement("div");
    renderRecommendation({}, container);

    fireEvent.click(
      screen.getByRole("radio", { name: "Inside with some indirect light" }),
    );
    fireEvent.click(screen.getByRole("radio", { name: "No" }));
    fireEvent.click(screen.getByRole("radio", { name: "Yes" }));
    fireEvent.click(screen.getByRole("radio", { name: "Underwater" }));
    fireEvent.click(
      screen.getByRole("radio", {
        name: "I like minimalism and material colors",
      }),
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Pebbles" }));

    fireEvent.submit(screen.getByTestId("plantForm"));

    expect(container.textContent).toContain(expectedRecommendation.name);
    expect(container.textContent).toContain("Premium fertilized soil");
    expect(container.textContent).toContain("Ceramic pot simple");
    expect(container.textContent).toContain("Unpainted");
    expect(container.textContent).toContain("Pebbles");
  });
});
