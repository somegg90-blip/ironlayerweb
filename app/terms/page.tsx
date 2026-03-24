export default function TermsPage() {
  return (
    <main className="min-h-screen grid-bg pt-24 px-6 pb-12">
      <div className="max-w-3xl mx-auto glass-card p-12 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Terms of Service</h1>
        <p className="text-sm text-platinum/50 mb-8">Last Updated: March 20, 2026 | Effective Date: March 20, 2026</p>
        
        <div className="space-y-6 text-sm text-platinum/70 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">1. Agreement Overview</h2>
            <p>Welcome to QuiGuard ("Company," "we," "us," "our"). These Terms of Service ("Terms") govern your access to and use of the QuiGuard software, website, and related services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">2. License Grants</h2>
            <h3 className="font-medium text-platinum mt-4">2.1 Open Source Core (Self-Hosted)</h3>
            <p>The core QuiGuard proxy software is provided under the MIT License. You are free to use, modify, and distribute the core software in accordance with that license. This license grants you no rights to the proprietary features, dashboard, or cloud infrastructure.</p>
            
            <h3 className="font-medium text-platinum mt-4">2.2 Paid Services (Cloud & Professional)</h3>
            <p>Access to the QuiGuard Cloud Dashboard, Audit Logs, SSO, and Professional Setup Services ("Paid Features") is granted under a limited, non-exclusive, non-transferable subscription license. This license is valid only for the duration of your paid subscription.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">3. Service Description & Security Tooling</h2>
            <h3 className="font-medium text-platinum mt-4">3.1 Nature of Service</h3>
            <p>QuiGuard is a security tooling layer designed to sanitize data prompts and responses for Large Language Models (LLMs). It acts as a reverse proxy to detect and mask Personally Identifiable Information (PII).</p>
            
            <h3 className="font-medium text-platinum mt-4">3.2 No Compliance Guarantee</h3>
            <p><strong>CRITICAL:</strong> While QuiGuard is designed to assist with compliance frameworks (such as GDPR, HIPAA, or SOC2), <strong>we do not guarantee compliance.</strong></p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>QuiGuard is a probabilistic tool, not a legal guarantee.</li>
              <li>You are solely responsible for determining whether the Service meets your specific regulatory requirements.</li>
              <li>Use of QuiGuard does not indemnify you against regulatory fines or data breaches.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">4. Disclaimer of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT ALL PII WILL BE DETECTED.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">5. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, QuiGuard'S TOTAL LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM THE USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO QuiGuard IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL QuiGuard BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">6. Professional Services (Setup Fee)</h2>
            <p>The "$500 Pilot Setup" includes one (1) hour of consultation and configuration assistance.</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><strong>Scope:</strong> Limited to deployment verification and policy configuration.</li>
              <li><strong>Exclusions:</strong> Does not include custom code development, ongoing maintenance, or legal compliance auditing.</li>
              <li><strong>Refunds:</strong> Professional Service fees are non-refundable once the consultation session has occurred.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-platinum mb-3">7. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law principles.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
