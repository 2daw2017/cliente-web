import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Apollo, ApolloModule, SelectPipe } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink, } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [SelectPipe]
})
export class GraphQLModule {
  constructor(apollo: Apollo, private httpClient: HttpClient) {
    const httpLink = new HttpLink(httpClient).create({
      uri: 'http://localhost:4000/'
    });

    const subscriptionLink = new WebSocketLink({
      uri: 'ws://localhost:4000/',
      options: {
        reconnect: true,
        connectionParams: {
          authToken: localStorage.getItem('token') || null
        }
      }
    });

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}