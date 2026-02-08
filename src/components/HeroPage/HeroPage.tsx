"use client";

import React, { useEffect, useState } from "react";
import styles from './HeroPage.module.css';
import DynamicIcon from '../DynamicIcon';
import { profile } from '../../profile';

interface AnimatedLetterProps {
    char: string;
    delay: number;
    isHighlighted?: boolean;
    isUnderlined?: boolean;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ char, delay, isHighlighted, isUnderlined }) => {
    return (
        <span 
            className={`${styles.slogan_letter} ${
                isHighlighted ? styles.slogan_highlight : ''
            } ${
                isUnderlined ? styles.slogan_underline : ''
            }`}
            style={{ animationDelay: `${delay}s` }}
        >
            {char}
        </span>
    )
}

interface AnimatedWordProps {
    text: string;
    baseDelay: number;
    isHighlighted?: boolean;
    isUnderlined?: boolean;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ text, baseDelay, isHighlighted, isUnderlined }) => {
    return (
        <span className={styles.slogan_word}>
            {text.split('').map((char, index) => (
                <AnimatedLetter
                    key={index}
                    char={char}
                    delay={baseDelay + index * 0.05}
                    isHighlighted={isHighlighted}
                    isUnderlined={isUnderlined}
                />
            ))}
        </span>
    )
}

/**
 * 个人简介组件
 * 
 * 展示头像、名字（可点击切换）、座右铭以及社交媒体链接。
 */
const HeroPage = () => {
    const [nameClicked, setNameClicked] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentSloganIndex, setCurrentSloganIndex] = useState(0)

    const slogans = [
        { text: "Learn computer systems by build them from scratch.", gradient: "gradient-rose", highlightIndices: [0, 4] },
        { text: "Code improves throuth refactoring, not hesitation.", gradient: "gradient-blue", highlightIndices: [3] },
        { text: "Perfection is rearched by iteration, not by planning", gradient: "gradient-green", highlightIndices: [4] },
        { text: "Command controls computer, code controls everything!", gradient: "gradient-rose", highlightIndices: [0, 3] },
    ]

    useEffect(() => {
        setIsLoaded(true)
        
        // 每4秒切换一次标语
        const interval = setInterval(() => {
            setCurrentSloganIndex((prev) => (prev + 1) % slogans.length)
        }, 4000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const handleNameClick = () => {
        const nextIndex = (nameClicked + 1) % profile.names.length;
        setNameClicked(nextIndex);
    }

    const currentSlogan = slogans[currentSloganIndex]
    const words = currentSlogan.text.split(' ')
    
    const animationKey = currentSloganIndex
    const gradientClass = `profile_wrapper_${currentSloganIndex % 3}`

    return (
        <div className={`${styles.profile_wrapper} ${styles[gradientClass as keyof typeof styles]}`}>
            <div className={styles.profile_container}>
                <div className={styles.profile_image_wrapper}>
                    <img src={profile.image} className={styles.profile_image} alt="Profile Avatar" />
                </div>
                <div className={styles.profile_content_wrapper}>
                    <div className={`${styles.profile_info_wrapper} ${isLoaded ? styles.profile_info_wrapper_animated : ""}`}>
                        <h1 
                            className={styles.profile_info_name} 
                            onClick={handleNameClick} 
                            title="Click to switch name"
                        >
                            {profile.names[nameClicked]}
                        </h1>
                        <div className={styles.slogan_container}>
                            <div className={styles.slogan_placeholder}>
                                {currentSlogan.text}
                            </div>
                            <div className={styles.slogan_animated}>
                                {words.map((word, index) => {
                                    let baseDelay = 0
                                    for (let i = 0; i < index; i++) {
                                        baseDelay += words[i].length * 0.05 + 0.1
                                    }
                                    return (
                                        <AnimatedWord 
                                            key={`word-${index}-${animationKey}`}
                                            text={word}
                                            baseDelay={baseDelay}
                                            isHighlighted={currentSlogan.highlightIndices.includes(index)}
                                            isUnderlined={true}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.profile_social_wrapper}>
                        {profile.socialLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.profile_social_item} ${isLoaded ? styles.profile_social_item_animated : ""}`}
                                style={isLoaded ? { animationDelay: `${0.6 + index * 0.08}s` } : undefined}
                                aria-label={item.name}
                            >
                                {item.iconUrl ? (
                                    <img 
                                        src={item.iconUrl} 
                                        alt={item.name} 
                                        width={20}
                                        height={20}
                                        style={{ objectFit: 'contain' }} 
                                    />
                                ) : (
                                    item.iconPackage && item.iconName ? (
                                        <DynamicIcon packageName={item.iconPackage} iconName={item.iconName} />
                                    ) : (
                                        item.name
                                    )
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <p className={styles.profile_background}>{`<PROFILE/>`}</p>
        </div>
    )
}

export default HeroPage;