import React from 'react';
import {  Card, Avatar, AvatarBadge, Heading, Button, CardBody } from "@chakra-ui/react";
import '../styles/tailwind.css';


function Invitations() {
    const invitations = [
        {
            fromUser: "Alicia Garcia",
            calendarName: "Design Project Meeting",
            src: "https://source.unsplash.com/random/40x40?profile,a",
          },
          {
            fromUser: "Marcus Chen",
            calendarName: "Sprint Planning",
            src: "https://source.unsplash.com/random/40x40?profile,b",
          },
          {
            fromUser: "Emily Jackson",
            calendarName: "Company Townhall",
            src: "https://source.unsplash.com/random/40x40?profile,c",
          },
    ];
  
    return (
        <Card className="ml-[68px]">
        <CardBody className='bg-custom-gray' >
          <Heading>Invitations</Heading>
            You have been invited to the following events.
        </CardBody>
        <CardBody className='bg-custom-gray'>
          {invitations.length > 0 ? (
            <div className="flex flex-col gap-4">
              {invitations.map((invitation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-primary/10 p-4 rounded-lg bg-white"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarBadge src={invitation.src} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {invitation.fromUser}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Invitation to: {invitation.calendarName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button>Accept</Button>
                    <Button variant="outline">Deny</Button>
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