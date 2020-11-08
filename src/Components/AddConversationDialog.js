import React from 'react';
import { 
    Button, 
    Dialog, 
    Portal } from 'react-native-paper';
import CreateConversation from '../lib/CreateConversation';

export default ({showDialog, setShowDialog, toUser, currentUser}) => {
    return (
        <Portal>
            <Dialog visible={showDialog} onDismiss={() => setShowDialog(!showDialog)}>
                <Dialog.Title>Create a new conversation with this user?</Dialog.Title>
                <Dialog.Content>
                    <Button 
                        mode='contained' 
                        onPress={() => {
                            console.log('creating new conversation between');
                            CreateConversation(toUser, currentUser);
                            setShowDialog(!showDialog);
                          }
                        }
                    >
                      Create Conversation
                    </Button>
                </Dialog.Content>
             </Dialog>
        </Portal>
    );
}