import Image from 'next/image';
import landscapePhoto from '@/../public/photos/landscape.jpg';

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-6">Photography</h1>
        </div>

        {/* Landscape Category */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8 group cursor-pointer">
          {/* Background Image */}
          <Image
            src={landscapePhoto}
            alt="Landscape"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay with Category Name */}
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-60">
            <h2 className="text-6xl font-bold text-white">Landscape</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
