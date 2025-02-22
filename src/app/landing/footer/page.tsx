//src/app/landing/footer/page.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-lg font-semibold text-white">StudyAI</p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
        <p className="mt-6 text-sm">© {new Date().getFullYear()} StudyAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
