import React from 'react';
import Avatar from 'react-avatar';

const EmailAvatar = ({ email }) => {
    return (
        <Avatar email={email} round={true} size="50" />
    );
};


const NameAvatar = ({ name }) => {
    return (
        <Avatar name={name} round={true} size="40" />
    );
};

export  { EmailAvatar, NameAvatar };