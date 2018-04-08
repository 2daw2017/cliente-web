import { Conversation } from ".";

export class User {
    id: String;
    email?: String;
    firstname?: String;
    lastname?: String;
    avatar?: String;
    conversations?: Conversation[];
    // organizations: Organization[];
    createdAt?: String;
    updatedAt?: String;
}
