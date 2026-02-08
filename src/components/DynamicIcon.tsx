import React, { useEffect, useState } from "react";
import styles from './DynamicIcon.module.css';
import * as fa6Icons from "react-icons/fa6";
import * as mdIcons from "react-icons/md";

interface DynamicIconProps {
    packageName: string;
    iconName: string;
    size?: number;
    className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ 
    packageName, 
    iconName, 
    size = 24,
    className = ""
}) => {
    const [IconComponent, setIconComponent] = React.useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const loadIcon = () => {
            try {
                let iconSet;
                if (packageName === "fa6") {
                    iconSet = fa6Icons;
                } else if (packageName === "md") {
                    iconSet = mdIcons;
                } else {
                    throw new Error(`Unsupported icon package: ${packageName}`);
                }

                const icon = (iconSet as any)[iconName];
                if (!icon) {
                    throw new Error(`Icon ${iconName} not found in ${packageName}`);
                }

                setIconComponent(() => icon);
                setError("");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
                setIconComponent(null);
            }
        };

        loadIcon();
    }, [packageName, iconName]);

    if (error) {
        return <span className={`${styles.errorIcon} ${className}`} title={error}>?</span>;
    }

    if (!IconComponent) {
        return <span className={`${styles.loadingIcon} ${className}`}>...</span>;
    }

    return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;