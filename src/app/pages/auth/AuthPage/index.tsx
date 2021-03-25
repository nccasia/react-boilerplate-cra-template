/**
 *
 * AuthPage
 *
 */
import * as React from 'react'
import styled from 'styled-components/macro'
import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../components/AuthLayout'
import { messages } from './messages'
import { Route, useRouteMatch } from 'react-router'
import { LoginPage } from '../LoginPage'

interface Props {}

export function AuthPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { path } = useRouteMatch()
  const { t, i18n } = useTranslation()
  return (
    <AuthLayout>
      <Route path={`${path}/login`} component={LoginPage}></Route>
    </AuthLayout>
  )
}
