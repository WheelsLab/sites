export interface SocialLink {
    name: string;
    url: string;
    iconUrl?: string;
    iconPackage?: string;
    iconName?: string;
}

export interface Profile {
    sitename: string;
    navTitle: string;
    names: string[];
    description: string;
    image: string;
    socialLinks: SocialLink[];
}

export const profile: Profile = {
    sitename: "WheelsLab",
    navTitle: "WheelsLab",
    names: ["WheelsLab"],
    description: "Learn computer systems by build them from scratch",
    image: "img/favicon.png",
    socialLinks: [
        // {
        //     name: "bilibili",
        //     url: "https://space.bilibili.com/204818057",
        //     iconPackage: "fa6",
        //     iconName: "FaBilibili"
        // },
        {
            name: "email",
            url: "mailto:iclhchc@gmail.com",
            iconPackage: "md",
            iconName: "MdEmail"
        },
        {
            name: "github",
            url: "https://github.com/WheelsLab",
            iconPackage: "fa6",
            iconName: "FaGithub"
        }
    ]
};