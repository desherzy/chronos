import React, { useEffect } from 'react';
import {  Card, Avatar, AvatarBadge, Heading, Button, CardBody } from "@chakra-ui/react";
import '../styles/tailwind.css';
import useCalendarStore from '../store/calendar';


function Invitations() {
  const { invites, fetchIncomingInvites, acceptInvitation, declineInvitation } = useCalendarStore();

  useEffect(() => {
    const fetchData = async () => {
        await fetchIncomingInvites();
    };
    fetchData();
}, [fetchIncomingInvites]);

  const accept = async (invitationId) => {
    try {
      await acceptInvitation(invitationId);
    } catch (error) {
      console.error('Error while accepting invitation:', error);
    }
  };

  const decline = async (invitationId) => {
    try {
      await declineInvitation(invitationId);
    } catch (error) {
      console.error('Error while declining invitation:', error);
    }
  };
  
    return (
        <Card className="ml-[68px]">
        <CardBody className='bg-custom-gray' >
          <Heading>Invitations</Heading>
            You have been invited to the following events.
        </CardBody>
        <CardBody className='bg-custom-gray'>
          {invites.length > 0 ? (
            <div className="flex flex-col gap-4">
              {invites.map((invitation) => (
                <div
                  key={invitation.invitationId}
                  className="flex items-center justify-between bg-primary/10 p-4 rounded-lg bg-white"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar src={invitation.inviterAvatar}>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {invitation.inviterLogin}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Invitation to: {invitation.calendarName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => accept(invitation.invitationId)}>Accept</Button>
                    <Button onClick={() => decline(invitation.invitationId)} variant="outline">Deny</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              No invitations available.
            </div>
          )}
        </CardBody>
      </Card>
    );
  }

  export default Invitations;