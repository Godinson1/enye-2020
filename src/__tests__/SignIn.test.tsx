import React from "react";
import { render } from "@testing-library/react";

import SignIn from "../components/SignIn";

it("should have shape attribute", () => {
    const { getByTestId } = render(<SignIn />);
    expect(getByTestId('button')).toHaveAttribute('shape');
});