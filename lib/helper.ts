export const SEO_LIMITS = {
  title: { min: 50, max: 60 }, // Optimal SEO title character limits
  description: { min: 120, max: 160 }, // Optimal SEO description character limits
};

export const isTitleSeoFriendly = (title: string) =>{
    return title &&
    title.length >= SEO_LIMITS.title.min &&
    title.length <= SEO_LIMITS.title.max;
}
 export const isDescriptionSeoFriendly = (description: string) =>{
    return description &&
    description.length >= SEO_LIMITS.description.min &&
    description.length <= SEO_LIMITS.description.max;
 }
  
 export const calculateOverallSeoPercentage = (
  title: string,
  description: string
) => {
  const calculatePercentage = (text: string, type: "title" | "description") => {
    if (!text) return 0;

    const { min, max } = SEO_LIMITS[type];

    if (text.length <= min) {
      return Math.round((text.length / min) * 100);
    } else if (text.length >= max) {
      return Math.round(((max - Math.abs(text.length - max)) / max) * 100);
    }

    return 100; // Within optimal range
  };

  const titlePercentage = calculatePercentage(title, "title");
  const descriptionPercentage = calculatePercentage(description, "description");

  // Combine both percentages for an overall score (simple average)
  const overallPercentage = Math.round((titlePercentage + descriptionPercentage) / 2);

  return overallPercentage;
};