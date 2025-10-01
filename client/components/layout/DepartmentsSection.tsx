interface DepartmentCard {
    title: string;
    description: string;
    icon: string;
    colorClass: string;
    href: string;
}

export const DepartmentsSection: React.FC = () => {
    const departments: DepartmentCard[] = [
        {
            title: "Marketing",
            description: "Fast-track campaigns →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf61e_marketing_180.svg",
            colorClass: "bg-purple-600 text-white",
            href: "/teams/marketing"
        },
        {
            title: "Engineering",
            description: "Get more coding done →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf620_engineering_180.svg",
            colorClass: "bg-blue-800 text-white",
            href: "/teams/engineering"
        },
        {
            title: "Product",
            description: "Ship product faster →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf621_product_180.svg",
            colorClass: "bg-blue-100 text-gray-900",
            href: "/teams/product"
        },
        {
            title: "Sales",
            description: "Close more deals →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf624_sales_180.svg",
            colorClass: "bg-white text-gray-900 border border-gray-200",
            href: "/teams/sales"
        },
        {
            title: "HR",
            description: "Empower employees →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf625_hr_180.svg",
            colorClass: "bg-green-100 text-gray-900",
            href: "/teams/hr"
        },
        {
            title: "Finance",
            description: "Improve performance →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf626_finance_180.svg",
            colorClass: "bg-green-200 text-gray-900",
            href: "/teams/finance"
        },
        {
            title: "EAs & Admin",
            description: "Optimize your work →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/68228a8dbdfab58f722be1c9_ea_card_01.svg",
            colorClass: "bg-green-800 text-white",
            href: "/teams/executive-assistants"
        }
    ];

    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Get templates &amp; recommendations for your specialty
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Access hundreds of templates and personalized focus time targets for your every role type.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {departments.map((dept, index) => (
                        <a
                            key={index}
                            href={dept.href}
                            className={`${dept.colorClass} rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}
                        >
                            <img
                                src={dept.icon}
                                alt={dept.title}
                                className="w-16 h-16 mx-auto mb-4"
                                loading="lazy"
                            />
                            <h3 className="text-xl font-bold mb-2">{dept.title}</h3>
                            <p className="text-lg opacity-90">{dept.description}</p>
                        </a>
                    ))}
                </div>

                {/* Mobile Grid */}
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    {departments.map((dept, index) => (
                        <a
                            key={index}
                            href={dept.href}
                            className={`${dept.colorClass} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300`}
                        >
                            <img
                                src={dept.icon}
                                alt={dept.title}
                                className="w-12 h-12 mx-auto mb-3"
                                loading="lazy"
                            />
                            <h3 className="text-lg font-bold mb-1">{dept.title}</h3>
                            <p className="text-sm opacity-90">{dept.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};