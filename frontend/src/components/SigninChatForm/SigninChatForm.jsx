import { useState } from 'react';

import styles from './signin-chat-form.module.css';

const SingninChatForm = ({ onSubmit }) => {
  const [state, setState] = useState({ name: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ name: '' });
  };
};

export default SigninChatForm;
