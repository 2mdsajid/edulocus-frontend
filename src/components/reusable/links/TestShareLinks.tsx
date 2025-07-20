import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaTwitter, FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';

// Define a more specific type for the props of ShareIcon
type ShareIconProps = {
    href: string;
    icon: React.ElementType;
    tooltip: string;
};

// A reusable component for each social icon to keep the code clean
const ShareIcon = ({ href, icon: Icon, tooltip }: ShareIconProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
    >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out group-hover:bg-gray-800 group-hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-white dark:group-hover:text-gray-800">
            <Icon size={20} />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 w-max scale-0 rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 group-hover:scale-100 dark:bg-gray-900">
            {tooltip}
            <div className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800 dark:bg-gray-900"></div>
        </div>
    </a>
);

type TestShareLinksProps = {
    url: string;
    slug?: string;
    typeoftest?: string;
};

const TestShareLinks = (props: TestShareLinksProps) => {
    const { url, slug = "Check out this test!" } = props;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(slug);

    const shareLinks = [
        {
            name: 'Telegram',
            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            icon: FaTelegramPlane,
        },
        {
            name: 'Facebook',
            href: `https://www.facebook.com/sharer.php?u=${encodedUrl}`,
            icon: FaFacebookF,
        },
        {
            name: 'WhatsApp',
            href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
            icon: FaWhatsapp,
        },
        {
            name: 'Twitter',
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
            icon: FaTwitter,
        },
        {
            name: 'LinkedIn',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: FaLinkedinIn,
        },
        {
            name: 'Messenger',
            href: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=423237070046415&redirect_uri=${encodedUrl}`,
            icon: FaFacebookMessenger,
        }
    ];

    return (
        <div className="rounded-2xl  border-purple-500 border-t-8 bg-white p-6 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <h4 className="mb-5 text-center text-lg font-bold text-gray-800 dark:text-white">
                Share this Test
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {shareLinks.map((link) => (
                    <ShareIcon
                        key={link.name}
                        href={link.href}
                        icon={link.icon}
                        tooltip={`Share on ${link.name}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestShareLinks;
