export const PlatformIntegrationSection: React.FC = () => {
    const platforms = [
        {
            name: "Google Calendar",
            logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67c8d2c0722c16faee74f944_square_google_icon_02.svg",
            description: "AI for your existing Google Calendar →",
            href: "/compare/google-calendar-alternative"
        },
        {
            name: "Outlook Calendar",
            logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67e70b8aee2bc2da64a481c2_compare_outlook_logo.svg",
            description: "AI for your existing Outlook Calendar →",
            href: "/compare/reclaim-vs-outlook"
        }
    ];

    return (
        <section className="w-full py-20 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Integrate your workflows with<br />your existing calendar
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {platforms.map((platform, index) => (
                        <a
                            key={index}
                            href={platform.href}
                            className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 flex items-center gap-6"
                        >
                            <img
                                src={platform.logo}
                                alt={platform.name}
                                className="w-16 h-16"
                                loading="lazy"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                                <p className="text-gray-600">{platform.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};