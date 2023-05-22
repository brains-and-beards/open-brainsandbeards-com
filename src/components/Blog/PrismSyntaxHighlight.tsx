import rangeParser from 'parse-numeric-range'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'

const calculateLinesToHighlight = meta => {
  const RE = /{([\d,-]+)}/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)[1]
    const lineNumbers = rangeParser(strlineNumbers)
    return index => lineNumbers.includes(index + 1)
  } else {
    return () => true
  }
}

const PrismSyntaxHighlight = ({ children, className, shouldCountLineNumbers }) => {
  let language = className.replace(/language-/gm, '')
  const highlightedLinesMatch = language.match(/{[^}]+}/)
  let highlightLinesDefinition = ''
  if (highlightedLinesMatch !== null) {
    highlightLinesDefinition = highlightedLinesMatch[0]
    language = language.substr(0, highlightedLinesMatch.index)
  }
  const shouldHighlightLine = calculateLinesToHighlight(highlightLinesDefinition)

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => {
        const wrapperClassName = shouldCountLineNumbers ? `numbered-lines ${className}` : className

        return (
          <pre className={wrapperClassName}>
            {tokens.slice(0, -1).map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`
              }

              const lineWrapperStyle = shouldCountLineNumbers ? 'numbered-lines-rows' : ''
              lineProps.className += ' ' + lineWrapperStyle

              delete lineProps.style
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key })
                    delete tokenProps.style
                    // eslint-disable-next-line react/jsx-key -- getTokenProps() should give it, strange that Linter doesn't see it
                    return <span {...tokenProps} />
                  })}
                </div>
              )
            })}
          </pre>
        )
      }}
    </Highlight>
  )
}

export default PrismSyntaxHighlight
