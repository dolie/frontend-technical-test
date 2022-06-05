import type { FC } from 'react'
import Router from 'next/router'

const BackButton: FC = () => (
  <button type="button" onClick={() => Router.back()}>
    {'< Back'}
  </button>
)

export default BackButton
