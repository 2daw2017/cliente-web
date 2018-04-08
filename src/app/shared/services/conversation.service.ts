import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";

import { Conversation } from '../models';

const queryConversation = gql`
  query getConversation($id: ID!) {
    conversation(id: $id) {
      id
      messages {
        sender {
          id
          email
        }
        text
        createdAt
      }
      members {
        id
        email
      }
    }
  }
`;

const subscriptionNewMessages = gql`
  subscription newMessages($id: ID!) {
    conversation( id: $id ) {
      sender {
        id
        email
      }
      text
      createdAt
    }
  }
`;

@Injectable()
export class ConversationService {

  constructor(
    private apollo: Apollo
  ) {}

  getConversation(id: String) {
    const qry = this.apollo.watchQuery<{conversation: Conversation}>({
      query: queryConversation,
      variables: { id: id }
    });
    const sub = qry.subscribeToMore({
        document: subscriptionNewMessages,
        variables: { id: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
  
          const newMessage = subscriptionData.data.conversation;

          return Object.assign({}, prev, {
            ...prev,
            conversation: {
              ...prev['conversation'],
              messages: [
                ...prev['conversation']['messages'], 
                newMessage
              ],
            }
          })
        }
      }
    );
    return qry.valueChanges;
  }

}
