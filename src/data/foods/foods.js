// src/data/foods/foods.js
import { NUTRIENTS, SAFETY_STATUSES, MEAL_TYPES } from './types';

export const FOODS = {
  // Caribbean Foods
  'ackee-saltfish': {
    id: 'ackee-saltfish',
    name: 'Ackee and Saltfish',
    cultures: ['jamaican', 'caribbean'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.HEALTHY_FATS, NUTRIENTS.POTASSIUM],
    dietaryNotes: [
      'Contains high sodium from saltfish - should be desalted before cooking',
      'Ackee must be naturally ripened and naturally opened'
    ],
    preparationNotes: [
      'Boil saltfish to reduce sodium, then flake',
      'Sauté with onions, tomatoes, and peppers',
      'Serve with boiled green banana, breadfruit, or dumplings'
    ],
    alternatives: ['vegetable-saltfish', 'tofu-scramble'],
    sourceIds: ['jmoh-ackee'],
    review: {
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'rice-and-peas': {
    id: 'rice-and-peas',
    name: 'Rice and Peas (Red Kidney Beans)',
    cultures: ['jamaican', 'caribbean'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.FIBER, NUTRIENTS.IRON, NUTRIENTS.FOLATE],
    dietaryNotes: [
      'A complete protein when combined with rice',
      'High in fiber which supports digestive health'
    ],
    preparationNotes: [
      'Cook red kidney beans with coconut milk, scallion, and thyme',
      'Add rice and simmer until liquid is absorbed',
      'Serve with stewed meat or vegetables'
    ],
    alternatives: ['brown-rice-and-peas', 'quinoa-and-beans'],
    sourceIds: ['caribbean-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 2
    }
  },

  'callaloo': {
    id: 'callaloo',
    name: 'Callaloo (Amaranth Greens)',
    cultures: ['jamaican', 'barbadian', 'grenadian', 'caribbean'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.IRON, NUTRIENTS.VITAMIN_A, NUTRIENTS.FIBER, NUTRIENTS.FOLATE],
    dietaryNotes: [
      'Excellent source of iron - particularly beneficial during pregnancy and menstruation',
      'High in vitamin A for immune function'
    ],
    preparationNotes: [
      'Steam or sauté with onions, garlic, and tomatoes',
      'Can be served as a side dish or as a main with rice',
      'Often cooked with saltfish, crab, or pork'
    ],
    alternatives: ['spinach', 'kale', 'collard-greens'],
    sourceIds: ['jamaica-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'red-pea-soup': {
    id: 'red-pea-soup',
    name: 'Red Pea Soup',
    cultures: ['jamaican', 'caribbean'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.IRON, NUTRIENTS.FIBER, NUTRIENTS.FOLATE],
    dietaryNotes: [
      'High in iron and folate - supports blood health',
      'Good source of plant-based protein'
    ],
    preparationNotes: [
      'Cook red kidney beans with carrots, potatoes, and dumplings',
      'Season with herbs and spices',
      'Can include meat for additional protein'
    ],
    alternatives: ['lentil-soup', 'split-pea-soup'],
    sourceIds: ['jamaica-nutrition-guide'],
    review: {
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'plantain-boiled': {
    id: 'plantain-boiled',
    name: 'Boiled Green Plantain',
    cultures: ['jamaican', 'barbadian', 'grenadian', 'haitian', 'trinidad_tobagonian', 'caribbean'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.POTASSIUM, NUTRIENTS.FIBER],
    dietaryNotes: [
      'Good source of resistant starch for gut health',
      'Provides sustained energy'
    ],
    preparationNotes: [
      'Peel and boil until tender',
      'Serve as a side dish with main meals'
    ],
    alternatives: ['plantain-fried', 'green-banana-boiled'],
    sourceIds: ['caribbean-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'fish-stew': {
    id: 'fish-stew',
    name: 'Fish Stew',
    cultures: ['jamaican', 'barbadian', 'grenadian', 'haitian', 'caribbean'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.OMEGA3, NUTRIENTS.IRON],
    dietaryNotes: [
      'Rich in omega-3 fatty acids for brain and heart health',
      'Choose low-mercury fish varieties'
    ],
    preparationNotes: [
      'Cook fish in tomato-based sauce with vegetables',
      'Season with herbs and spices',
      'Serve with rice or provisions'
    ],
    alternatives: ['vegetable-stew', 'chicken-stew'],
    sourceIds: ['caribbean-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  // East Asian Foods
  'congee': {
    id: 'congee',
    name: 'Rice Congee (Rice Porridge)',
    cultures: ['east_asian', 'southeast_asian'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.B_VITAMINS],
    dietaryNotes: [
      'Gentle on digestion - good for morning sickness',
      'Can be easily supplemented with additional nutrients'
    ],
    preparationNotes: [
      'Cook rice with excess water until it breaks down',
      'Top with meat, fish, or vegetables',
      'Season with ginger and scallions'
    ],
    alternatives: ['oatmeal', 'millet-porridge'],
    sourceIds: ['east-asian-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'bibimbap': {
    id: 'bibimbap',
    name: 'Bibimbap (Mixed Rice Bowl)',
    cultures: ['east_asian'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.FIBER, NUTRIENTS.VITAMIN_A, NUTRIENTS.IRON],
    dietaryNotes: [
      'Customizable - can accommodate various dietary needs',
      'Good source of iron from spinach and protein',
      'Contains probiotics from gochujang when fermented'
    ],
    preparationNotes: [
      'Layer cooked rice with seasoned vegetables',
      'Add protein of choice (beef, tofu, egg)',
      'Top with gochujang and mix before eating'
    ],
    alternatives: ['poke-bowl', 'sushi-bowl'],
    sourceIds: ['korean-nutrition-guide'],
    review: {
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'tofu': {
    id: 'tofu',
    name: 'Tofu (Bean Curd)',
    cultures: ['east_asian', 'southeast_asian', 'south_asian'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER, MEAL_TYPES.SNACKS],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.CALCIUM, NUTRIENTS.IRON],
    dietaryNotes: [
      'Excellent plant-based protein source',
      'Contains calcium for bone health',
      'Phytoestrogens may help with menopause symptoms'
    ],
    preparationNotes: [
      'Can be eaten raw, fried, grilled, or stewed',
      'Absorbs flavors from marinades and sauces'
    ],
    alternatives: ['tempeh', 'seitan', 'beans'],
    sourceIds: ['east-asian-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  // West African Foods
  'efo-riro': {
    id: 'efo-riro',
    name: 'Efo Riro (Spinach Stew)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.IRON, NUTRIENTS.VITAMIN_K, NUTRIENTS.PROTEIN, NUTRIENTS.FOLATE],
    dietaryNotes: [
      'Extremely rich in iron - 3x more than regular spinach',
      'Essential for pregnancy to prevent anaemia',
      'Excellent source of folate'
    ],
    preparationNotes: [
      'Sauté spinach with onions and tomatoes',
      'Add meat or fish for additional protein',
      'Simmer until flavors combine'
    ],
    alternatives: ['ugwu-soup', 'bitterleaf-soup'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'egusi-soup': {
    id: 'egusi-soup',
    name: 'Egusi Soup (Melon Seed Soup)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.ZINC, NUTRIENTS.PROTEIN, NUTRIENTS.HEALTHY_FATS, NUTRIENTS.VITAMIN_A],
    dietaryNotes: [
      'Rich in zinc for immune function and reproductive health',
      'Contains healthy fats for hormone balance'
    ],
    preparationNotes: [
      'Grind melon seeds into paste',
      'Cook with leafy greens and meat or fish',
      'Thicken with additional seeds if needed'
    ],
    alternatives: ['ogbono-soup', 'melon-soup'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'tiger-nuts': {
    id: 'tiger-nuts',
    name: 'Tiger Nuts (Aya)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.SNACKS],
    nutrients: [NUTRIENTS.CALCIUM, NUTRIENTS.IRON, NUTRIENTS.VITAMIN_E, NUTRIENTS.FIBER],
    dietaryNotes: [
      'Nigerian superfood',
      'Contains prebiotics for gut health',
      'Excellent source of calcium for bone health'
    ],
    preparationNotes: [
      'Eat raw as a snack',
      'Can be soaked to make tiger nut milk'
    ],
    alternatives: ['almonds', 'walnuts'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'ugwu': {
    id: 'ugwu',
    name: 'Ugu (Fluted Pumpkin Leaves)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.IRON, NUTRIENTS.VITAMIN_A, NUTRIENTS.FOLATE, NUTRIENTS.CALCIUM],
    dietaryNotes: [
      'Excellent source of iron for pregnancy',
      'High in folate for fetal development',
      'Contains calcium for bone health'
    ],
    preparationNotes: [
      'Add to soups and stews',
      'Can be sautéed as a vegetable side'
    ],
    alternatives: ['spinach', 'kale'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'fufu': {
    id: 'fufu',
    name: 'Fufu (Cassava Dough)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.CARBOHYDRATES, NUTRIENTS.FIBER],
    dietaryNotes: [
      'Good source of complex carbohydrates',
      'Provides energy for pregnancy and breastfeeding',
      'Low protein content - should be eaten with protein-rich soups'
    ],
    preparationNotes: [
      'Cook cassava and pound or process into smooth dough',
      'Serve with vegetable or meat-based soups'
    ],
    alternatives: ['amala', 'pounded-yam', 'eba'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'moringa': {
    id: 'moringa',
    name: 'Moringa (Zogale)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER, MEAL_TYPES.SNACKS],
    nutrients: [NUTRIENTS.IRON, NUTRIENTS.CALCIUM, NUTRIENTS.VITAMIN_A, NUTRIENTS.VITAMIN_C, NUTRIENTS.PROTEIN],
    dietaryNotes: [
      'Exceptionally high nutritional density',
      'Iron content supports anaemia prevention',
      'Supports milk supply during breastfeeding',
      'Contains all essential amino acids'
    ],
    preparationNotes: [
      'Add fresh leaves to soups and stews',
      'Dry leaves can be ground into powder for smoothies'
    ],
    alternatives: ['spinach', 'kale', 'amaranth'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'pending_review',
      reviewedBy: null,
      reviewedAt: null,
      version: 1
    }
  },

  'okro-soup': {
    id: 'okro-soup',
    name: 'Okro Soup (Ila)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.FOLATE, NUTRIENTS.VITAMIN_C, NUTRIENTS.FIBER],
    dietaryNotes: [
      'Rich in folate for pregnancy',
      'Vitamin C enhances iron absorption',
      'High in fiber for digestive health'
    ],
    preparationNotes: [
      'Cook okra with fish, meat, or vegetables',
      'Thickens naturally as it cooks'
    ],
    alternatives: ['egusi-soup', 'ogbono-soup'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  },

  'moi-moi': {
    id: 'moi-moi',
    name: 'Moi Moi (Steamed Bean Pudding)',
    cultures: ['west_central_african'],
    mealTypes: [MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER],
    nutrients: [NUTRIENTS.PROTEIN, NUTRIENTS.FOLATE, NUTRIENTS.IRON, NUTRIENTS.FIBER],
    dietaryNotes: [
      'Excellent source of plant-based protein',
      'Rich in folate - essential for pregnancy',
      'Contains iron for blood health'
    ],
    preparationNotes: [
      'Soak beans overnight, blend, and season',
      'Steam in wraps or containers until firm',
      'Can include fish, eggs, or vegetables for variety'
    ],
    alternatives: ['akara', 'black-bean-cakes'],
    sourceIds: ['west-african-nutrition-guide'],
    review: {
      status: 'approved',
      reviewedBy: 'clinical-advisor-001',
      reviewedAt: '2026-08-15',
      version: 1
    }
  }
};