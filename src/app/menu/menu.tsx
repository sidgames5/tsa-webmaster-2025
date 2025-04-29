'use client';

export default function MenuPage() {
  return (
    <div className="flex flex-col items-center gap-12 p-8">
      {/* Hero Section */}
      <div
        className="relative min-h-[50vh] w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/vintage-menu-background_GkbMaF9d_SB_PM.jpg')", // <- Replace with your menu image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative tangerine-bold text-8xl text-white">Our Menu</h1>
      </div>

      {/* Menu Sections */}
      <div className="max-w-5xl w-full flex flex-col gap-16">

        {/* Starters */}
        <section>
          <h2 className="dm-serif-text-regular-italic text-5xl mb-6 text-center">Starters</h2>
          <ul className="flex flex-col gap-4">
            <MenuItem name="Stuffed Mushrooms" description="Baked cremini mushrooms filled with herbs and vegan cheese." price="$9" />
            <MenuItem name="Avocado Toast" description="Rustic bread topped with smashed avocado, radish, and sprouts." price="$7" />
            <MenuItem name="Seasonal Soup" description="A rotating selection of fresh, locally-sourced soups." price="$8" />
          </ul>
        </section>

        {/* Main Courses */}
        <section>
          <h2 className="dm-serif-text-regular-italic text-5xl mb-6 text-center">Mains</h2>
          <ul className="flex flex-col gap-4">
            <MenuItem name="Grilled Vegetable Lasagna" description="Layers of roasted veggies, plant-based cheese, and marinara sauce." price="$16" />
            <MenuItem name="Chickpea Buddha Bowl" description="Quinoa, roasted chickpeas, kale, and tahini dressing." price="$14" />
            <MenuItem name="Stuffed Acorn Squash" description="Wild rice, cranberries, and pecans in a roasted squash half." price="$18" />
          </ul>
        </section>

        {/* Desserts */}
        <section>
          <h2 className="dm-serif-text-regular-italic text-5xl mb-6 text-center">Desserts</h2>
          <ul className="flex flex-col gap-4">
            <MenuItem name="Vegan Chocolate Cake" description="Decadent dark chocolate cake with coconut cream frosting." price="$9" />
            <MenuItem name="Fruit Tart" description="Crisp almond crust filled with vanilla custard and seasonal fruit." price="$8" />
            <MenuItem name="Chia Pudding" description="Chia seeds soaked in coconut milk with a touch of maple syrup." price="$7" />
          </ul>
        </section>

      </div>
    </div>
  );
}

function MenuItem({ name, description, price }: { name: string; description: string; price: string }) {
  return (
    <li className="flex justify-between items-start border-b pb-4">
      <div>
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <span className="text-xl font-bold">{price}</span>
    </li>
  );
}
