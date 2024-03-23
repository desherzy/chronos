import React, { useState } from 'react';
import useCalendarStore from '../store/calendar';
import { useParams } from 'react-router-dom';
import {  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";

function InviteUserModal({isOpen, onClose}) {
 const { calendarId } = useParams();
 const { sendInvite } = useCalendarStore();
 const [email, setEmail] = useState('');
 const [permissionId, setPermissionId] = useState(2);

 const handleSave = async () => {
    const invite = {
        invitedUserEmail: email,
        calendarId: calendarId,
        permissionId: permissionId
    };
    await handleInviteUser(invite);
    onClose();
};

 async function handleInviteUser(invite) {
    await sendInvite(invite);
}
 
 return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Invite User</ModalHeader>
            <ModalBody>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Permission</FormLabel>
                    <Select value={permissionId} onChange={(e) => setPermissionId(e.target.value)}>
                        <option value={2}>Full Access</option>
                        <option value={3}>Read Only</option>
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
 );
}

export default InviteUserModal;