export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[50vh] max-h-[110vh] flex items-center justify-center"
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
      <section className="flex flex-col items-center px-6 py-16 md:px-20 text-center w-[100w] bg-gray-100">
        <div className="ml-60 mr-60">
          <h2 className="font-dm-serif italic text-3xl md:text-5xl text-green-800 p-3">
            Featured Dishes
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto mb-12">
            From hearty grain bowls to vibrant seasonal salads, our chefs create dishes that are as nourishing as they are delicious.
            Every plate highlights the freshest vegetables, fruits, and herbs — harvested at their peak and prepared with love.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-autp">
            {[
              {
                title: "Harvest Grain Bowl",
                description: "Quinoa, roasted sweet potatoes, kale, and tahini drizzle.",
                img: "/images/veggie_bowl.jpeg",
              },
              {
                title: "Avocado Bloom Toast",
                description: "Sourdough, smashed avocado, heirloom tomatoes, microgreens.",
                img: "/images/avocado_toast.jpeg",
              },
              {
                title: "Summer Herb Pasta",
                desc: "Fresh basil pesto, zucchini ribbons, sun-dried tomatoes.",
                img: "/images/pasta.jpeg",
              },
            ].map(({ title, description, img}) => (
              <div key={title} className="bg-white rounded-2xl shadow-md overflow-hidden p-4 flex flex-col items-center text-ceter">
                <img src={img} alt={title} className="w-full h-60 rounded-2xl object-cover mb-4" />
                <h3 className="text-xl font-semibold text-green-700">{title}</h3>
                <p className="text-gray-600 text-base mt-1">{description}</p>
              </div>
            ))
            }
          </div>
        </div>
      </section>

      {/* Our Message Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 w-[100vw] bg-green-100">
        <div className="max-w-4xl text-center bg-white p-8 rounded-3xl shadow-md">
          <h2 className="font-dm-serif italic text-4xl md:text-5xl text-green-700 mb-4">
            Our Message
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            We are proud to work closely with local farmers and growers, ensuring every ingredient we use meets our high standards for freshness, sustainability, and taste.
            We compost, we recycle, and we strive to leave a lighter footprint — so that the earth we cherish can continue to thrive.
          </p>
        </div>
  
      </section>
    </div>
  );
}
