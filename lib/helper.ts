const SEO_LIMITS = {
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
  
