export const ProductivitySection: React.FC = () => {
    return (
        <section className="w-full py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Benchmark &amp; optimize your personal productivity
                        </h2>
                        <a
                            href="https://app.reclaim.ai/signup"
                            className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors text-lg"
                        >
                            Track your productivity →
                        </a>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src="https://cdn.prod.website-files.com/67859049c02d67b2cfcceebf/6822a3b482ed06103e0a9d7b_Focus-Time-green-Reclaim-AI%201.png"
                            alt="Focus Time Analytics Dashboard"
                            className="rounded-2xl shadow-lg max-w-full h-auto"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};