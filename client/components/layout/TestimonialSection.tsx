export const TestimonialSection: React.FC = () => {
    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                        <div className="text-gray-600 font-semibold mb-2">Raj Dutt, Grafana CEO</div>
                        <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            "Reclaim is an essential tool for our employees to stay focused on their most important work. Our managers are able to keep up with direct reports through regular flexible meetings, and automatically plan and prioritize projects across our teams."
                        </blockquote>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/689e48e8d8f227a34a566f2b_raj_dutt_grafana_ceo.jpg"
                            alt="Raj Dutt, Grafana CEO"
                            className="rounded-2xl shadow-lg max-w-full h-auto"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};