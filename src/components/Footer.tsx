'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GraduationCap, Instagram, Facebook, Twitter, Heart } from 'lucide-react'

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
    color: 'hover:text-pink-500',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: '#',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: '#',
    color: 'hover:text-blue-400',
  },
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Students', href: '/students' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Achievements', href: '/achievements' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Class 11-Newton</h3>
                <p className="text-gray-300 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A diverse community of students dedicated to academic excellence, 
              leadership development, and making a positive impact in our world.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white/10 rounded-full transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 class11newton@school.edu</p>
              <p>📞 (555) 123-4567</p>
              <p>📍 Newton High School</p>
              <p>123 Education Ave</p>
              <p>Academic City, ST 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Class 11-Newton. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-300 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-500 fill-current" />
            </motion.div>
            <span>by Class 11-Newton</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 