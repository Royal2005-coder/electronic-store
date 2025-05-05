export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Terms of Service
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="mb-6">
              Please read these Terms of Service carefully before using our website. By accessing or 
              using TechStore, you agree to be bound by these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Account Registration</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to create an account</li>
              <li>Provide accurate and complete information</li>
              <li>Keep your account credentials secure</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>One account per person/entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Product Information</h2>
            <div className="space-y-4">
              <p>
                We strive to provide accurate product information, including descriptions, prices, and 
                availability. However, we reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify product specifications without notice</li>
                <li>Correct pricing errors</li>
                <li>Limit product quantities</li>
                <li>Discontinue products</li>
                <li>Reject orders in case of errors</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Ordering and Payment</h2>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
              <p>
                By placing an order, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide valid payment information</li>
                <li>Pay all charges at the prices in effect</li>
                <li>Pay applicable taxes and shipping fees</li>
                <li>Provide accurate shipping information</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery times are estimates only</li>
              <li>Risk of loss passes upon delivery</li>
              <li>Inspect packages upon receipt</li>
              <li>Report damaged items immediately</li>
              <li>Additional fees may apply for certain locations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="mb-4">
                Our return policy allows for returns within 30 days of delivery. Please refer to our 
                Returns Policy page for complete details.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All content is our exclusive property</li>
              <li>No right to use without permission</li>
              <li>Trademarks are protected</li>
              <li>No copying or reproduction allowed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: legal@techstore.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Tech Street, Digital City, CA 90210</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 