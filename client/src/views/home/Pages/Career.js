/* eslint-disable */
import React from 'react';
import SEO from '../common/SEO';
import SectionTitle from '../elements/sectionTitle/SectionTitle';
import Layout from '../common/Layout';
import ContactForm from '../elements/contact/ContactForm';

// import BreadcrumbOne from '../elements/breadcrumb/BreadcrumbOne';
// import SectionTitle from '../elements/sectionTitle/SectionTitle';

import '../assets/scss/style.css';

const Career = () => {
  return (
    <>
      <SEO title="Contact || Doob - React Business  Template" />
      <Layout>
        {/* <BreadcrumbOne
          title="Contact Us."
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Contact"
        /> */}
        <div className="main-content">
          {/* Start Contact Area  */}
          <div className="rwt-contact-area rn-section-gap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb--40">
                  <SectionTitle
                    textAlign="text-center"
                    radiusRounded=""
                    subtitle=""
                    title="Career Page"
                    description=""
                  />
                </div>
              </div>
              <div className="row mt--40 row--15">
                <div className="col-lg-7">
                  <ContactForm formStyle="contact-form-1" />
                </div>
              </div>
            </div>
          </div>
          {/* End Contact Area  */}
        </div>
      </Layout>
    </>
  );
};
export default Career;
