export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-8">
      <div className="relative min-h-[50vh] w-full flex items-center justify-center align-middle" style={{backgroundImage: "url('/images/360_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.webp')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative tangerine-bold text-8xl text-white">Sprout & Spoon</h1>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="dm-serif-text-regular-italic text-5xl">Committed to green</h1>
        <ul className="grid grid-cols-2 list-disc text-xl gap-x-10">
          <li>Locally sourced ingredients</li>
          <li>Organic produce</li>
          <li>Seasonal menus</li>
          <li>Sustainable practices</li>
        </ul>
      </div>
    </div>
  );
}
