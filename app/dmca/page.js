import Layout from "@/components/layout/Layout"
import "../../public/assets/css/policy-pages.css"

export default function DMCA() {
  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="DMCA Policy">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <article className="policy-content">
              <h1>DMCA Policy</h1>
              <p className="last-updated">Last updated: December 2024</p>

              <section>
                <h2>1. Introduction</h2>
                <p>
                  NEWWATCH24 (“we,” “our,” or “us”) respects the intellectual property rights of others and expects our users to do the same. 
                  In accordance with the Digital Millennium Copyright Act (DMCA) and other applicable copyright laws, 
                  we have adopted this DMCA Policy to handle claims of copyright infringement.
                </p>
              </section>

              <section>
                <h2>2. Reporting Copyright Infringement</h2>
                <p>
                  If you believe that material available on our website infringes your copyright, 
                  you may submit a written notice (“DMCA Notice”) to us. Your notice must include:
                </p>
                <ul>
                  <li>A physical or electronic signature of the copyright owner or an authorized representative</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate it</li>
                  <li>Your contact information (name, email address, and mailing address)</li>
                  <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law</li>
                  <li>
                    A statement that the information in your notice is accurate, and under penalty of perjury, 
                    that you are authorized to act on behalf of the copyright owner
                  </li>
                </ul>
                <p>
                  Please send DMCA Notices to: <strong>contact@NEWWATCH24.com</strong>
                </p>
              </section>

              <section>
                <h2>3. Counter-Notification</h2>
                <p>
                  If you believe that your content was removed by mistake or misidentification, 
                  you may submit a counter-notification. Your counter-notification must include:
                </p>
                <ul>
                  <li>Your physical or electronic signature</li>
                  <li>Identification of the removed material and the location where it appeared before removal</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</li>
                  <li>Your name, address, phone number, and email address</li>
                  <li>
                    A statement that you consent to the jurisdiction of the courts in Vietnam and 
                    that you will accept service of process from the person who provided the original DMCA Notice
                  </li>
                </ul>
                <p>
                  Please send counter-notifications to: <strong>contact@NEWWATCH24.com</strong>
                </p>
              </section>

              <section>
                <h2>4. Repeat Infringers</h2>
                <p>
                  In appropriate circumstances, we may disable or terminate the accounts of users who are repeat infringers.
                </p>
              </section>

              <section>
                <h2>5. Disclaimer</h2>
                <p>
                  This DMCA Policy does not constitute legal advice. If you are unsure of your rights, 
                  obligations, or whether certain material infringes your copyright, 
                  you should seek legal counsel before filing a DMCA Notice.
                </p>
              </section>

              <section>
                <h2>6. Contact Information</h2>
                <p>
                  For all copyright-related inquiries, please contact us at:
                </p>
                <ul>
                  <li>Email: contact@NEWWATCH24.com</li>
                  <li>Contact Page: <a href="/contact">Contact Us</a></li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}
