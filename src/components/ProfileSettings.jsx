import React, { useRef, useState } from 'react';
import {  Card, CardHeader, CardBody, CardFooter, Avatar, AvatarBadge, Heading, Button, FormLabel, Switch, Input, Badge  } from "@chakra-ui/react";
import '../styles/tailwind.css';
import useAuthStore from '../store/auth';

function ProfileSettings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newLogin, setNewLogin] = useState('');
  const fileInputRef = useRef(null);
  const { uploadAvatar, user, updateUser, toogleNotifications } = useAuthStore();

  const handleToggleNotifications = async () => {
    const updatedNotifications = !user.notifications;
    await toogleNotifications(updatedNotifications);
  };

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
    input.click();
  };

  const handleUploadAvatar = () => {
    if (selectedFile) {
        uploadAvatar(selectedFile);
    }
  };

  const handleUpdateLogin = () => {
    if (newLogin) {
        updateUser(newLogin);
    }
  };

  const handleLoginChange = (e) => {
    setNewLogin(e.target.value);
  };

    return (
      <Card className="max-w-lg mx-auto p-6 mt-12 relative z-1">
        <CardHeader className="mb-4">
          <Heading className="text-2xl font-bold">Profile Settings</Heading>
        </CardHeader>

        <CardBody className="space-y-6">
          <Badge ml="1" colorScheme="purple" fontSize="1.2em">
            {user.login}
          </Badge>

          <div className="flex items-center space-x-4">
            <Avatar
              size="lg"
              src={user.profileImage}
              onClick={handleAvatarClick}
            ></Avatar>

            <div className="flex-1">
              <Button onClick={handleUploadAvatar} variant="outline" className="text-sm">
                Change Avatar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FormLabel htmlFor="login" className="w-1/4">
                New login
              </FormLabel>
              <Input
                id="login"
                value={newLogin}
                onChange={handleLoginChange}
                className="w-3/4"
                placeholder="Enter your login"
              />
            </div>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="email-notifications" className="flex-grow">
                Email Notifications
              </FormLabel>
              <Switch
                id="email-notifications"
                isChecked={user.notifications}
                onChange={handleToggleNotifications}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="danger"
            onClick={() =>
              alert(
                'Are you sure you want to delete your account? This action cannot be undone.'
              )
            }
          >
            Delete Account
          </Button>
          <Button onClick={handleUpdateLogin}>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default ProfileSettings;