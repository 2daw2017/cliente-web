import { Injectable, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import gql from "graphql-tag";

import { AuthService } from '../shared/services/auth.service';

interface ConversationQueryList {
  id: String, 
  query?: QueryRef<any>
}

@Injectable()
export class ConversationService {

  conversations: ConversationQueryList[] = [];

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
    private messageService: MessageService
  ) {
    // this.auth.getConversations().forEach((conversation, index) => {

    //   let conv: ConversationQueryList = { id: conversation.id };

    //   conv.query = this.apollo.watchQuery({
    //     query: queryConversation,
    //     variables: { id: conversation.id }
    //   });

    //   conv.query.subscribeToMore({
    //     document: subscriptionNewMessages,
    //     variables: { id: conversation.id },
    //     updateQuery: (prev, { subscriptionData }) => {
    //       if (!subscriptionData.data) return prev;
  
    //       const newMessage = subscriptionData.data.conversation;
    //       this.messageService.add({severity:'success', summary:'New Message', detail: newMessage.text});

    //       return Object.assign({}, prev, {
    //         ...prev, conversation: {
    //           ...prev['conversation'], messages: [
    //             ...prev['conversation']['messages'], newMessage
    //           ],
    //         }
    //       });
    //     }
    //   });

    //   this.conversations.push(conv);

    // });
  }

  getConversation(id: String) {
    // return this.conversations.find(conversation => conversation.id === id).query;
    return this.apollo.watchQuery({
      query: queryConversation,
      variables: { id }
    });
  }

  subscribeToNewMessagesOn(queryRef: QueryRef<any>, variables: { id: String }) {
    return queryRef.subscribeToMore({
      document: subscriptionNewMessages,
      variables,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.conversation;
        console.log(newMessage);

        return Object.assign({}, prev, {
          ...prev, conversation: {
            ...prev['conversation'], messages: [
              ...prev['conversation']['messages'], newMessage
            ],
          }
        });
      }
    });
  }

  sendMessage(conversationId: String, message: String) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addMessage($conversation: ID!, $sender: ID!, $text: String!){
          createMessage (
            conversation: $conversation
            sender: $sender
            text: $text
          ) {
            id
            text
            createdAt
          }
        }
      `,
      variables: {
        conversation: conversationId,
        sender: this.auth.getUser().id,
        text: message,
      }
    })
  }

  ngOnDestroy() {}

}

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