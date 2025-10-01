export const ThirtyDaySection: React.FC = () => {
    const timelineData = [
        {
            period: "Today",
            items: [
                "Focus Time is instantly protected",
                "AI starts flexibly defending your priorities",
                "Productivity trends are discovered via analytics"
            ]
        },
        {
            period: "Day 7",
            items: [
                "AI optimizes 20% more long 'deep work' sessions",
                "Meetings automatically adjust to an ideal time",
                "Fragmented time blocks reduce by 50%"
            ]
        },
        {
            period: "Day 30",
            items: [
                "Focus Time increases by 50%",
                "Meeting load reduces by 15%",
                "Work efficiency improves by 40%"
            ]
        }
    ];

    return (
        <section className="w-full py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-radial-gradient(at 90% 50%, rgba(85, 98, 235, 0.1) 0%, rgba(226, 233, 255, 0.05) 100%) animate-pulse-slow" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Boost productivity on day 1
                    </h2>
                </div>

                {/* Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {timelineData.map((phase, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="text-center mb-6">
                                <div className={`text-2xl font-bold ${phase.period === "Day 30" ? "text-green-500" : "text-gray-900"
                                    }`}>
                                    {phase.period}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {phase.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-start gap-3">
                                        <img
                                            src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/689e51fe2f2b1d7ec2068891_green_check.svg"
                                            alt="Checkmark"
                                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <span className="text-gray-700 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Links */}
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://app.reclaim.ai/signup"
                            className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors text-lg"
                        >
                            Create your free account
                        </a>
                        <a
                            href="/contact"
                            className="text-gray-600 font-semibold hover:text-gray-800 transition-colors text-lg"
                        >
                            Explore a pilot
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};