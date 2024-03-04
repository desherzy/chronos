import React from 'react';
import {  Card, CardHeader, CardBody, CardFooter, Avatar, AvatarBadge, Heading, Button, FormLabel, Switch, Input  } from "@chakra-ui/react";
import '../styles/tailwind.css';

function ProfileSettings() {

    return (
      <Card className="max-w-lg mx-auto p-6">
        <CardHeader className="mb-4">
          <Heading  className="text-2xl font-bold">Profile Settings</Heading >
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarBadge
                src="https://source.unsplash.com/random/128x128?person"
                alt="User avatar"
              />
            </Avatar>
            <div className="flex-1">
              <Button variant="outline" className="text-sm">Change Avatar</Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <FormLabel htmlFor="login" className="w-1/4">Login</FormLabel>
              <Input id="login" className="w-3/4" placeholder="Enter your login" />
            </div>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="email-notifications" className="flex-grow">Email Notifications</FormLabel>
              <Switch id="email-notifications" />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="danger"
            onClick={() => alert('Are you sure you want to delete your account? This action cannot be undone.')}
          >
            Delete Account
          </Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default ProfileSettings;