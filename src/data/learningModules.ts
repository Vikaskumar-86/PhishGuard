import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-1',
    moduleNumber: 1,
    title: 'Introduction to Phishing',
    subtitle: 'Understand the anatomy, motivations, and catastrophic real-world impacts of phishing attacks.',
    estimatedMinutes: 6,
    overview: 'Phishing is the most widespread cyber threat vector worldwide, responsible for over 80% of reported security incidents. This module covers core definitions, threat actor psychology, and personal/organizational stakes.',
    sections: [
      {
        id: 'sec-1-1',
        title: '1. What is Phishing?',
        content: 'Phishing is a form of social engineering where attackers deceive individuals into disclosing sensitive information—such as credentials, financial information, or personal identifiers—or executing malware by masquerading as a trustworthy entity in electronic communications.',
        keyPoints: [
          'Deceptive electronic impersonation of banks, employers, service providers, or trusted colleagues.',
          'Weaponized communication mediums: Email (Phishing), SMS (Smishing), Phone (Vishing), and Messaging Apps.',
          'Exploits human psychology (trust, panic, curiosity) rather than exploiting purely technical software vulnerabilities.',
        ],
        callout: {
          type: 'info',
          title: 'Core Distinction',
          text: 'Unlike brute-force attacks that attempt millions of password guesses, phishing tricks the authorized human into giving away the key voluntarily.',
        },
      },
      {
        id: 'sec-1-2',
        title: '2. Why Attackers Choose Phishing',
        content: 'Modern perimeter firewalls, encryption algorithms, and enterprise endpoint solutions are mathematically formidable. However, human decision-making remains vulnerable to psychological manipulation, urgency, and cognitive overload.',
        keyPoints: [
          'High Return on Investment (ROI): Automated mass email tools can transmit 100,000 deceptive messages for less than $10.',
          'Low Technical Barrier: Pre-packaged Phishing-as-a-Service (PaaS) kits provide turnkey fake landing pages and credential stealers.',
          'Bypasses Endpoint Defense: When an employee willingly types their two-factor code into a reverse-proxy phishing site, technical controls are effectively nullified.',
        ],
      },
      {
        id: 'sec-1-3',
        title: '3. Real-World Consequences',
        content: 'A single successful phishing click can initiate a cascade of irreversible harm across personal lives and corporate networks.',
        keyPoints: [
          'Identity Theft: Fraudulent loans, tax refund diversion, and synthetic identity creation.',
          'Financial Drainage: Unauthorized wire transfers, drained checking accounts, and cryptojacking.',
          'Corporate Ransomware: Lateral movement leading to enterprise file encryption and multi-million dollar extortion demands.',
          'Data Breach Liability: Regulatory penalties (GDPR, HIPAA) and devastating reputational damage.',
        ],
        callout: {
          type: 'warning',
          title: 'Threat Reality Check',
          text: 'According to industry threat reports, the average cost of a data breach originating from a phishing vector exceeds $4.88 million.',
        },
      },
    ],
    takeaways: [
      'Phishing targets human psychology, making technical defenses alone insufficient.',
      'Attackers use mass automation and turn-key credential-harvesting kits.',
      'A single compromised account can lead to lateral compromise of entire organizational systems.',
    ],
    practicePrompt: 'Proceed to Module 2 to learn how to spot suspicious email headers and deceptive language patterns.',
  },
  {
    id: 'module-2',
    moduleNumber: 2,
    title: 'Recognizing Phishing Emails',
    subtitle: 'Master the inspection of sender addresses, urgency hooks, attachments, and deceptive links.',
    estimatedMinutes: 8,
    overview: 'Phishing emails often simulate reputable brands with near-pixel perfection. Learn to identify the subtle forensic red flags that expose malicious intent before clicking.',
    sections: [
      {
        id: 'sec-2-1',
        title: '1. Inspecting Sender Addresses & Display Name Spoofing',
        content: 'Attackers frequently change their friendly display name to "Chase Fraud Alert" or "IT Help Desk", while the underlying sender email domain belongs to an unrelated free webmail or compromised foreign host.',
        keyPoints: [
          'Display Name Deception: "PayPal Security" <service-alert-992@xvn-mail.cc> is NOT paypal.com.',
          'Lookalike Domains: Typosquatting such as @micros0ft.com (zero instead of o) or @support-google.co.',
          'Subdomain Tricks: legitbrand.com.attackerdomain.net actually belongs to attackerdomain.net.',
        ],
        callout: {
          type: 'tip',
          title: 'Golden Rule of Senders',
          text: 'Always check the domain following the "@" symbol, and do not trust the friendly display name alone.',
        },
      },
      {
        id: 'sec-2-2',
        title: '2. Urgent & Threatening Subject Lines',
        content: 'Phishing thrives on artificial panic. Attackers manufacture urgent countdown timers to inhibit logical critical thinking.',
        keyPoints: [
          '"Immediate Action Required: Your account will be terminated in 24 hours."',
          '"Unauthorized login attempt from Moscow: Verify your identity now."',
          '"Payroll Notice: Unprocessed Direct Deposit for October 2026."',
        ],
      },
      {
        id: 'sec-2-3',
        title: '3. Unexpected Attachments & Double Extensions',
        content: 'Attachments remain a primary carrier for trojans, spyware, and infostealers. Malicious payloads often disguise themselves behind invoice or resume names.',
        keyPoints: [
          'Dangerous extensions: .exe, .scr, .iso, .vbs, .hta, .bat.',
          'Macro-enabled office files (.docm, .xlsm) that prompt users to "Enable Content".',
          'Double-extension deception: Invoice_Oct2026.pdf.exe.',
          'Password-protected ZIP files intended to bypass automated email gateway antivirus scanners.',
        ],
        example: {
          title: 'Sample Phishing Email Breakdown',
          type: 'phishing',
          from: 'Chase Account Alert <security-noreply@chase-secure-update.com>',
          subject: 'URGENT: Suspicious Debit Card Transaction - Action Required',
          body: 'Dear Valued Client,\n\nWe detected an unauthorized charge of $1,429.00 on your debit card ending in 8842. To prevent immediate account lock, click below within 30 minutes to dispute the charge.\n\n[Verify Identity & Cancel Charge: http://bit.ly/chase-auth-3482]',
          redFlags: [
            'Sender domain "chase-secure-update.com" is not the official Chase domain (chase.com)',
            'Manufactured panic: 30-minute artificial deadline',
            'Generic greeting ("Valued Client") rather than personalized customer name',
            'Shortened URL (bit.ly) obscuring the true phishing destination',
          ],
        },
      },
    ],
    takeaways: [
      'Examine the actual email address behind the display name.',
      'Manufactured urgency ("24 hours to act") is a hallmark warning sign of an attack.',
      'Never open unexpected attachments or enable macros in office documents.',
    ],
    practicePrompt: 'Next, learn how attackers construct lookalike websites that mirror genuine login portals.',
  },
  {
    id: 'module-3',
    moduleNumber: 3,
    title: 'Detecting Fake Websites',
    subtitle: 'Deconstruct typosquatting, lookalike domains, and debunk the SSL padlock myth.',
    estimatedMinutes: 7,
    overview: 'Phishing websites are engineered to replicate legitimate corporate login screens down to the CSS styling, fonts, and logos. Uncover how to verify URL validity and protect your credentials.',
    sections: [
      {
        id: 'sec-3-1',
        title: '1. Anatomy of a Web Address (URL)',
        content: 'To detect fake websites, you must understand how domain hierarchies work. Attackers rely on users reading URLs from left to right without identifying the actual root domain.',
        keyPoints: [
          'Protocol: https://',
          'Subdomain: login.secure-portal',
          'Root Domain & TLD: example.com (the ONLY entity that determines website ownership)',
          'Path: /auth/login.php',
          'Trap: https://www.bankofamerica.com.account-update.info/login — this domain is owned by account-update.info, NOT Bank of America!',
        ],
        callout: {
          type: 'warning',
          title: 'The Padlock Fallacy',
          text: 'A green padlock or "https://" only means the connection is encrypted—it DOES NOT prove the website is honest. Modern phishing kits obtain free SSL certificates in seconds.',
        },
      },
      {
        id: 'sec-3-2',
        title: '2. Lookalike Domains & Typosquatting Tactics',
        content: 'Attackers register domain variations that look indistinguishable at a casual glance.',
        keyPoints: [
          'Omission typos: netfllix.com instead of netflix.com.',
          'Homoglyph / IDN attacks: Using Cyrillic or special characters that render identically to Latin letters.',
          'Hyphenation insertions: paypal-support-center.com vs paypal.com.',
          'TLD substitution: wellsfargo.co or wellsfargo.net instead of wellsfargo.com.',
        ],
      },
      {
        id: 'sec-3-3',
        title: '3. Real-Time Credential Harvesting & Reverse Proxies',
        content: 'Modern phishing kits (such as Evilginx) operate as man-in-the-middle reverse proxies. When you enter your username, password, and even a 6-digit SMS authenticator code, the proxy forwards it to the real site, logs you in, but steals your active session cookie.',
        keyPoints: [
          'Never enter credentials onto a page reached via an unsolicited email link.',
          'Use bookmarked official URLs or official mobile apps whenever managing financial or security accounts.',
          'Hardware security keys (FIDO2 / WebAuthn like YubiKey) are cryptographically bound to the authentic domain and completely immune to reverse-proxy phishing.',
        ],
      },
    ],
    takeaways: [
      'The SSL padlock indicates encryption, NOT organizational legitimacy.',
      'Check the actual root domain directly preceding the final top-level slash.',
      'Use bookmarks and search engines to navigate to sensitive portals independently.',
    ],
    practicePrompt: 'Proceed to Module 4 to uncover the psychological manipulation techniques behind social engineering.',
  },
  {
    id: 'module-4',
    moduleNumber: 4,
    title: 'Social Engineering Tactics',
    subtitle: 'Explore the psychological triggers: authority, fear, greed, curiosity, and pretexting.',
    estimatedMinutes: 6,
    overview: 'Social engineering is the art of manipulating people so they give up confidential information. Attackers exploit fundamental human emotional tendencies.',
    sections: [
      {
        id: 'sec-4-1',
        title: '1. The 6 Core Psychological Triggers',
        content: 'Psychologist Robert Cialdini identified core principles of influence that cybercriminals weaponize to bypass rational scrutiny.',
        keyPoints: [
          'Authority: Impersonating executive leadership (CEO fraud), legal counsel, or law enforcement.',
          'Urgency / Fear: Threatening account suspension, employment termination, or legal summons.',
          'Greed / Reciprocity: Fabricated bonuses, gift card rewards, or lottery notifications.',
          'Curiosity: "Confidential Salary List 2026.xlsx" or "Leaked Office Photos".',
          'Helpfulness / Compassion: A fake coworker stranded at an airport requesting emergency gift cards.',
          'Social Proof: "Your entire department has already signed this policy update."',
        ],
      },
      {
        id: 'sec-4-2',
        title: '2. Business Email Compromise (BEC) & Spear Phishing',
        content: 'Unlike mass generic spam, spear phishing is heavily researched. Attackers scour LinkedIn, social media, and conference schedules to craft personalized, believable pretexts.',
        keyPoints: [
          'CEO Wire Fraud: "I am in an executive meeting and need you to process an urgent confidential vendor invoice."',
          'Supplier Fraud: Attackers hijack existing vendor email threads to swap bank routing numbers on pending invoices.',
          'Student / Academic Pretexts: Fake research grants, tuition refund portals, or academic dean inquiries.',
        ],
        callout: {
          type: 'info',
          title: 'Verification Protocol',
          text: 'Any unexpected request involving money transfers, gift cards, or credential changes MUST be confirmed via an out-of-band communication channel (e.g., known phone number, voice call, or in-person).',
        },
      },
    ],
    takeaways: [
      'Cybercriminals exploit human kindness, curiosity, and deference to authority.',
      'Spear phishing uses tailored personal details gathered from public profiles.',
      'Always use an out-of-band communication channel to verify high-stakes requests.',
    ],
    practicePrompt: 'Finish your training in Module 5 with daily security habits and defense protocols.',
  },
  {
    id: 'module-5',
    moduleNumber: 5,
    title: 'Prevention and Best Practices',
    subtitle: 'Equip yourself with actionable defensive protocols, MFA security, and incident reporting.',
    estimatedMinutes: 7,
    overview: 'Building individual cyber resilience requires systematic habits: verifying senders out-of-band, inspecting hyperlinks, utilizing password managers, and promptly reporting suspicious communications.',
    sections: [
      {
        id: 'sec-5-1',
        title: '1. The 5-Step Email Verification Habit',
        content: 'Before interacting with any email requesting action, apply this 5-step checklist:',
        keyPoints: [
          'Step 1: Check the sender address (verify the domain after @).',
          'Step 2: Hover over links without clicking to inspect the real URL target.',
          'Step 3: Analyze the tone—is it manufacturing irrational panic or secrecy?',
          'Step 4: Never supply credentials, OTPs, or financial data in response to an email.',
          'Step 5: Verify out-of-band using a independently verified phone number or portal.',
        ],
      },
      {
        id: 'sec-5-2',
        title: '2. Password Hygiene & Modern Multi-Factor Authentication',
        content: 'Strong credential habits neutralize the damage of inadvertent disclosure.',
        keyPoints: [
          'Use a reputable Password Manager to generate unique, 16+ character randomized passwords for every service.',
          'Password managers have built-in phishing defense: they will NOT autofill credentials on lookalike domains!',
          'Enable Multi-Factor Authentication (MFA) everywhere—prefer Authenticator Apps or Hardware FIDO2 keys over SMS.',
          'Never reveal a one-time pass-code (OTP) to anyone; banks and IT teams will NEVER call or email asking for your OTP.',
        ],
      },
      {
        id: 'sec-5-3',
        title: '3. What to Do If You Clicked a Phishing Link',
        content: 'Accidents happen. Fast incident response can prevent lateral network infiltration.',
        keyPoints: [
          'Disconnect the device from WiFi/Ethernet immediately if a suspicious download was initiated.',
          'Change the compromised password from a separate, clean device immediately.',
          'Notify your organization\'s IT / Information Security Incident Response team immediately.',
          'Report the phishing email using the client "Report Phishing" button to protect peers.',
        ],
        callout: {
          type: 'tip',
          title: 'No Shame Culture',
          text: 'Organizations with high reporting rates stop breaches before data exfiltration occurs. Prompt reporting is a protective action, not a fault.',
        },
      },
    ],
    takeaways: [
      'Adopt the 5-step email verification habit on every unexpected message.',
      'Password managers inherently prevent autofill on fraudulent domains.',
      'Prompt incident reporting minimizes damages and shields the wider community.',
    ],
    practicePrompt: 'Ready to test your skills? Head to the Interactive Phishing Simulator to analyze real-world scenarios!',
  },
];
