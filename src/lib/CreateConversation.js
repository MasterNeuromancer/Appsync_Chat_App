import { API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid-random';
import { createConversation, createConversationLink } from '../graphql/mutations';

const CreateConversation = async (toUser, currentUser) => {
    try {

        const members = [toUser, currentUser].sort();
        console.log('members in create conversation', members);
        const conversationName = members.join(' and ');
        console.log('conversationName in create conversation', conversationName);
        const id = await uuid();
        console.log('id being sent for convo', id);

        const convo = await { name: conversationName, members: members, _id: id };
        console.log('convo before being sent to graphql', convo);
        const conversation = await API.graphql(graphqlOperation(createConversation, { input: {_id: uuid(), name: conversationName, members: members} }));
        console.log('conversation in create conversation', conversation);

        const { data: { createConversation: { _id: conversationLinkConversationId }}} = conversation;
        console.log('LinkConversationId in create conversation', conversationLinkConversationId);
        
        const relation1 = { conversationLinkUserId: currentUser, conversationLinkConversationId: conversationLinkConversationId };
        const relation2 = { conversationLinkUserId: toUser, conversationLinkConversationId: conversationLinkConversationId };
        await API.graphql(graphqlOperation(createConversationLink, { input: relation1 }));
        await API.graphql(graphqlOperation(createConversationLink, { input: relation2 }));

        console.log('relation1 in create conversation', relation1);
        console.log('relation2 in create conversation', relation2);

    } catch (error) {

        console.log('error creating conversations', error.errors);

    }
};

export default CreateConversation;