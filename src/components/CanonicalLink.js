import React from 'react'
// import { useContext } from 'react'

// import { TranslationContext } from '../configs/i18n'
// import { findBasePath } from '../configs/paths'
import { host } from '../configs/consts'
import { slashify } from '../helpers/path_helpers'

// TODO Find the actual path for the base language when merging this with the i18n branch
const findBasePath = (/*locale,*/ path) => slashify(path)

const CanonicalLink = ({ path }) => {
  // const { locale } = useContext(TranslationContext)
  // const locale = 'en'

  return <link rel="canonical" href={`${host}${findBasePath(/*locale,*/ path)}`} />
}

export default CanonicalLink
