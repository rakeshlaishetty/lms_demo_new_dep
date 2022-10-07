import React from 'react';
import SEO from '../common/SEO';
import Layout from '../common/Layout';
// import BreadcrumbOne from '../elements/breadcrumb/BreadcrumbOne';
// import SectionTitle from '../elements/sectionTitle/SectionTitle';
import ContactOne from '../elements/contact/ContactOne';
import '../assets/scss/style.css';

const ContactUs = () => {
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
              {/* <div className="row">
                <div className="col-lg-12 mb--40">
                  <SectionTitle
                    textAlign="text-center"
                    radiusRounded=""
                    subtitle="Contact Form"
                    title="Our Contact Address Here."
                    description=""
                  />
                </div>
              </div> */}
              <ContactOne />
            </div>
          </div>
          {/* End Contact Area  */}
        </div>
      </Layout>
    </>
  );
};
export default ContactUs;
