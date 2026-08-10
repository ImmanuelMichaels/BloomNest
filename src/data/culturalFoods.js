// src/data/culturalFoods.js
//
// NOTE ON THIS EXPANSION (Asian regions, earlier pass):
// - All pre-existing keys/entries (west_central_african, east_african,
//   south_asian, east_southeast_asian, caribbean, north_american, default)
//   are left completely unchanged for backward compatibility with any
//   code that already reads them.
// - Four region keys were ADDED: east_asian, southeast_asian,
//   central_asian, west_asian. These follow the exact same field shape
//   as the existing entries (breakfast/lunch/dinner/snacks arrays of
//   { name, description, nutrients }, plus pregnancy/menstrual/menopause/
//   conceive objects with recommended/avoid arrays of strings) so no
//   schema migration or getCulturalMeal() change is required.
//
// NOTE ON THIS EXPANSION (Caribbean, this pass):
// - The existing generic "caribbean" entry is left untouched, for the
//   same backward-compatibility reason as above.
// - Five country-level keys were ADDED: jamaican, trinidad_tobagonian,
//   barbadian, grenadian, haitian. "Caribbean" is not one cuisine, and
//   country-specific national dietary guidance (Jamaica MOH, Barbados
//   MOH, Grenada Food and Nutrition Council, etc.) differs meaningfully
//   from island to island, so these are modeled as separate cultures
//   rather than sub-items of one "caribbean" bucket.
// - Two food-safety corrections are reflected in the new entries:
//     * Ackee (Jamaican) — only naturally/fully ripened, naturally
//       opened ackee is described as potentially suitable; unripe or
//       forced-open ackee is flagged as a genuine poisoning risk
//       (hypoglycin), per Jamaica Ministry of Health guidance. This is
//       NOT encoded as a blanket "ackee = unsafe" or "ackee = safe".
//     * Saltfish — framed as a sodium-management issue (desalt before
//       use) rather than as an unhealthy food in itself.
// - As before, no numeric nutrient values are invented — only
//   qualitative nutrient tags — and descriptions are nutrient-based
//   rather than unsupported reproductive-health claims (e.g. "provides
//   folate and iron" rather than "boosts fertility").
// - This remains a data-only change to this one file. Country-level
//   cultural subgroups mentioned in research (e.g. Indo-Caribbean vs.
//   Afro-Caribbean within Trinidad, or further islands such as Saint
//   Lucia, Guyana, Suriname, Dominican Republic, Cuba, Bahamas) are not
//   yet represented — flagged for a follow-up pass rather than rushed
//   in without adequate sourcing per entry.

