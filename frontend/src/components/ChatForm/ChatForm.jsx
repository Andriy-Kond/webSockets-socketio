import { useState } from 'react';

import styles from './signin-chat-form.module.css';

const ChatForm = ({ onSubmit }) => {
  const [state, setState] = useState({ message: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ message: '' });
  };
};

export default ChatForm;
