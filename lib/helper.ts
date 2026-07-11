export interface HeadingEntry {
  tag: string;
  text: string;
}

export interface HeadingIssue {
  severity: "error" | "warning" | "success";
  message: string;
}

export interface HeadingAnalysisResult {
  issues: HeadingIssue[];
  counts: Record<string, number>;
  score: number;
}

const HEADING_LEVELS = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

export function analyzeHeadings(headings: HeadingEntry[]): HeadingAnalysisResult {
  const issues: HeadingIssue[] = [];
  const counts: Record<string, number> = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
  let score = 100;

  headings.forEach((h) => {
    if (counts[h.tag] !== undefined) counts[h.tag]++;
  });

  const h1Count = counts.h1;

  if (h1Count === 0) {
    issues.push({
      severity: "error",
      message: "Missing H1 tag. Every page should have exactly one H1 heading.",
    });
    score -= 30;
  } else if (h1Count > 1) {
    issues.push({
      severity: "error",
      message: `Found ${h1Count} H1 tags. Use only one H1 per page for optimal SEO.`,
    });
    score -= 25;
  } else {
    issues.push({
      severity: "success",
      message: "Exactly one H1 tag found — good structure.",
    });
  }

  const emptyHeadings = headings.filter((h) => !h.text);
  if (emptyHeadings.length > 0) {
    const tags = [...new Set(emptyHeadings.map((h) => h.tag))].join(", ");
    issues.push({
      severity: "warning",
      message: `Found ${emptyHeadings.length} empty heading(s) (${tags}). Add descriptive text to improve accessibility and SEO.`,
    });
    score -= emptyHeadings.length * 5;
  }

  let prevLevel = 0;
  for (const h of headings) {
    const level = HEADING_LEVELS[h.tag as keyof typeof HEADING_LEVELS] ?? 0;
    if (prevLevel > 0 && level > prevLevel + 1) {
      issues.push({
        severity: "warning",
        message: `Heading level skip: ${h.tag} found after h${prevLevel}. Don't skip heading levels (e.g., H2 to H4).`,
      });
      score -= 8;
    }
    prevLevel = level;
  }

  const sortedLevels = headings
    .map((h) => HEADING_LEVELS[h.tag as keyof typeof HEADING_LEVELS] ?? 0)
    .filter((l) => l > 0);
  for (let i = 1; i < sortedLevels.length; i++) {
    if (sortedLevels[i] < sortedLevels[i - 1] && sortedLevels[i] < sortedLevels[i - 1] - 1) {
      issues.push({
        severity: "warning",
        message: "Heading levels should not decrease by more than one level (e.g., H3 → H5).",
      });
      score -= 5;
      break;
    }
  }

  if (issues.every((i) => i.severity === "success")) {
    issues.push({
      severity: "success",
      message: "Heading structure follows SEO best practices.",
    });
  }

  score = Math.max(0, Math.min(100, score));

  return { issues, counts, score };
}

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

export const isKeywordDescriptionOptimal = (
  description: string,
  keyword: string
) => {
  if (!description || !keyword) return false;

  const keywordCount = (
    description.match(new RegExp(`\\b${keyword}\\b`, "gi")) || []
  ).length;

  const { min, max } = Keywords_Limits.description;

  return keywordCount >= min && keywordCount <= max;
};

export const calculateOverallSeoPercentage = (
  title?: string,
  description?: string,
  keyword?: string,
  headingScore?: number
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

  if (headingScore !== undefined) {
    totalScore += headingScore;
    totalMetrics++;
  }

  if (totalMetrics === 0) return 0; // Avoid division by zero

  return Math.round(totalScore / totalMetrics);
};
