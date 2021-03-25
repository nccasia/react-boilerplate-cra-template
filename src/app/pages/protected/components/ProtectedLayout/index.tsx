/**
 *
 * ProtectedLayout
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function ProtectedLayout(props: Props) {
  return <Div>{props.children}</Div>;
}

const Div = styled.div``;
