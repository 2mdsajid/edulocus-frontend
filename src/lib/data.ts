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


// different types of tests ----------------------------------------------------------------
import { TTypeOfTestsAndDescription } from "@/app/tests/_components/schema";
import {
  BarChart,
  Book,
  BookOpen,
  Cpu,
  FileText, FlaskConical, // Alternative for Tools
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


export const typeOfTestsAndDescriptionData: TTypeOfTestsAndDescription[] = [
  { type: 'MODEL', description: 'Mock test to simulate real exam conditions.', isAvailable: true, icon: BarChart },
  { type: 'SUBJECT_WISE', description: 'Test focused on a specific subject.', isAvailable: true, icon: BookOpen },
  { type: 'CHAPTER_WISE', description: 'Test focused on specific chapters.', isAvailable: true, icon: FileText },
  { type: 'TOPIC_WISE', description: 'Test focused on a particular topic.', isAvailable: false, icon: Tag },
  { type: 'CUSTOM', description: 'Custom test created by the user.', isAvailable: false, icon: Wrench },
  { type: 'UNIT_WISE', description: 'Test focused on a specific unit.', isAvailable: false, icon: Folder },
  { type: 'DIFFICULTY_BASED', description: 'Test based on difficulty level.', isAvailable: false, icon: Sliders },
  { type: 'RANDOM', description: 'Randomly selected questions for variety.', isAvailable: false, icon: Shuffle },
  { type: 'FLASH', description: 'Quick test with fast results.', isAvailable: false, icon: Zap },
  { type: 'AI_GENERATED', description: 'AI-generated test tailored to your needs.', isAvailable: false, icon: Cpu },
  { type: 'PERFORMANCE_ANALYZER', description: 'Test designed to assess performance.', isAvailable: false, icon: TrendingUp },
  { type: 'PBQ_BASED', description: 'Test focused on practical-based questions (PBQ).', isAvailable: false, icon: Puzzle },
  { type: 'THEORY_BASED', description: 'Test focused on theoretical questions.', isAvailable: false, icon: Book },
  { type: 'REVISION', description: 'Test for reviewing learned material.', isAvailable: false, icon: RefreshCcw },
  { type: 'RETAKE', description: 'Test retake for improving previous scores.', isAvailable: false, icon: Repeat }
]


// this is for the subjects with their icons ----------------------------------------------------------------
import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Dna,
  Ear,
  Eye,
  Heart,
  LucideIcon,
  Microscope,
  Pill,
  Radio,
  Stethoscope,
  Sun,
  Syringe,
  Users
} from 'lucide-react';

export const subjectData: { [key: string]: { icon: LucideIcon, name: string } } = {
  anatomy: { icon: Bone, name: "Anatomy" },
  physiology: { icon: Heart, name: "Physiology" },
  biochemistry: { icon: FlaskConical, name: "Biochemistry" },
  pathology: { icon: Microscope, name: "Pathology" },
  pharmacology: { icon: Pill, name: "Pharmacology" },
  microbiology: { icon: Microscope, name: "Microbiology" }, // Changed from Bacteria to Microscope
  community_medicine: { icon: Users, name: "Community Medicine" },
  ent: { icon: Ear, name: "ENT" },
  opthalmology: { icon: Eye, name: "Ophthalmology" },
  obg: { icon: Baby, name: "Obstetrics & Gynecology" },
  forensic: { icon: Dna, name: "Forensic Medicine" },
  paediatrics: { icon: Baby, name: "Pediatrics" },
  surgery: { icon: Syringe, name: "Surgery" },
  medicine: { icon: Stethoscope, name: "Medicine" },
  radiology: { icon: Radio, name: "Radiology" },
  emergency_medicine: { icon: Ambulance, name: "Emergency Medicine" },
  psychiatry: { icon: Brain, name: "Psychiatry" },
  dermatology: { icon: Sun, name: "Dermatology" },
  orthopedics: { icon: Bone, name: "Orthopedics" }
}


// premium features data ----------------------------------------------------------------
import {
  BarChart3,
  Calendar,
  Gauge,
  Rocket,
  Sparkles,
  Trophy
} from "lucide-react";

export type TMembershipFeatures = {
  FeatureIcon: LucideIcon,
  title: string,
  description: string
}

export const membershipFeatures: TMembershipFeatures[] = [
  {
    FeatureIcon: Gauge,
    title: "Accessible Dashboard",
    description:
      "Get quick and easy access to all your insights and tools in one user-friendly dashboard, designed to make your journey smoother and more productive.",
  },
  {
    FeatureIcon: BarChart3,
    title: "Detailed Test Analysis",
    description:
      "Analyze each test in-depth with a breakdown of your performance, so you know exactly where you excel and where you can improve.",
  },
  {
    FeatureIcon: BookOpen,
    title: "Unlimited Access to All Tests",
    description:
      "Practice without limits! Access an extensive library of tests that cover every topic and difficulty level to ensure you're fully prepapurple.",
  },
  {
    FeatureIcon: Rocket,
    title: "Early Access to New Features",
    description:
      "Be the first to try out our latest features! Premium members get priority access to tools and updates designed to give you a competitive edge.",
  },
  {
    FeatureIcon: Trophy,
    title: "Exclusive Content from Top Achievers",
    description:
      "Gain insights directly from top scorers! Access unique study guides, tips, and techniques from those who've been at the top.",
  },
  {
    FeatureIcon: Sparkles,
    title: "AI-Based Test & Topic Recommendations",
    description:
      "Let our AI guide you! Receive personalized recommendations for tests, chapters, and topics to focus on, based on your unique learning profile.",
  },
  {
    FeatureIcon: Brain,
    title: "Intelligent Analysis",
    description:
      "Our AI-driven insights help you understand your strengths and weaknesses on a deeper level, making it easier to target your improvement areas.",
  },
  {
    FeatureIcon: Calendar,
    title: "All Past Year Questions",
    description:
      "Prepare with confidence by accessing all past questions, helping you understand patterns and trends in the exams and tests.",
  },
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