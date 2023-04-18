import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { validateEmail } from "./utils";

const ContactFormInternals = ({ title, subtitle }) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleInputChange = (event) => {
    const validationResult = validateEmail(event.target.value);
    setIsSubmitEnabled(validationResult);
  };

  return (
    <section className="contact-form">
      <form
        method="post"
        data-netlify="true"
        name="contact"
        action="/message-sent"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div className="content">
          <div className="contact-content">
            <div>
              <StaticImage
                src="../../../assets/illustrations/contact-us.png"
                height={192}
                placeholder="blurred"
                alt="Contact us"
              />
            </div>

            {title}
            <p className="sub2 amazing">{subtitle}</p>

            <label htmlFor="email"> Email address </label>
            <input type="text" name="email" onChange={handleInputChange} />
            <label htmlFor="phone">Phone number (not necessary)</label>
            <input type="text" name="phone" />
            <label htmlFor="text">How can we help you ?</label>
            <textarea name="text" />

            <button disabled={!isSubmitEnabled} className="cta-action">
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactFormInternals;
