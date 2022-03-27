import * as React from "react";

interface State {
    apiKey : string
}

export class App extends React.Component <{}, State, {}> {
    constructor(props : any)
    {
        super(props)

        this.state = {
            apiKey: ""
        }
    }

    public onChange(e: React.FormEvent<HTMLInputElement>) {
        
        this.setState({
            apiKey: e.currentTarget.value
        })
    }

    private async handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let res = await fetch("/submit", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        });

        let resJson = await res.json();

        if (res.status == 200) {
            alert("success " + JSON.stringify(resJson));
        } else {
            alert("failed " + JSON.stringify(resJson));
        }
    }

    override render() : React.ReactNode {

        return (
            <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}>
                <input type="text" value={this.state.apiKey} onChange={(e: React.FormEvent<HTMLInputElement>) => this.onChange(e)} />
                <input type="submit" value="submit" />
            </form>
        );
    }
}