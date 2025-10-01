export const FooterBottom: React.FC = () => {
    const legalLinks = ["Terms", "Privacy", "Security", "Cookies"];
    const socialPlatforms = ["Twitter", "LinkedIn", "YouTube", "Instagram", "Facebook"];

    return (
        <div className="w-full bg-white py-8 px-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    {/* Logo and Copyright */}
                    <div className="flex items-center gap-4 mb-4 lg:mb-0">
                        <div className="flex items-center gap-2">
                            <span className="rounded-full bg-purple-600 w-6 h-6 flex items-center justify-center">
                                <span className="block w-3 h-3 bg-white rounded-full"></span>
                            </span>
                            <span className="text-xl font-bold text-gray-900">Tempra</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Tempra. All rights reserved.
                        </span>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-4 lg:mb-0">
                        {legalLinks.map((item) => (
                            <a key={item} href="#" className="hover:text-green-600 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 text-gray-500">
                        {socialPlatforms.map((platform) => (
                            <a key={platform} href="#" className="hover:text-green-600 transition-colors text-sm">
                                {platform}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};