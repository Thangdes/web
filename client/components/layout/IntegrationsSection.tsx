interface IntegrationItem {
    name: string;
    logo: string;
    description: string;
    href: string;
    comingSoon?: boolean;
}

export const IntegrationsSection: React.FC = () => {
    const integrations: IntegrationItem[] = [
        { name: "Slack", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccef29_slack.svg", description: "Sync your Slack status", href: "https://reclaim.ai/integrations/slack" },
        { name: "Zoom", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf2cf_zoomus-icon%20(1).svg", description: "Connect to Zoom", href: "https://reclaim.ai/integrations/zoom" },
        { name: "Google Tasks", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf16a_google-tasks-icon.svg", description: "Integrate Google Tasks", href: "https://reclaim.ai/integrations/google-tasks" },
        { name: "ClickUp", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf181_clickup.svg", description: "Integrate ClickUp Tasks", href: "https://reclaim.ai/integrations/clickup" },
        { name: "Todoist", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf16e_todoist.svg", description: "Integrate Todoist tasks", href: "https://reclaim.ai/integrations/todoist" },
        { name: "Jira", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf182_jira.svg", description: "Integrate Jira tasks", href: "https://reclaim.ai/integrations/jira" },
        { name: "Asana", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf2d0_asana.svg", description: "Integrate Asana tasks", href: "https://reclaim.ai/integrations/asana" },
        { name: "Linear", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf171_linear-icon.svg", description: "Integrate Linear tasks", href: "https://reclaim.ai/integrations/linear" },
        { name: "Webhooks", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf8e5_webhooks.svg", description: "Automate webhooks", href: "https://reclaim.ai/features/scheduling-links" },
        { name: "Raycast", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf4f2_raycast.svg", description: "Connect Raycast & Mac", href: "https://reclaim.ai/integrations/raycast" },
        { name: "HubSpot", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf80a_hubspot_logo.svg", description: "HubSpot coming soon", href: "#", comingSoon: true },
        { name: "Salesforce", logo: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf68a_new_salesforce.svg", description: "Salesforce coming soon", href: "#", comingSoon: true }
    ];

    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Integrate your work & calendar
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {integrations.map((integration, index) => (
                        <a
                            key={index}
                            href={integration.href}
                            className={`bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-blue-200 ${integration.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                                }`}
                        >
                            <img
                                src={integration.logo}
                                alt={integration.name}
                                className="w-12 h-12 mx-auto mb-4"
                                loading="lazy"
                            />
                            <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                            <p className="text-gray-600 text-sm">{integration.description}</p>
                            {integration.comingSoon && (
                                <div className="mt-2 text-xs text-gray-400">Coming Soon</div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};