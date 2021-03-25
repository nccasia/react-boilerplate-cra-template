/**
 *
 * LoginPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { useAuthContext } from '../contexts/AuthContext';

interface Props {}

export function LoginPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { login } = useAuthContext();
  const handleLogin = React.useCallback(
    event => {
      event.preventDefault();
      const value = event.target.value;
      login(value);
    },
    [login],
  );

  return (
    <Div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <input type="text" name="email" />
        </div>
        <div>
          <input type="password" name="email" />
        </div>
        <button type="submit">Login</button>
      </form>
    </Div>
  );
}

const Div = styled.div``;
