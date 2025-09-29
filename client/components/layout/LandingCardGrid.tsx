import { LandingCard } from "@/components/marketing/LandingCard";

const cards = [
  { colorClass: "bg-gray-900 text-white", title: "Marketing", description: "Fast-track campaigns →" },
  { colorClass: "bg-blue-500 text-white", title: "Engineering", description: "Get more coding done →" },
  { colorClass: "bg-indigo-200 text-gray-900", title: "Product", description: "Ship product faster →" },
  { colorClass: "bg-blue-100 text-gray-900", title: "Sales", description: "Close more deals →" },
  { colorClass: "bg-green-100 text-gray-900", title: "HR", description: "Empower employees →" },
  { colorClass: "bg-green-300 text-gray-900", title: "Finance", description: "Improve performance →" },
  { colorClass: "bg-green-800 text-white", title: "EAs & Admin", description: "Optimize your work →" },
];

export function LandingCardGrid() {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-4 -mx-2">
        {cards.map(card => (
          <LandingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
