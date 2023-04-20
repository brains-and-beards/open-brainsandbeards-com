import React from 'react'
import { navigate } from 'gatsby'
import { validateEmail } from '../Contact/forms/utils'
import { useState, useCallback } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useEffect } from 'react'
import Modal from '../shared/Modal'
import { StaticImage } from 'gatsby-plugin-image'

const BlogNewsletter = () => {
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [modalText, setModalText] = useState('')

  const showErrorModal = error => {
    setModalText(typeof error === 'string' ? error : error.message)
    setShowModal(true)
  }

  const handleModalClose = useCallback(() => setShowModal(false), [setShowModal])

  useEffect(() => {
    setSubmitEnabled(validateEmail(submittedEmail) && submittedName.length > 0)
  }, [submittedEmail, submittedName])

  const handleInputChange = useCallback(event => {
    const email = event.target.value
    setSubmittedEmail(email)
  }, [])

  const handleNameInputChange = useCallback(event => {
    const name = event.target.value
    setSubmittedName(name)
  }, [])

  const submitToMailchimp = e => {
    e.preventDefault()

    if (submittedEmail.length > 0) {
      addToMailchimp(submittedEmail, {
        FNAME: submittedName,
        EMAIL: submittedEmail
      })
        .then(data => {
          if (data.result == 'success') {
            navigate('/newsletter-subscribed')
          } else if (data.result == 'error') {
            if (data.msg.includes('The username portion of the email address is invalid')) {
              showErrorModal(data.msg.replace('0 - ', ''))
            } else {
              showErrorModal(data.msg)
            }
          }
        })
        .catch(error => {
          showErrorModal(error)
        })
    }
  }

  return (
    <section className="estimateProject">
      <div className="content row">
        <StaticImage
          className="center-mobile cta-bar-image desktop-only"
          height={400}
          src="../../assets/illustrations/estimate-project-bar-left.png"
          alt="Happy puzzle phone"
        />
        <div className="center newsletter-content">
          <h2>Subscribe to our newsletter</h2>
          <p className="sub2">
            Stay in touch with us! If you subscribe, we will keep you up to date with our new
            adventures, learnings and insights.
          </p>

          <p className="sub2">
            {' '}
            If emails are not your cup of coffee, you can use{' '}
            <a href="https://brainsandbeards.com/blog/feed.xml">RSS feed</a> instead.
          </p>
          <div className="blog-newsletter">
            <div className="narrow-column">
              <form onSubmit={submitToMailchimp}>
                <input type="hidden" name="form-name" value="know_more" />
                <label htmlFor="email">Email address</label>

                <div className="form col">
                  <input type_="text" name="email" onChange={handleInputChange} />

                  <div className="name-blog-form">
                    <label htmlFor="name">Name</label>

                    <input type="text" onChange={handleNameInputChange} name="name" />
                  </div>

                  <button className="newsletter-button" disabled={!submitEnabled}>
                    I want to know more
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <StaticImage
          className="cta-bar-image desktop-only newsletter-image-right"
          height={400}
          src="../../assets/illustrations/estimate-project-bar-right.png"
          alt="Happy puzzle phone"
        />
      </div>
      <div className="blog-micro">
        <p className=" micro">
          Clicking "I want to know more" you consent to processing your data by Brains & Beards sp.
          z o.o. for marketing purposes, including sending emails.
        </p>
      </div>

      <Modal onClose={handleModalClose} show={showModal} title={'Error'} mainText={modalText} />
    </section>
  )
}

export default BlogNewsletter
