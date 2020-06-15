import React from "react";
import { render } from "@testing-library/react";

import SignIn from "../SignIn";

it("should have id attribute", () => {
    const { getByTestId } = render(<SignIn />);
    expect(getByTestId('button')).toHaveAttribute('shape');
})