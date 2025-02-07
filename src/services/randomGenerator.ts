const adjectives: string[] = [
    "Curious", "Vivid", "Friendly"
];

const nouns: string[] = [
    "Journeys", "Thoughts", "Adventures", "Minds", "Stories", "Connections", "Voices"
];

export const getRandomColors = () => {
    const colors = [
        "bg-blue-300",
        "bg-green-200",
        "bg-purple-200",
    ];
    return colors;
}

export const generateRandomTitle = () => {
    const getRandomElement = (arr: string[]): string => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    const randomAdjective = getRandomElement(adjectives);
    const randomNoun = getRandomElement(nouns);

    return `${randomAdjective} ${randomNoun}`;
}
