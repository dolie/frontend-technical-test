import type { FC } from 'react'
import Router from 'next/router'

const BackButton: FC = () => (
  <div className="text-center w-1/3 mx-auto">
    <button
      type="button"
      onClick={() => Router.back()}
      className="btn-primary p-2"
    >
      {'< Back'}
    </button>
  </div>
)

export default BackButton
