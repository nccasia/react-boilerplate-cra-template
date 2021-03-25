/**
 *
 * Asynchronously loads the component for UserProfilePage
 *
 */

import { lazyLoad } from 'utils/loadable'

export const MyProfilePage = lazyLoad(
  () => import('./index'),
  module => module.MyProfilePage,
)
