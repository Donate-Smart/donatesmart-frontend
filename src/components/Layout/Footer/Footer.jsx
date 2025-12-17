import { Icon } from '@iconify/react';
import Logo from '../Header/Logo/Logo';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-[var(--color-text-light)] text-sm">
              Empowering communities through transparent and secure charitable giving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--color-text-dark)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  Featured Cases
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[var(--color-text-dark)] mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[var(--color-text-dark)] mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)] flex items-center justify-center transition-all group shadow-md"
              >
                <Icon icon="lucide:facebook" className="w-5 h-5 text-[var(--color-text-light)] group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)] flex items-center justify-center transition-all group shadow-md"
              >
                <Icon icon="lucide:twitter" className="w-5 h-5 text-[var(--color-text-light)] group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)] flex items-center justify-center transition-all group shadow-md"
              >
                <Icon icon="lucide:instagram" className="w-5 h-5 text-[var(--color-text-light)] group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="/"
                className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-dark)] flex items-center justify-center transition-all group shadow-md"
              >
                 <Icon icon="lucide:linkedin" className="w-5 h-5 text-[var(--color-text-light)] group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-[var(--color-text-light)] text-sm">
            © 2025 DonateSmart. All rights reserved. Made with{' '}
            <Icon icon="fluent:heart-28-filled" className="inline w-4 h-4 text-[var(--color-primary)]" /> by Hasan, Areen, Lujain, Mohammed. For a better world.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer