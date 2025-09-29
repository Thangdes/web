export function FocusStatsSection() {
  return (
    <section className="w-full py-16 px-4 bg-[#f4f7ff] border-t border-b border-[#4f5bd5]">
      <div className="max-w-6xl mx-auto">
        <p className="text-lg text-gray-600 mb-4">Deleting meetings doesn't work – you need to prioritize focus time.</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10">
          Tempra <span className="text-green-500">395</span> hours of focus time/user every year
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl font-bold text-green-500">7,6</span>
            <div className="text-gray-700 mt-2">more focus time<br />hours/week</div>
          </div>
          <div>
            <span className="text-4xl font-bold text-green-500">2,3</span>
            <div className="text-gray-700 mt-2">fewer unnecessary<br />meetings/week</div>
          </div>
          <div>
            <span className="text-4xl font-bold text-green-500">4,5</span>
            <div className="text-gray-700 mt-2">fewer overtime<br />hours/week</div>
          </div>
          <div>
            <span className="text-4xl font-bold text-green-500">60%</span>
            <div className="text-gray-700 mt-2">less unproductive<br />context switching</div>
          </div>
        </div>
      </div>
    </section>
  );
}
