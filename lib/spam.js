const SPAM_PATTERNS = {
  // URLs and self-promotional content
  URLS: {
    pattern:
      /(?:https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9-]+\.(?:com|net|org|biz|info|xyz|online|site|click|scam)(?:\/[^\s]*)?\b/gi,
    weight: 0.7,
  },

  EMAIL: {
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    weight: 0.6,
  },

  PHONE: {
    pattern: /(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}/g,
    weight: 0.6,
  },

  // Text patterns
  REPEATED_CHARS: {
    pattern: /(.)\1{4,}/g,
    weight: 0.1,
  },

  REPEATED_WORDS: {
    pattern: /\b(\w+)\s+\1\b/gi,
    weight: 0.2,
  },

  ALL_CAPS: {
    pattern: /^[A-Z\s!@#$%^&*()]+$/,
    weight: 0.2,
  },

  PARTIAL_CAPS: {
    pattern: /\b[A-Z]{2,}\b/g,
    weight: 0.1,
  },

  EXCESSIVE_PUNCTUATION: {
    pattern: /([!?.]){2,}/g,
    weight: 0.1,
  },

  // Common spam phrases
  GET_RICH_PHRASES: {
    pattern:
      /\b(?:make money|earn money|get rich|work from home|from.*(?:home|couch)|income|passive income|quick money|fast cash|big money)\b/gi,
    weight: 0.8,
  },

  MARKETING_PHRASES: {
    pattern:
      /\b(?:limited time|act now|click|click here|click this|opportunity|don't wait|best deal|guarantee|proven|results|testimonials)\b/gi,
    weight: 0.6,
  },

  OTHER_SPAM_PHRASES: {
    pattern:
      /(buy now|click here|earn money|make money|winner|won|lottery|discount|free|sale|limited time|act now|best price|cheap|guarantee|order now|special offer)/gi,
    weight: 0.6,
  },

  // Unicode spam (common in bot spam)
  INVISIBLE_CHARS: {
    pattern: /[\u200B-\u200D\uFEFF]/g,
    weight: 0.9,
  },

  UNUSUAL_UNICODE: {
    pattern: /[^\x00-\x7F]+/g,
    weight: 0.2,
  },

  // HTML/Markdown injection attempts
  HTML_TAGS: {
    pattern: /<[^>]*>/g,
    weight: 0.8,
  },

  MARKDOWN_LINKS: {
    pattern: /\[.*?\]\(.*?\)/g,
    weight: 0.3,
  },
};

export const isSpam = (text) => {
  let spamScore = 0;
  const indicators = new Map();
  let totalMatches = 0;

  // Check each pattern and accumulate score
  for (const [name, config] of Object.entries(SPAM_PATTERNS)) {
    const matches = (text.match(config.pattern) || []).length;
    if (matches > 0) {
      const score = Math.min(matches * config.weight, 1);
      spamScore += score;
      totalMatches += matches;
      indicators.set(name, matches);
    }
  }

  // Check for mixed case ratio
  const upperCount = (text.match(/[A-Z]/g) || []).length;
  const totalChars = text.length;
  const upperRatio = upperCount / totalChars;
  if (upperRatio > 0.5) {
    // If more than 30% uppercase
    spamScore += 0.2;
    indicators.set("HIGH_CAPS_RATIO", upperRatio);
  }

  // Calculate character diversity ratio
  const uniqueChars = new Set(text).size;
  const charDiversityRatio = uniqueChars / text.length;
  if (charDiversityRatio < 0.15) {
    spamScore += 0.2;
    indicators.set("LOW_CHAR_DIVERSITY", charDiversityRatio);
  }

  // Check for word/character ratio
  const words = text.split(/\s+/).length;
  const avgWordLength = text.length / words;
  if (avgWordLength > 20) {
    spamScore += 0.2;
    indicators.set("LONG_WORDS", avgWordLength);
  }

  // Density of spam indicators
  const spamDensity = totalMatches / words;
  if (spamDensity > 0.4) {
    // If more than 30% of words match spam patterns
    spamScore += spamDensity * 0.5;
    indicators.set("SPAM_DENSITY", spamDensity);
  }

  // Normalize final score to 0-1 range
  const normalizedScore = Math.min(spamScore / 4, 1);

  return {
    isSpam: normalizedScore > 0.7,
    isSupicious: normalizedScore > 0.5,
    score: normalizedScore,
    indicators: Object.fromEntries(indicators),
  };
};
