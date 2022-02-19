import * as React from "react";

interface SquareInterface{
  value: number;
}

export default class Square extends React.Component <SquareInterface, {}> {
    override render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      );
    }
  }