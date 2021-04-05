import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() { // a FUNCTIONAL React "class" (actually, it's a function, woah)
  const {
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  return !isAuthenticated ? (
    <button onClick={loginWithRedirect}>LogIn</button >
  ) : ( // heck yeah! Ternaries!
    <button onClick={logout}>LogOut</button>
  );
}

export default LoginButton;