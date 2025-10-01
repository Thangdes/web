import { FooterSection } from './FooterSection';

interface FooterSectionData {
    title: string;
    links: string[];
    isWide?: boolean;
}

const footerSections: FooterSectionData[] = [
    {
        title: "Products",
        links: [
            "Focus Time", "Habits", "Tasks", "Smart Meetings",
            "Scheduling Links", "Calendar Sync", "Buffer Time",
            "Working Hours", "Planner", "Time Tracking", "People Analytics", "Use Cases"
        ],
        isWide: true
    },
    {
        title: "Teams",
        links: [
            "Product Teams", "Engineering Teams", "Sales Teams",
            "Marketing Teams", "HR Teams", "Finance Teams", "EAs & Admin Teams"
        ]
    },
    {
        title: "Pricing",
        links: [
            "Pricing & plans", "Student Discount", "Nonprofit Discount",
            "Startup Discount", "Competitor Discount"
        ]
    },
    {
        title: "Compare",
        links: [
            "Reclaim vs. Clockwise", "Reclaim vs. Motion", "Reclaim vs. Calendly",
            "Reclaim vs. Google Calendar", "Reclaim vs. Outlook Calendar"
        ]
    },
    {
        title: "Integrations",
        links: [
            "Slack", "Zoom", "Google Tasks", "Todoist", "Asana",
            "Jira", "ClickUp", "Linear", "Raycast"
        ]
    },
    {
        title: "Company",
        links: [
            "Contact Sales", "Contact Support", "About", "Careers",
            "Customers", "Affiliate program"
        ]
    },
    {
        title: "Resources",
        links: [
            "Blog", "Glossary", "Webinars & demos", "Help docs"
        ]
    }
];

export const FooterLinks: React.FC = () => {
    return (
        <div className="w-full bg-white py-16 px-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Desktop Footer Grid */}
                <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
                    {footerSections.map((section) => (
                        <FooterSection
                            key={section.title}
                            title={section.title}
                            links={section.links}
                            isWide={section.isWide}
                        />
                    ))}
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        {footerSections.slice(0, 4).map((section) => (
                            <FooterSection
                                key={section.title}
                                title={section.title}
                                links={section.links.slice(0, 5)}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {footerSections.slice(4).map((section) => (
                            <FooterSection
                                key={section.title}
                                title={section.title}
                                links={section.links.slice(0, 5)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};