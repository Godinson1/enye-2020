import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

import Navbar from "./Navbar";
import "./styles/all.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const AllResult: React.FC<SomeComponentProps> = ({
  history,
}: RouteComponentProps) => {
  return (
    <div>
      <Navbar />
      <div className="all">
        <div className="result-container">
          <div>
            <h1 className="search-feature-title">ALL SEARCHED RESULTS</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AllResult);
