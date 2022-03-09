import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const googleResponse = (response) => {
    localStorage.setItem('user', JSON.stringify(response?.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <div className='flex justify-center items-center flex-col h-screen text-white pb-40 overflow-y-hidden'>Login
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLEAPI_TOKEN}
        render={(renderProps) => (
          <button
            type='button'
            className='bg-white text-black p-3 cursor-pointer outline-none'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign into Google
          </button>
        )}
        onSuccess={googleResponse}
        onFailure={googleResponse}
        cookiePolicy='single_host_origin'
      />
    </div>
  );
};

export default Login;
