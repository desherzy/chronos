import React, { useState } from 'react';
import useAuthStore from '../store/auth';
import ProfileSettings from './ProfileSettings';


function MainPage() {

  return (
    <div>
      <ProfileSettings/>

    </div>
  );
}

export default MainPage;