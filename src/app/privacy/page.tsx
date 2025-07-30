import { constructMetadata } from '@/lib/data';
import React from 'react'

type Props = {}

export const metadata = constructMetadata({
    title: `Edulocus | Privacy`,
    description: `Privacy policies for EduLocus users.`,
});


const page = (props: Props) => {
    return (
        <div className="w-screen min-h-screen bg-white pt-20 pb-16 px-4 md:px-10 lg:px-20 xl:px-32">
  <div className="max-w-3xl mx-auto p-6 text-gray-800">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Privacy Policy</h1>
    <div className="space-y-6 text-sm">
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to our student testing app. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">2. Information We Collect</h2>
        <p className="text-gray-700">
          We collect the following personal information when you subscribe to our service:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">3. How We Use Your Information</h2>
        <p className="text-gray-700">
          We use the information we collect solely for the purpose of:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Providing and maintaining our testing service</li>
          <li>Notifying you about changes to our service</li>
          <li>Allowing you to participate in interactive features of our service</li>
          <li>Providing customer support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">4. Data Protection</h2>
        <p className="text-gray-700">
          We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing your personal information. We do not share your personal information with any third parties unless required by law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">5. Your Data Rights</h2>
        <p className="text-gray-700">
          You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us using the information provided at the end of this policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">6. Changes to This Privacy Policy</h2>
        <p className="text-gray-700">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
        </p>
      </section>

      <p className="text-center text-gray-500 mt-6">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  </div>
</div>
    )
}

export default page