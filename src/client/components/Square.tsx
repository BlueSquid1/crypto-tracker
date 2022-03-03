import * as React from "react";

export type MarkUnion = 'X' | 'O' | null;

export interface Mark {
    value : MarkUnion;
    isBold : boolean;
}

export interface SquareProperty {
    mark: Mark;
    onClick: any;
}

export function Square(props : SquareProperty) {
    let markText;
    if(props.mark.isBold) {
        markText = <b>{props.mark.value}</b>
    } else {
        markText = props.mark.value
    }
    return(
      <button 
            className="square" 
            onClick={props.onClick}
        >
            {markText}
        </button>
    );
}