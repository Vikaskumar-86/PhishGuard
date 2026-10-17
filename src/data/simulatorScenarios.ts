import { SimulatorScenario } from '../types';

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: 'sim-1',
    scenarioNumber: 1,
    title: 'Chase Bank: Urgent Account Suspension Notice',
    category: 'Financial Phishing',
    difficulty: 'Easy',
    senderName: 'Chase Fraud Prevention Dept',
    senderEmail: 'security-alert@chase-fraud-defense.net',
    replyTo: 'web-ticket@randomserver-ru.com',
    returnPath: 'bounce@randomserver-ru.com',
    dkimStatus: 'Fail',
    spfStatus: 'Fail',
    date: 'Oct 14, 2026, 08:42 AM',
    subject: 'URGENT: Your Debit Account Has Been Temporarily Frozen',
    previewSnippet: 'We have identified irregular debit activity on card ending in 4109...',
    bodyText: `Dear Valued Chase Customer,

We detected an unauthorized debit charge of $1,842.50 at an electronics retailer in Miami, FL on October 14, 2026.

Due to excessive risk thresholds, your online banking access and linked debit cards have been locked to prevent further losses.

You must authenticate your identity and verify your account credentials within 2 hours, or your account will face permanent administrative closure and fraud reporting fees.

Please click the secure portal link below to confirm your Social Security Number, PIN, and card verification code:`,
    links: [
      {
        anchorText: 'Authenticate Your Account & Restore Access Now',
        displayUrl: 'https://secure.chase.com/auth/verify-identity',
        destinationUrl: 'http://auth-chase-update.info/portal/session?id=928410',
        isDeceptive: true,
        explanation: 'The anchor text and displayed URL pretend to be chase.com, but the actual destination points to auth-chase-update.info!',
      },
    ],
    isPhishing: true,
    redFlags: [
      'Sender domain is "chase-fraud-defense.net", not the official "chase.com"',
      'Severe manufactured urgency: "locked within 2 hours or face permanent closure"',
      'Impersonal greeting: "Dear Valued Chase Customer" instead of your registered name',
      'Hyperlink mismatch: Hover reveals destination is "auth-chase-update.info"',
      'Requests highly confidential credentials (PIN and Social Security Number) via an unverified link',
      'DKIM & SPF authentication failures in email headers',
    ],
    safeActions: [
      'Do not click the link or provide any confidential information.',
      'Log in to Chase directly via the official mobile application or by typing chase.com into your browser.',
      'Call the verified phone number printed on the physical back of your debit card.',
      'Report the phishing message to abuse@chase.com or forward to your security team.',
    ],
    explanation: 'This is a classic credential harvesting phishing attack exploiting panic over a fake financial charge. Legitimate financial institutions never demand PINs or SSNs via email links, nor do they give 2-hour ultimatums for permanent account destruction.',
  },
  {
    id: 'sim-2',
    scenarioNumber: 2,
    title: 'FedEx: Failed Package Delivery Notification',
    category: 'Logistics / Parcel Scam',
    difficulty: 'Easy',
    senderName: 'FedEx Express Dispatch',
    senderEmail: 'tracking-update@fedx-international-courier.com',
    returnPath: 'no-reply@mailer-node14.net',
    dkimStatus: 'None',
    spfStatus: 'SoftFail',
    date: 'Oct 14, 2026, 09:15 AM',
    subject: 'Action Required: Undeliverable Express Parcel #FDX-9921448',
    previewSnippet: 'Your package could not be delivered due to an incorrect shipping address...',
    bodyText: `Hello Customer,

Your express parcel with tracking code FDX-9921448 could not be delivered on October 14, 2026, because the recipient street address was incomplete or missing postal coordinates.

Our courier has returned the package to the regional sorting depot. You have 48 hours to update your delivery address and pay the redelivery clearance fee ($2.49) before the parcel is returned to the original sender and disposed of.

Please download your digital shipping receipt and verify your address using the delivery portal below:`,
    links: [
      {
        anchorText: 'Reschedule Delivery & Pay Address Clearance Fee ($2.49)',
        displayUrl: 'https://fedex.com/tracking/reschedule?id=FDX-9921448',
        destinationUrl: 'http://fedx-parcel-update-fees.biz/checkout.php',
        isDeceptive: true,
        explanation: 'Notice the spelling "fedx" in the destination domain (missing the second "e") and top-level domain ".biz".',
      },
    ],
    attachments: [
      {
        filename: 'FedEx_Delivery_Invoice_9921448.pdf.exe',
        size: '1.4 MB',
        isMalicious: true,
        note: 'Double extension (.pdf.exe) executable disguised as a PDF document',
      },
    ],
    isPhishing: true,
    redFlags: [
      'Typosquatting domain "fedx-international-courier.com" (missing the second "e" in FedEx)',
      'Fake nominal fee ($2.49) designed to harvest your credit card details and CVV',
      'Malicious attachment with double extension (.pdf.exe)',
      'Unsolicited delivery notice without mentioning what the item is or who shipped it',
    ],
    safeActions: [
      'Never open executable attachments or files with hidden double extensions.',
      'Track package IDs directly on the official fedex.com website without clicking email links.',
      'Verify if you were actually expecting an incoming courier package.',
    ],
    explanation: 'Parcel delivery scams surge year-round. Attackers rely on the common likelihood that you are expecting an online order, using small fee requests ($2.49) to harvest full credit card records, coupled with malware dropper attachments.',
  },
  {
    id: 'sim-3',
    scenarioNumber: 3,
    title: 'Amazon Prime: $500 Customer Appreciation Gift Card',
    category: 'Reward / Lottery Scam',
    difficulty: 'Easy',
    senderName: 'Amazon Rewards Department',
    senderEmail: 'promo-winner@amazon-vip-rewards2026.club',
    date: 'Oct 14, 2026, 10:02 AM',
    dkimStatus: 'Fail',
    spfStatus: 'Fail',
    subject: 'CONGRATULATIONS! You have been selected for a $500 Amazon Gift Balance',
    previewSnippet: 'Exclusive annual customer survey reward awaiting your claim...',
    bodyText: `Dear Amazon Shopper!

Congratulations! Your email was randomly chosen in our October 2026 Prime Loyalty Sweepstakes.

You are eligible to claim a $500.00 Amazon Shopping Voucher to spend on any department!

To release your electronic gift voucher, simply complete our 30-second customer satisfaction survey and cover a nominal delivery insurance verification fee of $1.95.

Hurry! Only 7 reward cards remaining for your geographical region!`,
    links: [
      {
        anchorText: 'Claim Your $500 Gift Voucher Right Now',
        displayUrl: 'https://www.amazon.com/loyalty-rewards/claim',
        destinationUrl: 'https://survey-giftcards-win.site/amazon-claim',
        isDeceptive: true,
        explanation: 'Destination URL is survey-giftcards-win.site, completely unaffiliated with Amazon.',
      },
    ],
    isPhishing: true,
    redFlags: [
      'Unsolicited lottery or prize winnings you never entered for',
      'Sender address is hosted on ".club" domain rather than official amazon.com',
      'Artificial scarcity: "Only 7 reward cards remaining"',
      'Classic "Advance-fee" trick: asks for $1.95 fee to release a $500 prize',
    ],
    safeActions: [
      'Remember the universal cybersecurity rule: If it sounds too good to be true, it is phishing.',
      'Do not click the claim link or complete surveys on third-party domains.',
      'Check your actual Amazon account Message Center on amazon.com to see legitimate communications.',
    ],
    explanation: 'Reward and gift card scams exploit greed and excitement. Legitimate companies do not hand out $500 gift cards at random or require users to pay card-processing fees to receive vouchers.',
  },
  {
    id: 'sim-4',
    scenarioNumber: 4,
    title: 'Executive Impersonation: Urgent Task from CEO',
    category: 'Business Email Compromise (BEC)',
    difficulty: 'Medium',
    senderName: 'Sarah Jenkins (Chief Executive Officer)',
    senderEmail: 'sarah.jenkins.executive.corp@gmail.com',
    replyTo: 'sarah.jenkins.executive.corp@gmail.com',
    dkimStatus: 'Pass',
    spfStatus: 'Pass',
    date: 'Oct 14, 2026, 11:20 AM',
    subject: 'Quick Confidential Favor - Are you at your desk right now?',
    previewSnippet: 'I am tied up in an unscheduled board meeting and need assistance...',
    bodyText: `Hi,

Are you available right now? I am currently in a closed-door executive meeting with potential acquisition partners and cannot take phone calls.

I need you to urgently assist me with a discreet client appreciation gesture. Could you please purchase 5 physical Apple Store gift cards ($200 each) from the local office supply retailer?

Once purchased, scratch the backs and email me high-resolution photos of the PIN codes so I can send them directly to the partners before our meeting concludes at 1:00 PM.

I will have corporate accounting reimburse you on this afternoon's expedited expense cycle. Please keep this confidential between us for now.

Thanks,
Sarah Jenkins
Chief Executive Officer`,
    links: [],
    isPhishing: true,
    redFlags: [
      'CEO sending an email from a free personal Gmail address (@gmail.com) rather than corporate email',
      'Demand for immediate purchase of retail gift cards—the #1 indicator of Business Email Compromise',
      'Pretext prohibiting voice verification: "I cannot take phone calls, in a closed-door meeting"',
      'Imposing secrecy: "Please keep this confidential between us"',
    ],
    safeActions: [
      'NEVER purchase gift cards for executive or supervisor requests via email.',
      'Verify the request directly using internal verified Slack/Teams or call their corporate extension.',
      'Forward the message to your organization\'s Security Operations Center (SOC) or IT team.',
    ],
    explanation: 'This is a textbook Business Email Compromise (BEC) spear-phishing attack. Attackers exploit deference to organizational hierarchy. Gift card codes cannot be reversed once transmitted, making them the preferred currency for cyber extortionists.',
  },
  {
    id: 'sim-5',
    scenarioNumber: 5,
    title: 'Microsoft 365: Password Expiration & Quarantine Alert',
    category: 'Credential Harvester',
    difficulty: 'Medium',
    senderName: 'Microsoft Security Team',
    senderEmail: 'notification@micosoft-online-support.com',
    replyTo: 'support@micosoft-online-support.com',
    dkimStatus: 'Fail',
    spfStatus: 'Fail',
    date: 'Oct 14, 2026, 01:05 PM',
    subject: 'Notice: Your Microsoft 365 Office Password Expires in 24 Hours',
    previewSnippet: 'Prevent disruption to Outlook, OneDrive, and Teams cloud services...',
    bodyText: `Dear User,

Your organization's single-sign-on (SSO) Microsoft 365 password for this account is scheduled to expire at midnight today.

Failure to renew your password will cause immediate disconnection from Microsoft Teams, Exchange email inbox, and shared SharePoint directories. Additionally, 6 incoming external messages are currently held in quarantine.

To retain your current password or establish new security credentials, please validate your account immediately through the secure Microsoft authentication endpoint:`,
    links: [
      {
        anchorText: 'Keep Current Password & Release Quarantined Messages',
        displayUrl: 'https://login.microsoftonline.com/common/oauth2',
        destinationUrl: 'https://office365-login.sso-portal-redirect.cc/auth',
        isDeceptive: true,
        explanation: 'The link text shows login.microsoftonline.com, but points to sso-portal-redirect.cc to harvest enterprise credentials.',
      },
    ],
    isPhishing: true,
    redFlags: [
      'Subtle typosquatting: "micosoft-online-support.com" (missing the "r" in Microsoft)',
      'Promise that you can "keep current password" by clicking a link (violates basic enterprise password change protocols)',
      'Baiting with "6 held messages in quarantine"',
      'Actual destination domain is "sso-portal-redirect.cc"',
    ],
    safeActions: [
      'Never update passwords through email links.',
      'Change organizational passwords only via your operating system lock screen (Ctrl+Alt+Del) or verified company portal.',
      'Report the message to IT Helpdesk.',
    ],
    explanation: 'Credential harvesters targeting Microsoft 365 / Google Workspace are the leading vector for corporate network takeovers. Once attackers harvest your SSO credentials, they gain access to all cloud documents, chat channels, and email accounts.',
  },
  {
    id: 'sim-6',
    scenarioNumber: 6,
    title: 'Internal IT: Company-Wide All-Hands Calendar & Q4 Roadmap',
    category: 'Legitimate Internal Communication',
    difficulty: 'Hard',
    senderName: 'PhishGuard Internal Communications',
    senderEmail: 'internal-comms@phishguard-platform.edu',
    replyTo: 'internal-comms@phishguard-platform.edu',
    returnPath: 'mailer@phishguard-platform.edu',
    dkimStatus: 'Pass',
    spfStatus: 'Pass',
    date: 'Oct 14, 2026, 02:30 PM',
    subject: 'All-Hands Meeting: Q4 Security Roadmap & Employee Q&A',
    previewSnippet: 'Join leadership this Thursday at 3:00 PM for our quarterly overview...',
    bodyText: `Hello Team,

Please join us for our upcoming quarterly All-Hands gathering this Thursday, October 16th, at 3:00 PM EST.

Agenda highlights:
- Review of Q3 accomplishments and milestones
- Sneak peek of the Q4 platform architecture roadmap
- Open Q&A session with the executive team

The meeting will be hosted on our verified company video conference system. You can view the agenda and submit advance questions directly on the intranet:`,
    links: [
      {
        anchorText: 'View Intranet Agenda & Submit Questions',
        displayUrl: 'https://phishguard-platform.edu/intranet/all-hands-q4',
        destinationUrl: 'https://phishguard-platform.edu/intranet/all-hands-q4',
        isDeceptive: false,
        explanation: 'The anchor text and destination match identically on the authentic company domain phishguard-platform.edu.',
      },
    ],
    isPhishing: false,
    redFlags: [],
    safeActions: [
      'This email is legitimate. It is safe to click the intranet link or add the calendar placeholder.',
      'Notice that the email does not demand passwords, does not demand urgent wire transfers, and sender headers pass DKIM and SPF verification.',
    ],
    explanation: 'This scenario is a LEGITIMATE email (True Negative). Being cyber-aware does not mean refusing every normal work communication. Identifying valid communications based on consistent official domains, verified DKIM/SPF headers, and absence of urgent panic is equally critical!',
  },
  {
    id: 'sim-7',
    scenarioNumber: 7,
    title: 'HR Department: Mandatory Health Benefit Open Enrollment Form',
    category: 'Spear Phishing / Credential Form',
    difficulty: 'Medium',
    senderName: 'HR Benefits Advisory',
    senderEmail: 'benefits@company-internal-hr-portal.com',
    replyTo: 'benefits-admin@secure-survey-forms.net',
    dkimStatus: 'None',
    spfStatus: 'SoftFail',
    date: 'Oct 14, 2026, 03:45 PM',
    subject: 'Mandatory: 2027 Healthcare Benefits Selection Deadline Approaching',
    previewSnippet: 'Failure to confirm benefit elections will default to standard zero-coverage...',
    bodyText: `Dear Employee,

Open enrollment for the upcoming 2027 healthcare, dental, and life insurance benefits concludes at 5:00 PM tomorrow.

All staff members are required to submit their election forms electronically. Failure to submit will result in forfeiture of employer-subsidized premiums.

Access the benefits enrollment portal via the link below to select your coverage tiers and confirm your dependents:`,
    links: [
      {
        anchorText: 'Submit Your 2027 Benefits Election Form',
        displayUrl: 'https://company.hr-benefits.org/enrollment-2027',
        destinationUrl: 'https://google-docs-form-collector.com/viewform?id=99428',
        isDeceptive: true,
        explanation: 'Destination points to google-docs-form-collector.com, a third-party form attempting to harvest employee social security numbers and personal health info.',
      },
    ],
    isPhishing: true,
    redFlags: [
      'Sender domain "company-internal-hr-portal.com" is an external generic domain',
      'Reply-To address differs from the sender ("benefits-admin@secure-survey-forms.net")',
      'Link points to a generic third-party form collector rather than your company\'s known HR software (like Workday, BambooHR, or ADP)',
      'Artificial penalty: "default to standard zero-coverage"',
    ],
    safeActions: [
      'Do not enter personal or dependent information on external form links.',
      'Navigate to your known corporate HR portal directly or contact HR through your internal directory.',
      'Report the message as a suspicious HR impersonation.',
    ],
    explanation: 'HR-related phishing campaigns are frequent during open enrollment periods because employees expect legitimate communication about healthcare changes. Attackers take advantage of this routine expectation.',
  },
];
