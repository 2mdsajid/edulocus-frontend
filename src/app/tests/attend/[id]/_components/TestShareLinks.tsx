import React from 'react'
import { FaFacebook, FaFacebookMessenger, FaLinkedin, FaTelegramPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa';

type Props = {
    url: string
    slug?: string
    typeoftest?: string
}

const TestShareLinks = (props: Props) => {
    const { url, slug } = props
    const facebookShareLink = `https://www.facebook.com/sharer.php?u=${url}`;
    const twitterShareLink = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(slug || '')}`;
    const whatsappShareLink = `https://api.whatsapp.com/send?text=${`${url}`}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    const telegramShareLink = `https://t.me/share/url?url=${url}`;
    const messengerShareLink = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=423237070046415&redirect_uri=${url}`;
    return (
        <div className='flex space-x-3'>
            <a href={telegramShareLink} target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane size={24} />
            </a>
            <a href={facebookShareLink} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
            </a>
            <a href={whatsappShareLink} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} />
            </a>
            <a className='hidden md:block' href={messengerShareLink} target="_blank" rel="noopener noreferrer">
                <FaFacebookMessenger size={24} />
            </a>
            <a href={twitterShareLink} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
            </a>
            <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
            </a>
        </div>
    )
}

export default TestShareLinks