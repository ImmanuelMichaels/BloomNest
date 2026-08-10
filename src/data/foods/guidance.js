// src/data/foods/guidance.js
import { SAFETY_STATUSES, RISK_LEVELS, REVIEW_STATUSES } from './types';

export const HEALTH_GUIDANCE = {
  // Jamaican-specific guidance
  'ackee-pregnancy': {
    id: 'ackee-pregnancy',
    foodId: 'ackee-saltfish',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.CONDITIONAL,
    riskLevel: RISK_LEVELS.HIGH,
    guidance: 'Only naturally ripened and naturally opened ackee should be consumed. Unripe or forced-open ackee can contain hypoglycin and may cause serious poisoning. Saltfish should be thoroughly desalted before cooking to manage sodium intake.',
    recommendations: [
      'Ensure ackee is naturally opened (the pods should have split on their own)',
      'Remove the seeds and pink membrane from naturally ripe ackee',
      'Boil ackee for 20-30 minutes before cooking',
      'Desalt saltfish by boiling and changing water 2-3 times before use'
    ],
    sourceIds: ['jmoh-ackee', 'caribbean-pregnancy-guidance'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'callaloo-pregnancy': {
    id: 'callaloo-pregnancy',
    foodId: 'callaloo',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Excellent source of iron and folate for pregnancy. Should be thoroughly washed before cooking. Can be eaten regularly as part of a balanced diet.',
    recommendations: [
      'Wash thoroughly in clean water',
      'Cook completely to reduce oxalates',
      'Pair with vitamin C sources to enhance iron absorption'
    ],
    sourceIds: ['jamaica-nutrition-guide', 'caribbean-pregnancy-guidance'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 2
    }
  },

  'callaloo-menstrual': {
    id: 'callaloo-menstrual',
    foodId: 'callaloo',
    journey: 'menstrual',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Iron-rich food that can help replenish iron lost during menstruation. Contains magnesium which may help with cramping.',
    recommendations: [
      'Include in meals during and after menstruation',
      'Pair with vitamin C-rich foods for better iron absorption'
    ],
    sourceIds: ['jamaica-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'callaloo-menopause': {
    id: 'callaloo-menopause',
    foodId: 'callaloo',
    journey: 'menopause',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Contains calcium and vitamin K which support bone health during menopause. Rich in fiber for digestive health.',
    recommendations: [
      'Include in meals 2-3 times per week',
      'Variety in leafy green intake supports overall nutrition'
    ],
    sourceIds: ['jamaica-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'rice-peas-pregnancy': {
    id: 'rice-peas-pregnancy',
    foodId: 'rice-and-peas',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Good source of iron, folate, and protein for pregnancy. Coconut milk provides healthy fats but should be consumed in moderation.',
    recommendations: [
      'Use low-sodium broth or water to reduce salt content',
      'Can be part of a balanced pregnancy diet',
      'Be mindful of portion sizes with high-calorie coconut milk'
    ],
    sourceIds: ['caribbean-pregnancy-guidance'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'rice-peas-conceive': {
    id: 'rice-peas-conceive',
    foodId: 'rice-and-peas',
    journey: 'conceive',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Rich in folate which is essential for early pregnancy. Contains zinc which supports reproductive health.',
    recommendations: [
      'Include in fertility diet',
      'Ensure folic acid supplementation alongside'
    ],
    sourceIds: ['caribbean-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'fish-stew-pregnancy': {
    id: 'fish-stew-pregnancy',
    foodId: 'fish-stew',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.CONDITIONAL,
    riskLevel: RISK_LEVELS.LOW,
    guidance: 'Good source of omega-3 fatty acids for fetal development. Choose low-mercury fish varieties such as tilapia, snapper, or flying fish. Ensure fish is thoroughly cooked.',
    recommendations: [
      'Limit to 2 portions of oily fish per week (NHS guidelines)',
      'Choose fresh fish from reputable sources',
      'Avoid high-mercury fish (shark, swordfish, marlin)',
      'Ensure fish is cooked through'
    ],
    sourceIds: ['caribbean-pregnancy-guidance', 'nhs-fish-guidance'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 2
    }
  },

  'congee-pregnancy': {
    id: 'congee-pregnancy',
    foodId: 'congee',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Gentle on the stomach and good for morning sickness. Easy to digest and can be enriched with additional nutrients.',
    recommendations: [
      'Add protein (egg, chicken, fish) for nutritional balance',
      'Include ginger for nausea relief',
      'Can be eaten frequently during first trimester'
    ],
    sourceIds: ['east-asian-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'tofu-menopause': {
    id: 'tofu-menopause',
    foodId: 'tofu',
    journey: 'menopause',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Good source of calcium for bone health. Contains phytoestrogens which may help with some menopause symptoms. Choose calcium-set tofu for maximum calcium content.',
    recommendations: [
      'Include 1-2 servings daily for calcium needs',
      'Varied soy products can be part of a balanced diet',
      'Consult healthcare provider about soy intake if on thyroid medication'
    ],
    sourceIds: ['east-asian-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'efo-riro-pregnancy': {
    id: 'efo-riro-pregnancy',
    foodId: 'efo-riro',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Exceptionally high in iron and folate - essential for pregnancy. Three times more iron than regular spinach. Should be thoroughly washed and cooked.',
    recommendations: [
      'Eat 2-3 times per week during pregnancy',
      'Pair with vitamin C source (tomatoes, peppers) for enhanced absorption',
      'Avoid if you have specific dietary restrictions related to oxalates'
    ],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'egusi-pregnancy': {
    id: 'egusi-pregnancy',
    foodId: 'egusi-soup',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Rich in zinc for fetal development and healthy fats for maternal health. Good source of protein.',
    recommendations: [
      'Include as part of balanced pregnancy diet',
      'Be mindful of portion sizes as it is calorie-dense',
      'Ensure leafy greens included for iron'
    ],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'fufu-pregnancy': {
    id: 'fufu-pregnancy',
    foodId: 'fufu',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Provides energy from carbohydrates. Should be eaten with protein and iron-rich soups for balanced nutrition.',
    recommendations: [
      'Pair with vegetable and protein-rich soups',
      'Limit portions if managing weight gain',
      'Choose combinations with soups containing leafy greens'
    ],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'tiger-nuts-pregnancy': {
    id: 'tiger-nuts-pregnancy',
    foodId: 'tiger-nuts',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Excellent source of calcium and iron for pregnancy. Supports bone health and helps prevent anaemia.',
    recommendations: [
      'Enjoy as a snack or make into milk',
      'Good addition to breakfast oatmeal',
      'Can help meet calcium requirements'
    ],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.PENDING_REVIEW,
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'okro-pregnancy': {
    id: 'okro-pregnancy',
    foodId: 'okro-soup',
    journey: 'pregnancy',
    status: SAFETY_STATUSES.SAFE,
    riskLevel: RISK_LEVELS.NONE,
    guidance: 'Good source of folate, vitamin C, and fiber. Vitamin C enhances iron absorption from other foods.',
    recommendations: [
      'Pair with iron-rich foods to improve absorption',
      'Include in pregnancy diet for folate',
      'Good for digestion and preventing constipation'
    ],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: REVIEW_STATUSES.APPROVED,
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  }
};