interface StatItem {
    value: string;
    line1: string;
    line2: string;
}

export const GreenStatsSection: React.FC = () => {
    const stats: StatItem[] = [
        { value: "56%", line1: "less burnout", line2: "for employees" },
        { value: "45%", line1: "better work-life", line2: "balance for employees" },
        { value: "63%", line1: "less work stress", line2: "for employees" },
        { value: "2.9", line1: "more lunch breaks/week", line2: "enjoyed by employees" },
    ];

    return (
        <section className="w-full py-12 md:py-16 bg-white">
            {/* Giữ một khoảng nhỏ bên trái bằng ml-4 (1rem ≈ 16px), lớn hơn trên desktop bằng lg:ml-6 */}
            <div className="max-w-7xl w-full ml-4 lg:ml-6 px-0">
                {/* Header - căn trái, kích thước vừa phải */}
                <div className="text-left mb-6 md:mb-8">
                    <p className="text-sm md:text-base text-gray-600 mb-2">
                        Reduce workplace stress, burnout, & turnover
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                        Create a happier work culture
                    </h2>
                </div>

                {/* Grid stats - căn trái */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 items-start">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-left">
                            {/* Số: vừa phải (không quá lớn) */}
                            <div className="text-3xl md:text-4xl font-extrabold text-green-600 mb-3">
                                {stat.value}
                            </div>

                            {/* Label: chia 2 dòng */}
                            <div className="text-gray-700 space-y-0.5">
                                <div className="text-sm md:text-sm font-medium leading-tight">
                                    {stat.line1}
                                </div>
                                <div className="text-sm md:text-sm leading-tight">
                                    {stat.line2}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
