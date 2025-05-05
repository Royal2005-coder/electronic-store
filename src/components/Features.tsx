'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiRefreshCw, FiLock, FiCreditCard } from 'react-icons/fi';

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    cta: 'Shop Now & Save',
    neonColor: 'from-blue-500/80 via-blue-400/50 to-blue-600/30',
    glowColor: 'group-hover:shadow-[0_0_35px_5px_rgba(59,130,246,0.5)]',
    borderColor: 'group-hover:border-blue-400/50'
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    cta: 'View Return Policy',
    neonColor: 'from-green-500/80 via-green-400/50 to-green-600/30',
    glowColor: 'group-hover:shadow-[0_0_35px_5px_rgba(34,197,94,0.5)]',
    borderColor: 'group-hover:border-green-400/50'
  },
  {
    icon: FiLock,
    title: 'Secure Payment',
    description: '100% secure checkout',
    cta: 'Shop with Confidence',
    neonColor: 'from-purple-500/80 via-purple-400/50 to-purple-600/30',
    glowColor: 'group-hover:shadow-[0_0_35px_5px_rgba(168,85,247,0.5)]',
    borderColor: 'group-hover:border-purple-400/50'
  },
  {
    icon: FiCreditCard,
    title: 'Flexible Payment',
    description: 'Multiple payment options',
    cta: 'See Payment Methods',
    neonColor: 'from-orange-500/80 via-orange-400/50 to-orange-600/30',
    glowColor: 'group-hover:shadow-[0_0_35px_5px_rgba(249,115,22,0.5)]',
    borderColor: 'group-hover:border-orange-400/50'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function Features() {
  return (
    <div className="relative py-20 overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_70%)]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto stagger-children"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            className="group relative hover-lift"
          >
            {/* Card Background with Glass Effect */}
            <div className={`
              relative h-full p-6 rounded-2xl
              bg-gradient-to-br ${feature.neonColor}
              backdrop-blur-xl backdrop-saturate-200
              border border-white/10 ${feature.borderColor}
              transition-all duration-500
              ${feature.glowColor}
            `}>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon Container with Glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform scale-150" />
                  <div className="relative p-4 bg-white/10 rounded-full border border-white/20">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                
                <p className="text-white/80">
                  {feature.description}
                </p>

                {/* CTA Button with Neon Effect */}
                <button className="
                  relative mt-4 px-6 py-2.5
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  rounded-full text-white font-medium
                  transform transition-all duration-300
                  hover:scale-105 hover:bg-white/20
                  hover:border-white/40 hover:shadow-lg
                  hover:shadow-white/20
                  active:scale-95
                ">
                  {feature.cta}
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 