export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/360_F_69024210_2JAt5Ura3ETabT3KVb1SNPkPNlWDbLKT.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative tangerine-bold text-white text-8xl md:text-8xl drop-shadow-lg text-center">
          Sprout & Spoon
        </h1>
      </div>

      {/* Mission Section */}
      <section className="flex flex-col items-center gap-8 text-center max-w-4xl">
        <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800">
          Committed to Green
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">
          At Sprout & Spoon, we believe that eating well and living sustainably go hand in hand. 
          Our menu is rooted in fresh, locally sourced produce, crafted to bring out the best flavors each season has to offer. 
          Every dish we serve is a celebration of nature’s bounty, designed to nourish both body and soul.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg md:text-xl list-disc list-inside text-gray-700">
          <li>Locally Sourced Ingredients</li>
          <li>Organic Produce</li>
          <li>Seasonal Menus</li>
          <li>Sustainable Practices</li>
          <li>Plant-Based Innovation</li>
          <li>Zero-Waste Initiatives</li>
        </ul>
      </section>

      {/* Featured Dishes Section */}
      <section className="flex flex-col items-center gap-8 text-center max-w-5xl">
        <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800">
          Featured Dishes
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">
          From hearty grain bowls to vibrant seasonal salads, our chefs create dishes that are as nourishing as they are delicious.
          Every plate highlights the freshest vegetables, fruits, and herbs — harvested at their peak and prepared with love.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <div className="flex flex-col items-center gap-2">
            <img src="../images/veggie_bowl.jpeg" alt="Garden Bowl" className="w-full rounded-2xl shadow-md" />
            <h3 className="text-xl font-semibold text-green-700">Harvest Grain Bowl</h3>
            <p className="text-gray-600 text-base">Quinoa, roasted sweet potatoes, kale, and tahini drizzle.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src="../images/avocado_toast.jpeg" alt="Avocado Toast" className="w-full rounded-2xl shadow-md" />
            <h3 className="text-xl font-semibold text-green-700">Avocado Bloom Toast</h3>
            <p className="text-gray-600 text-base">Sourdough, smashed avocado, heirloom tomatoes, microgreens.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src="/images/pasta.jpeg" alt="Vegan Pasta" className="w-full rounded-2xl shadow-md" />
            <h3 className="text-xl font-semibold text-green-700">Summer Herb Pasta</h3>
            <p className="text-gray-600 text-base">Fresh basil pesto, zucchini ribbons, sun-dried tomatoes.</p>
          </div>
        </div>
      </section>

      {/* Our Message Section */}
      <section className="flex flex-col items-center gap-8 text-center max-w-4xl">
        <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800">
          Our Message
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">
          We are proud to work closely with local farmers and growers, ensuring every ingredient we use meets our high standards for freshness, sustainability, and taste.
          We compost, we recycle, and we strive to leave a lighter footprint — so that the earth we cherish can continue to thrive.
        </p>
      </section>
    </div>
  );
}
