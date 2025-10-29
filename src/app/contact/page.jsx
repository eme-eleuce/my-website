import Image from 'next/image';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import luisPhoto from '../../../public/photos/luis.jpg';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-6xl font-bold text-black text-center mb-16">Contact</h1>

        {/* Content Container */}
        <div className="flex flex-col items-center">
          {/* Photo */}
          <div className="relative w-100 h-100  overflow-hidden mb-8 ">
            <Image
              src={luisPhoto}
              alt="Luis"
              fill
              className="object-cover"
            />
          </div>

          {/* Name */}
          <h2 className="text-4xl font-bold text-black mb-4">Luis</h2>

          {/* Current Location */}
          <p className="text-xl text-gray-500 mb-6 italic">Currently in Ecuador</p>

          {/* Roles and Origin */}
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl font-bold text-gray-700">
              Photographer · Videographer · Web Developer
            </p>
            <p className="text-lg md:text-2xl text-gray-600 mt-4 max-w-2xl">
              Creating new things with AI, machine learning, big data tools, crypto, art. Always looking for challenges.
            </p>
             <p className="text-xl md:text-2xl mt-2 font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">from Venezuela</p>
          </div>

          {/* Email and GitHub */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="mailto:luis.iarmolen@gmail.com"
              className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              luis.iarmolen@gmail.com
            </a>
            <a
              href="https://github.com/eme-eleuce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition-colors duration-300"
            >
              <FaGithub size={48} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