export const CULTURAL_FOODS = {
  "west_central_african": {
    name: "West & Central African",
    breakfast: [
      { name: "Moi Moi", description: "Steamed bean pudding rich in protein and folate", nutrients: ["Protein", "Folate", "Iron"] },
      { name: "Koko with Koose", description: "Millet porridge with bean cakes", nutrients: ["Fiber", "Iron", "B Vitamins"] },
      { name: "Pap with Groundnuts", description: "Fermented corn porridge with groundnut paste", nutrients: ["Calcium", "Protein"] }
    ],
    lunch: [
      { name: "Jollof Rice with Fish", description: "Tomato-based rice with grilled fish", nutrients: ["Lycopene", "Omega-3", "Iron"] },
      { name: "Egusi Soup with Pounded Yam", description: "Melon seed soup with leafy greens", nutrients: ["Zinc", "Vitamin A", "Protein"] },
      { name: "Okro Soup", description: "Okra and fish soup - good for iron absorption", nutrients: ["Vitamin C", "Folate", "Fiber"] },
      { name: "Jollof Rice with Grilled Chicken and Fried Plantain", description: "Smoky spiced rice with lean protein, sweet plantain, and steamed greens or beans on the side", nutrients: ["Lycopene", "Protein", "Potassium", "Fiber"] }
    ],
    dinner: [
      { name: "Plantain and Fish Stew", description: "Ripe plantain with tomato fish stew", nutrients: ["Potassium", "Vitamin B6", "Omega-3"] },
      { name: "Efo Riro", description: "Spinach and assorted meat stew", nutrients: ["Iron", "Vitamin K", "Protein"] },
      { name: "Fufu and Light Soup", description: "Cassava fufu with tomato and fish soup", nutrients: ["Vitamin C", "Protein", "Iron"] },
      { name: "Fufu with Peanut Soup", description: "Pounded yam or cassava fufu with peanut or vegetable stew, okra and lean protein or beans", nutrients: ["Protein", "Healthy Fats", "Fiber", "Iron"] }
    ],
    snacks: [
      { name: "Roasted Plantain (Boli)", description: "High in potassium and vitamin B6", nutrients: ["Potassium", "Vitamin B6", "Fiber"] },
      { name: "Groundnuts", description: "Rich in healthy fats and protein", nutrients: ["Vitamin E", "Magnesium", "Protein"] },
      { name: "Coconut Candy", description: "Natural energy boost", nutrients: ["Healthy Fats", "Fiber"] }
    ],
    pregnancy: {
      recommended: ["Egusi soup (iron-rich)", "Efo riro (folate)", "Fish stew (omega-3)"],
      avoid: ["Unpasteurized local cheese", "Excess palm oil", "Raw seafood"]
    },
    menstrual: {
      recommended: ["Efo riro or egusi soup (iron to replace losses)", "Okro soup (vitamin C to aid iron absorption)", "Groundnuts (magnesium for cramping)"],
      avoid: ["Excess caffeine and alcohol", "Very high-sodium stews (can worsen bloating)", "Excess added sugar in snacks"]
    },
    menopause: {
      recommended: ["Moi moi and beans (plant protein and calcium)", "Fish stew (omega-3 for mood and heart health)", "Leafy greens like efo riro (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium dishes (bone and blood pressure health)", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Groundnuts (vitamin E and healthy fats support fertility)", "Egusi soup (zinc for reproductive health)", "Fish stew (omega-3 supports egg quality)"],
      avoid: ["Excess alcohol", "Unpasteurized dairy", "Raw or undercooked seafood"]
    }
  },

  "east_african": {
    name: "East African",
    breakfast: [
      { name: "Ugali with Sukuma Wiki", description: "Maize meal with collard greens", nutrients: ["Iron", "Vitamin K", "Fiber"] },
      { name: "Chapati and Tea", description: "Whole wheat flatbread with spiced milk tea", nutrients: ["Calcium", "Iron", "B Vitamins"] },
      { name: "Mandazi", description: "Coconut milk donuts - energy boosting", nutrients: ["Carbohydrates", "Healthy Fats"] }
    ],
    lunch: [
      { name: "Nyama Choma with Kachumbari", description: "Grilled meat with tomato-onion salad", nutrients: ["Protein", "Vitamin C", "Iron"] },
      { name: "Injera with Lentils", description: "Fermented teff flatbread with lentil stew", nutrients: ["Iron", "Protein", "Fiber"] },
      { name: "Mukimo", description: "Mashed potatoes with pumpkin leaves and corn", nutrients: ["Vitamin A", "Potassium", "Fiber"] },
      { name: "Injera with Tibs and Shiro", description: "Fermented teff flatbread shared with spiced meat or vegetables, lentil stew, and shiro (spiced chickpea stew)", nutrients: ["Iron", "Protein", "Fiber", "Probiotics"] }
    ],
    dinner: [
      { name: "Pilau Rice", description: "Spiced rice with meat or vegetables", nutrients: ["B Vitamins", "Iron", "Protein"] },
      { name: "Fish Curry with Coconut", description: "Freshwater fish in coconut sauce", nutrients: ["Omega-3", "Healthy Fats", "Protein"] },
      { name: "Injera Platter with Collard Greens and Ayib", description: "Tear-and-share platter of injera with collard greens or cabbage, lentil stew, and ayib (fresh cheese)", nutrients: ["Calcium", "Iron", "Fiber", "Protein"] }
    ],
    pregnancy: {
      recommended: ["Lentil stew (iron and folate)", "Sukuma wiki (vitamin K and folate)", "Fish curry (omega-3)"],
      avoid: ["Excess raw dairy (ayib should be from pasteurized milk)", "Undercooked meat in tibs"]
    },
    menstrual: {
      recommended: ["Sukuma wiki (iron and folate to replace losses)", "Lentil stew (iron and fiber)", "Kachumbari (vitamin C to aid iron absorption)"],
      avoid: ["Excess coffee (a cultural staple, but caffeine can worsen cramping)", "High-sodium nyama choma marinades", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Ayib and lentils (calcium and plant protein)", "Fish curry with coconut (omega-3)", "Sukuma wiki and collard greens (calcium and vitamin K for bones)"],
      avoid: ["Excess coffee and alcohol (can trigger hot flashes)", "High-sodium dishes (bone and blood pressure health)", "Very spicy tibs if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Lentil stew (folate and iron support fertility)", "Sukuma wiki (folate)", "Fish curry (omega-3 supports egg quality)"],
      avoid: ["Excess alcohol", "Unpasteurized dairy (ayib should be pasteurized)", "Undercooked meat in tibs"]
    }
  },

  "south_asian": {
    name: "South Asian",
    breakfast: [
      { name: "Dal Chilla", description: "Lentil crepe with vegetables", nutrients: ["Protein", "Folate", "Iron"] },
      { name: "Poha", description: "Flattened rice with peanuts and turmeric", nutrients: ["Iron", "B12", "Antioxidants"] }
    ],
    lunch: [
      { name: "Chana Masala with Roti", description: "Chickpea curry with whole wheat bread", nutrients: ["Folate", "Iron", "Fiber"] },
      { name: "Palak Paneer", description: "Spinach and cottage cheese curry", nutrients: ["Iron", "Calcium", "Vitamin K"] }
    ],
    pregnancy: {
      recommended: ["Fenugreek seeds (boost milk supply)", "Ghee (healthy fats)", "Dates (natural energy)"],
      avoid: ["Raw papaya", "Excess sesame seeds", "Unpasteurized paneer"]
    },
    menstrual: {
      recommended: ["Chana masala (iron and folate to replace losses)", "Dal chilla (protein and iron)", "Dates (magnesium for cramping and steady energy)"],
      avoid: ["Excess caffeine (chai in large amounts)", "Very high-sodium curries", "Excess added sugar in sweets"]
    },
    menopause: {
      recommended: ["Palak paneer (calcium and vitamin K for bone health)", "Chana masala (plant protein and fiber)", "Ghee in moderation (fat-soluble vitamins)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium curries (bone and blood pressure health)", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Dal chilla (folate and iron support fertility)", "Chana masala (folate)", "Dates (natural energy and iron)"],
      avoid: ["Excess alcohol", "Raw papaya", "Unpasteurized paneer"]
    }
  },

  "east_southeast_asian": {
    name: "East & Southeast Asian",
    breakfast: [
      { name: "Miso Soup with Steamed Rice and Pickled Vegetables", description: "Fermented soybean soup with rice and fermented veg for gut health", nutrients: ["Probiotics", "Protein", "Fiber"] },
      { name: "Congee with Ginger and Egg", description: "Soft rice porridge with warming ginger and protein", nutrients: ["Protein", "B Vitamins", "Easy to digest"] }
    ],
    lunch: [
      { name: "Bibimbap", description: "Rice bowl with seasoned spinach, carrots, mushrooms, bean sprouts, protein (beef, tofu, or egg) and kimchi", nutrients: ["Fiber", "Probiotics", "Protein", "Vitamin A"] },
      { name: "Thai Green or Red Curry with Jasmine Rice", description: "Coconut-based curry with eggplant, bamboo, bell peppers, fresh herbs, and tofu, chicken, or shrimp", nutrients: ["Healthy Fats", "Vitamin C", "Protein"] },
      { name: "Chinese Vegetable and Lean Protein Stir-fry with Rice or Noodles", description: "Quick-cooked vegetables with ginger, soy, and lean protein over rice or noodles", nutrients: ["Fiber", "Protein", "Vitamin C"] }
    ],
    dinner: [
      { name: "Grilled Fish with Steamed Rice, Miso Soup and Pickled Vegetables", description: "Classic Japanese-style balanced plate with omega-3s and fermented sides", nutrients: ["Omega-3", "Probiotics", "Protein"] },
      { name: "Bibimbap with Gochujang", description: "Colorful rice bowl, customizable for postpartum or pregnancy protein needs", nutrients: ["Protein", "Fiber", "Iron"] }
    ],
    pregnancy: {
      recommended: ["Congee (gentle on nausea)", "Steamed fish (omega-3, ensure fully cooked)", "Miso soup (in moderation for sodium)"],
      avoid: ["Raw fish/sushi", "Unpasteurized fermented products", "High-mercury fish"]
    },
    menstrual: {
      recommended: ["Bibimbap with lean protein (iron to replace losses)", "Ginger congee (warming, easy to digest for cramping)", "Kimchi in moderation (fermented, gut-supportive)"],
      avoid: ["Excess caffeine (matcha, strong tea)", "High-sodium miso or soy-based dishes", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Miso soup and tofu (phytoestrogens and calcium)", "Grilled fish (omega-3 for mood and heart health)", "Steamed greens (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium soy and miso dishes", "Very spicy curries if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Bibimbap with tofu or lean protein (folate and zinc)", "Steamed fish (omega-3 supports egg quality)", "Congee (gentle, nutrient-dense)"],
      avoid: ["Excess alcohol", "Raw fish/sushi", "High-mercury fish"]
    }
  },

  "east_asian": {
    name: "East Asian (China, Japan, Korea, Taiwan)",
    breakfast: [
      { name: "Rice Congee with Egg and Scallion", description: "Soft rice porridge with protein, easy to digest — a Chinese and Taiwanese breakfast staple", nutrients: ["Protein", "B Vitamins", "Easy to digest"] },
      { name: "Japanese Breakfast Set (Rice, Miso Soup, Grilled Fish, Pickles)", description: "Balanced traditional plate pairing grains, fermented soup, protein and fermented vegetables", nutrients: ["Protein", "Omega-3", "Probiotics", "Iodine"] },
      { name: "Korean Rice Porridge (Juk)", description: "Rice porridge, often with vegetables or lean protein, gentle on the stomach", nutrients: ["Carbohydrates", "Fiber", "Easy to digest"] },
      { name: "Soy Milk with Steamed Buns", description: "Plant-based protein drink with a wheat or rice-flour bun", nutrients: ["Plant Protein", "Calcium", "B Vitamins"] }
    ],
    lunch: [
      { name: "Bibimbap with Egg and Vegetables", description: "Rice bowl with seasoned spinach, carrots, mushrooms, bean sprouts and a protein of choice", nutrients: ["Fiber", "Protein", "Vitamin A", "Iron"] },
      { name: "Japanese Teishoku (Grilled Fish Set Meal)", description: "Set meal of grilled fish, rice, miso soup and a small vegetable side", nutrients: ["Omega-3", "Protein", "Iodine"] },
      { name: "Chinese Vegetable and Tofu Stir-fry with Rice", description: "Quick-cooked vegetables with tofu or lean protein, ginger and soy, over rice", nutrients: ["Plant Protein", "Fiber", "Vitamin C"] },
      { name: "Korean Doenjang-jjigae (Soybean Paste Stew) with Rice", description: "Fermented soybean paste stew with tofu, vegetables and rice", nutrients: ["Plant Protein", "Probiotics", "Fiber"] }
    ],
    dinner: [
      { name: "Grilled Mackerel or Salmon with Rice, Miso Soup and Greens", description: "Classic Japanese-style balanced plate providing omega-3 fatty acids and fermented sides", nutrients: ["Omega-3", "Probiotics", "Protein"] },
      { name: "Steamed Fish with Rice and Bok Choy", description: "Cantonese-style steamed whole fish with rice and lightly cooked greens", nutrients: ["Omega-3", "Protein", "Vitamin K"] },
      { name: "Japchae with Vegetables and Lean Protein", description: "Korean glass-noodle stir-fry with a mix of vegetables and a protein source", nutrients: ["Fiber", "Protein", "Vitamin A"] },
      { name: "Tofu and Bok Choy Soup", description: "Light soup pairing plant protein with leafy greens", nutrients: ["Plant Protein", "Calcium", "Vitamin K"] }
    ],
    snacks: [
      { name: "Edamame", description: "Steamed young soybeans", nutrients: ["Plant Protein", "Fiber", "Folate"] },
      { name: "Roasted Seaweed Snacks", description: "Dried seaweed sheets, a source of iodine", nutrients: ["Iodine", "Fiber"] },
      { name: "Natto with Rice", description: "Fermented soybeans, a traditional Japanese breakfast or snack food", nutrients: ["Plant Protein", "Probiotics", "Vitamin K"] }
    ],
    pregnancy: {
      recommended: ["Cooked fish such as salmon or mackerel (omega-3, ensure fully cooked and within local mercury guidance)", "Tofu and soy-based dishes (plant protein and calcium)", "Congee (gentle on nausea)"],
      avoid: ["Raw fish or sushi", "High-mercury fish", "Unpasteurized fermented dairy products", "Excess raw or unpasteurized soy products"]
    },
    menstrual: {
      recommended: ["Bibimbap with lean protein or tofu (iron to help replace losses)", "Warm ginger congee (easy to digest during cramping)", "Kimchi or other fermented vegetables in moderation (gut-supportive)"],
      avoid: ["Excess caffeine (strong tea, matcha)", "High-sodium miso, soy or kimchi-based dishes", "Excess added sugar in snacks"]
    },
    menopause: {
      recommended: ["Tofu, edamame and other soy foods (plant protein and calcium; soy isoflavones are a subject of ongoing research rather than an established treatment)", "Grilled fish (omega-3 relevant to heart and mood)", "Leafy greens and bok choy (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium soy, miso or pickled dishes", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Tofu or lean protein with vegetables (folate and zinc)", "Cooked fish (omega-3, within local mercury guidance)", "Congee or rice-based meals (gentle, nutrient-dense)"],
      avoid: ["Excess alcohol", "Raw fish or sushi", "High-mercury fish"]
    }
  },

  "southeast_asian": {
    name: "Southeast Asian (Philippines, Indonesia, Malaysia, Singapore, Thailand, Vietnam)",
    breakfast: [
      { name: "Lugaw (Filipino Rice Porridge) with Egg", description: "Rice porridge topped with egg, a gentle and warming breakfast", nutrients: ["Protein", "Carbohydrates", "Easy to digest"] },
      { name: "Bubur Ayam (Indonesian Chicken Rice Porridge)", description: "Rice porridge with shredded chicken and vegetables", nutrients: ["Protein", "Fiber", "Easy to digest"] },
      { name: "Roti with Dhal and Vegetables", description: "Flatbread with lentil curry, common across Malaysian and Singaporean Indian communities", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Pho for Breakfast (Vietnamese Noodle Soup)", description: "Rice noodle soup with broth, herbs and lean protein", nutrients: ["Protein", "B Vitamins", "Hydration"] }
    ],
    lunch: [
      { name: "Sinigang with Fish or Shrimp and Vegetables", description: "Filipino sour tamarind soup loaded with vegetables and a protein source", nutrients: ["Vitamin C", "Fiber", "Protein"] },
      { name: "Gado-Gado (Indonesian Vegetable Salad with Peanut Sauce)", description: "Mixed vegetables, tofu and egg with a peanut dressing", nutrients: ["Fiber", "Plant Protein", "Vitamin A"] },
      { name: "Nasi with Grilled Fish and Vegetables", description: "Malaysian or Singaporean-style rice plate with grilled fish and a vegetable side", nutrients: ["Omega-3", "Protein", "Fiber"] },
      { name: "Tom Yum with Protein and Vegetables", description: "Thai hot-and-sour soup with shrimp, chicken or tofu and vegetables", nutrients: ["Protein", "Vitamin C", "Antioxidants"] }
    ],
    dinner: [
      { name: "Tinola (Filipino Chicken and Ginger Soup with Vegetables)", description: "Warming ginger-based chicken soup with green papaya or chayote and leafy greens", nutrients: ["Protein", "Vitamin A", "Iron"] },
      { name: "Tempeh and Vegetables with Rice", description: "Fermented soybean cake with sautéed vegetables over rice", nutrients: ["Plant Protein", "Probiotics", "Fiber"] },
      { name: "Steamed Fish with Rice and Greens (Vietnamese-style)", description: "Steamed whole fish with rice and lightly cooked vegetables", nutrients: ["Omega-3", "Protein", "Vitamin K"] },
      { name: "Vegetable Laksa with Tofu", description: "Coconut-based noodle soup with tofu and vegetables", nutrients: ["Plant Protein", "Fiber", "Healthy Fats"] }
    ],
    snacks: [
      { name: "Fresh Mango or Papaya", description: "Seasonal tropical fruit", nutrients: ["Vitamin C", "Vitamin A", "Fiber"] },
      { name: "Boiled Peanuts", description: "Simple protein and fiber snack common across the region", nutrients: ["Plant Protein", "Fiber", "Healthy Fats"] },
      { name: "Steamed Corn", description: "Whole-grain snack, source of fiber and B vitamins", nutrients: ["Fiber", "B Vitamins"] }
    ],
    pregnancy: {
      recommended: ["Tinola or other vegetable-and-protein soups (iron and vitamin A)", "Well-cooked fish (omega-3, within local mercury guidance)", "Tempeh or tofu-based dishes (plant protein)"],
      avoid: ["Raw or undercooked seafood", "High-mercury fish", "Unpasteurized coconut or dairy products", "Excess raw sprouts"]
    },
    menstrual: {
      recommended: ["Sinigang or other vegetable-forward soups (iron and vitamin C together aid absorption)", "Tempeh or tofu dishes (plant protein and iron)", "Fresh fruit such as mango or papaya (vitamin C)"],
      avoid: ["Excess caffeine", "High-sodium broths and sauces (can worsen bloating)", "Excess added sugar in desserts"]
    },
    menopause: {
      recommended: ["Tempeh, tofu and other soy foods (plant protein and calcium)", "Steamed fish (omega-3 relevant to heart and mood)", "Leafy greens in soups such as tinola (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium sauces and broths", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Tofu or tempeh with vegetables (folate and zinc)", "Well-cooked fish (omega-3, within local mercury guidance)", "Vegetable-forward soups (folate and iron)"],
      avoid: ["Excess alcohol", "Raw or undercooked seafood", "High-mercury fish"]
    }
  },

  "central_asian": {
    name: "Central Asian (Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan)",
    breakfast: [
      { name: "Buckwheat Porridge with Milk", description: "Whole-grain porridge, a filling and fiber-rich start to the day", nutrients: ["Fiber", "B Vitamins", "Calcium"] },
      { name: "Flatbread with Yoghurt and Dried Apricots", description: "Non (flatbread) with plain yoghurt and dried fruit", nutrients: ["Protein", "Calcium", "Potassium"] },
      { name: "Barley Porridge with Pumpkin", description: "Whole-grain porridge with cooked pumpkin", nutrients: ["Fiber", "Vitamin A", "B Vitamins"] }
    ],
    lunch: [
      { name: "Plov (Rice Pilaf with Carrots and Lean Meat)", description: "Rice pilaf cooked with carrots, onions and a lean meat or plant protein", nutrients: ["Protein", "Vitamin A", "Iron"] },
      { name: "Lagman (Noodle Soup with Vegetables and Meat)", description: "Hand-pulled noodle soup with a mix of vegetables and protein", nutrients: ["Protein", "Fiber", "Vitamin C"] },
      { name: "Shorpo (Lamb and Vegetable Soup)", description: "Broth-based soup with lamb or another protein and root vegetables", nutrients: ["Protein", "Iron", "Potassium"] }
    ],
    dinner: [
      { name: "Manti (Steamed Dumplings) with a Side Salad", description: "Steamed dumplings filled with lamb, beef or pumpkin, served with fresh vegetables", nutrients: ["Protein", "Fiber", "Iron"] },
      { name: "Lentil Soup with Flatbread", description: "Lentil-based soup paired with whole-grain flatbread", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Vegetable Stew with Buckwheat", description: "Root vegetables and legumes stewed and served over buckwheat", nutrients: ["Fiber", "Plant Protein", "Potassium"] }
    ],
    snacks: [
      { name: "Dried Apricots and Walnuts", description: "Traditional energy-dense snack combination", nutrients: ["Potassium", "Healthy Fats", "Iron"] },
      { name: "Kefir", description: "Fermented milk drink", nutrients: ["Probiotics", "Calcium", "Protein"] },
      { name: "Fresh Seasonal Fruit", description: "Melon, grapes or other regionally available fruit", nutrients: ["Vitamin C", "Fiber", "Hydration"] }
    ],
    pregnancy: {
      recommended: ["Lentil soup (folate and iron)", "Shorpo or other vegetable-and-protein soups (iron and protein)", "Kefir (calcium; choose pasteurized products)"],
      avoid: ["Unpasteurized dairy or kefir", "Undercooked lamb or beef in manti or shorpo", "Raw or unwashed produce"]
    },
    menstrual: {
      recommended: ["Shorpo or lentil soup (iron to help replace losses)", "Dried apricots (magnesium and iron)", "Buckwheat porridge (fiber and steady energy)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium broths (can worsen bloating)", "Excess added sugar in pastries"]
    },
    menopause: {
      recommended: ["Kefir and yoghurt-based dishes (calcium and probiotics)", "Lentil soup (plant protein and fiber)", "Vegetable stews (fiber and potassium for cardiovascular health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium meat dishes and broths (bone and blood pressure health)", "Very spicy or fatty preparations if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Lentil soup (folate and iron support fertility)", "Shorpo or plov with lean protein (zinc and iron)", "Walnuts and dried apricots (healthy fats and micronutrients)"],
      avoid: ["Excess alcohol", "Unpasteurized dairy", "Undercooked meat"]
    }
  },

  "west_asian": {
    name: "West Asian (Iran, Iraq, Türkiye, Levant, Gulf, Caucasus)",
    breakfast: [
      { name: "Ful Medames with Wholegrain Bread", description: "Stewed fava beans with olive oil, lemon and herbs, served with bread", nutrients: ["Plant Protein", "Fiber", "Folate"] },
      { name: "Labneh with Olive Oil and Vegetables", description: "Strained yoghurt with olive oil, tomatoes and cucumber", nutrients: ["Protein", "Calcium", "Healthy Fats"] },
      { name: "Shakshuka", description: "Eggs poached in a spiced tomato and pepper sauce", nutrients: ["Protein", "Vitamin C", "Iron"] }
    ],
    lunch: [
      { name: "Hummus with Wholegrain Bread and Vegetables", description: "Chickpea and tahini dip served with bread and fresh vegetables", nutrients: ["Plant Protein", "Fiber", "Healthy Fats"] },
      { name: "Mujaddara (Lentils and Rice with Caramelized Onions)", description: "Lentils and rice cooked together, served with a side salad", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Lentil Soup with Bulgur", description: "Red lentil soup paired with a whole-grain side", nutrients: ["Plant Protein", "Folate", "Iron"] }
    ],
    dinner: [
      { name: "Grilled Fish with Bulgur and Vegetables", description: "Grilled fish served with whole-grain bulgur and roasted or fresh vegetables", nutrients: ["Omega-3", "Protein", "Fiber"] },
      { name: "Molokhia with Rice and Chicken", description: "Jute-leaf stew with rice and a lean protein", nutrients: ["Iron", "Vitamin A", "Protein"] },
      { name: "Vegetable and Legume Stew", description: "Mixed vegetables and legumes such as chickpeas or lentils in a tomato-based stew", nutrients: ["Plant Protein", "Fiber", "Vitamin C"] }
    ],
    snacks: [
      { name: "Dates and Nuts", description: "Traditional energy-dense pairing", nutrients: ["Fiber", "Potassium", "Healthy Fats"] },
      { name: "Fresh Pomegranate", description: "Seasonal fruit rich in antioxidants", nutrients: ["Vitamin C", "Fiber", "Antioxidants"] },
      { name: "Tahini with Vegetables", description: "Sesame paste served with fresh vegetable sticks", nutrients: ["Calcium", "Healthy Fats", "Protein"] }
    ],
    pregnancy: {
      recommended: ["Lentil soup or mujaddara (folate and iron)", "Grilled fish (omega-3, within local mercury guidance)", "Labneh made from pasteurized milk (calcium)"],
      avoid: ["Unpasteurized labneh or soft cheeses", "Undercooked eggs in shakshuka", "Raw or undercooked seafood"]
    },
    menstrual: {
      recommended: ["Lentil soup or mujaddara (iron to help replace losses)", "Hummus and vegetables (plant protein and fiber)", "Dates (magnesium for cramping and steady energy)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium stews and pickled vegetables (can worsen bloating)", "Excess added sugar in sweets"]
    },
    menopause: {
      recommended: ["Labneh or yoghurt-based dishes (calcium)", "Grilled fish (omega-3 relevant to heart and mood)", "Molokhia and other leafy dishes (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium stews and pickled dishes", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Lentil soup or mujaddara (folate and iron support fertility)", "Grilled fish (omega-3 supports egg quality, within local mercury guidance)", "Tahini and nuts (healthy fats and zinc)"],
      avoid: ["Excess alcohol", "Unpasteurized dairy", "Raw or undercooked seafood"]
    }
  },

  "caribbean": {
    name: "Caribbean",
    breakfast: [
      { name: "Callaloo with Dumplings", description: "Amaranth greens with fried dough", nutrients: ["Iron", "Vitamin A", "Fiber"] },
      { name: "Green Banana Porridge", description: "Creamy plantain breakfast with spices", nutrients: ["Potassium", "Resistant Starch"] }
    ],
    lunch: [
      { name: "Rice and Peas with Stew Chicken", description: "Kidney bean rice with chicken", nutrients: ["Protein", "Iron", "Fiber"] },
      { name: "Ackee and Saltfish", description: "Jamaica's national dish with nutrients", nutrients: ["Protein", "Healthy Fats"] },
      { name: "Ackee and Saltfish with Fried Plantain and Callaloo", description: "National dish with healthy fats from ackee, potassium-rich plantain, and nutrient-dense greens", nutrients: ["Healthy Fats", "Potassium", "Iron", "Fiber"] }
    ],
    dinner: [
      { name: "Jerk Chicken with Coconut Rice and Peas", description: "Smoky spiced protein with creamy coconut rice and beans, plus a roasted yam or fresh salad side", nutrients: ["Protein", "Fiber", "Healthy Fats"] },
      { name: "Curry Goat or Shrimp with Roti and Steamed Cabbage", description: "Warming spiced comfort food with fiber-rich sides", nutrients: ["Protein", "Iron", "Fiber"] }
    ],
    pregnancy: {
      recommended: ["Callaloo (iron and vitamin A)", "Rice and peas (fiber and folate)", "Steamed cabbage or okra"],
      avoid: ["Excess sodium in stews", "Undercooked goat meat", "Raw or lightly salted fish"]
    },
    menstrual: {
      recommended: ["Callaloo (iron to replace losses)", "Rice and peas (fiber and magnesium for cramping)", "Fresh pineapple or citrus (vitamin C to aid iron absorption)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium stewed dishes (can worsen bloating)", "Excess added sugar in sweets"]
    },
    menopause: {
      recommended: ["Callaloo and okra (calcium and vitamin K for bone health)", "Steamed or grilled fish (omega-3 for mood and heart health)", "Beans and peas (plant protein and fiber)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium jerk marinades and stews", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Callaloo (folate and iron support fertility)", "Rice and peas (folate)", "Steamed fish (omega-3 supports egg quality)"],
      avoid: ["Excess alcohol", "Undercooked goat meat", "Raw or lightly salted fish"]
    }
  },

  "jamaican": {
    name: "Jamaican",
    breakfast: [
      { name: "Ackee and Saltfish with Boiled Green Banana", description: "Naturally ripened, naturally opened ackee with thoroughly desalted saltfish and green banana", nutrients: ["Protein", "Healthy Fats", "Potassium"] },
      { name: "Cornmeal Porridge with Fruit", description: "Warm cornmeal porridge topped with seasonal fruit", nutrients: ["Carbohydrates", "Calcium", "Fiber"] },
      { name: "Callaloo with Boiled Green Banana", description: "Steamed callaloo (amaranth greens) with green banana", nutrients: ["Iron", "Vitamin A", "Potassium"] }
    ],
    lunch: [
      { name: "Rice and Peas with Steamed Fish and Vegetables", description: "Kidney bean rice with steamed fish and a vegetable side", nutrients: ["Protein", "Fiber", "Omega-3"] },
      { name: "Red Pea Soup", description: "Kidney bean soup with provisions and vegetables", nutrients: ["Plant Protein", "Iron", "Fiber"] },
      { name: "Brown Stew Chicken with Rice and Vegetables", description: "Stewed chicken with rice and a vegetable side", nutrients: ["Protein", "Iron", "B Vitamins"] }
    ],
    dinner: [
      { name: "Steamed Fish with Ground Provisions and Vegetables", description: "Steamed fish with yam, dasheen or green banana and vegetables", nutrients: ["Omega-3", "Protein", "Potassium"] },
      { name: "Pumpkin Soup", description: "Pumpkin-based soup with provisions", nutrients: ["Vitamin A", "Fiber", "Potassium"] },
      { name: "Callaloo with Rice and Peas", description: "Leafy greens served alongside rice and peas", nutrients: ["Iron", "Fiber", "Plant Protein"] }
    ],
    snacks: [
      { name: "Fresh Mango or Guava", description: "Seasonal fruit", nutrients: ["Vitamin C", "Fiber"] },
      { name: "Roasted Peanuts", description: "Simple protein and healthy fat snack", nutrients: ["Plant Protein", "Healthy Fats"] }
    ],
    pregnancy: {
      recommended: ["Properly prepared ackee and saltfish — only naturally opened, fully ripened ackee, with saltfish thoroughly desalted before cooking (protein and healthy fats, with sodium managed)", "Red pea or pumpkin soup (iron and fiber)", "Steamed fish (protein and omega-3; check species against local mercury guidance)"],
      avoid: ["Unripe or forced-open ackee — contains hypoglycin and can cause serious poisoning; use only naturally opened, fully ripe ackee prepared per Jamaica Ministry of Health guidance", "Saltfish that has not been properly desalted (excess sodium)", "High-mercury fish species", "Raw or undercooked seafood"]
    },
    menstrual: {
      recommended: ["Red pea soup or callaloo (iron to help replace losses)", "Fresh fruit such as guava or citrus (vitamin C to aid iron absorption)", "Pumpkin soup (fiber and steady energy)"],
      avoid: ["Excess caffeine and alcohol", "Saltfish dishes that haven't been properly desalted (can worsen bloating)", "Excess added sugar in baked goods"]
    },
    menopause: {
      recommended: ["Steamed or grilled fish (omega-3 relevant to heart and mood)", "Beans and peas such as in red pea soup (plant protein and fiber)", "Callaloo (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium saltfish or stewed dishes", "Very spicy jerk-style dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Red pea soup (folate and iron)", "Steamed fish (omega-3, within local mercury guidance)", "Beans and peas (zinc-relevant plant protein)"],
      avoid: ["Excess alcohol", "Unripe or forced-open ackee", "Raw or undercooked seafood"]
    }
  },

  "trinidad_tobagonian": {
    name: "Trinidadian & Tobagonian",
    breakfast: [
      { name: "Sada Roti with Vegetables", description: "Soft flatbread served with a vegetable side such as bhaji or aloo", nutrients: ["Carbohydrates", "Fiber", "Vitamin A"] },
      { name: "Dhal and Rice", description: "Split-pea or lentil dhal served with rice", nutrients: ["Plant Protein", "Folate", "Iron"] },
      { name: "Provision Soup", description: "Root-vegetable soup made with local provisions", nutrients: ["Fiber", "Potassium", "Vitamin A"] }
    ],
    lunch: [
      { name: "Pelau with Chicken and Pigeon Peas", description: "One-pot rice dish with chicken, pigeon peas and vegetables", nutrients: ["Protein", "Fiber", "Iron"] },
      { name: "Callaloo with Rice", description: "Dasheen-leaf-based stew served with rice", nutrients: ["Iron", "Vitamin A", "Fiber"] },
      { name: "Curry Chicken with Roti and Vegetables", description: "Curried chicken served with roti and a vegetable side", nutrients: ["Protein", "Iron", "B Vitamins"] }
    ],
    dinner: [
      { name: "Fish Curry with Rice", description: "Curried fish served with rice", nutrients: ["Omega-3", "Protein", "Iron"] },
      { name: "Stewed Lentils with Provisions", description: "Lentils stewed with root vegetables", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Corn Soup", description: "Corn-based soup with vegetables and dumplings", nutrients: ["Fiber", "B Vitamins", "Potassium"] }
    ],
    snacks: [
      { name: "Channa (Spiced Chickpeas)", description: "Roasted or boiled chickpeas with spices", nutrients: ["Plant Protein", "Fiber", "Folate"] },
      { name: "Doubles in Moderation", description: "Fried flatbread with curried chickpeas — the chickpea filling provides plant protein and fiber, while the fried bread contributes refined carbohydrate and fat, so portion and frequency matter", nutrients: ["Plant Protein", "Fiber"] },
      { name: "Fresh Fruit", description: "Seasonal local fruit", nutrients: ["Vitamin C", "Fiber"] }
    ],
    pregnancy: {
      recommended: ["Dhal or lentil-based dishes (folate and iron)", "Fish curry (omega-3 and protein, within local mercury guidance)", "Callaloo (iron and vitamin A)"],
      avoid: ["Raw or undercooked seafood", "High-mercury fish species", "Unpasteurized dairy", "Frequent fried starchy snacks in place of balanced meals"]
    },
    menstrual: {
      recommended: ["Dhal and rice (iron to help replace losses)", "Pigeon peas in pelau (magnesium)", "Fresh fruit (vitamin C to aid iron absorption)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium curries (can worsen bloating)", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Dhal and lentil dishes (plant protein and fiber)", "Fish curry (omega-3 relevant to heart and mood)", "Callaloo (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium curried dishes", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Dhal or lentils (folate and iron support fertility)", "Fish curry (omega-3, within local mercury guidance)", "Pigeon peas (zinc-relevant plant protein)"],
      avoid: ["Excess alcohol", "Raw or undercooked seafood", "High-mercury fish"]
    }
  },

  "barbadian": {
    name: "Barbadian",
    breakfast: [
      { name: "Cornmeal Porridge", description: "Warm cornmeal porridge, often with spices", nutrients: ["Carbohydrates", "Calcium", "Fiber"] },
      { name: "Fish Cakes with Fruit", description: "Saltfish fritters paired with fresh fruit", nutrients: ["Protein", "Vitamin C"] },
      { name: "Sweet Potato with Vegetables", description: "Boiled or roasted sweet potato with a vegetable side", nutrients: ["Vitamin A", "Fiber", "Potassium"] }
    ],
    lunch: [
      { name: "Cou-Cou with Flying Fish and Vegetables", description: "Cornmeal and okra dish served with flying fish and vegetables", nutrients: ["Fiber", "Protein", "Omega-3"] },
      { name: "Rice and Peas with Chicken", description: "Rice and beans with a chicken side", nutrients: ["Protein", "Fiber", "Iron"] },
      { name: "Pepperpot Stew with Provisions", description: "Slow-cooked stew with meat and root vegetables", nutrients: ["Protein", "Iron", "Potassium"] }
    ],
    dinner: [
      { name: "Fish Stew with Ground Provisions", description: "Fish stewed with yam, sweet potato or other provisions", nutrients: ["Omega-3", "Protein", "Fiber"] },
      { name: "Jug-Jug (Split Peas and Guinea Corn) with Vegetables", description: "Traditional split-pea and grain dish with a vegetable side", nutrients: ["Plant Protein", "Fiber", "Iron"] },
      { name: "Okra and Pumpkin Stew", description: "Vegetable stew combining okra and pumpkin", nutrients: ["Fiber", "Vitamin A", "Potassium"] }
    ],
    snacks: [
      { name: "Breadfruit", description: "Roasted or boiled breadfruit", nutrients: ["Fiber", "Potassium", "Carbohydrates"] },
      { name: "Fresh Fruit", description: "Seasonal local fruit", nutrients: ["Vitamin C", "Fiber"] },
      { name: "Roasted Peanuts", description: "Simple protein and healthy fat snack", nutrients: ["Plant Protein", "Healthy Fats"] }
    ],
    pregnancy: {
      recommended: ["Cou-cou with flying fish and vegetables (protein and fiber)", "Pepperpot stew with vegetables (iron)", "Rice and peas (fiber and folate)"],
      avoid: ["High-mercury fish species", "Raw or undercooked seafood", "Unpasteurized dairy"]
    },
    menstrual: {
      recommended: ["Pepperpot stew or rice and peas (iron to help replace losses)", "Fresh fruit (vitamin C)", "Breadfruit (fiber and potassium)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium stews (can worsen bloating)", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Fish stew (omega-3 relevant to heart and mood)", "Rice and peas or other legumes (plant protein and fiber)", "Okra and pumpkin stew (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium dishes", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Rice and peas or other legumes (folate)", "Fish stew (omega-3, within local mercury guidance)", "Pumpkin dishes (vitamin A)"],
      avoid: ["Excess alcohol", "Raw or undercooked seafood", "High-mercury fish"]
    }
  },

  "grenadian": {
    name: "Grenadian",
    breakfast: [
      { name: "Breadfruit with Desalted Saltfish and Vegetables", description: "Roasted breadfruit with thoroughly desalted saltfish and a vegetable side", nutrients: ["Fiber", "Protein", "Potassium"] },
      { name: "Cornmeal Porridge", description: "Warm cornmeal porridge", nutrients: ["Carbohydrates", "Calcium"] },
      { name: "Callaloo Soup", description: "Leafy green soup, often with provisions", nutrients: ["Iron", "Vitamin A", "Fiber"] }
    ],
    lunch: [
      { name: "Oil Down with Vegetables", description: "Breadfruit and provisions cooked in coconut milk with a protein and vegetables", nutrients: ["Fiber", "Protein", "Healthy Fats"] },
      { name: "Pumpkin Soup", description: "Pumpkin-based soup with provisions", nutrients: ["Vitamin A", "Fiber", "Potassium"] },
      { name: "Pigeon Peas with Rice", description: "Pigeon peas cooked with rice", nutrients: ["Plant Protein", "Fiber", "Folate"] }
    ],
    dinner: [
      { name: "Fish Broth with Provisions", description: "Light fish broth with root vegetables", nutrients: ["Omega-3", "Protein", "Potassium"] },
      { name: "Lentil Stew with Provisions", description: "Lentils stewed with root vegetables", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Callaloo with Rice and Peas", description: "Leafy greens served with rice and peas", nutrients: ["Iron", "Fiber", "Plant Protein"] }
    ],
    snacks: [
      { name: "Fresh Mango", description: "Seasonal fruit", nutrients: ["Vitamin C", "Fiber"] },
      { name: "Fresh Guava", description: "Seasonal fruit", nutrients: ["Vitamin C", "Fiber"] }
    ],
    pregnancy: {
      recommended: ["Oil down with well-cooked protein and vegetables (fiber and protein)", "Pumpkin or callaloo soup (vitamin A and iron)", "Pigeon peas (folate and fiber)"],
      avoid: ["Raw or undercooked seafood", "High-mercury fish species", "Unpasteurized dairy", "Very frequent, large portions of coconut-milk-based dishes if aiming to limit saturated fat"]
    },
    menstrual: {
      recommended: ["Callaloo or pumpkin soup (iron to help replace losses)", "Pigeon peas (magnesium)", "Fresh fruit (vitamin C)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium broths (can worsen bloating)", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Fish broth (omega-3 relevant to heart and mood)", "Pigeon peas or lentils (plant protein and fiber)", "Callaloo (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium dishes", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Pigeon peas or lentils (folate and iron)", "Fish broth (omega-3, within local mercury guidance)", "Pumpkin dishes (vitamin A)"],
      avoid: ["Excess alcohol", "Raw or undercooked seafood", "High-mercury fish"]
    }
  },

  "haitian": {
    name: "Haitian",
    breakfast: [
      { name: "Mayi Moulen (Cornmeal Porridge) with Fruit", description: "Cornmeal porridge topped with fresh fruit", nutrients: ["Carbohydrates", "Fiber", "Vitamin C"] },
      { name: "Bannann Peze with Eggs", description: "Fried plantain served with eggs", nutrients: ["Potassium", "Protein", "Choline"] },
      { name: "Diri Djon Djon (Black Mushroom Rice)", description: "Rice cooked with black mushrooms, served in a modest portion alongside vegetables or protein", nutrients: ["Carbohydrates", "Fiber"] }
    ],
    lunch: [
      { name: "Diri ak Pwa (Rice and Beans) with Vegetables", description: "Rice and beans served with a vegetable side", nutrients: ["Plant Protein", "Folate", "Fiber"] },
      { name: "Legim (Vegetable Stew) with Rice", description: "Mixed vegetable stew, often with a protein, served with rice", nutrients: ["Fiber", "Vitamin A", "Protein"] },
      { name: "Soup Joumou (Pumpkin Soup) with Provisions", description: "Pumpkin soup with root vegetables and a protein", nutrients: ["Vitamin A", "Fiber", "Protein"] }
    ],
    dinner: [
      { name: "Griot with Bannann Peze and Vegetables", description: "Braised and fried pork served with fried plantain and a vegetable side — preparation and portion affect fat and sodium content", nutrients: ["Protein", "Potassium"] },
      { name: "Poisson (Fish) with Rice and Vegetables", description: "Fish served with rice and a vegetable side", nutrients: ["Omega-3", "Protein", "Fiber"] },
      { name: "Lalo (Jute Leaf Stew) with Rice", description: "Leafy jute-based stew served with rice", nutrients: ["Iron", "Vitamin K", "Fiber"] }
    ],
    snacks: [
      { name: "Fresh Mango", description: "Seasonal fruit", nutrients: ["Vitamin C", "Fiber"] },
      { name: "Fresh Papaya", description: "Seasonal fruit", nutrients: ["Vitamin C", "Fiber"] },
      { name: "Avocado", description: "Creamy fruit rich in healthy fats", nutrients: ["Healthy Fats", "Fiber", "Potassium"] }
    ],
    pregnancy: {
      recommended: ["Diri ak pwa (folate, iron and fiber)", "Soup joumou (vitamin A and fiber)", "Fish dishes (omega-3 and protein; check species against local mercury guidance)"],
      avoid: ["Raw or undercooked seafood", "High-mercury fish species", "Unpasteurized dairy", "Very frequent fried or fatty preparations of griot in place of balanced meals"]
    },
    menstrual: {
      recommended: ["Diri ak pwa or legim (iron to help replace losses)", "Fresh fruit (vitamin C)", "Avocado (magnesium)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium stews (can worsen bloating)", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Fish dishes (omega-3 relevant to heart and mood)", "Rice and beans (plant protein and fiber)", "Lalo or legim (calcium and vitamin K for bone health)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium dishes", "Very fatty fried preparations if aiming to support cardiovascular health"]
    },
    conceive: {
      recommended: ["Diri ak pwa or legim (folate and iron)", "Fish dishes (omega-3, within local mercury guidance)", "Avocado (healthy fats)"],
      avoid: ["Excess alcohol", "Raw or undercooked seafood", "High-mercury fish"]
    }
  },

  "north_american": {
    name: "North American (Indigenous & Southern/Soul Food)",
    breakfast: [
      { name: "Cornmeal Mush with Berries", description: "Warm cornmeal porridge topped with seasonal berries, rooted in Indigenous corn traditions", nutrients: ["Fiber", "Antioxidants", "Complex Carbs"] }
    ],
    lunch: [
      { name: "Three Sisters Succotash", description: "Corn, beans, and squash cooked together with herbs - a complete plant protein from Indigenous tradition", nutrients: ["Plant Protein", "Fiber", "Vitamin A", "Iron"] },
      { name: "Stuffed Roasted Squash with Beans and Corn", description: "Seasonal squash filled with a beans-and-corn mixture and herbs", nutrients: ["Fiber", "Plant Protein", "Vitamin A"] }
    ],
    dinner: [
      { name: "Collard Greens with Black-Eyed Peas and Cornbread", description: "Slow-cooked collards with onions and garlic, black-eyed peas, and cornbread, plus a protein side", nutrients: ["Iron", "Fiber", "Folate", "Protein"] },
      { name: "Baked Chicken or Fish with Sweet Potato and Greens", description: "A lighter take on Southern/soul food staples, reducing added fats while keeping the flavor", nutrients: ["Protein", "Vitamin A", "Potassium", "Fiber"] }
    ],
    pregnancy: {
      recommended: ["Collard greens (folate and iron)", "Black-eyed peas (fiber and protein)", "Sweet potato (vitamin A)"],
      avoid: ["Excess added salt/fat in traditional preparations", "Undercooked fish or poultry"]
    },
    menstrual: {
      recommended: ["Collard greens (iron to replace losses)", "Black-eyed peas (fiber and magnesium for cramping)", "Sweet potato (complex carbs for steady energy)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium seasoning blends (can worsen bloating)", "Excess added sugar in cornbread or desserts"]
    },
    menopause: {
      recommended: ["Collard greens (calcium and vitamin K for bone health)", "Baked fish (omega-3 for mood and heart health)", "Beans and squash (plant protein and fiber)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium seasoning and fried preparations", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Collard greens (folate and iron support fertility)", "Three Sisters succotash (folate and zinc)", "Baked fish (omega-3 supports egg quality)"],
      avoid: ["Excess alcohol", "Excess added salt/fat in traditional preparations", "Undercooked fish or poultry"]
    }
  },

  "default": {
    name: "General (NHS Eatwell Guide)",
    breakfast: [
      { name: "Porridge with Berries", description: "Oats with antioxidant-rich berries", nutrients: ["Fiber", "Vitamin C", "Iron"] },
      { name: "Greek Yogurt with Honey", description: "Probiotic-rich with natural sweetness", nutrients: ["Calcium", "Protein", "Probiotics"] }
    ],
    lunch: [
      { name: "Grilled Chicken Salad", description: "Lean protein with mixed greens", nutrients: ["Protein", "Vitamins", "Healthy Fats"] },
      { name: "Lentil Soup with Whole Grain Bread", description: "Fiber-rich and filling", nutrients: ["Folate", "Iron", "Fiber"] }
    ],
    dinner: [
      { name: "Salmon with Quinoa and Roasted Veg", description: "Omega-3 rich meal", nutrients: ["Omega-3", "Protein", "Fiber"] },
      { name: "Bean and Vegetable Chilli", description: "Plant-based protein powerhouse", nutrients: ["Fiber", "Iron", "Protein"] }
    ],
    pregnancy: {
      recommended: ["Salmon (omega-3, within NHS-recommended weekly oily fish limit)", "Lentil soup (folate and iron)", "Greek yogurt (calcium)"],
      avoid: ["Unpasteurized dairy and soft cheeses", "Raw or undercooked eggs", "High-mercury fish (shark, swordfish, marlin)"]
    },
    menstrual: {
      recommended: ["Lentil soup (iron to replace losses)", "Grilled chicken salad (protein and B vitamins)", "Porridge with berries (fiber and steady energy)"],
      avoid: ["Excess caffeine and alcohol", "High-sodium processed foods (can worsen bloating)", "Excess added sugar"]
    },
    menopause: {
      recommended: ["Salmon and quinoa (omega-3 and calcium)", "Greek yogurt (calcium and probiotics)", "Bean and vegetable chilli (fiber and plant protein)"],
      avoid: ["Excess caffeine and alcohol (can trigger hot flashes)", "High-sodium processed foods (bone and blood pressure health)", "Very spicy dishes if they trigger hot flashes"]
    },
    conceive: {
      recommended: ["Lentil soup (folate and iron support fertility)", "Salmon (omega-3 supports egg quality, within NHS weekly limit)", "Greek yogurt (calcium and protein)"],
      avoid: ["Excess alcohol", "Unpasteurized dairy and soft cheeses", "High-mercury fish (shark, swordfish, marlin)"]
    }
  }
};

export const getCulturalMeal = (culture, mealType, journeyType) => {
  const culturalData = CULTURAL_FOODS[culture] || CULTURAL_FOODS.default;

  if (journeyType && culturalData[journeyType]) {
    return culturalData[journeyType];
  }

  return {
    breakfast: culturalData.breakfast,
    lunch: culturalData.lunch,
    dinner: culturalData.dinner,
    snacks: culturalData.snacks || []
  };
};