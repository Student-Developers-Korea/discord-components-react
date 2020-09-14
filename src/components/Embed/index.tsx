import React from 'react'
import styled from 'styled-components'

const EmbedFlex = styled.div`
  position: relative;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
`

const EmbedContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 0.25rem;
  text-indent: 0;
  min-height: 0;
  max-width: 520px;
  min-width: 0;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
`

const EmbedWrapper = styled.div`
  overflow-wrap: anywhere;
  justify-content: start;
  align-items: start;
  border-left: 4px solid
    ${(props) => props.color || 'var(--background-tertiary)'};
  background: var(--input-bg);
  position: relative;
  display: grid;
  max-width: max-content;
  box-sizing: border-box;
  border-radius: 4px;
  white-space: pre-line;
  font-size: 1rem;
  line-height: 1.375rem;
  color: var(--embed-color);
  font-weight: 400;
`

const EmbedGrid = styled.div`
  padding: 0.5rem 1rem 1rem 0.75rem;
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
`

const EmbedTitle = styled.div`
  min-width: 0;
  color: var(--header-primary);
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  grid-column: 1/1;
  margin-top: 8px;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedDescription = styled.div`
  min-width: 0;
  color: var(--text-normal);
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 400;
  white-space: pre-line;
  grid-column: 1/1;
  margin-top: 8px;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedFooter = styled.div`
  min-width: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  grid-row: auto/auto;
  grid-column: 1/1;
  margin-top: 8px;
`

const EmbedFooterText = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  color: var(--text-normal);
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedFooterImg = styled.img.attrs((props) => ({
  src: props.src
}))`
  margin-right: 8px;
  width: 20px;
  height: 20px;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 50%;
`

const EmbedFields = styled.div`
  min-width: 0;
  display: grid;
  grid-column: 1/1;
  margin-top: 8px;
  grid-gap: 8px;
`

const EmbedField = styled.div`
  font-size: 0.875rem;
  line-height: 1.125rem;
  min-width: 0;
  font-weight: 400;
`

const EmbedFieldName = styled.div`
  color: var(--text-normal);
  font-weight: 600;
  margin-bottom: 2px;
  font-size: 0.875rem;
  line-height: 1.125rem;
  min-width: 0;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedFieldValue = styled.div`
  color: var(--text-normal);
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 400;
  white-space: pre-line;
  min-width: 0;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedAuthor = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  grid-column: 1/1;
  margin-top: 8px;
`

const EmbedAuthorImg = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 50%;
`

const EmbedAuthorText = styled.span`
  color: var(--header-primary);
  font-size: 0.875rem;
  font-weight: 600;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
`

const EmbedAuthorAnchor = styled.a`
  color: var(--header-primary);
  word-break: break-word;
  text-decoration: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  unicode-bidi: -moz-plaintext;
  unicode-bidi: plaintext;
  text-align: left;
  &:hover {
    text-decoration: underline;
  }
`

type EmbedFieldType = {
  name: string
  value: string
  inline?: boolean
}

type EmbedProps = {
  color?: string
  author?: { text: string; img?: string; url?: string }
  title?: string
  description?: string
  footer?: { text: string; img?: string }
  fields?: Array<EmbedFieldType>
}

const Embed: React.FC<
  React.BaseHTMLAttributes<HTMLDivElement> & EmbedProps
> = ({ color, author, title, description, fields, footer, ...props }) => {
  const chunkedFields: Array<Array<EmbedFieldType>> = []

  let chunk: Array<EmbedFieldType> = []

  if (fields) {
    fields.forEach((field) => {
      if (!field.inline) {
        chunkedFields.push(chunk)
        chunk = []
        chunkedFields.push([field])
        return
      }

      if (chunk.length >= 3) {
        chunkedFields.push(chunk)
        chunk = []
      }
      chunk.push(field)
    })
  }

  if (chunk.length !== 0) chunkedFields.push(chunk)

  console.log(chunkedFields)

  return (
    <EmbedFlex {...props}>
      <EmbedContainer>
        <EmbedWrapper color={color}>
          <EmbedGrid>
            {author && (
              <EmbedAuthor>
                {author.img && <EmbedAuthorImg src={author.img} />}
                {author.url && author.text ? (
                  <EmbedAuthorAnchor target='_blank' href={author.url}>
                    {author.text}
                  </EmbedAuthorAnchor>
                ) : (
                  author.text && (
                    <EmbedAuthorText>{author.text}</EmbedAuthorText>
                  )
                )}
              </EmbedAuthor>
            )}
            {title && <EmbedTitle>{title}</EmbedTitle>}
            {description && <EmbedDescription>{description}</EmbedDescription>}
            {fields && (
              <EmbedFields>
                {chunkedFields.map((chunk, idx) =>
                  chunk.map((field, i) => (
                    <EmbedField
                      key={`${idx}-${i}`}
                      style={{
                        gridColumn:
                          chunk.length === 1
                            ? '1/13'
                            : chunk.length === 2
                            ? i === 0
                              ? '1/7'
                              : '8/12'
                            : i === 0
                            ? '1/4'
                            : i === 1
                            ? '5/8'
                            : '9/12'
                      }}
                    >
                      <EmbedFieldName>{field.name}</EmbedFieldName>
                      <EmbedFieldValue>{field.value}</EmbedFieldValue>
                    </EmbedField>
                  ))
                )}
              </EmbedFields>
            )}
            {footer && (
              <EmbedFooter>
                {footer.img && <EmbedFooterImg src={footer.img} />}
                {footer.text && (
                  <EmbedFooterText>{footer.text}</EmbedFooterText>
                )}
              </EmbedFooter>
            )}
          </EmbedGrid>
        </EmbedWrapper>
      </EmbedContainer>
    </EmbedFlex>
  )
}

export default Embed
