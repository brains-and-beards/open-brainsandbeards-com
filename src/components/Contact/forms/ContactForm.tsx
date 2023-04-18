import React from 'react'
import ContactFormInternals from './ContactFormInternals'

const renderTitle = ({ title: titleParam, main }) => {
  const title = titleParam || 'Contact us'
  const klass = title.length > 15 ? 'small-headline' : ''

  if (main) return <h1 className={`center small-h1 ${klass}`}>{title}</h1>
  else return <h3 className={`center ${klass}`}>{title}</h3>
}

const ContactForm = (props) => {
  const subtitle =
    props.subtitle ||
    'Got something amazing for us? Fill in the form below to start a new project!'

  return (
    <section className="contact-form">
      <ContactFormInternals
        title={renderTitle(props)}
        subtitle={subtitle}
      />
    </section>
  )
}

export default ContactForm
