/**
 *
 * MyProfilePage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'app/pages/auth/contexts/AuthContext';

interface Props {}

export function MyProfilePage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { logout } = useAuthContext();

  return (
    <Div>
      <h2>MyProfilePage</h2>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </Div>
  );
}

const Div = styled.div``;
