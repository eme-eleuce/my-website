import Image from 'next/image';
import { FaGithub, FaWhatsapp, FaBehance } from 'react-icons/fa';
import luisPhoto from '../../../public/photos/luis.jpg';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-14 sm:py-16 px-4 sm:px-6 mt-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black text-center mb-10 px-2 break-words">
          Contact
        </h1>

        <div className="flex flex-col items-center">
          <div className="relative w-100 h-100 overflow-hidden mb-5">
            <Image
              src={luisPhoto}
              alt="Luis"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-4xl font-bold text-black mb-4">Luis</h2>

          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl font-bold text-gray-700">
              Photographer · Videographer · Web Developer
            </p>
            <p className="text-lg md:text-2xl text-gray-600 mt-2 max-w-2xl">
              Creating new things with AI, machine learning, big data tools, crypto, art. Always looking for challenges.
            </p>
            <p className="text-xl md:text-2xl mt-2 font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              from Venezuela
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <h3 className="text-2xl font-bold text-black mb-3">Portafolio</h3>
            <a
              href="https://www.behance.net/luisiarmold3db"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#1769ff] transition-colors duration-300"
              aria-label="Behance"
            >
              <FaBehance size={52} />
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 pt-6 border-t border-gray-200 w-full max-w-sm">
            <a
              href="mailto:luis.iarmolen@gmail.com"
              className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              luis.iarmolen@gmail.com
            </a>
            <div className="flex gap-5">
              <a
                href="https://github.com/eme-eleuce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={44} />
              </a>
              <a
                href="https://wa.me/5930968572318"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={44} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
