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

import {
  BarChart,
  Book,
  BookOpen,
  Cpu,
  FileText, // Alternative for Tools
  Folder,
  Puzzle,
  RefreshCcw,
  Repeat,
  Shuffle,
  Sliders,
  Tag, // Alternative for Robot
  TrendingUp,
  Wrench, // Alternative for Dice
  Zap
} from 'lucide-react';
import { TTypeOfTestsAndDescription } from "@/app/tests/_components/schema";


export const typeOfTestsAndDescriptionData: TTypeOfTestsAndDescription[] = [
  { type: 'MODEL', description: 'Mock test to simulate real exam conditions.', icon: BarChart },
  { type: 'SUBJECT_WISE', description: 'Test focused on a specific subject.', icon: BookOpen },
  { type: 'CHAPTER_WISE', description: 'Test focused on specific chapters.', icon: FileText },
  { type: 'TOPIC_WISE', description: 'Test focused on a particular topic.', icon: Tag },
  { type: 'CUSTOM', description: 'Custom test created by the user.', icon: Wrench },
  { type: 'UNIT_WISE', description: 'Test focused on a specific unit.', icon: Folder },
  { type: 'DIFFICULTY_BASED', description: 'Test based on difficulty level.', icon: Sliders },
  { type: 'RANDOM', description: 'Randomly selected questions for variety.', icon: Shuffle },
  { type: 'FLASH', description: 'Quick test with fast results.', icon: Zap },
  { type: 'AI_GENERATED', description: 'AI-generated test tailored to your needs.', icon: Cpu },
  { type: 'PERFORMANCE_ANALYZER', description: 'Test designed to assess performance.', icon: TrendingUp },
  { type: 'PBQ_BASED', description: 'Test focused on practical-based questions (PBQ).', icon: Puzzle },
  { type: 'THEORY_BASED', description: 'Test focused on theoretical questions.', icon: Book },
  { type: 'REVISION', description: 'Test for reviewing learned material.', icon: RefreshCcw },
  { type: 'RETAKE', description: 'Test retake for improving previous scores.', icon: Repeat }
]

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
  title = "Edulocus - an online education platform for PG students",
  description = "Edulocus is an educational website offering variety of MCQs for PG/MD/MS Examinations",
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
    metadataBase: new URL('https://edulocusweb.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}