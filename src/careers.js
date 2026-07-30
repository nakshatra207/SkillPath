export const careerOptions = [
    {
        value: "dataEngineer",
        label: "Data Engineer",
        category: "Data & Analytics",
        icon: "data",
        accent: "#38bdf8"
    },
    {
        value: "dataScientist",
        label: "Data Scientist",
        category: "Data & Analytics",
        icon: "science",
        accent: "#22c55e"
    },
    {
        value: "dataAnalyst",
        label: "Data Analyst",
        category: "Data & Analytics",
        icon: "insights",
        accent: "#f59e0b"
    },
    {
        value: "businessAnalyst",
        label: "Business Analyst",
        category: "Data & Analytics",
        icon: "strategy",
        accent: "#a78bfa"
    },
    {
        value: "fullStack",
        label: "Full Stack Developer",
        category: "Software Development",
        icon: "code",
        accent: "#60a5fa"
    },
    {
        value: "frontendDeveloper",
        label: "Frontend Developer",
        category: "Software Development",
        icon: "palette",
        accent: "#f472b6"
    },
    {
        value: "backendDeveloper",
        label: "Backend Developer",
        category: "Software Development",
        icon: "server",
        accent: "#14b8a6"
    },
    {
        value: "softwareEngineer",
        label: "Software Engineer",
        category: "Software Development",
        icon: "engineering",
        accent: "#818cf8"
    },
    {
        value: "aiEngineer",
        label: "AI Engineer",
        category: "AI & ML",
        icon: "spark",
        accent: "#e879f9"
    },
    {
        value: "machineLearningEngineer",
        label: "Machine Learning Engineer",
        category: "AI & ML",
        icon: "brain",
        accent: "#34d399"
    },
    {
        value: "deepLearningEngineer",
        label: "Deep Learning Engineer",
        category: "AI & ML",
        icon: "network",
        accent: "#fb7185"
    },
    {
        value: "genAIEngineer",
        label: "Generative AI Engineer",
        category: "AI & ML",
        icon: "spark",
        accent: "#f97316"
    },
    {
        value: "cloudEngineer",
        label: "Cloud Engineer",
        category: "Cloud & DevOps",
        icon: "cloud",
        accent: "#38bdf8"
    },
    {
        value: "devOpsEngineer",
        label: "DevOps Engineer",
        category: "Cloud & DevOps",
        icon: "pipeline",
        accent: "#f59e0b"
    },
    {
        value: "cyberSecurity",
        label: "Cyber Security Engineer",
        category: "Security",
        icon: "shield",
        accent: "#22c55e"
    },
    {
        value: "ethicalHacker",
        label: "Ethical Hacker",
        category: "Security",
        icon: "lock",
        accent: "#ef4444"
    },
    {
        value: "androidDeveloper",
        label: "Android Developer",
        category: "Mobile Development",
        icon: "mobile",
        accent: "#a3e635"
    },
    {
        value: "iosDeveloper",
        label: "iOS Developer",
        category: "Mobile Development",
        icon: "device",
        accent: "#d946ef"
    },
    {
        value: "flutterDeveloper",
        label: "Flutter Developer",
        category: "Mobile Development",
        icon: "flutter",
        accent: "#0ea5e9"
    },
    {
        value: "databaseAdministrator",
        label: "Database Administrator",
        category: "Data Infrastructure",
        icon: "database",
        accent: "#06b6d4"
    }
];

const careerLabelMap = careerOptions.reduce((accumulator, option) => {
    accumulator[option.value] = option.label;
    return accumulator;
}, {});

export const getCareerLabel = (career) => careerLabelMap[career] || career;
