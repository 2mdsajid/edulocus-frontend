import { Metadata } from "next";
import { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { PiExam } from "react-icons/pi";

type NAVLINKS = {
    id: string;
    text: string;
    href: string;
    icon: IconType;
  };

  export const ROLES_HIEARCHY = {
    SAJID: ['SAJID'],
    ADMIN: ['ADMIN', 'SAJID'],
    SUPERADMIN: ['ADMIN', 'SUPERADMIN', 'SAJID'],
    MODERATOR: ['ADMIN', 'SUPERADMIN', 'MODERATOR', 'SAJID'],
    USER: ['ADMIN', 'USER', 'SUPERADMIN', 'MODERATOR', 'SAJID'],
  }
  
  
export const NAV_LINKS: NAVLINKS[] = [
    {
      id: "home",
      text: "Home",
      href: "/",
      icon: MdHome,
    },
    {
      id: "tests",
      text: "Tests",
      href: "/tests",
      icon: PiExam,
    },
    {
      id: "profile",
      text: "Profile",
      href: "/profile",
      icon: CgProfile,
    },
  ];


  export const QUESTION_BORDER_COLOR = {
    correct: 'border-green-500',
    incorrect: 'border-red-500',
    unattempt: 'border-secondary'
}


export const FEATURES = [
  {
    'title': 'Books and Notes',
    'link': 'resources',
    'image': '/features/books.png',
    'description': 'You can find notes of various subjects. Tips and Tricks from toppers !',
  },
  {
    'title': 'Different Tests',
    'link': 'tests',
    'image': '/features/tests.png',
    'description': 'You can appear different sorts of test for improvement !',
  },
  {
    'title': 'Analytics',
    'link': 'dashboard/analytics',
    'image': '/features/Analytics.png',
    'description': 'Your data will be analyzed with different graphs, charts  !',
  },
  {
    'title': 'Solution Sets',
    'link': 'result',
    'image': '/features/solution.png',
    'description': 'You can solution sets of questions after each test !',
  }
];


export function constructMetadata({
  title = "Edulocus - an online education platform for CEE students",
  description = "Edulocus is an educational website offering variety of MCQs for CEE appearing students",
  image = "/thumbnail.jpg",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@c0mrad1_"
    },
    icons,
    metadataBase: new URL('https://medlocusweb.com'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}