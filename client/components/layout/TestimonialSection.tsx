export const TestimonialSection: React.FC = () => {
    return (
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-[#3944b6] to-[#6772eb]">
            {/* Container với padding đối xứng: lề trái = lề phải */}
            <div className="w-full px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-[1600px]">

                    {/* LEFT: testimonial text box - căn giữa theo chiều dọc */}
                    <div className="w-full lg:w-[50%] flex items-center">
                        <div className="bg-[#7880d7] rounded-none p-8 md:p-10 lg:p-12 shadow-lg w-full">
                            <div className="text-lg md:text-xl text-white font-bold mb-5">
                                Raj Dutt, Grafana CEO
                            </div>
                            <blockquote className="text-xl md:text-2xl lg:text-[26px] font-medium text-white leading-relaxed">
                                "Reclaim is an essential tool for our employees to stay focused on their most important work.
                                Our managers are able to keep up with direct reports through regular flexible meetings,
                                and automatically plan and prioritize projects across our teams."
                            </blockquote>
                        </div>
                    </div>

                    {/* RIGHT: image box - căn giữa theo chiều dọc */}
                    <div className="w-full lg:w-[50%] flex items-center">
                        <div className="bg-[#7880d7] rounded-none p-3 shadow-lg w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                            <img
                                src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/689e48e8d8f227a34a566f2b_raj_dutt_grafana_ceo.jpg"
                                alt="Raj Dutt, Grafana CEO"
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};