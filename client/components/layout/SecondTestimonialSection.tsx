export const SecondTestimonialSection: React.FC = () => {
    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf693_grafana_testimonial.png"
                            alt="Grafana Testimonial"
                            className="rounded-2xl shadow-lg max-w-full h-auto"
                            loading="lazy"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            "Reclaim is an essential tool for our employees to stay focused on their most important work. Our managers are able to keep up with direct reports through regular flexible meetings, and automatically plan and prioritize projects across our teams."
                        </blockquote>
                        <div className="text-gray-600">
                            <div className="font-semibold">Raj Dutt</div>
                            <div className="text-lg">CEO & Co-Founder, Grafana</div>
                        </div>
                        <img
                            src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf680_new_grafana.svg"
                            alt="Grafana Logo"
                            className="mt-6 w-32"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};