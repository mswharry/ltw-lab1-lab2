import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("shows users and opens a user's details", async () => {
  const user = {
    _id: "57231f1a30e4351f4e9f4bd7",
    first_name: "Ian",
    last_name: "Malcolm",
    occupation: "Mathematician",
    location: "Austin, TX",
    description: "Test description",
  };
  global.fetch = jest.fn((url) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(url.endsWith("/user/list") ? [user] : user),
  }));
  window.history.pushState({}, "", "/users");

  render(<App />);
  const links = await screen.findAllByText("Ian Malcolm");
  fireEvent.click(links[0]);

  expect(await screen.findByText("Test description")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Xem ảnh của Ian" })).toHaveAttribute(
    "href", `/photos/${user._id}`
  );
});
