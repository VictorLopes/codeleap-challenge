import React, { useState } from 'react';
import { Modal, Input, Button } from '../components';
import { useAuth } from '../hooks';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const { setUsername } = useAuth();

  const handleEnter = () => {
    if (name.trim()) {
      setUsername(name);
    }
  };

  return (
    <Modal isOpen={true}>
      <h2 style={{ marginBottom: '24px', fontSize: '22px', fontWeight: '700' }}>
        Welcome to CodeLeap network!
      </h2>
      <Input
        label="Please enter your username"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleEnter}
          disabled={!name.trim()}
          variant="primary"
        >
          ENTER
        </Button>
      </div>
    </Modal>
  );
};

export default Signup;
