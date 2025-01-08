export const SEO_LIMITS = {
  title: { min: 50, max: 60 }, // Optimal SEO title character limits
  description: { min: 150, max: 160 }, // Optimal SEO description character limits
};

export const isTitleSeoFriendly = (title: string) => {
  return (
    title &&
    title.length >= SEO_LIMITS.title.min &&
    title.length <= SEO_LIMITS.title.max
  );
};
export const isDescriptionSeoFriendly = (description: string) => {
  return (
    description &&
    description.length >= SEO_LIMITS.description.min &&
    description.length <= SEO_LIMITS.description.max
  );
};

export const Keywords_Limits = {
  title: { min: 1, max: 2 },
  description: { min: 1, max: 3 },
};

export const isKeywordTitleOptimal = (title: string, keyword: string) => {
  if (!title || !keyword) return false;

  const keywordCount = (title.match(new RegExp(`\\b${keyword}\\b`, "gi")) || [])
    .length;

  const { min, max } = Keywords_Limits.title;

  return keywordCount >= min && keywordCount <= max;
};


export const isKeywordDescriptionOptimal = (description: string, keyword:string) => {
  if (!description || !keyword) return false;

  const keywordCount = (description.match(new RegExp(`\\b${keyword}\\b`, "gi")) || [])
    .length;

  const { min, max } = Keywords_Limits.description;

  return keywordCount >= min && keywordCount <= max;
};

export const calculateOverallSeoPercentage = (
  title?: string,
  description?: string,
  keyword?: string
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
  const checkKeywordUsage = (
    text: string,
    keyword: string,
    type: "title" | "description"
  ) => {
    if (!text || !keyword) return 0;

    const keywordCount = (
      text.match(new RegExp(`\\b${keyword}\\b`, "gi")) || []
    ).length;
    const limits = type === "title" ? { min: 1, max: 2 } : { min: 1, max: 3 };

    if (keywordCount < limits.min) {
      return Math.round((keywordCount / limits.min) * 100);
    } else if (keywordCount > limits.max) {
      return Math.round(
        ((limits.max - Math.abs(keywordCount - limits.max)) / limits.max) * 100
      );
    }

    return 100; // Within optimal range
  };

  let totalScore = 0;
  let totalMetrics = 0;

  if (title) {
    const titlePercentage = calculatePercentage(title, "title");
    totalScore += titlePercentage;
    totalMetrics++;

    if (keyword) {
      const keywordTitlePercentage = checkKeywordUsage(title, keyword, "title");
      totalScore += keywordTitlePercentage;
      totalMetrics++;
    }
  }

  if (description) {
    const descriptionPercentage = calculatePercentage(
      description,
      "description"
    );
    totalScore += descriptionPercentage;
    totalMetrics++;

    if (keyword) {
      const keywordDescriptionPercentage = checkKeywordUsage(
        description,
        keyword,
        "description"
      );
      totalScore += keywordDescriptionPercentage;
      totalMetrics++;
    }
  }

  if (totalMetrics === 0) return 0; // Avoid division by zero

  return Math.round(totalScore / totalMetrics);
};
//  export const calculateOverallSeoPercentage = (
//   title: string,
//   description: string
// ) => {
//   const calculatePercentage = (text: string, type: "title" | "description") => {
//     if (!text) return 0;

//     const { min, max } = SEO_LIMITS[type];

//     if (text.length <= min) {
//       return Math.round((text.length / min) * 100);
//     } else if (text.length >= max) {
//       return Math.round(((max - Math.abs(text.length - max)) / max) * 100);
//     }

//     return 100; // Within optimal range
//   };

//   const titlePercentage = calculatePercentage(title, "title");
//   const descriptionPercentage = calculatePercentage(description, "description");

//   // Combine both percentages for an overall score (simple average)
//   const overallPercentage = Math.round((titlePercentage + descriptionPercentage) / 2);

//   return overallPercentage;
// };
