export const FooterCTA: React.FC = () => {
    const features = [
        "100% free forever plan",
        "No credit card required",
        "No AI training on your data"
    ];

    return (
        <div className="w-full bg-gradient-to-r from-green-500 to-green-600 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="text-white text-sm font-semibold mb-2">
                    Free on Google Calendar & Outlook Calendar
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">
                    Try the #1 AI calendar for work
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                    {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                    Connect your calendar - it&apos;s free!
                </button>
            </div>
        </div>
    );
};