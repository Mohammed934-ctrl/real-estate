"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
     <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/4 sm:top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Start your journey to finding the perfect place to call home
          </h1>
          <p className="text-base sm:text-xl text-white mb-8">
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs!
          </p>

          <div className="flex justify-center">
            <Input
              type="text"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, neighborhood or address"
              className="w-full max-w-xs sm:max-w-lg rounded-none rounded-l-xl border-none bg-white text-primary-700 font-semibold h-12"
            />
            <Button
              // onClick={handleLocationSearch}
              className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
            >
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
    
  )
}

export default HeroSection