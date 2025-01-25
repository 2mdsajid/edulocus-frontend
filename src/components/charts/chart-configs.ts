import { ChartConfig } from "@/components/ui/chart";

export const variousScoreChartConfig = {
    value: {
        label: "Value",
    },
    correct: {
        label: "Correct",
        color: "#ffce56",
    },
    incorrect: {
        label: "Incorrect",
        color: "#FF32FC",
    },
    unattempt: {
        label: "Unattempt",
        color: "#FE3423",
    },
} satisfies ChartConfig



export const subjectChartConfig = {
    score: {
        label: "Score"
    },
    pharmacology: {
        label: "Pharma",
        color: "#FF6384", // Red
    },
    medicine: {
        label: "Med",
        color: "#36A2EB", // Blue
    },
    paediatrics: {
        label: "Ped",
        color: "#FFCE56", // Yellow
    },
    obg: {
        label: "OBG",
        color: "#4BC0C0", // Teal
    },
    psychiatry: {
        label: "Psy",
        color: "#9966FF", // Purple
    },
    surgery: {
        label: "Sur",
        color: "#FF9F40", // Orange
    },
    emergency_medicine: {
        label: "ER",
        color: "#C9CBCF", // Gray
    },
    ent: {
        label: "ENT",
        color: "#FFCD56", // Light Yellow
    },
    community_medicine: {
        label: "CM",
        color: "#4D5360", // Dark Gray
    },
    orthopedics: {
        label: "Ortho",
        color: "#FF6F61", // Coral
    },
    opthalmology: {
        label: "Optho",
        color: "#6B5B95", // Lavender
    },
    radiology: {
        label: "Radio",
        color: "#88B04B", // Green
    },
    pathology: {
        label: "Patho",
        color: "#F7CAC9", // Pink
    },
    dermatology: {
        label: "Derma",
        color: "#92A8D1", // Light Blue
    },
    anatomy: {
        label: "Anat",
        color: "#955251", // Maroon
    },
    physiology: {
        label: "Physio",
        color: "#B565A7", // Mauve
    },
    biochemistry: {
        label: "Biochem",
        color: "#009B77", // Emerald
    },
    microbiology: {
        label: "Microbio",
        color: "#DD4124", // Red-Orange
    },
    forensic: {
        label: "Forensic",
        color: "#D65076", // Dark Pink
    },

} satisfies ChartConfig

