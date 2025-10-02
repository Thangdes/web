import React from "react";

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
            colorClass: "bg-gray-800 text-white",
            href: "/teams/marketing",
        },
        {
            title: "Engineering",
            description: "Get more coding done →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf620_engineering_180.svg",
            colorClass: "bg-blue-800 text-white",
            href: "/teams/engineering",
        },
        {
            title: "Product",
            description: "Ship product faster →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf621_product_180.svg",
            colorClass: "bg-blue-200 text-gray-900",
            href: "/teams/product",
        },
        {
            title: "Sales",
            description: "Close more deals →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf624_sales_180.svg",
            colorClass: "bg-white text-gray-900 border border-gray-200",
            href: "/teams/sales",
        },
        {
            title: "HR",
            description: "Empower employees →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf625_hr_180.svg",
            colorClass: "bg-green-100 text-gray-900",
            href: "/teams/hr",
        },
        {
            title: "Finance",
            description: "Improve performance →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/67859049c02d67b2cfccf626_finance_180.svg",
            colorClass: "bg-green-200 text-gray-900",
            href: "/teams/finance",
        },
        {
            title: "EAs & Admin",
            description: "Optimize your work →",
            icon: "https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/68228a8dbdfab58f722be1c9_ea_card_01.svg",
            colorClass: "bg-green-800 text-white",
            href: "/teams/executive-assistants",
        },
    ];

    return (
        <section className="w-full py-20 pl-4 bg-white">
            <div className="max-w-7xl ml-0">
                {/* Header */}
                <div className="text-left mb-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Get templates &amp; recommendations for your specialty
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl whitespace-nowrap">
                        Access hundreds of templates and personalized focus time targets for your every role type.
                    </p>
                </div>

                {/* Desktop Grid: 5 cột */}
                <div className="hidden lg:grid gap-6 justify-start grid-cols-[repeat(5,200px)]">
                    {departments.map((dept) => (
                        <a
                            key={dept.title}
                            href={dept.href}
                            className={`${dept.colorClass} rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 w-[200px] h-64`}
                        >
                            <img
                                src={dept.icon}
                                alt={dept.title}
                                className="w-36 h-auto mb-4 object-contain"
                                loading="lazy"
                            />
                            <h3 className="text-xl font-bold mb-2 leading-tight whitespace-nowrap">{dept.title}</h3>
                            <p className="text-base opacity-90 leading-tight whitespace-nowrap">{dept.description}</p>
                        </a>
                    ))}
                </div>

                {/* Mobile Grid: 2 cột */}
                <div className="lg:hidden grid gap-4 justify-start grid-cols-[repeat(2,170px)]">
                    {departments.map((dept) => (
                        <a
                            key={dept.title}
                            href={dept.href}
                            className={`${dept.colorClass} rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-md hover:shadow-xl transition-all duration-300 w-[170px] h-44`}
                        >
                            <img
                                src={dept.icon}
                                alt={dept.title}
                                className="w-24 h-auto mb-3 object-contain"
                                loading="lazy"
                            />
                            <h3 className="text-lg font-bold mb-1 leading-tight whitespace-nowrap">{dept.title}</h3>
                            <p className="text-sm opacity-90 leading-tight whitespace-nowrap">{dept.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
