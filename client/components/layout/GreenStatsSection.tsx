export const GreenStatsSection: React.FC = () => {
    const stats = [
        { value: "56%", label: "less burnout for employees" },
        { value: "45%", label: "better work-life balance for employees" },
        { value: "63%", label: "less work stress for employees" },
        { value: "2.9", label: "more lunch breaks/week enjoyed by employees" }
    ];

    return (
        <section className="w-full py-20 px-4 bg-gradient-to-br from-green-50 to-green-100">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-xl text-gray-600 mb-4">
                    Reduce workplace stress, burnout, & turnover
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
                    Create a happier work culture
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl font-bold text-green-600 mb-4">
                                {stat.value}
                            </div>
                            <div className="text-gray-700 text-lg leading-tight">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};