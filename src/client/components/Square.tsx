import * as React from "react";

export type MarkUnion = 'X' | 'O' | null;

export interface SquareProperty {
    value: MarkUnion;
    onClick: any;
}

export function Square(props : SquareProperty) {
    return(
      <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}