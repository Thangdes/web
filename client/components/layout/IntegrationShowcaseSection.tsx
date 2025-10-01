interface IntegrationItem {
    name: string;
    logo: string;
    description: string;
    href: string;
    comingSoon?: boolean;
}

export const IntegrationShowcaseSection: React.FC = () => {
    const platforms = [
        {
            name: "Google Calendar",
            logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67c8d2c0722c16faee74f944_square_google_icon_02.svg",
            description: "All for your existing Google Calendar —",
            href: "/compare/google-calendar-alternative",
        },
        {
            name: "Outlook Calendar",
            logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67e70b8aee2bc2da64a481c2_compare_outlook_logo.svg",
            description: "All for your existing Outlook Calendar —",
            href: "/compare/reclaim-vs-outlook",
        },
    ];

    const integrations: IntegrationItem[] = [
        { name: "Slack", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccef29_slack.svg", description: "Sync your Slack status", href: "https://reclaim.ai/integrations/slack" },
        { name: "Zoom", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf1a4_zoom.svg", description: "Connect to Zoom", href: "https://reclaim.ai/integrations/zoom" },
        { name: "Google Tasks", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf16a_google-tasks-icon.svg", description: "Integrate Google Tasks", href: "https://reclaim.ai/integrations/google-tasks" },
        { name: "ClickUp", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf181_clickup.svg", description: "Integrate ClickUp Tasks", href: "https://reclaim.ai/integrations/clickup" },
        { name: "Todoist", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf16e_todoist.svg", description: "Integrate Todoist tasks", href: "https://reclaim.ai/integrations/todoist" },
        { name: "Jira", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf182_jira.svg", description: "Integrate Jira tasks", href: "https://reclaim.ai/integrations/jira" },
        { name: "Asana", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf2d0_asana.svg", description: "Integrate Asana tasks", href: "https://reclaim.ai/integrations/asana" },
        { name: "Linear", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf171_linear-icon.svg", description: "Integrate Linear tasks", href: "https://reclaim.ai/integrations/linear" },
        { name: "Webhooks", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf8e5_webhooks.svg", description: "Automate webhooks", href: "https://reclaim.ai/features/scheduling-links" },
        { name: "Raycast", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf4f2_raycast.svg", description: "Connect Raycast & Mac", href: "https://reclaim.ai/integrations/raycast" },
        { name: "HubSpot", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf80a_hubspot_logo.svg", description: "HubSpot coming soon", href: "#", comingSoon: true },
        { name: "Salesforce", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf68a_new_salesforce.svg", description: "Salesforce coming soon", href: "#", comingSoon: true },
    ];

    return (
        <section className="w-full py-12 md:py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* TWO-COLUMN: items-stretch để 2 cột có cùng chiều cao */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* LEFT: tiêu đề (kích thước giống ảnh) + 2 calendar */}
                    <div className="h-full flex flex-col">
                        {/* Tiêu đề - tăng kích thước, leading chặt để giống ảnh */}
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                            Integrate your work &amp; calendar
                        </h2>

                        {/* 2 calendar cards - ngang hàng, compact */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {platforms.map((platform, i) => (
                                <a
                                    key={i}
                                    href={platform.href}
                                    aria-label={`Connect to ${platform.name}`}
                                    className="bg-[#f4f7ff] rounded-2xl p-6 border border-transparent hover:border-gray-200 transition-shadow duration-200 shadow-sm hover:shadow-md flex flex-col items-start"
                                >
                                    <div className="bg-white rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                                        <img
                                            src={platform.logo}
                                            alt={`${platform.name} logo`}
                                            className="w-10 h-10"
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                        />
                                    </div>

                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                                        {platform.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{platform.description}</p>
                                </a>
                            ))}
                        </div>

                        {/* spacer để cột trái giãn (giữ tổng chiều cao bằng cột phải) */}
                        <div className="mt-auto" />
                    </div>

                    {/* RIGHT: grid of integrations on pale background, full height */}
                    <div className="h-full bg-[#f7f9ff] rounded-2xl p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                            {integrations.map((integration, idx) => (
                                <a
                                    key={idx}
                                    href={integration.href}
                                    aria-label={`Connect to ${integration.name}`}
                                    className={`bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-start ${integration.comingSoon ? "opacity-60 pointer-events-none" : ""
                                        }`}
                                >
                                    <div className="bg-white rounded-md w-12 h-12 flex items-center justify-center mb-3">
                                        <img
                                            src={integration.logo}
                                            alt={`${integration.name} logo`}
                                            className="w-8 h-8"
                                            loading="lazy"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{integration.name}</h4>
                                    <p className="text-xs text-gray-600">{integration.description}</p>
                                    {integration.comingSoon && (
                                        <div className="mt-2 text-xs text-gray-400">Coming Soon</div>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};