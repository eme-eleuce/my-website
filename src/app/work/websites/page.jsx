import Image from 'next/image';

// Array modular de websites - puedes agregar más fácilmente
const websites = [
  {
    id: 1,
    client: 'Chalaco Films',
    business: 'Advertising',
    photo: '/webs/chalaco.png',
    link: 'https://www.chalacofilms.com/'
  },
  {
    id: 2,
    client: 'Pacchar',
    business: 'Sustainable Agriculture',
    photo: '/webs/pacchar.png',
    link: 'https://www.pacchar.com/es'
  },
  {
    id: 3,
    client: 'Carleche',
    business: 'Color Grading',
    photo: '/webs/carleche.png',
    link: 'https://www.carleche.com/'
  }
];

export default function WebsitesPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-6">Websites</h1>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((website) => (
            <div 
              key={website.id}
              className="group overflow-hidden rounded-lg shadow-lg  transition-all duration-300"
            >
              {/* Image */}
              <a 
                href={website.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-80 w-full overflow-hidden"
              >
                <Image
                  src={website.photo}
                  alt={`${website.client} website`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </a>

              {/* Info Below Image */}
              <div className="bg-white p-6">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {website.client}
                </h3>
                <p className="text-lg mb-4 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {website.business}
                </p>
                <a
                  href={website.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
