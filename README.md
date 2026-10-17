# PhishGuard – Phishing Awareness Training Platform

PhishGuard is an interactive, full-stack cybersecurity training web application designed to educate students, employees, and digital citizens on identifying phishing attacks, fake emails, lookalike domains, and social engineering manipulations.

---

## Key Features

### 1. Design & Dynamic Theme Architecture
- **Default Theme:** **Creamy White** (`#FAF7F0` background, soft white cards, high-contrast dark slate text).
- **Theme Modes:**
  1. Default Creamy White
  2. Clean Light Mode
  3. Deep Dark Mode
- **Accent Color Picker:** Curated presets (*Cyber Blue, Emerald Guard, Violet Shield, Amber Alert, Crimson Defense, Cyan Sentinel*) + Custom Hex Color input.
- **Persistence:** All theme and accent choices are saved to `localStorage` and update instantly across the entire interface.

### 2. Authentication & Registration
- **Form Layout:** Direct faithful implementation inspired by the mobile registration design.
- **Exact Field Sequence:**
  1. Name
  2. Phone
  3. Email
  4. Password (with show/hide toggle and strength meter)
  5. Date of Birth (calendar input with past-date validation)
  6. Gender dropdown
  7. Terms and Conditions checkbox
- **NO Comments Section:** As specified, the comments field from the screenshot has been intentionally omitted.
- **Strict Terms & Conditions Enforcement:** Unchecked acceptance prevents submission, displays clear validation messages, and highlights the checkbox.
- **Terms Modal:** Accessible terms and educational policy modal that preserves entered form data upon closing.
- **Login Page:** Standalone Sign In form (Email, Password, Remember Me, Forgot Password dialog, and link to register). Sign In in the top navigation opens Login first.

### 3. Structured Learning Modules (1–5)
- **Module 1: Introduction to Phishing** – Definitions, attacker psychology, and financial/corporate consequences.
- **Module 2: Recognizing Phishing Emails** – Sender address spoofing, urgency panic hooks, double extensions (`.pdf.exe`), and suspicious links.
- **Module 3: Detecting Fake Websites** – Typosquatting, lookalike domains, reverse proxy kits, and why an HTTPS padlock does NOT prove a website is safe. Includes an interactive URL Anatomy Deconstructor tool.
- **Module 4: Social Engineering Tactics** – Authority manipulation (CEO fraud), baiting, fake prizes, and out-of-band verification.
- **Module 5: Prevention & Best Practices** – 5-step email inspection habit, password managers, FIDO2/WebAuthn hardware keys, and prompt reporting protocols.
- **Progress Tracking:** Interactive "Mark as Complete" and "Next Module" controls with saved state.

### 4. Interactive Phishing Email Simulator
- **Realistic Mail Client:** Inbox scenario selector with forensic email viewer.
- **7 Diverse Scenarios:**
  - Chase Bank: Urgent Account Suspension Notice
  - FedEx: Undeliverable Express Parcel & Hidden Executable
  - Amazon: $500 Customer Survey Gift Card Lottery
  - CEO Impersonation: Urgent Apple Gift Card Favor
  - Microsoft 365: Expiring Password SSO Harvester
  - HR Department: Health Benefits Open Enrollment
  - Internal IT All-Hands: Legitimate True Negative
- **Forensics:** Expandable DKIM/SPF headers and live destination URL status bar on hover.
- **Verdicts:** Choose *Phishing*, *Legitimate*, or *Unsure* with immediate educational feedback, red flags, and safe protocols.

### 5. Interactive 16-Question Cybersecurity Assessment
- 16 questions across Beginner, Intermediate, and Advanced cybersecurity levels.
- Question jump palette and real-time progress indicator.
- Prevents accidental submission.
- Detailed question-by-question review with explanations and recommended review modules.
- Retake capability.

### 6. Results, Analytics & Certificate of Completion
- Comprehensive scores, percentage, letter rating, and simulator accuracy.
- Topic proficiency bars and targeted improvement areas.
- **PhishGuard Certified Defender Credential:** Printable and verifiable certificate with user name and unique ID.

---

## Getting Started

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit the application at `http://localhost:3000`.
