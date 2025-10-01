import React from "react";

export const ThirtyDaySection: React.FC = () => {
    return (
        <section
            className="w-full py-12 md:py-16"
            style={{
                background:
                    "linear-gradient(90deg,#f5f6fe 0%, #d9ddfb 50%, #c2c7f8 100%)",
            }}
        >
            <div className="w-full px-2 md:px-4 lg:px-6">
                <div className="max-w-full ml-0">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10 text-left">
                        Boost productivity on day 1
                    </h2>

                    {/* Timeline */}
                    <div className="relative mb-12 w-[80%]">
                        {/* Line runs through the pills */}
                        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-black z-0" />

                        {/* Pills */}
                        <div className="flex justify-between items-center relative">
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-gray-900">
                                    Today
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-gray-900">
                                    Day 7
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-normal text-gray-900">
                                    Day 30
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Today */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Today</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>✔ Focus Time is instantly protected</li>
                                <li>✔ AI starts flexibly defending your priorities</li>
                                <li>✔ Productivity trends are discovered via analytics</li>
                            </ul>
                        </div>

                        {/* Day 7 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Day 7</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>✔ AI optimizes 20% more long "deep work" sessions</li>
                                <li>✔ Meetings automatically adjust to an ideal time</li>
                                <li>✔ Fragmented time blocks reduce by 50%</li>
                            </ul>
                        </div>

                        {/* Day 30 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-lg font-normal mb-4">Day 30</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li>✔ Focus Time increases by 50%</li>
                                <li>✔ Meeting load reduces by 15%</li>
                                <li>✔ Work efficiency improves by 40%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
