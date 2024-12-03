export const generateRandomDescription = (): string => {
  const descriptions = [
    "A mysterious traveler from another dimension.",
    "An experienced adventurer with a dark past.",
    "A cheerful character who loves to explore new worlds.",
    "A skilled fighter with a secret mission.",
    "An eccentric genius with a passion for science.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};