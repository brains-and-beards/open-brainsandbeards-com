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

const PrismSyntaxHighlight = ({ children, className = 'language-typescript' }) => {
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
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={className}
            style={{ ...style, position: 'relative', backgroundColor: '' }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )
      }}
    </Highlight>
  )
}

export default PrismSyntaxHighlight
