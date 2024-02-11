"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const TermsAndConditions = () => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className={`container mx-auto ${isVisible ? "animate-fadeIn" : ""}`}>
        <h1 className="text-3xl font-bold text-center mb-4">Terms of Use</h1>
        <div className="bg-white shadow rounded p-4 md:p-8">
          {/* Terms content */}
          <div className="mb-4">
            Your use of Hackingly&apos;s products, software, services, and
            websites (collectively referred to as the “Services”) is subject to
            the terms of a legal agreement between you and Hackingly. Please
            read the following terms and conditions very carefully as your use
            of services is subject to your acceptance of and compliance with the
            following terms and conditions ("Terms").
          </div>
          <div className="mb-4">
            By subscribing to or using any of our services, you agree that you
            have read, understood and are bound by the Terms, regardless of how
            you subscribe to or use the services. If you do not want to be bound
            by the Terms, you must not subscribe to or use our services.
          </div>
          <div>
            In these Terms, references to "you", "User", “Visitor” shall mean
            the end user accessing the Website, its contents and using the
            Services offered through the Website, and "we", "us" and "our" shall
            mean{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            and its affiliates
          </div>
          {/* More terms content */}
          <h2 className="text-xl font-semibold mt-4 mb-2">User Agreement</h2>
          <div className="mb-4">
            These Terms of Use govern your use of Services offered through{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>
            . &nbsp;You agree to access "the site", subject to the terms and
            conditions of use as set out here. You may not use the Services if
            you do not accept the Terms.
          </div>
          <div>
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            may add to or change or update these Terms of Use, from time to time
            entirely at its own discretion. You are responsible for checking
            these Terms of Use periodically to remain in compliance with these
            terms. Your use of a Site after any amendment to the Terms of Use
            shall constitute your acceptance of these terms and you also agree
            to be bound by any such changes/revisions
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Accepting the Terms
          </h2>
          <div>
            You can accept the Terms by:{" "}
            <div className="ml-4">
              • clicking to accept or agree to the Terms, where this option is
              made available to you by Hackingly in the user interface for any
              Service; or
            </div>
            <div className="ml-4">
              • by actually using the Services. In this case, you understand and
              agree that Hackingly will treat your use of the Services as
              acceptance of the Terms from that point onwards.
            </div>
            <div className="mt-4">
              You may not use the Services and may not accept the Terms if you
              are not of legal age to form a binding contract with Hackingly.
              Before you continue, you should print off or save a local copy of
              the Terms for your records.
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Modification</h2>
          <div className="mb-4">
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            reserves the right to suspend/cancel, or discontinue any or all
            channels, products or service at any time without notice, make
            modifications and alterations in any or all of the content, products
            and services contained on the site without prior notice. Any such
            modifications or alterations shall be notified at the website and
            all users must comply with the new terms and conditions.
          </div>
          <div className="mb-4">
            You understand and agree that if you use the Services after the date
            on which the Terms have changed, Hackingly will treat your use as
            acceptance of the updated Terms.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Registration, Access and Exchange of Information
          </h2>
          <div className="mb-4">
            For certain services such as email, personal web pages, etc.
            registration by the visitor is required. To register for these
            services, you have to open an account by completing the registration
            process (i.e. by providing us with current, complete and accurate
            information as prompted by the applicable registration form). You
            will also choose a password and username which will be your email
            id. You are entirely responsible for maintaining the confidentiality
            of your password and account. By registering, you agree to the
            following terms in addition to any other specific terms which shall
            be posted at an appropriate location of the Site.
          </div>
          <div className="mb-4">
            To access these services, you will be asked to enter your User Name
            and Password, as chosen by you during your registration. Therefore,
            we do not permit any of the following:-
          </div>
          <div className="ml-4">
            • Any other person sharing your account and Password;
            <br />• Any part of the Site being cached in proxy servers and
            accessed by individuals who have not registered with{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            as users of the Site; or
            <br />• Access through a single account and Password being made
            available to multiple users on a network.
          </div>
          <div className="mt-4">
            If{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            reasonably believes that an account and password is being
            used/misused in any manner,{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            shall reserve the right to cancel access rights immediately without
            notice, and block access to all users from that IP address.
          </div>
          <div className="mt-4">
            Furthermore, you are entirely responsible for any and all activities
            that occur under your account. You agree to notify{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            immediately of any unauthorised use of your account or any other
            breach of security.{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            will not be liable for any loss that you may incur as a result of
            someone else using your password or account. However, you could be
            held liable for losses incurred by{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            or another party due to someone else using your account or password.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Your passwords and account security
          </h2>
          <div className="mt-4">
            You agree and understand that you are responsible for maintaining
            the confidentiality of passwords associated with any account you use
            to access the Services.
          </div>
          <div className="mt-4">
            Accordingly, you agree that you will be solely responsible to
            Hackingly for all activities that occur under your account.
          </div>
          <div className="mt-4">
            If you become aware of any unauthorised use of your password or of
            your account, you agree to notify Hackingly immediately at{" "}
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              help@Hackingly.in
            </Link>
          </div>
          <div className="mt-4">
            If{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            reasonably believes that an account and password is being
            used/misused in any manner,{" "}
            <Link
              href="https://www.hackingly.in/"
              className="text-blue-500 hover:text-blue-700"
            >
              Hackingly.in
            </Link>{" "}
            shall reserve the right to cancel access rights immediately without
            notice, and block access to all users from that IP address.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Privacy Policy</h2>
          <div className="mt-4">
            The User hereby consents, expresses and agrees that he/she has read
            and fully understands the Privacy Policy of Hackingly.in in respect
            of the Website. The user further consents that the terms and
            contents of such Privacy Policy are acceptable to him.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Advertising Material
          </h2>
          <div className="mt-4">
            Part of the Site contains advertising information or promotion
            material or other material submitted to Hackingly by third parties.
            Responsibility for ensuring that material submitted for inclusion on
            Hackingly complies with applicable international and national law is
            exclusively on the party providing the information/material. Your
            correspondence or business dealings with, or participation in
            promotions of, advertisers other than Hackingly.in found on or
            through the Website, including payment and delivery of related goods
            or services, and any other terms, conditions, warranties or
            representations associated with such dealings, are solely between
            you and such advertiser. We will not be responsible or liable for
            any claim, error, omission, inaccuracy in advertising material or
            any loss or damage of any sort incurred as the result of any such
            dealings or as the result of the presence of such advertisers on the
            Website. Hackingly reserves the right to omit, suspend or change the
            position of any advertising material submitted for insertion.
            Acceptance of advertisements on the Site will be subject to these
            terms and conditions.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            User Conduct and Rules
          </h2>
          <div className="mt-4">
            You agree and undertake to use the Website and the Service only to
            post and upload messages and material that are proper. By way of
            example, and not as a limitation, you agree and undertake that when
            using a Service, you will not:
          </div>
          <div className="ml-4">
            <br />
            • Defame, abuse, harass, stalk, threaten or otherwise violate the
            legal rights of others;
            <br />• Publish, post, upload, distribute or disseminate any
            inappropriate, profane, defamatory, infringing, obscene, indecent or
            unlawful topic, name, material or information;
            <br />
            • Upload files that contain software or other material protected by
            intellectual property laws unless you own or control the rights
            thereto or have received all necessary consents;
            <br />• Upload or distribute files that contain viruses, corrupted
            files, or any other similar software or programs that may damage the
            operation of the Website or another's computer;
            <br />
            • Conduct or forward surveys, contests, pyramid schemes or chain
            letters;
            <br />• Download any file posted by another user of a Service that
            you know, or reasonably should know, cannot be legally distributed
            in such manner;
            <br />
            • Falsify or delete any author attributions, legal or other proper
            notices or proprietary designations or labels of the origin or
            source of software or other material contained in a file that is
            uploaded;
            <br />• Violate any code of conduct or other guidelines, which may
            be applicable for or to any particular Service;
            <br />
            • Violate any applicable laws or regulations for the time being in
            force in or outside India; and
            <br />• Violate any of the terms and conditions of this Agreement or
            any other terms and conditions for the use of the Website contained
            elsewhere herein.{" "}
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            User Conduct and Rules
          </h2>
          <div className="mt-4">
            The user guarantees, warrants, and certifies that you are the owner
            of the content which you submit or otherwise authorised to use the
            content and that the content does not infringe upon the property
            rights, intellectual property rights or other rights of others. You
            further warrant that to your knowledge, no action, suit, proceeding,
            or investigation has been instituted or threatened relating to any
            content, including trademark, trade name service mark, and copyright
            formerly or currently used by you in connection with the Services
            rendered by Hackingly.in.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Termination and Access Restriction
          </h2>
          <div className="mt-4">
            Hackingly.in reserves the right, in its sole discretion, to
            terminate the access to the website and the related services or any
            portion thereof at any time, without notice.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Fee Payments </h2>
          <div className="mt-4">
            Hackingly.in reserves the right to charge
            listing/advertising/product usage fees as well as transaction fees
            based on certain completed transactions using the Hackingly.in
            Services. Hackingly.in further reserves the right to alter any and
            all fees from time to time, without notice. The User shall be liable
            to pay all applicable charges, fees, duties, taxes, levies and
            assessments for availing the Hackingly.in Services.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Delivery of Services{" "}
          </h2>
          <div className="mt-4">
            All our services are online. No physical delivery will be carried
            out for any of the services purchased. Users will get an email once
            a service is purchased with instructions on how to go about availing
            them on the website. Our team of experts will assist you in
            providing a hassle free user experience.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Cancellation/Refund Policy{" "}
          </h2>
          <div className="mt-4">
            All sales/purchase of services are final with no refund or exchange
            permitted. However, if in a transaction performed by you on the
            site, money has been charged to your card or bank account without
            the delivery of the services, then you may inform us by sending an
            email to support@Hackingly.in or an email address mentioned on the
            Contact Us page. Hackingly.in shall investigate the incident and if
            it is found that money was indeed charged to your card or bank
            account without delivery of the service, then you will be refunded
            the money within 21 working days from the date of receipt of your
            email. All refunds will be credited back to the source of the
            payment after deducting the service charges and taxes(if
            applicable). It will take 3-21 days for the money to show in your
            bank account depending on your bank's policy.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Disclaimer of Warranties/Limitation of Liability
          </h2>
          <div className="mt-4">
            Hackingly.in has endeavored to ensure that all the information on
            the Website is correct, but Hackingly.in neither warrants nor makes
            any representations regarding the quality, accuracy or completeness
            of any data, information, product or Service. In no event shall
            Hackingly.in be liable for any direct, indirect, punitive,
            incidental, special, consequential damages or any other damages
            resulting from:
          </div>
          <div className="ml-4">
            <br />
            • the use or the inability to use the Services;
            <br />
            • unauthorized access to or alteration of the user's transmissions
            or data;
            <br />• any other matter related to the services; including, without
            limitation, damages for loss of use, data or profits, arising out of
            or in any way connected with the use or performance of the website
            or service. Neither shall Hackingly.in be responsible for the delay
            or inability to use the website or related services, the provision
            of or failure to provide services, or for any information, software,
            products, services and related graphics obtained through the
            website, or otherwise arising out of the use of the website, whether
            based on contract, tort, negligence, strict liability or otherwise.
            Further, Hackingly.in shall not be held responsible for
            non-availability of the Website during periodic maintenance
            operations or any unplanned suspension of access to the website that
            may occur due to technical reasons or for any reason beyond
            Hackingly.in’s control. The user understands and agrees that any
            material and/or data downloaded or otherwise obtained through the
            website is done entirely at their own discretion and risk and they
            will be solely responsible for any damage to their computer systems
            or loss of data that results from the download of such material
            and/or data.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Indemnification</h2>
          <div className="mt-4">
            You agree to indemnify, defend and hold harmless Hackingly.in from
            and against any and all losses, liabilities, claims, damages, costs
            and expenses (including legal fees and disbursements in connection
            therewith and interest chargeable thereon) asserted against or
            incurred by Hackingly.in that arise out of, result from, or may be
            payable by virtue of, any breach or non-performance of any
            representation, warranty, covenant or agreement made or obligation
            to be performed by you pursuant to these Terms and for all the
            activities that occur through your account.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Governing Law</h2>
          <div className="mt-4">
            These terms shall be governed by and constructed in accordance with
            the laws of India without reference to conflict of laws principles
            and disputes arising in relation hereto shall be subject to the
            exclusive jurisdiction of the courts at Delhi.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Severability</h2>
          <div className="mt-4">
            If any provision of the Terms is determined to be invalid or
            unenforceable in whole or in part, such invalidity or
            unenforceability shall attach only to such provision or part of such
            provision and the remaining part of such provision and all other
            provisions of these Terms shall continue to be in full force and
            effect.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Report Abuse</h2>
          <div className="mt-4">
            As per these Terms, users are solely responsible for every material
            or content uploaded on to the website. Hackingly.in does not verify,
            endorse or otherwise vouch for the contents of any user or any
            content generally posted or uploaded on to the website. Users can be
            held legally liable for their contents and may be held legally
            accountable if their contents or material include, for example,
            defamatory comments or material protected by copyright, trademark,
            etc. If you come across any abuse or violation of these Terms,
            please report to reportabuse@Hackingly.in
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Forum Rules</h2>
          <div className="mt-4">
            Registration to the forum under Hackingly.in is free. We do insist
            that you abide by the rules and policies detailed below. Although
            the administrators and moderators of Hackingly.in will attempt to
            keep all objectionable messages off this forum, it is impossible for
            us to review all messages. All messages express the views of the
            author, Hackingly.in will not be held responsible for the content of
            any message.
          </div>
          <div className="mt-4">
            By agreeing to these rules, you warrant that you will not post any
            messages that are obscene, vulgar, sexually-oriented, hateful,
            threatening, or otherwise violative of any laws.
          </div>
          <div className="mt-4">
            Hackingly.in reserves the right to remove, edit, move or close any
            thread for any reason.
          </div>
          <div className="mt-4">
            You agree that Hackingly may provide you with notices, including
            those regarding changes to the Terms, by email, regular mail, or
            postings on the Services.
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">
            Ending your relationship with Hackingly.in
          </h2>
          <div className="mt-4">
            The Terms will continue to apply until terminated by either you or
            Hackingly as set out below. If you want to terminate your legal
            agreement with Hackingly, you may do so by (a) notifying Hackingly
            at any time and (b) closing your accounts for all of the Services
            which you use, where Hackingly has made this option available to
            you. Your notice should be sent, in writing, to Hackingly's address
            which is set out at the beginning of these Terms.
          </div>{" "}
          <div className="ml-4">
            <br />
            Hackingly may at any time, terminate its legal agreement with you
            if:
            <br />
            • you have breached any provision of the Terms (or have acted in
            manner which clearly shows that you do not intend to, or are unable
            to comply with the provisions of the Terms); or
            <br />
            • Hackingly is required to do so by law (for example, where the
            provision of the Services to you is, or becomes, unlawful); or
            <br />
            • the partner with whom Hackingly offered the Services to you has
            terminated its relationship with Hackingly or ceased to offer the
            Services to you; or
            <br />• the provision of the Services to you by Hackingly is, in
            Hackingly’s opinion, no longer commercially viable. When these Terms
            come to an end, all of the legal rights, obligations and liabilities
            that you and Hackingly have benefited from, been subject to (or
            which have accrued over time whilst the Terms have been in force) or
            which are expressed to continue indefinitely, shall be unaffected by
            this cessation, and the provisions of Indemnification and Governing
            Law shall continue to apply to such rights, obligations and
            liabilities indefinitely.
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
