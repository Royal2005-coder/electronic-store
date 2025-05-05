export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Returns & Refunds
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your 
              order, we accept returns within 30 days of delivery for a full refund or exchange.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Quick Return Process
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Initiate your return through your account or contact support</li>
                <li>Print your prepaid return shipping label</li>
                <li>Pack your item securely in its original packaging</li>
                <li>Drop off at any authorized shipping location</li>
                <li>Receive your refund within 5-7 business days of return receipt</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Conditions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items must be unused and in original condition</li>
              <li>All original tags and packaging must be intact</li>
              <li>Proof of purchase is required</li>
              <li>Return shipping is free for defective items</li>
              <li>Some items may be subject to a restocking fee</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customized or personalized products</li>
              <li>Digital downloads or software licenses</li>
              <li>Gift cards</li>
              <li>Items marked as final sale</li>
              <li>Products with broken seals (for hygiene reasons)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">Original Payment Method</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Refunds are processed to your original payment method within 5-7 business days of 
                  receiving your return.
                </p>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">Store Credit</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You may choose to receive store credit instead of a refund, with an additional 10% 
                  bonus value added to your credit.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-4">
              If you have any questions about our return policy or need assistance with a return, 
              please don't hesitate to contact our customer service team:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: returns@techstore.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Live Chat: Available 24/7 on our website</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 