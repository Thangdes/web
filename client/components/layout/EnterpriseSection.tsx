interface EnterpriseFeature {
    icon: string;
    title: string;
    description: string;
}

export const EnterpriseSection: React.FC = () => {
    const enterpriseFeatures: EnterpriseFeature[] = [
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf834_soc2_02.svg",
            title: "SOC 2 Type II",
            description: "Proud to hold the highest standards for security & compliance."
        },
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf836_sso_02.svg",
            title: "SSO & SCIM",
            description: "Authenticate with your IdP for SSO & provision users via SCIM."
        },
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf835_gdpr_02.svg",
            title: "GDPR & DPF",
            description: "Your personal data is always properly handled & safe."
        },
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf832_onboarding_02.svg",
            title: "Custom onboarding",
            description: "Set up an in-depth onboarding & training workshop for your company or team."
        },
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf831_support_02.svg",
            title: "Live human support",
            description: "Get live chat & email support, with a <20 minute average response time."
        },
        {
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf833_uptime_02.svg",
            title: "99.9% uptime",
            description: "Advanced high availability & disaster recovery you can trust."
        }
    ];

    return (
        <section className="w-full py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-6">
                    <h2 className="text-3xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                            Enterprise security, support &<br className="hidden md:block" />
                            scalability
                        </span>
                    </h2>
                    <a
                        href="https://trust.reclaim.ai/"
                        className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors hover:scale-105 transform duration-300"
                    >
                        Visit our trust center →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enterpriseFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-8 hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                loading="lazy"
                                className="w-8 h-8 mb-4 text-blue-600"
                            />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};