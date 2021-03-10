import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import Navbar from "./Navbar";
import "./styles/all.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const Faq: React.FC<SomeComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const { Panel } = Collapse;

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div>
      <Navbar />
      <div className="all">
        <div className="result-container">
          <div>
            <h1 className="search-feature-title">FAQ</h1>
          </div>
          <div>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
              accordion
            >
              <Panel
                header="How can I get trending results automatically?"
                key="1"
                className="site-collapse-custom-panel"
              >
                <p>{text}</p>
              </Panel>
              <Panel
                header="Are there any more features and how can I access them if there are?"
                key="2"
                className="site-collapse-custom-panel"
              >
                <p>{text}</p>
              </Panel>
              <Panel
                header="How do I access my Favourites searches?"
                key="3"
                className="site-collapse-custom-panel"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Faq);
