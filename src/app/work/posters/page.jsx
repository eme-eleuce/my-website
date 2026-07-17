import Image from 'next/image';

const posters = [
  {
    id: 1,
    src: '/posters/chapman.jpg',
    alt: 'El Misil Cubano — Chapman poster',
    width: 2400,
    height: 1350,
    displayWidth: 560,
  },
  {
    id: 2,
    src: '/posters/eduardo.jpg',
    alt: 'Eduardo Rodríguez — WBC 2026 poster',
    width: 1500,
    height: 1000,
    displayWidth: 500,
  },
  {
    id: 3,
    src: '/posters/arraez.jpg',
    alt: 'Luis Arráez poster',
    width: 1800,
    height: 1013,
    displayWidth: 530,
  },
];

export default function PostersPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black">Posters</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="overflow-hidden rounded-lg shadow-lg group w-full self-center"
              style={{ maxWidth: `${poster.displayWidth}px` }}
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                width={poster.width}
                height={poster.height}
                className="h-auto w-full block transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
