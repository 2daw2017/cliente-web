import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../models';
import gql from 'graphql-tag';

@Injectable()
export class AuthService {
  
  constructor(
    private apollo: Apollo
  ) { }

  getUser(id: String) {
    return this.apollo.watchQuery({
      query: gql`
        query queryUserInfo($id: ID!) {
          user( id: $id ) {
            conversations {
              id
              email
              avatar
              messages {
                text
                sender {
                  id
                  email
                }
                createdAt
              }
              members {
                id
                email
              }
            }
          }
        }
      `,
      variables: {
        id
      }
    })
  }

}
