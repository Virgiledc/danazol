import { BusinessCategory } from '@/types/business'

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { 
    id: 'restaurant', 
    name: 'Restaurant', 
    icon: '🍽️', 
    description: 'Food service and dining establishments' 
  },
  { 
    id: 'salon', 
    name: 'Hair Salon', 
    icon: '💇‍♀️', 
    description: 'Beauty and personal care services' 
  },
  { 
    id: 'retail', 
    name: 'Retail Store', 
    icon: '🛍️', 
    description: 'Product sales and shopping' 
  },
  { 
    id: 'fitness', 
    name: 'Fitness Center', 
    icon: '💪', 
    description: 'Health and wellness facilities' 
  },
  { 
    id: 'medical', 
    name: 'Medical Practice', 
    icon: '🏥', 
    description: 'Healthcare and medical services' 
  },
  { 
    id: 'legal', 
    name: 'Law Firm', 
    icon: '⚖️', 
    description: 'Legal services and consultation' 
  },
  { 
    id: 'real-estate', 
    name: 'Real Estate', 
    icon: '🏠', 
    description: 'Property sales and rentals' 
  },
  { 
    id: 'automotive', 
    name: 'Auto Repair', 
    icon: '🔧', 
    description: 'Vehicle maintenance and repair' 
  },
  { 
    id: 'education', 
    name: 'Education', 
    icon: '📚', 
    description: 'Learning and training services' 
  },
  { 
    id: 'technology', 
    name: 'Tech Services', 
    icon: '💻', 
    description: 'IT and software services' 
  },
  { 
    id: 'consulting', 
    name: 'Consulting', 
    icon: '📊', 
    description: 'Business consulting and advisory' 
  },
  { 
    id: 'photography', 
    name: 'Photography', 
    icon: '📸', 
    description: 'Photo and video services' 
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning Services', 
    icon: '🧹', 
    description: 'Commercial and residential cleaning' 
  },
  { 
    id: 'landscaping', 
    name: 'Landscaping', 
    icon: '🌱', 
    description: 'Garden and lawn care services' 
  },
  { 
    id: 'other', 
    name: 'Other', 
    icon: '🏢', 
    description: 'General business services' 
  }
]

export const WEBSITE_SECTIONS = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Main banner with business name and key message',
    required: true
  },
  {
    id: 'about',
    name: 'About Us',
    description: 'Information about your business and story',
    required: true
  },
  {
    id: 'services',
    name: 'Services',
    description: 'List of services or products you offer',
    required: true
  },
  {
    id: 'contact',
    name: 'Contact Information',
    description: 'Phone, email, address, and business hours',
    required: true
  },
  {
    id: 'testimonials',
    name: 'Customer Testimonials',
    description: 'Reviews and feedback from customers',
    required: false
  },
  {
    id: 'gallery',
    name: 'Photo Gallery',
    description: 'Images showcasing your business',
    required: false
  },
  {
    id: 'pricing',
    name: 'Pricing',
    description: 'Service packages and pricing information',
    required: false
  },
  {
    id: 'team',
    name: 'Our Team',
    description: 'Meet the people behind your business',
    required: false
  },
  {
    id: 'blog',
    name: 'Blog/News',
    description: 'Latest updates and industry insights',
    required: false
  },
  {
    id: 'faq',
    name: 'FAQ',
    description: 'Frequently asked questions and answers',
    required: false
  }
]
