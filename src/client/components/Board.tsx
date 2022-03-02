
import * as React from "react";
import * as square from "./Square";

interface BoardProperty {
    squares : square.MarkUnion[];
    onClick: any;
}

export class Board extends React.Component <BoardProperty, {}> {

    renderSquare(i : number) {
        return ( 
            <square.Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)} 
            />
        );
    }

    override render() {
        var rows = [];
        for(var rowNum = 0; rowNum < 3; ++rowNum) {
            var columns = [];
            for(var colNum = 0; colNum < 3; ++colNum) {
                columns.push(this.renderSquare(rowNum * 3 + colNum));
            }
            rows.push(
            <div className="board-row">
                {columns}
            </div>
            )
        }
        return (
        <div>
            {rows}
        </div>
        );
    }
}