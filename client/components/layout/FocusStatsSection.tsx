export const FocusStatsSection: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <p className="text-xl text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          Deleting meetings doesn't work – you need to prioritize focus time.
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Reclaim creates <span className="text-blue-600">395 hours</span> of focus time per user every year
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-blue-600 block mb-2">7.6</span>
            <div className="text-gray-700 text-lg font-medium">more focus time<br />hours/week</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-blue-600 block mb-2">2.3</span>
            <div className="text-gray-700 text-lg font-medium">fewer unnecessary<br />meetings/week</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-blue-600 block mb-2">4.5</span>
            <div className="text-gray-700 text-lg font-medium">fewer overtime<br />hours/week</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <span className="text-4xl font-bold text-blue-600 block mb-2">60%</span>
            <div className="text-gray-700 text-lg font-medium">less unproductive<br />context switching</div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">TRUSTED BY THOUSANDS OF FAST-MOVING TEAMS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-semibold">Google</div>
            <div className="text-gray-400 font-semibold">Amazon</div>
            <div className="text-gray-400 font-semibold">Microsoft</div>
            <div className="text-gray-400 font-semibold">Slack</div>
            <div className="text-gray-400 font-semibold">Zoom</div>
          </div>
        </div>
      </div>
    </section>
  );
};