import * as React from "react";
import {

  ApolloClient,

  InMemoryCache,

  ApolloProvider,

  useQuery,
  gql
} from "@apollo/client";


interface State {
    apiKey : string
}

const client = new ApolloClient({

  uri: 'http://localhost/graphql',

  cache: new InMemoryCache()

});

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

        client.query({
            query: gql`
            query { books {title} }
            `
        })
        .then(result => alert(JSON.stringify(result)));
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