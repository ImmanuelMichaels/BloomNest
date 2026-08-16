// src/data/foods/culturalMealLibrary.js
//
// Deterministic, rules-based cultural meal library used by the
// "What can I eat?" craving/compatibility feature (see mealMatcher.js and
// compatibilityEngine.js). This is intentionally a SEPARATE data structure
// from FOODS/HEALTH_GUIDANCE in foods.js/guidance.js: those files model a
// meal-plan-by-time-of-day generator and don't carry per-dish
// alias/safe-when/caution-when/avoid-when/evidence fields. Nothing here
// duplicates or removes anything in foods.js/guidance.js/culturalFoods.js —
// it is additive. Every entry was generated from an explicit rule table
// (category -> safety/nutrition template) plus per-dish overrides for
// known food-safety-relevant items; no numeric nutrient values or
// fabricated citations are included anywhere in this file.
//
// `alternatives`: only populated for the 15 dishes carrying a safety flag
// (raw/undercooked, alcohol-containing, high-mercury, herbal, caffeinated,
// unripe-ackee, unpasteurized dairy). Left empty ([]) everywhere else —
// no fabricated substitute is invented for a dish that has no specific
// preparation-dependent concern to substitute away from. Mirrors the
// `alternatives` field already used in foods.js.
//
// This module is NOT AI/LLM-generated content and does not call any AI API.

export const MEAL_CATEGORIES = {
  BEVERAGE_FERMENT_ALCOHOL: "beverage_ferment_alcohol",
  BEVERAGE_HOT: "beverage_hot",
  BREAD_STARCH: "bread_starch",
  DAIRY_FERMENT: "dairy_ferment",
  DESSERT_SWEET: "dessert_sweet",
  FRIED_SNACK: "fried_snack",
  FRUIT_RAW: "fruit_raw",
  LEGUME: "legume",
  OTHER: "other",
  PROTEIN_MEAT_FISH: "protein_meat_fish",
  RAW_UNDERCOOKED: "raw_undercooked",
  RICE_GRAIN: "rice_grain",
  SEAFOOD_SHELLFISH: "seafood_shellfish",
  SOUP_STEW: "soup_stew",
  STAPLE_STARCH: "staple_starch",
  VEGETABLE_LEAFY: "vegetable_leafy",
};

export const EVIDENCE_LEVELS = {
  ESTABLISHED: 'established',
  LIMITED: 'limited',
  INSUFFICIENT: 'insufficient',
};

// Canonical meal entries, keyed by id (slugified canonical name).
export const CULTURAL_MEAL_LIBRARY = {
  "jollof-rice": {
    id: "jollof-rice",
    canonicalName: "Jollof Rice",
    aliases: [
      "jollof"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A one-pot tomato-and-pepper rice dish cooked across West Africa; in Nigeria it is a signature party and everyday dish.",
    typicalIngredients: [
      "Rice",
      "Tomato",
      "Pepper",
      "Onion",
      "Stock"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "afang-soup": {
    id: "afang-soup",
    canonicalName: "Afang Soup",
    aliases: [
      "afang"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A leafy-vegetable soup (afang/okazi leaves and waterleaf) associated with the Efik/Ibibio people of southeastern Nigeria, typically cooked with meat, fish and stockfish.",
    typicalIngredients: [
      "Afang/okazi leaves",
      "Waterleaf",
      "Palm oil",
      "Meat",
      "Stockfish"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "egusi-soup": {
    id: "egusi-soup",
    canonicalName: "Egusi Soup",
    aliases: [
      "egusi"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A soup thickened with ground melon seeds, cooked with leafy greens, meat and/or fish; eaten across Nigeria and neighbouring countries.",
    typicalIngredients: [
      "Ground melon seeds",
      "Leafy greens",
      "Palm oil",
      "Meat",
      "Fish"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "moi-moi": {
    id: "moi-moi",
    canonicalName: "Moi Moi",
    aliases: [
      "moimoi",
      "moin moin"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "legume",
    culturalContext: "A steamed pudding made from a blended black-eyed pea or bean paste, often with egg, fish or peppers folded in.",
    typicalIngredients: [
      "Black-eyed peas",
      "Pepper",
      "Onion",
      "Palm oil",
      "Egg (optional)"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "efo-riro": {
    id: "efo-riro",
    canonicalName: "Efo Riro",
    aliases: [
      "efo riro"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A Yoruba spinach-and-pepper stew usually made with assorted meat, fish and palm oil.",
    typicalIngredients: [
      "Spinach",
      "Pepper",
      "Palm oil",
      "Assorted meat",
      "Stockfish"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "nkwobi": {
    id: "nkwobi",
    canonicalName: "Nkwobi",
    aliases: [
      "nkwobi"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A spiced cow-foot dish popular as an Igbo delicacy and pepper-soup-bar snack, cooked in a palm-oil-and-potash sauce.",
    typicalIngredients: [
      "Cow foot",
      "Palm oil",
      "Potash",
      "Pepper",
      "Utazi leaf"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "garri": {
    id: "garri",
    canonicalName: "Garri",
    aliases: [
      "garri",
      "gari"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A granular staple made from fermented, fried cassava, eaten soaked (as 'garri and groundnut') or made into a stiff dough (eba) with soup.",
    typicalIngredients: [
      "Cassava (fermented, fried/toasted)"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "bitter-leaf-soup": {
    id: "bitter-leaf-soup",
    canonicalName: "Bitter Leaf Soup",
    aliases: [
      "bitterleaf soup",
      "ofe onugbu",
      "bitter leaf"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "An Igbo soup made from washed bitter leaf (to reduce bitterness) combined with cocoyam thickener, meat, fish and stockfish.",
    typicalIngredients: [
      "Bitter leaf",
      "Cocoyam",
      "Meat",
      "Stockfish",
      "Palm oil"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "moringa": {
    id: "moringa",
    canonicalName: "Moringa",
    aliases: [
      "moringa leaves",
      "ugu moringa"
    ],
    country: "Nigeria",
    region: "west_central_african",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "The leaves of the moringa tree, used as a leafy vegetable in soups and also sold as a dietary/herbal supplement.",
    typicalIngredients: [
      "Moringa leaves"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination",
      "this dish includes a herbal/medicinal ingredient (e.g. ginseng, moringa) used in more than everyday food-level amounts"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)",
      "concentrated/supplement-level amounts of the herbal ingredient without discussing it with a healthcare professional first, particularly in pregnancy or when trying to conceive"
    ],
    alternatives: [
      "Moringa used as an everyday cooked leafy vegetable in soup (not a concentrated supplement/tea)",
      "Spinach or kale as a familiar leafy-green swap"
    ],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source. Some herbal ingredients used in this dish (e.g. ginseng) are generally advised against in medicinal/concentrated amounts during pregnancy — ordinary food-level use in a shared meal is a different question from taking it as a supplement, and this app does not make a safety determination on herbal supplement use.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [
      "herbal_caution"
    ],
  },
  "waakye": {
    id: "waakye",
    canonicalName: "Waakye",
    aliases: [
      "waakye"
    ],
    country: "Ghana",
    region: "west_central_african",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A Ghanaian rice-and-beans dish cooked with dried millet or sorghum leaves (or bicarbonate) that give it a distinctive reddish-brown colour, usually served with a range of stews and sides.",
    typicalIngredients: [
      "Rice",
      "Black-eyed peas",
      "Millet/sorghum leaves or baking soda"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "banku": {
    id: "banku",
    canonicalName: "Banku",
    aliases: [
      "banku"
    ],
    country: "Ghana",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A fermented corn-and-cassava dough staple, usually served with soup, stew or grilled fish and pepper sauce.",
    typicalIngredients: [
      "Fermented corn dough",
      "Cassava dough"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "red-red": {
    id: "red-red",
    canonicalName: "Red Red",
    aliases: [
      "red red"
    ],
    country: "Ghana",
    region: "west_central_african",
    subgroup: null,
    category: "legume",
    culturalContext: "A black-eyed pea stew cooked in red palm oil (hence the name), typically served with fried ripe plantain.",
    typicalIngredients: [
      "Black-eyed peas",
      "Palm oil",
      "Tomato",
      "Ripe plantain (side)"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kontomire": {
    id: "kontomire",
    canonicalName: "Kontomire",
    aliases: [
      "kontomire stew",
      "cocoyam leaf stew"
    ],
    country: "Ghana",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A Ghanaian stew made from cocoyam (taro) leaves, cooked with palm oil, fish and/or meat.",
    typicalIngredients: [
      "Cocoyam leaves",
      "Palm oil",
      "Fish",
      "Egg (optional)"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "kenkey": {
    id: "kenkey",
    canonicalName: "Kenkey",
    aliases: [
      "kenkey"
    ],
    country: "Ghana",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A fermented corn-dough staple wrapped and steamed in corn husks or plantain leaves, typically served with fried fish and pepper sauce.",
    typicalIngredients: [
      "Fermented corn dough"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "ndole": {
    id: "ndole",
    canonicalName: "Ndolé",
    aliases: [
      "ndole",
      "ndolé"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "Cameroon's national dish: a stew of bitterleaf (or spinach as a substitute) with ground peanuts, typically with fish, shrimp and/or beef.",
    typicalIngredients: [
      "Bitterleaf or spinach",
      "Ground peanuts",
      "Fish",
      "Shrimp",
      "Beef"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "eru": {
    id: "eru",
    canonicalName: "Eru",
    aliases: [
      "eru"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A soup made from shredded eru (Gnetum africanum) leaves and waterleaf, cooked with palm oil, meat, fish and often served with a starch like fufu or garri.",
    typicalIngredients: [
      "Eru leaves",
      "Waterleaf",
      "Palm oil",
      "Meat",
      "Fish"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "koki": {
    id: "koki",
    canonicalName: "Koki",
    aliases: [
      "koki beans",
      "koki"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "legume",
    culturalContext: "A steamed pudding of blended black-eyed peas with palm oil and spices, wrapped and steamed in leaves — related to Nigerian moi moi.",
    typicalIngredients: [
      "Black-eyed peas",
      "Palm oil",
      "Spices"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "achu": {
    id: "achu",
    canonicalName: "Achu",
    aliases: [
      "achu soup",
      "yellow soup"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "Pounded cocoyam ('achu') served with a yellow soup made from palm-oil, spices and often meat/offal, associated with the Northwest grassfields of Cameroon.",
    typicalIngredients: [
      "Cocoyam",
      "Palm oil (yellow soup)",
      "Spices",
      "Meat/offal"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "nkui": {
    id: "nkui",
    canonicalName: "Nkui",
    aliases: [
      "nkui"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A gelatinous soup thickened with the bark of the nkui tree, cooked with vegetables, meat and/or fish.",
    typicalIngredients: [
      "Nkui tree bark",
      "Vegetables",
      "Meat or fish"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "mbongo-tchobi": {
    id: "mbongo-tchobi",
    canonicalName: "Mbongo Tchobi",
    aliases: [
      "mbongo tchobi",
      "mbongo"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A dark, smoky spiced sauce/stew from Cameroon's Littoral/coastal region, typically made with fish and a roasted-spice paste.",
    typicalIngredients: [
      "Fish",
      "Roasted spice paste",
      "Mbongo spice"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "poulet-dg": {
    id: "poulet-dg",
    canonicalName: "Poulet DG",
    aliases: [
      "poulet dg"
    ],
    country: "Cameroon",
    region: "west_central_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "'Directeur Général chicken' — fried chicken and plantain in a vegetable sauce, a popular Cameroonian party dish.",
    typicalIngredients: [
      "Chicken",
      "Plantain",
      "Carrots",
      "Green beans",
      "Tomato"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "thieboudienne": {
    id: "thieboudienne",
    canonicalName: "Thieboudienne",
    aliases: [
      "thiebou dienne",
      "ceebu jen",
      "thieb"
    ],
    country: "Senegal",
    region: "west_central_african",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Senegal's national dish: fish and vegetables cooked with tomato and rice in the same pot.",
    typicalIngredients: [
      "Fish",
      "Rice",
      "Tomato",
      "Cassava, carrot, cabbage"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "yassa": {
    id: "yassa",
    canonicalName: "Yassa",
    aliases: [
      "yassa",
      "chicken yassa",
      "poulet yassa"
    ],
    country: "Senegal",
    region: "west_central_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Chicken or fish marinated and cooked with a large quantity of caramelised onions, mustard and lemon, served with rice.",
    typicalIngredients: [
      "Chicken or fish",
      "Onion",
      "Mustard",
      "Lemon",
      "Rice"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "mafe": {
    id: "mafe",
    canonicalName: "Mafé",
    aliases: [
      "mafe",
      "maafe",
      "groundnut stew"
    ],
    country: "Senegal",
    region: "west_central_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A peanut-based stew with meat and vegetables, served over rice; also known across the wider Sahel as groundnut/peanut stew.",
    typicalIngredients: [
      "Peanut paste",
      "Meat",
      "Tomato",
      "Vegetables",
      "Rice"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "sombi": {
    id: "sombi",
    canonicalName: "Sombi",
    aliases: [
      "sombi"
    ],
    country: "Senegal",
    region: "west_central_african",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "A sweet rice pudding cooked in coconut or coconut-flavoured milk, often flavoured with vanilla.",
    typicalIngredients: [
      "Rice",
      "Coconut milk",
      "Sugar",
      "Vanilla"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "ngalakh": {
    id: "ngalakh",
    canonicalName: "Ngalakh",
    aliases: [
      "ngalakh"
    ],
    country: "Senegal",
    region: "west_central_african",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "A sweet dessert of millet couscous mixed with a baobab-fruit (bouye) and peanut paste, traditionally prepared for religious occasions.",
    typicalIngredients: [
      "Millet couscous",
      "Baobab fruit (bouye)",
      "Peanut paste"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "attieke": {
    id: "attieke",
    canonicalName: "Attiéké",
    aliases: [
      "attieke",
      "attiéké"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A grated, fermented cassava couscous-like staple, typically served with grilled fish and onion-tomato sauce.",
    typicalIngredients: [
      "Grated fermented cassava"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "kedjenou": {
    id: "kedjenou",
    canonicalName: "Kedjenou",
    aliases: [
      "kedjenou"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Chicken (or guinea fowl) slow-simmered in a sealed pot with vegetables and minimal added liquid, an Ivorian specialty.",
    typicalIngredients: [
      "Chicken or guinea fowl",
      "Tomato",
      "Onion",
      "Pepper"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "foutou": {
    id: "foutou",
    canonicalName: "Foutou",
    aliases: [
      "foutou",
      "fufu ivoirien"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A pounded plantain-and-cassava (or yam) dough, the Ivorian relative of fufu, served with soup or sauce.",
    typicalIngredients: [
      "Plantain",
      "Cassava or yam"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "aloco": {
    id: "aloco",
    canonicalName: "Aloco",
    aliases: [
      "aloco"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Fried ripe plantain, often served with a spicy onion sauce and grilled fish or chicken.",
    typicalIngredients: [
      "Ripe plantain",
      "Palm oil (frying)",
      "Onion sauce"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "tchakpallo": {
    id: "tchakpallo",
    canonicalName: "Tchakpallo",
    aliases: [
      "tchapalo",
      "tchakpallo",
      "chapalo"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "beverage_ferment_alcohol",
    culturalContext: "A traditional fermented sorghum or millet beer from Côte d'Ivoire; an alcoholic beverage, not a soft drink.",
    typicalIngredients: [
      "Fermented sorghum or millet"
    ],
    nutrition: [
      "Varies — traditionally fermented beverage"
    ],
    safeWhen: [
      "consumed by non-pregnant, non-breastfeeding adults, aware that it is a fermented/alcoholic beverage"
    ],
    cautionWhen: [
      "homemade or informally fermented batches, where alcohol content and hygiene can vary",
      "homemade/informal batches where alcohol content varies"
    ],
    avoidWhen: [
      "pregnancy and breastfeeding — this beverage is a fermented, alcohol-containing (and sometimes unpasteurized-dairy-based) drink, and no amount of alcohol is confirmed safe in pregnancy",
      "in pregnancy and while trying to limit alcohol — fermentation produces measurable alcohol content in this drink"
    ],
    alternatives: [
      "A non-alcoholic malt drink or zobo (hibiscus tea)",
      "Freshly pressed sugarcane or ginger drink"
    ],
    reproductiveHealth: {
      general: "A traditional fermented beverage that does contain alcohol — treat it the same as any other alcoholic drink when deciding whether/how much to have.",
      pregnancy: "Avoid — this is an alcohol-containing beverage. UK guidance is that the safest approach in pregnancy is not to drink alcohol at all.",
      postpartum: "Standard alcohol-and-breastfeeding guidance applies if breastfeeding (see breastfeeding note).",
      breastfeeding: "If consumed, standard alcohol-and-breastfeeding timing guidance applies (e.g. spacing feeds after drinking) — speak with a health visitor or midwife for individual guidance.",
      menstrual: "No specific menstrual-health restriction beyond standard alcohol guidance.",
      menopause: "Alcohol can be a trigger for hot flashes in some people.",
      preconception: "Many preconception guidelines suggest limiting alcohol; discuss with a healthcare professional if trying to conceive.",
    },
    evidence: "established",
    flags: [
      "alcohol_ferment"
    ],
  },
  "garba": {
    id: "garba",
    canonicalName: "Garba",
    aliases: [
      "garba"
    ],
    country: "Côte d'Ivoire",
    region: "west_central_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A popular street-food combination of fried tuna with attiéké (cassava couscous), tomato and chili.",
    typicalIngredients: [
      "Fried tuna",
      "Attiéké",
      "Tomato",
      "Chilli"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "ugali": {
    id: "ugali",
    canonicalName: "Ugali",
    aliases: [
      "ugali"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A stiff maize-meal (or sometimes sorghum/millet) porridge that is the everyday staple starch across much of East Africa.",
    typicalIngredients: [
      "Maize meal",
      "Water"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "nyama-choma": {
    id: "nyama-choma",
    canonicalName: "Nyama Choma",
    aliases: [
      "nyama choma"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Grilled meat (commonly goat or beef), a centrepiece of Kenyan social eating, usually served with kachumbari salad.",
    typicalIngredients: [
      "Goat or beef",
      "Salt"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "sukuma-wiki": {
    id: "sukuma-wiki",
    canonicalName: "Sukuma Wiki",
    aliases: [
      "sukuma wiki"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "Sautéed collard greens (or kale), an everyday Kenyan vegetable side dish whose name means 'push/stretch the week'.",
    typicalIngredients: [
      "Collard greens/kale",
      "Onion",
      "Tomato",
      "Oil"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "githeri": {
    id: "githeri",
    canonicalName: "Githeri",
    aliases: [
      "githeri"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "legume",
    culturalContext: "A Kikuyu dish of boiled maize and beans, sometimes with added vegetables — a filling, fibre-rich staple.",
    typicalIngredients: [
      "Maize",
      "Beans"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "chai": {
    id: "chai",
    canonicalName: "Chai",
    aliases: [
      "kenyan chai",
      "spiced milk tea"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "beverage_hot",
    culturalContext: "Spiced, milky tea, drunk widely across East Africa (and South Asia) as an everyday beverage.",
    typicalIngredients: [
      "Black tea",
      "Milk",
      "Spices",
      "Sugar"
    ],
    nutrition: [
      "Contains caffeine (amount varies by preparation and strength)"
    ],
    safeWhen: [
      "consumed in moderate amounts within recommended daily caffeine limits"
    ],
    cautionWhen: [
      "multiple cups a day — caffeine is cumulative across all sources (tea, coffee, cola, chocolate)",
      "total daily caffeine across all sources, not just this drink"
    ],
    avoidWhen: [],
    alternatives: [
      "Decaffeinated chai or rooibos 'red tea' spiced the same way",
      "Warm spiced milk without tea leaves"
    ],
    reproductiveHealth: {
      general: "A caffeinated beverage; total daily caffeine from all sources is the relevant consideration.",
      pregnancy: "UK (NHS) guidance recommends keeping total caffeine under 200mg/day in pregnancy — this drink counts toward that total alongside coffee, cola and chocolate.",
      postpartum: "Caffeine can pass into breast milk in small amounts and may affect some babies' sleep; moderate intake is generally the guidance.",
      breastfeeding: "Same moderate-intake consideration as postpartum.",
      menstrual: "Some people find high caffeine intake worsens cramping or anxiety around their period — this varies by individual.",
      menopause: "Caffeine can be a trigger for hot flashes in some people.",
      preconception: "No specific restriction beyond general moderate-caffeine guidance.",
    },
    evidence: "established",
    flags: [
      "caffeine"
    ],
  },
  "irio": {
    id: "irio",
    canonicalName: "Irio",
    aliases: [
      "irio",
      "mukimo"
    ],
    country: "Kenya",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A Kikuyu mash of potatoes, maize, beans and pumpkin leaves — closely related to mukimo.",
    typicalIngredients: [
      "Potato",
      "Maize",
      "Beans",
      "Pumpkin leaves"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "injera": {
    id: "injera",
    canonicalName: "Injera",
    aliases: [
      "injera"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A large, spongy fermented flatbread made from teff (or a teff blend), the communal base for most Ethiopian meals.",
    typicalIngredients: [
      "Teff flour (fermented)"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "doro-wat": {
    id: "doro-wat",
    canonicalName: "Doro Wat",
    aliases: [
      "doro wot",
      "doro wat"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A rich, berbere-spiced chicken stew, often considered Ethiopia's national dish, usually served with hard-boiled egg and injera.",
    typicalIngredients: [
      "Chicken",
      "Berbere spice",
      "Onion",
      "Hard-boiled egg"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "kitfo": {
    id: "kitfo",
    canonicalName: "Kitfo",
    aliases: [
      "kitfo"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "raw_undercooked",
    culturalContext: "Traditionally minced raw or very lightly warmed beef seasoned with spiced butter and berbere; a fully cooked ('leb leb' or well-done) version is also common.",
    typicalIngredients: [
      "Minced beef",
      "Spiced butter (niter kibbeh)",
      "Berbere"
    ],
    nutrition: [
      "Protein",
      "Varies by dish"
    ],
    safeWhen: [
      "a fully cooked version of the dish is chosen"
    ],
    cautionWhen: [
      "traditionally raw or lightly-cooked preparations, for anyone with a weakened immune system",
      "the traditional raw or lightly-cooked version, for anyone immunocompromised"
    ],
    avoidWhen: [
      "the raw/undercooked traditional preparation during pregnancy, for young children, or for anyone immunocompromised — this is standard general food-safety guidance around raw animal protein, not specific to this dish's culture",
      "the raw/undercooked traditional preparation during pregnancy — a fully cooked version of this dish is the lower-risk choice and still culturally authentic"
    ],
    alternatives: [
      "The same dish fully cooked through ('leb leb'/well-done kitfo) instead of the raw or lightly-warmed traditional version",
      "Tibs (pan-fried, fully cooked beef) as a related fully-cooked Ethiopian dish"
    ],
    reproductiveHealth: {
      general: "This dish has a traditional raw or lightly-cooked preparation alongside fully cooked versions — the fully cooked version avoids the raw-food-safety concerns entirely while keeping the dish's flavour profile.",
      pregnancy: "Choose a fully cooked version; raw or lightly cooked meat/fish carries a higher foodborne-illness risk that is specifically flagged in pregnancy. A fully cooked version is available and is the safer choice in pregnancy specifically.",
      postpartum: "A fully cooked version is the lower-risk choice, particularly in the early postpartum period.",
      breastfeeding: "No specific restriction beyond standard food-safety caution around raw animal protein.",
      menstrual: "No specific concerns for the general population; choose fully cooked if you prefer.",
      menopause: "No specific concerns for the general population.",
      preconception: "No specific restriction for the general population; standard food-safety caution applies.",
    },
    evidence: "established",
    flags: [
      "raw_or_undercooked_traditional"
    ],
  },
  "shiro": {
    id: "shiro",
    canonicalName: "Shiro",
    aliases: [
      "shiro"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "legume",
    culturalContext: "A spiced stew made from ground chickpea or broad-bean flour — a widely eaten vegetarian/vegan Ethiopian staple.",
    typicalIngredients: [
      "Chickpea or broad-bean flour",
      "Onion",
      "Garlic",
      "Berbere"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "beyaynetu": {
    id: "beyaynetu",
    canonicalName: "Beyaynetu",
    aliases: [
      "beyaynetu",
      "vegetarian combo"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A vegetarian platter of several small stews and salads (lentils, cabbage, greens, shiro) served together on injera.",
    typicalIngredients: [
      "Lentils",
      "Cabbage",
      "Greens",
      "Shiro"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "tibs": {
    id: "tibs",
    canonicalName: "Tibs",
    aliases: [
      "tibs"
    ],
    country: "Ethiopia",
    region: "east_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Sautéed or pan-fried cubes of meat (commonly beef or lamb) with onion, pepper and rosemary, served with injera.",
    typicalIngredients: [
      "Beef or lamb",
      "Onion",
      "Pepper",
      "Rosemary"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "pilau": {
    id: "pilau",
    canonicalName: "Pilau",
    aliases: [
      "pilau",
      "pilau rice"
    ],
    country: "Tanzania",
    region: "east_african",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Spiced rice cooked with meat stock and whole spices (cumin, cardamom, cinnamon, cloves) — a Swahili-coast specialty.",
    typicalIngredients: [
      "Rice",
      "Meat stock",
      "Cumin",
      "Cardamom",
      "Cinnamon",
      "Cloves"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "mishkaki": {
    id: "mishkaki",
    canonicalName: "Mishkaki",
    aliases: [
      "mishkaki"
    ],
    country: "Tanzania",
    region: "east_african",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Marinated, skewered and grilled meat — the Tanzanian/Swahili-coast version of kebabs.",
    typicalIngredients: [
      "Marinated meat cubes",
      "Skewers"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "chipsi-mayai": {
    id: "chipsi-mayai",
    canonicalName: "Chipsi Mayai",
    aliases: [
      "chipsi mayai",
      "chips mayai"
    ],
    country: "Tanzania",
    region: "east_african",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A Tanzanian street-food omelette made by frying chips (fries) into a beaten-egg omelette.",
    typicalIngredients: [
      "Potato chips (fries)",
      "Eggs"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "wali": {
    id: "wali",
    canonicalName: "Wali",
    aliases: [
      "wali"
    ],
    country: "Tanzania",
    region: "east_african",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Plain steamed or coconut rice, the everyday accompaniment to Tanzanian stews and curries.",
    typicalIngredients: [
      "Rice",
      "Coconut milk (optional)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "maharage": {
    id: "maharage",
    canonicalName: "Maharage",
    aliases: [
      "maharage ya nazi",
      "maharage"
    ],
    country: "Tanzania",
    region: "east_african",
    subgroup: null,
    category: "legume",
    culturalContext: "Beans stewed in coconut milk, a common Tanzanian/coastal side dish.",
    typicalIngredients: [
      "Beans",
      "Coconut milk"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "matoke": {
    id: "matoke",
    canonicalName: "Matoke",
    aliases: [
      "matooke",
      "matoke"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "Green (unripe/cooking) bananas steamed and mashed, Uganda's everyday staple starch.",
    typicalIngredients: [
      "Green (cooking) bananas"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "luwombo": {
    id: "luwombo",
    canonicalName: "Luwombo",
    aliases: [
      "luwombo"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "Meat, chicken, groundnut sauce or mushroom stewed and steamed inside banana leaves — a ceremonial Ugandan dish.",
    typicalIngredients: [
      "Meat, chicken or mushroom",
      "Groundnut sauce",
      "Banana leaves"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "posho": {
    id: "posho",
    canonicalName: "Posho",
    aliases: [
      "posho",
      "ugali uganda"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A stiff maize-meal porridge, the Ugandan equivalent of ugali.",
    typicalIngredients: [
      "Maize meal",
      "Water"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "groundnut-stew": {
    id: "groundnut-stew",
    canonicalName: "Groundnut Stew",
    aliases: [
      "binyebwa",
      "g-nut stew"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A stew thickened with ground peanuts, typically with meat, fish or vegetables, common across Uganda.",
    typicalIngredients: [
      "Ground peanuts",
      "Meat, fish or vegetables"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "malakwang": {
    id: "malakwang",
    canonicalName: "Malakwang",
    aliases: [
      "malakwang"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A tangy soup made from malakwang (a hibiscus-leaf relative) leaves, often with groundnut paste, from northern Uganda.",
    typicalIngredients: [
      "Malakwang leaves",
      "Groundnut paste"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kalo": {
    id: "kalo",
    canonicalName: "Kalo",
    aliases: [
      "kalo",
      "kwon kal"
    ],
    country: "Uganda",
    region: "east_african",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A stiff porridge made from millet flour (sometimes blended with cassava), a staple in northern Uganda.",
    typicalIngredients: [
      "Millet flour",
      "Cassava flour (optional)"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "biryani": {
    id: "biryani",
    canonicalName: "Biryani",
    aliases: [
      "biriyani",
      "biryani rice"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A layered, spiced rice dish cooked with meat, fish or vegetables, with many regional styles across South Asia.",
    typicalIngredients: [
      "Rice",
      "Meat, fish or vegetables",
      "Spices",
      "Yoghurt"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "dal": {
    id: "dal",
    canonicalName: "Dal",
    aliases: [
      "daal",
      "dhal"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "legume",
    culturalContext: "A broad category of split-lentil or pulse stews, a near-daily staple across South Asia.",
    typicalIngredients: [
      "Split lentils/pulses",
      "Turmeric",
      "Cumin",
      "Garlic"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "idli": {
    id: "idli",
    canonicalName: "Idli",
    aliases: [
      "idli"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A steamed, savoury cake made from a fermented rice-and-lentil batter, popular in South India.",
    typicalIngredients: [
      "Fermented rice-and-lentil batter"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "dosa": {
    id: "dosa",
    canonicalName: "Dosa",
    aliases: [
      "dosa"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A thin, fermented rice-and-lentil crepe from South India, typically served with chutney and sambar.",
    typicalIngredients: [
      "Fermented rice-and-lentil batter"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "khichdi": {
    id: "khichdi",
    canonicalName: "Khichdi",
    aliases: [
      "khichdi",
      "kitchari"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice and lentils cooked together into a soft, easily digestible porridge — often given during illness, weaning or postpartum recovery.",
    typicalIngredients: [
      "Rice",
      "Lentils",
      "Turmeric",
      "Ghee"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "roti": {
    id: "roti",
    canonicalName: "Roti",
    aliases: [
      "chapati",
      "roti bread"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "An unleavened whole-wheat flatbread, the everyday bread across most of South Asia.",
    typicalIngredients: [
      "Whole-wheat flour",
      "Water"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "chana-masala": {
    id: "chana-masala",
    canonicalName: "Chana Masala",
    aliases: [
      "chana masala",
      "chole"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "legume",
    culturalContext: "A spiced chickpea curry, a widely eaten vegetarian dish across North India and Pakistan.",
    typicalIngredients: [
      "Chickpeas",
      "Tomato",
      "Onion",
      "Spices"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "sambar": {
    id: "sambar",
    canonicalName: "Sambar",
    aliases: [
      "sambar"
    ],
    country: "India",
    region: "south_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A lentil-and-vegetable stew flavoured with tamarind and a spice blend, a South Indian staple served with idli/dosa/rice.",
    typicalIngredients: [
      "Lentils",
      "Tamarind",
      "Vegetables",
      "Spice blend"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "haleem": {
    id: "haleem",
    canonicalName: "Haleem",
    aliases: [
      "haleem"
    ],
    country: "Pakistan",
    region: "south_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A slow-cooked, thick stew of wheat/barley, lentils and shredded meat, popular especially during Ramadan.",
    typicalIngredients: [
      "Wheat/barley",
      "Lentils",
      "Shredded meat",
      "Spices"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "nihari": {
    id: "nihari",
    canonicalName: "Nihari",
    aliases: [
      "nihari"
    ],
    country: "Pakistan",
    region: "south_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A slow-cooked, richly spiced meat stew (traditionally shank), typically eaten with naan, associated with the Mughal culinary tradition.",
    typicalIngredients: [
      "Meat shank",
      "Wheat flour",
      "Spices"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "karahi": {
    id: "karahi",
    canonicalName: "Karahi",
    aliases: [
      "kadai",
      "karahi curry"
    ],
    country: "Pakistan",
    region: "south_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Meat (or vegetables) cooked quickly in a wok-like pan with tomatoes, ginger and green chillies.",
    typicalIngredients: [
      "Meat or vegetables",
      "Tomato",
      "Ginger",
      "Green chilli"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "panta-bhat": {
    id: "panta-bhat",
    canonicalName: "Panta Bhat",
    aliases: [
      "panta bhat",
      "pantabhat"
    ],
    country: "Bangladesh",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice soaked overnight in water and fermented slightly, traditionally eaten for breakfast in rural Bengal.",
    typicalIngredients: [
      "Cooked rice soaked in water (fermented overnight)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "hilsa-fish": {
    id: "hilsa-fish",
    canonicalName: "Hilsa Fish",
    aliases: [
      "ilish",
      "hilsa"
    ],
    country: "Bangladesh",
    region: "south_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Hilsa (ilish) is Bangladesh's national fish, prized in Bengali cuisine and usually prepared in a mustard or light curry sauce.",
    typicalIngredients: [
      "Hilsa (ilish) fish",
      "Mustard sauce or light curry"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "string-hoppers": {
    id: "string-hoppers",
    canonicalName: "String Hoppers",
    aliases: [
      "idiyappam",
      "string hoppers"
    ],
    country: "Sri Lanka",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Steamed rice-flour noodle nests, typically eaten with coconut sambal and curry for breakfast.",
    typicalIngredients: [
      "Rice-flour noodles (steamed)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "kottu": {
    id: "kottu",
    canonicalName: "Kottu",
    aliases: [
      "kottu roti"
    ],
    country: "Sri Lanka",
    region: "south_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "Chopped roti stir-fried with vegetables, egg and/or meat and curry sauce on a hot griddle — a popular Sri Lankan street food.",
    typicalIngredients: [
      "Chopped roti",
      "Vegetables",
      "Egg",
      "Curry sauce"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "sambal": {
    id: "sambal",
    canonicalName: "Sambal",
    aliases: [
      "coconut sambal",
      "pol sambal"
    ],
    country: "Sri Lanka",
    region: "south_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A spicy grated-coconut condiment (pol sambal), served alongside most Sri Lankan meals.",
    typicalIngredients: [
      "Grated coconut",
      "Chilli",
      "Lime",
      "Onion"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "pol-roti": {
    id: "pol-roti",
    canonicalName: "Pol Roti",
    aliases: [
      "pol roti"
    ],
    country: "Sri Lanka",
    region: "south_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A flatbread made from flour mixed with grated coconut, a Sri Lankan breakfast staple.",
    typicalIngredients: [
      "Flour",
      "Grated coconut"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "kiribath": {
    id: "kiribath",
    canonicalName: "Kiribath",
    aliases: [
      "kiribath",
      "milk rice"
    ],
    country: "Sri Lanka",
    region: "south_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice cooked in coconut milk and pressed into diamonds, eaten for special/auspicious occasions and celebrations.",
    typicalIngredients: [
      "Rice",
      "Coconut milk"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "congee": {
    id: "congee",
    canonicalName: "Congee",
    aliases: [
      "rice congee",
      "juk",
      "jok"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A soft rice porridge eaten across East and Southeast Asia, often topped with egg, meat, pickles or ginger.",
    typicalIngredients: [
      "Rice",
      "Water/stock",
      "Toppings (egg, ginger, meat)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "dim-sum": {
    id: "dim-sum",
    canonicalName: "Dim Sum",
    aliases: [
      "dimsum"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "other",
    culturalContext: "A category of small, often steamed or fried dishes (dumplings, buns, rolls) traditionally served with tea.",
    typicalIngredients: [
      "Dough wrappers",
      "Meat, seafood or vegetable fillings"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "dumplings": {
    id: "dumplings",
    canonicalName: "Dumplings",
    aliases: [
      "jiaozi",
      "potstickers"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "other",
    culturalContext: "Filled dough parcels (meat, seafood or vegetable) that are steamed, boiled or pan-fried.",
    typicalIngredients: [
      "Dough wrappers",
      "Meat, seafood or vegetable fillings"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "seaweed-soup": {
    id: "seaweed-soup",
    canonicalName: "Seaweed Soup",
    aliases: [
      "miyeok guk",
      "seaweed soup"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A light soup made from dried seaweed and broth; also a Korean postpartum-recovery staple (see South Korea entry).",
    typicalIngredients: [
      "Dried seaweed (miyeok)",
      "Broth",
      "Sesame oil"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "steamed-fish": {
    id: "steamed-fish",
    canonicalName: "Steamed Fish",
    aliases: [
      "steamed whole fish"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Whole fish steamed with ginger, scallion and soy sauce — a common Cantonese preparation.",
    typicalIngredients: [
      "Whole fish",
      "Ginger",
      "Scallion",
      "Soy sauce"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "red-date-tea": {
    id: "red-date-tea",
    canonicalName: "Red Date Tea",
    aliases: [
      "jujube tea",
      "red date tea"
    ],
    country: "China",
    region: "east_asian",
    subgroup: null,
    category: "beverage_hot",
    culturalContext: "A warm infusion made from dried red (jujube) dates, drunk as a comforting, caffeine-free beverage.",
    typicalIngredients: [
      "Dried red (jujube) dates",
      "Water"
    ],
    nutrition: [
      "Contains caffeine (amount varies by preparation and strength)"
    ],
    safeWhen: [
      "consumed in moderate amounts within recommended daily caffeine limits"
    ],
    cautionWhen: [
      "multiple cups a day — caffeine is cumulative across all sources (tea, coffee, cola, chocolate)"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A caffeinated beverage; total daily caffeine from all sources is the relevant consideration.",
      pregnancy: "UK (NHS) guidance recommends keeping total caffeine under 200mg/day in pregnancy — this drink counts toward that total alongside coffee, cola and chocolate.",
      postpartum: "Caffeine can pass into breast milk in small amounts and may affect some babies' sleep; moderate intake is generally the guidance.",
      breastfeeding: "Same moderate-intake consideration as postpartum.",
      menstrual: "Some people find high caffeine intake worsens cramping or anxiety around their period — this varies by individual.",
      menopause: "Caffeine can be a trigger for hot flashes in some people.",
      preconception: "No specific restriction beyond general moderate-caffeine guidance.",
    },
    evidence: "established",
    flags: [],
  },
  "sushi": {
    id: "sushi",
    canonicalName: "Sushi",
    aliases: [
      "sushi"
    ],
    country: "Japan",
    region: "east_asian",
    subgroup: null,
    category: "raw_undercooked",
    culturalContext: "Vinegared rice paired with a range of toppings, some raw fish and some cooked, vegetarian or fully cooked.",
    typicalIngredients: [
      "Vinegared rice",
      "Fish (raw or cooked)",
      "Vegetables",
      "Nori"
    ],
    nutrition: [
      "Protein",
      "Varies by dish"
    ],
    safeWhen: [
      "a fully cooked version of the dish is chosen"
    ],
    cautionWhen: [
      "traditionally raw or lightly-cooked preparations, for anyone with a weakened immune system",
      "fish species and freshness/sourcing standards"
    ],
    avoidWhen: [
      "the raw/undercooked traditional preparation during pregnancy, for young children, or for anyone immunocompromised — this is standard general food-safety guidance around raw animal protein, not specific to this dish's culture",
      "raw fish preparations during pregnancy, and high-mercury fish species at any time in larger amounts — cooked/vegetarian versions of this dish avoid the raw-fish concern entirely"
    ],
    alternatives: [
      "Fully cooked sushi (tamago, unagi, cooked shrimp/crab, vegetable rolls) instead of raw-fish varieties",
      "Chirashi or poke made with previously frozen, sushi-grade fish prepared according to food-safety guidance"
    ],
    reproductiveHealth: {
      general: "This dish has a traditional raw or lightly-cooked preparation alongside fully cooked versions — the fully cooked version avoids the raw-food-safety concerns entirely while keeping the dish's flavour profile.",
      pregnancy: "Choose a fully cooked version; raw or lightly cooked meat/fish carries a higher foodborne-illness risk that is specifically flagged in pregnancy. Choose a fully cooked, vegetarian, or well-sourced low-mercury option — raw fish is one of the more commonly flagged pregnancy food-safety items.",
      postpartum: "A fully cooked version is the lower-risk choice, particularly in the early postpartum period.",
      breastfeeding: "No specific restriction beyond standard food-safety caution around raw animal protein.",
      menstrual: "No specific concerns for the general population; choose fully cooked if you prefer.",
      menopause: "No specific concerns for the general population.",
      preconception: "No specific restriction for the general population; standard food-safety caution applies.",
    },
    evidence: "established",
    flags: [
      "raw_fish"
    ],
  },
  "natto": {
    id: "natto",
    canonicalName: "Natto",
    aliases: [
      "natto"
    ],
    country: "Japan",
    region: "east_asian",
    subgroup: null,
    category: "dairy_ferment",
    culturalContext: "Fermented soybeans with a distinctive sticky texture and strong flavour, a traditional Japanese breakfast food.",
    typicalIngredients: [
      "Fermented soybeans"
    ],
    nutrition: [
      "Protein",
      "Calcium",
      "Probiotics (fermented dairy)"
    ],
    safeWhen: [
      "made from pasteurized milk"
    ],
    cautionWhen: [
      "homemade or informally produced versions where pasteurization can't be confirmed"
    ],
    avoidWhen: [
      "versions made from unpasteurized ('raw') milk during pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A fermented dairy or soy food; choose pasteurized-milk versions where dairy-based.",
      pregnancy: "Confirm the product is made from pasteurized milk — unpasteurized soft/fresh dairy products carry a listeria-related caution in pregnancy specifically.",
      postpartum: "A useful calcium and protein source during recovery.",
      breastfeeding: "No specific concerns beyond choosing pasteurized dairy.",
      menstrual: "Calcium and magnesium in dairy are sometimes discussed in relation to period symptoms, though evidence is limited.",
      menopause: "Calcium content is relevant to bone-health considerations around menopause.",
      preconception: "No specific concerns beyond choosing pasteurized dairy.",
    },
    evidence: "limited",
    flags: [],
  },
  "matcha": {
    id: "matcha",
    canonicalName: "Matcha",
    aliases: [
      "matcha"
    ],
    country: "Japan",
    region: "east_asian",
    subgroup: null,
    category: "beverage_hot",
    culturalContext: "Finely ground green tea powder, whisked into hot water or milk; contains caffeine.",
    typicalIngredients: [
      "Ground green tea powder",
      "Water or milk"
    ],
    nutrition: [
      "Contains caffeine (amount varies by preparation and strength)"
    ],
    safeWhen: [
      "consumed in moderate amounts within recommended daily caffeine limits"
    ],
    cautionWhen: [
      "multiple cups a day — caffeine is cumulative across all sources (tea, coffee, cola, chocolate)",
      "total daily caffeine across all sources, not just this drink"
    ],
    avoidWhen: [],
    alternatives: [
      "Decaffeinated green tea or a roasted barley tea (mugicha), which is naturally caffeine-free",
      "Herbal tea with a similar warm, grassy note"
    ],
    reproductiveHealth: {
      general: "A caffeinated beverage; total daily caffeine from all sources is the relevant consideration.",
      pregnancy: "UK (NHS) guidance recommends keeping total caffeine under 200mg/day in pregnancy — this drink counts toward that total alongside coffee, cola and chocolate.",
      postpartum: "Caffeine can pass into breast milk in small amounts and may affect some babies' sleep; moderate intake is generally the guidance.",
      breastfeeding: "Same moderate-intake consideration as postpartum.",
      menstrual: "Some people find high caffeine intake worsens cramping or anxiety around their period — this varies by individual.",
      menopause: "Caffeine can be a trigger for hot flashes in some people.",
      preconception: "No specific restriction beyond general moderate-caffeine guidance.",
    },
    evidence: "established",
    flags: [
      "caffeine"
    ],
  },
  "pickled-vegetables": {
    id: "pickled-vegetables",
    canonicalName: "Pickled Vegetables",
    aliases: [
      "tsukemono",
      "pickled vegetables"
    ],
    country: "Japan",
    region: "east_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "Vegetables preserved by salting, fermenting or pickling — a standard side across Japanese meals.",
    typicalIngredients: [
      "Vegetables",
      "Salt/vinegar brine"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "bibimbap": {
    id: "bibimbap",
    canonicalName: "Bibimbap",
    aliases: [
      "bibimbap"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A rice bowl topped with seasoned vegetables, protein and often a fried or raw egg and gochujang chilli paste.",
    typicalIngredients: [
      "Rice",
      "Seasoned vegetables",
      "Protein",
      "Gochujang",
      "Egg"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "kimchi": {
    id: "kimchi",
    canonicalName: "Kimchi",
    aliases: [
      "kimchi"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "Fermented, seasoned vegetables (most often napa cabbage) — a staple side dish at nearly every Korean meal.",
    typicalIngredients: [
      "Napa cabbage (or other vegetables)",
      "Chilli",
      "Garlic",
      "Fish sauce"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "jjigae": {
    id: "jjigae",
    canonicalName: "Jjigae",
    aliases: [
      "jjigae",
      "kimchi jjigae"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A category of Korean stews (kimchi jjigae, doenjang jjigae, etc.), usually shared and eaten bubbling hot.",
    typicalIngredients: [
      "Kimchi or soybean paste",
      "Tofu",
      "Vegetables",
      "Protein"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "banchan": {
    id: "banchan",
    canonicalName: "Banchan",
    aliases: [
      "banchan"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "The array of small side dishes (vegetables, pickles, braises) served alongside the main components of a Korean meal.",
    typicalIngredients: [
      "Assorted small vegetable/pickle side dishes"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "tteok": {
    id: "tteok",
    canonicalName: "Tteok",
    aliases: [
      "tteok",
      "rice cake"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Chewy rice cakes, eaten as a snack or in soups (e.g. tteokguk for New Year).",
    typicalIngredients: [
      "Glutinous or non-glutinous rice flour"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "samgyetang": {
    id: "samgyetang",
    canonicalName: "Samgyetang",
    aliases: [
      "samgyetang",
      "ginseng chicken soup"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A whole young chicken stuffed with glutinous rice, garlic and ginseng, simmered into a restorative soup; eaten in summer for stamina.",
    typicalIngredients: [
      "Whole young chicken",
      "Glutinous rice",
      "Garlic",
      "Ginseng"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil",
      "this dish includes a herbal/medicinal ingredient (e.g. ginseng, moringa) used in more than everyday food-level amounts"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely",
      "concentrated/supplement-level amounts of the herbal ingredient without discussing it with a healthcare professional first, particularly in pregnancy or when trying to conceive"
    ],
    alternatives: [
      "The same soup made without added ginseng — a plain whole-chicken-and-rice version",
      "A simple chicken and rice porridge (juk) for the same restorative, easy-to-digest quality"
    ],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used. Some herbal ingredients used in this dish (e.g. ginseng) are generally advised against in medicinal/concentrated amounts during pregnancy — ordinary food-level use in a shared meal is a different question from taking it as a supplement, and this app does not make a safety determination on herbal supplement use.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [
      "herbal_caution"
    ],
  },
  "kimbap": {
    id: "kimbap",
    canonicalName: "Kimbap",
    aliases: [
      "kimbap",
      "gimbap"
    ],
    country: "South Korea",
    region: "east_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Seasoned rice and fillings (vegetables, egg, cooked meat/fish) rolled in seaweed — a popular portable Korean meal.",
    typicalIngredients: [
      "Seasoned rice",
      "Vegetables",
      "Egg or meat/fish",
      "Seaweed"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "adobo": {
    id: "adobo",
    canonicalName: "Adobo",
    aliases: [
      "chicken adobo",
      "pork adobo"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Meat (commonly chicken or pork) braised in vinegar, soy sauce, garlic and bay leaf — widely considered the Philippines' national dish.",
    typicalIngredients: [
      "Chicken or pork",
      "Vinegar",
      "Soy sauce",
      "Garlic",
      "Bay leaf"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "sinigang": {
    id: "sinigang",
    canonicalName: "Sinigang",
    aliases: [
      "sinigang"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A sour tamarind-based soup with vegetables and a protein (pork, fish or shrimp).",
    typicalIngredients: [
      "Pork, fish or shrimp",
      "Tamarind",
      "Vegetables"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "lumpia": {
    id: "lumpia",
    canonicalName: "Lumpia",
    aliases: [
      "lumpia",
      "spring rolls filipino"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Filipino spring rolls, filled with vegetables and/or meat, usually fried.",
    typicalIngredients: [
      "Spring roll wrapper",
      "Vegetables and/or meat"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "lechon": {
    id: "lechon",
    canonicalName: "Lechon",
    aliases: [
      "lechon"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Whole roasted pig with crackling skin, a centrepiece dish for Filipino celebrations.",
    typicalIngredients: [
      "Whole roasted pig"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "halo-halo": {
    id: "halo-halo",
    canonicalName: "Halo-Halo",
    aliases: [
      "halo halo"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "A layered dessert of shaved ice, evaporated milk, sweet beans, jellies, fruit and ube ice cream.",
    typicalIngredients: [
      "Shaved ice",
      "Evaporated milk",
      "Sweet beans",
      "Fruit",
      "Ube ice cream"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "pancit": {
    id: "pancit",
    canonicalName: "Pancit",
    aliases: [
      "pancit"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A category of Filipino noodle dishes stir-fried with vegetables and meat or seafood.",
    typicalIngredients: [
      "Noodles",
      "Vegetables",
      "Meat or seafood"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "kare-kare": {
    id: "kare-kare",
    canonicalName: "Kare-Kare",
    aliases: [
      "kare kare"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "Oxtail and vegetables in a rich peanut-based sauce, traditionally served with shrimp paste (bagoong).",
    typicalIngredients: [
      "Oxtail",
      "Peanut sauce",
      "Vegetables",
      "Shrimp paste (side)"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "tinolang-manok": {
    id: "tinolang-manok",
    canonicalName: "Tinolang Manok",
    aliases: [
      "tinola"
    ],
    country: "Philippines",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "Chicken simmered with ginger, green papaya and chilli leaves in a light broth.",
    typicalIngredients: [
      "Chicken",
      "Ginger",
      "Green papaya",
      "Chilli leaves"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "nasi-goreng": {
    id: "nasi-goreng",
    canonicalName: "Nasi Goreng",
    aliases: [
      "nasi goreng"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Indonesian fried rice, seasoned with sweet soy sauce (kecap manis), shallots and chilli.",
    typicalIngredients: [
      "Rice",
      "Sweet soy sauce",
      "Shallot",
      "Chilli"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "rendang": {
    id: "rendang",
    canonicalName: "Rendang",
    aliases: [
      "rendang"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Beef slow-cooked in coconut milk and spices until the liquid reduces to a thick, richly spiced sauce.",
    typicalIngredients: [
      "Beef",
      "Coconut milk",
      "Spices"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "satay": {
    id: "satay",
    canonicalName: "Satay",
    aliases: [
      "sate"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Skewered, grilled meat served with a peanut dipping sauce.",
    typicalIngredients: [
      "Skewered meat",
      "Peanut sauce"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "gado-gado": {
    id: "gado-gado",
    canonicalName: "Gado Gado",
    aliases: [
      "gado-gado"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A salad of blanched vegetables, tofu, tempeh and egg dressed in peanut sauce.",
    typicalIngredients: [
      "Blanched vegetables",
      "Tofu",
      "Tempeh",
      "Egg",
      "Peanut sauce"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "soto": {
    id: "soto",
    canonicalName: "Soto",
    aliases: [
      "soto ayam"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A turmeric-yellow Indonesian soup, most commonly with chicken, rice noodles and vegetables.",
    typicalIngredients: [
      "Chicken",
      "Turmeric broth",
      "Rice noodles",
      "Vegetables"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "tempeh": {
    id: "tempeh",
    canonicalName: "Tempeh",
    aliases: [
      "tempe"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "legume",
    culturalContext: "Fermented, pressed soybean cake — a widely eaten plant-protein staple across Indonesia.",
    typicalIngredients: [
      "Fermented soybean cake"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "nasi-uduk": {
    id: "nasi-uduk",
    canonicalName: "Nasi Uduk",
    aliases: [
      "nasi uduk"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice cooked in coconut milk with aromatics, served with an array of side dishes; a Jakarta breakfast staple.",
    typicalIngredients: [
      "Rice",
      "Coconut milk",
      "Aromatics"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "bakso": {
    id: "bakso",
    canonicalName: "Bakso",
    aliases: [
      "bakso"
    ],
    country: "Indonesia",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Indonesian meatballs (commonly beef), served in a clear broth with noodles and vegetables.",
    typicalIngredients: [
      "Beef meatballs",
      "Broth",
      "Noodles",
      "Vegetables"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "tom-yum": {
    id: "tom-yum",
    canonicalName: "Tom Yum",
    aliases: [
      "tom yum goong"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A hot-and-sour Thai soup flavoured with lemongrass, galangal, lime leaf and chilli, often with shrimp.",
    typicalIngredients: [
      "Shrimp",
      "Lemongrass",
      "Galangal",
      "Lime leaf",
      "Chilli"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "pad-thai": {
    id: "pad-thai",
    canonicalName: "Pad Thai",
    aliases: [
      "pad thai"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Stir-fried rice noodles with egg, tofu and/or shrimp, tamarind sauce, peanuts and lime.",
    typicalIngredients: [
      "Rice noodles",
      "Egg",
      "Tofu and/or shrimp",
      "Tamarind sauce",
      "Peanuts"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "green-curry": {
    id: "green-curry",
    canonicalName: "Green Curry",
    aliases: [
      "kaeng khiao wan"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A coconut-milk curry made with green chilli paste, typically with chicken or another protein and Thai eggplant.",
    typicalIngredients: [
      "Green curry paste",
      "Coconut milk",
      "Chicken",
      "Thai eggplant"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "som-tam": {
    id: "som-tam",
    canonicalName: "Som Tam",
    aliases: [
      "som tum",
      "papaya salad"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A spicy, tangy salad of shredded green (unripe) papaya, lime, chilli and fish sauce.",
    typicalIngredients: [
      "Shredded green papaya",
      "Lime",
      "Chilli",
      "Fish sauce"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "tom-kha-gai": {
    id: "tom-kha-gai",
    canonicalName: "Tom Kha Gai",
    aliases: [
      "tom kha gai"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A coconut-milk chicken soup flavoured with galangal, lemongrass and lime leaf.",
    typicalIngredients: [
      "Chicken",
      "Coconut milk",
      "Galangal",
      "Lemongrass"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "massaman-curry": {
    id: "massaman-curry",
    canonicalName: "Massaman Curry",
    aliases: [
      "massaman curry"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A milder, richer Thai curry with Persian/Muslim culinary influences, often made with beef or chicken, potatoes and peanuts.",
    typicalIngredients: [
      "Massaman curry paste",
      "Beef or chicken",
      "Potato",
      "Peanuts"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "khao-pad": {
    id: "khao-pad",
    canonicalName: "Khao Pad",
    aliases: [
      "khao pad",
      "thai fried rice"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Thai-style fried rice with egg, vegetables and a protein of choice.",
    typicalIngredients: [
      "Rice",
      "Egg",
      "Vegetables",
      "Protein"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "mango-sticky-rice": {
    id: "mango-sticky-rice",
    canonicalName: "Mango Sticky Rice",
    aliases: [
      "khao niew mamuang"
    ],
    country: "Thailand",
    region: "southeast_asian",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "Sweet glutinous rice served with fresh mango and coconut cream — a popular Thai dessert.",
    typicalIngredients: [
      "Glutinous rice",
      "Fresh mango",
      "Coconut cream"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "pho": {
    id: "pho",
    canonicalName: "Pho",
    aliases: [
      "pho bo",
      "pho ga"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A Vietnamese noodle soup with a long-simmered broth, herbs and beef or chicken.",
    typicalIngredients: [
      "Rice noodles",
      "Beef or chicken broth",
      "Herbs"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "banh-mi": {
    id: "banh-mi",
    canonicalName: "Banh Mi",
    aliases: [
      "banh mi"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A Vietnamese baguette sandwich with pâté or meat, pickled vegetables, herbs and chilli.",
    typicalIngredients: [
      "Baguette",
      "Pâté or meat",
      "Pickled vegetables",
      "Herbs",
      "Chilli"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "spring-rolls": {
    id: "spring-rolls",
    canonicalName: "Spring Rolls",
    aliases: [
      "goi cuon",
      "cha gio"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Either fresh rice-paper rolls (goi cuon) or fried rolls (cha gio), filled with vegetables, herbs and often shrimp or pork.",
    typicalIngredients: [
      "Rice paper or wrapper",
      "Vegetables",
      "Herbs",
      "Shrimp or pork"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "bun-cha": {
    id: "bun-cha",
    canonicalName: "Bun Cha",
    aliases: [
      "bun cha"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Grilled pork patties/slices served with rice vermicelli, herbs and a dipping sauce.",
    typicalIngredients: [
      "Grilled pork",
      "Rice vermicelli",
      "Herbs",
      "Dipping sauce"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "com-tam": {
    id: "com-tam",
    canonicalName: "Com Tam",
    aliases: [
      "com tam"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "'Broken rice' served with grilled pork chop, a fried egg and pickled vegetables — a popular Southern Vietnamese meal.",
    typicalIngredients: [
      "Broken rice",
      "Grilled pork chop",
      "Fried egg",
      "Pickled vegetables"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "banh-xeo": {
    id: "banh-xeo",
    canonicalName: "Banh Xeo",
    aliases: [
      "banh xeo"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "other",
    culturalContext: "A crispy turmeric rice-flour crepe filled with pork, shrimp and bean sprouts, wrapped in lettuce and herbs to eat.",
    typicalIngredients: [
      "Rice flour",
      "Turmeric",
      "Pork",
      "Shrimp",
      "Bean sprouts"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "hu-tieu": {
    id: "hu-tieu",
    canonicalName: "Hu Tieu",
    aliases: [
      "hu tieu"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A Southern Vietnamese noodle soup with pork and/or seafood, influenced by Chinese and Khmer cooking.",
    typicalIngredients: [
      "Rice noodles",
      "Pork and/or seafood",
      "Broth"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "ca-kho-to": {
    id: "ca-kho-to",
    canonicalName: "Ca Kho To",
    aliases: [
      "ca kho to"
    ],
    country: "Vietnam",
    region: "southeast_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Fish braised in a caramel-and-fish-sauce clay pot, a classic home-style Vietnamese dish.",
    typicalIngredients: [
      "Fish",
      "Fish sauce",
      "Caramel sauce"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "beshbarmak": {
    id: "beshbarmak",
    canonicalName: "Beshbarmak",
    aliases: [
      "besbarmak"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Boiled meat (horse or lamb) served over wide flat noodles with onion sauce — the Kazakh/Kyrgyz national dish.",
    typicalIngredients: [
      "Boiled horse or lamb",
      "Flat noodles",
      "Onion sauce"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kazy": {
    id: "kazy",
    canonicalName: "Kazy",
    aliases: [
      "kazy"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A traditional horsemeat sausage, often served as part of beshbarmak or as a cold cut.",
    typicalIngredients: [
      "Horsemeat sausage",
      "Spices"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kurt": {
    id: "kurt",
    canonicalName: "Kurt",
    aliases: [
      "qurt",
      "kurut"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "dairy_ferment",
    culturalContext: "Small dried, salted balls of fermented milk curd, eaten as a snack; homemade/informally-produced versions carry the usual unpasteurized-dairy considerations.",
    typicalIngredients: [
      "Dried salted fermented milk curd"
    ],
    nutrition: [
      "Protein",
      "Calcium",
      "Probiotics (fermented dairy)"
    ],
    safeWhen: [
      "made from pasteurized milk"
    ],
    cautionWhen: [
      "homemade or informally produced versions where pasteurization can't be confirmed",
      "informally/home-produced batches where pasteurization can't be confirmed"
    ],
    avoidWhen: [
      "versions made from unpasteurized ('raw') milk during pregnancy",
      "versions confirmed to be made from unpasteurized milk, during pregnancy"
    ],
    alternatives: [
      "A version confirmed made from pasteurized milk",
      "Pasteurized yoghurt or cheese as a similar dried/fermented-dairy snack"
    ],
    reproductiveHealth: {
      general: "A fermented dairy or soy food; choose pasteurized-milk versions where dairy-based.",
      pregnancy: "Confirm the product is made from pasteurized milk — unpasteurized soft/fresh dairy products carry a listeria-related caution in pregnancy specifically.",
      postpartum: "A useful calcium and protein source during recovery.",
      breastfeeding: "No specific concerns beyond choosing pasteurized dairy.",
      menstrual: "Calcium and magnesium in dairy are sometimes discussed in relation to period symptoms, though evidence is limited.",
      menopause: "Calcium content is relevant to bone-health considerations around menopause.",
      preconception: "No specific concerns beyond choosing pasteurized dairy.",
    },
    evidence: "limited",
    flags: [
      "unpasteurized_dairy_risk"
    ],
  },
  "samsa": {
    id: "samsa",
    canonicalName: "Samsa",
    aliases: [
      "samosa central asia"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A baked or fried pastry filled with meat, pumpkin or onion.",
    typicalIngredients: [
      "Pastry",
      "Meat, pumpkin or onion filling"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "shashlik": {
    id: "shashlik",
    canonicalName: "Shashlik",
    aliases: [
      "shashlyk"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Skewered, grilled marinated meat, popular across Central Asia and the Caucasus.",
    typicalIngredients: [
      "Marinated meat",
      "Skewers"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kumis": {
    id: "kumis",
    canonicalName: "Kumis",
    aliases: [
      "kymyz",
      "kumys"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "beverage_ferment_alcohol",
    culturalContext: "Fermented mare's milk; fermentation typically produces a small amount of alcohol, and the milk is traditionally unpasteurized.",
    typicalIngredients: [
      "Fermented mare's milk"
    ],
    nutrition: [
      "Varies — traditionally fermented beverage"
    ],
    safeWhen: [
      "consumed by non-pregnant, non-breastfeeding adults, aware that it is a fermented/alcoholic beverage"
    ],
    cautionWhen: [
      "homemade or informally fermented batches, where alcohol content and hygiene can vary",
      "homemade/informal batches where alcohol content varies",
      "informally/home-produced batches where pasteurization can't be confirmed"
    ],
    avoidWhen: [
      "pregnancy and breastfeeding — this beverage is a fermented, alcohol-containing (and sometimes unpasteurized-dairy-based) drink, and no amount of alcohol is confirmed safe in pregnancy",
      "in pregnancy and while trying to limit alcohol — fermentation produces measurable alcohol content in this drink",
      "versions confirmed to be made from unpasteurized milk, during pregnancy"
    ],
    alternatives: [
      "A non-fermented (non-alcoholic) fermented-milk product such as kefir made from pasteurized milk",
      "Plain airag-free dairy drink or ayran"
    ],
    reproductiveHealth: {
      general: "A traditional fermented beverage that does contain alcohol — treat it the same as any other alcoholic drink when deciding whether/how much to have.",
      pregnancy: "Avoid — this is an alcohol-containing beverage. UK guidance is that the safest approach in pregnancy is not to drink alcohol at all.",
      postpartum: "Standard alcohol-and-breastfeeding guidance applies if breastfeeding (see breastfeeding note).",
      breastfeeding: "If consumed, standard alcohol-and-breastfeeding timing guidance applies (e.g. spacing feeds after drinking) — speak with a health visitor or midwife for individual guidance.",
      menstrual: "No specific menstrual-health restriction beyond standard alcohol guidance.",
      menopause: "Alcohol can be a trigger for hot flashes in some people.",
      preconception: "Many preconception guidelines suggest limiting alcohol; discuss with a healthcare professional if trying to conceive.",
    },
    evidence: "established",
    flags: [
      "alcohol_ferment",
      "unpasteurized_dairy_risk"
    ],
  },
  "borsok": {
    id: "borsok",
    canonicalName: "Borsok",
    aliases: [
      "baursak",
      "borsok"
    ],
    country: "Kazakhstan",
    region: "central_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Small pieces of fried dough, a staple bread-like snack served at most Kazakh gatherings.",
    typicalIngredients: [
      "Fried dough"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "uzbek-plov": {
    id: "uzbek-plov",
    canonicalName: "Uzbek Plov",
    aliases: [
      "osh"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Uzbekistan's national rice pilaf, cooked with carrots, onion and lamb or beef in a large communal pot (kazan).",
    typicalIngredients: [
      "Rice",
      "Carrot",
      "Onion",
      "Lamb or beef"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "lagman": {
    id: "lagman",
    canonicalName: "Lagman",
    aliases: [
      "lagman"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Hand-pulled noodles served in a spiced meat-and-vegetable broth or stir-fried.",
    typicalIngredients: [
      "Hand-pulled noodles",
      "Meat",
      "Vegetables",
      "Spiced broth"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "manty": {
    id: "manty",
    canonicalName: "Manty",
    aliases: [
      "manti uzbek"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Large steamed dumplings filled with minced meat (often lamb) and onion or pumpkin.",
    typicalIngredients: [
      "Steamed dumplings",
      "Minced lamb",
      "Onion or pumpkin"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "non": {
    id: "non",
    canonicalName: "Non",
    aliases: [
      "uzbek bread",
      "non bread"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "Round, tandoor-baked bread, central to Uzbek meals and hospitality customs.",
    typicalIngredients: [
      "Wheat flour (tandoor-baked bread)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "chuchvara": {
    id: "chuchvara",
    canonicalName: "Chuchvara",
    aliases: [
      "chuchvara"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Small meat-filled dumplings served in broth or with a yoghurt/vinegar dressing.",
    typicalIngredients: [
      "Dumplings",
      "Minced meat",
      "Broth or yoghurt dressing"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "mastava": {
    id: "mastava",
    canonicalName: "Mastava",
    aliases: [
      "mastava"
    ],
    country: "Uzbekistan",
    region: "central_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A rice soup with meat, vegetables and often a splash of yoghurt.",
    typicalIngredients: [
      "Rice",
      "Meat",
      "Vegetables",
      "Yoghurt"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "kyrgyz-borsok": {
    id: "kyrgyz-borsok",
    canonicalName: "Kyrgyz Borsok",
    aliases: [
      "boorsok"
    ],
    country: "Kyrgyzstan",
    region: "central_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Fried pieces of dough, served with tea as an everyday bread-like snack in Kyrgyzstan.",
    typicalIngredients: [
      "Fried dough"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "kymyz": {
    id: "kymyz",
    canonicalName: "Kymyz",
    aliases: [
      "kumis kyrgyz"
    ],
    country: "Kyrgyzstan",
    region: "central_asian",
    subgroup: null,
    category: "beverage_ferment_alcohol",
    culturalContext: "Fermented mare's milk, a traditional Kyrgyz summer drink; fermentation produces a small amount of alcohol and the milk is traditionally unpasteurized.",
    typicalIngredients: [
      "Fermented mare's milk"
    ],
    nutrition: [
      "Varies — traditionally fermented beverage"
    ],
    safeWhen: [
      "consumed by non-pregnant, non-breastfeeding adults, aware that it is a fermented/alcoholic beverage"
    ],
    cautionWhen: [
      "homemade or informally fermented batches, where alcohol content and hygiene can vary",
      "homemade/informal batches where alcohol content varies",
      "informally/home-produced batches where pasteurization can't be confirmed"
    ],
    avoidWhen: [
      "pregnancy and breastfeeding — this beverage is a fermented, alcohol-containing (and sometimes unpasteurized-dairy-based) drink, and no amount of alcohol is confirmed safe in pregnancy",
      "in pregnancy and while trying to limit alcohol — fermentation produces measurable alcohol content in this drink",
      "versions confirmed to be made from unpasteurized milk, during pregnancy"
    ],
    alternatives: [
      "A non-fermented (non-alcoholic) fermented-milk product such as kefir made from pasteurized milk",
      "Plain ayran or a yoghurt drink"
    ],
    reproductiveHealth: {
      general: "A traditional fermented beverage that does contain alcohol — treat it the same as any other alcoholic drink when deciding whether/how much to have.",
      pregnancy: "Avoid — this is an alcohol-containing beverage. UK guidance is that the safest approach in pregnancy is not to drink alcohol at all.",
      postpartum: "Standard alcohol-and-breastfeeding guidance applies if breastfeeding (see breastfeeding note).",
      breastfeeding: "If consumed, standard alcohol-and-breastfeeding timing guidance applies (e.g. spacing feeds after drinking) — speak with a health visitor or midwife for individual guidance.",
      menstrual: "No specific menstrual-health restriction beyond standard alcohol guidance.",
      menopause: "Alcohol can be a trigger for hot flashes in some people.",
      preconception: "Many preconception guidelines suggest limiting alcohol; discuss with a healthcare professional if trying to conceive.",
    },
    evidence: "established",
    flags: [
      "alcohol_ferment",
      "unpasteurized_dairy_risk"
    ],
  },
  "chak-chak": {
    id: "chak-chak",
    canonicalName: "Chak Chak",
    aliases: [
      "chak-chak"
    ],
    country: "Kyrgyzstan",
    region: "central_asian",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "Deep-fried dough pieces bound together with honey syrup, a festive Central Asian sweet.",
    typicalIngredients: [
      "Fried dough pieces",
      "Honey syrup"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "hummus": {
    id: "hummus",
    canonicalName: "Hummus",
    aliases: [
      "houmous"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "legume",
    culturalContext: "A dip of blended chickpeas, tahini, lemon and garlic, eaten across the Levant.",
    typicalIngredients: [
      "Chickpeas",
      "Tahini",
      "Lemon",
      "Garlic"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "tabbouleh": {
    id: "tabbouleh",
    canonicalName: "Tabbouleh",
    aliases: [
      "tabouli"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A parsley-forward salad with tomato, mint, bulgur and lemon dressing.",
    typicalIngredients: [
      "Parsley",
      "Tomato",
      "Mint",
      "Bulgur",
      "Lemon"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "falafel": {
    id: "falafel",
    canonicalName: "Falafel",
    aliases: [
      "falafel"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Deep-fried patties made from ground chickpeas and/or fava beans with herbs and spices.",
    typicalIngredients: [
      "Ground chickpeas and/or fava beans",
      "Herbs",
      "Spices"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "shawarma": {
    id: "shawarma",
    canonicalName: "Shawarma",
    aliases: [
      "shawarma"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Spit-roasted, thinly sliced marinated meat (or increasingly, chicken), served in flatbread with garlic sauce and pickles.",
    typicalIngredients: [
      "Marinated meat or chicken",
      "Flatbread",
      "Garlic sauce",
      "Pickles"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "baklava": {
    id: "baklava",
    canonicalName: "Baklava",
    aliases: [
      "baklawa"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "Layered filo pastry with chopped nuts, sweetened with a sugar or honey syrup.",
    typicalIngredients: [
      "Filo pastry",
      "Chopped nuts",
      "Sugar or honey syrup"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "manakish": {
    id: "manakish",
    canonicalName: "Manakish",
    aliases: [
      "manaeesh",
      "manakeesh"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A flatbread topped with za'atar, cheese or ground meat and baked — a common Lebanese breakfast.",
    typicalIngredients: [
      "Flatbread dough",
      "Za'atar, cheese or ground meat topping"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "kibbeh": {
    id: "kibbeh",
    canonicalName: "Kibbeh",
    aliases: [
      "kibbe"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A dish of bulgur mixed with minced meat and spices, served baked, fried or (in some regional styles) raw.",
    typicalIngredients: [
      "Bulgur",
      "Minced meat",
      "Onion",
      "Spices"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium",
      "the traditional raw or lightly-cooked version, for anyone immunocompromised"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein",
      "the raw/undercooked traditional preparation during pregnancy — a fully cooked version of this dish is the lower-risk choice and still culturally authentic"
    ],
    alternatives: [
      "The baked or fried fully-cooked version instead of the raw regional style",
      "Kofte (fully-cooked spiced ground meat) as a related dish"
    ],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically. A fully cooked version is available and is the safer choice in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [
      "raw_or_undercooked_traditional"
    ],
  },
  "labneh": {
    id: "labneh",
    canonicalName: "Labneh",
    aliases: [
      "labaneh"
    ],
    country: "Lebanon",
    region: "west_asian",
    subgroup: null,
    category: "dairy_ferment",
    culturalContext: "Strained yoghurt with a thick, cheese-like consistency, usually served with olive oil.",
    typicalIngredients: [
      "Strained yoghurt",
      "Olive oil"
    ],
    nutrition: [
      "Protein",
      "Calcium",
      "Probiotics (fermented dairy)"
    ],
    safeWhen: [
      "made from pasteurized milk"
    ],
    cautionWhen: [
      "homemade or informally produced versions where pasteurization can't be confirmed"
    ],
    avoidWhen: [
      "versions made from unpasteurized ('raw') milk during pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A fermented dairy or soy food; choose pasteurized-milk versions where dairy-based.",
      pregnancy: "Confirm the product is made from pasteurized milk — unpasteurized soft/fresh dairy products carry a listeria-related caution in pregnancy specifically.",
      postpartum: "A useful calcium and protein source during recovery.",
      breastfeeding: "No specific concerns beyond choosing pasteurized dairy.",
      menstrual: "Calcium and magnesium in dairy are sometimes discussed in relation to period symptoms, though evidence is limited.",
      menopause: "Calcium content is relevant to bone-health considerations around menopause.",
      preconception: "No specific concerns beyond choosing pasteurized dairy.",
    },
    evidence: "limited",
    flags: [],
  },
  "kabsa": {
    id: "kabsa",
    canonicalName: "Kabsa",
    aliases: [
      "kabsa"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A spiced rice dish with meat or chicken, considered a Saudi national dish.",
    typicalIngredients: [
      "Rice",
      "Meat or chicken",
      "Spice blend"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "mandi": {
    id: "mandi",
    canonicalName: "Mandi",
    aliases: [
      "mandi"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice and meat slow-cooked (traditionally in an underground pit oven), a Yemeni-Saudi/Gulf specialty.",
    typicalIngredients: [
      "Rice",
      "Meat",
      "Pit-oven cooking"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "dates": {
    id: "dates",
    canonicalName: "Dates",
    aliases: [
      "tamr"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "fruit_raw",
    culturalContext: "A sweet, energy-dense fruit central to Gulf cuisine and hospitality, and culturally associated in the region with late pregnancy and labour, though this remains an area of limited/ongoing scientific evidence rather than an established medical claim.",
    typicalIngredients: [
      "Dates (fruit)"
    ],
    nutrition: [
      "Vitamin C",
      "Fibre",
      "Natural sugars"
    ],
    safeWhen: [
      "washed before eating; ripe where ripeness affects safety (see dish-specific notes)"
    ],
    cautionWhen: [
      "large quantities of dried/concentrated fruit, for sugar content"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "Fresh fruit is a good source of vitamins and fibre and fits well across the reproductive journey.",
      pregnancy: "Wash thoroughly before eating.",
      postpartum: "A useful, easy source of vitamins during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Vitamin C from fruit can support iron absorption from other foods eaten at the same meal.",
      menopause: "Fibre and antioxidants are relevant to general cardiovascular health.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "gahwa": {
    id: "gahwa",
    canonicalName: "Gahwa",
    aliases: [
      "arabic coffee",
      "qahwa"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "beverage_hot",
    culturalContext: "Lightly roasted, cardamom-spiced Arabic coffee, traditionally served in small cups as a hospitality gesture.",
    typicalIngredients: [
      "Lightly roasted coffee",
      "Cardamom"
    ],
    nutrition: [
      "Contains caffeine (amount varies by preparation and strength)"
    ],
    safeWhen: [
      "consumed in moderate amounts within recommended daily caffeine limits"
    ],
    cautionWhen: [
      "multiple cups a day — caffeine is cumulative across all sources (tea, coffee, cola, chocolate)",
      "total daily caffeine across all sources, not just this drink"
    ],
    avoidWhen: [],
    alternatives: [
      "Decaffeinated Arabic-style coffee prepared the same way with cardamom",
      "Cardamom-spiced herbal tea"
    ],
    reproductiveHealth: {
      general: "A caffeinated beverage; total daily caffeine from all sources is the relevant consideration.",
      pregnancy: "UK (NHS) guidance recommends keeping total caffeine under 200mg/day in pregnancy — this drink counts toward that total alongside coffee, cola and chocolate.",
      postpartum: "Caffeine can pass into breast milk in small amounts and may affect some babies' sleep; moderate intake is generally the guidance.",
      breastfeeding: "Same moderate-intake consideration as postpartum.",
      menstrual: "Some people find high caffeine intake worsens cramping or anxiety around their period — this varies by individual.",
      menopause: "Caffeine can be a trigger for hot flashes in some people.",
      preconception: "No specific restriction beyond general moderate-caffeine guidance.",
    },
    evidence: "established",
    flags: [
      "caffeine"
    ],
  },
  "jareesh": {
    id: "jareesh",
    canonicalName: "Jareesh",
    aliases: [
      "jareesh"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Cracked wheat cooked into a thick, porridge-like dish with meat, onion and spices.",
    typicalIngredients: [
      "Cracked wheat",
      "Meat",
      "Onion",
      "Spices"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "harees": {
    id: "harees",
    canonicalName: "Harees",
    aliases: [
      "harees",
      "harissa wheat dish"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Wheat and meat slow-cooked and beaten together into a smooth, porridge-like dish, often eaten during Ramadan.",
    typicalIngredients: [
      "Wheat",
      "Meat (beaten smooth)"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "mutabbaq": {
    id: "mutabbaq",
    canonicalName: "Mutabbaq",
    aliases: [
      "mutabbak",
      "murtabak"
    ],
    country: "Saudi Arabia",
    region: "west_asian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A stuffed, pan-fried flatbread filled with minced meat, egg and onion.",
    typicalIngredients: [
      "Flatbread",
      "Minced meat",
      "Egg",
      "Onion"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "ghormeh-sabzi": {
    id: "ghormeh-sabzi",
    canonicalName: "Ghormeh Sabzi",
    aliases: [
      "ghormeh sabzi"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A herb-forward Persian stew (parsley, coriander, fenugreek) with dried limes and kidney beans, often considered Iran's national dish.",
    typicalIngredients: [
      "Herbs (parsley, coriander, fenugreek)",
      "Dried lime",
      "Kidney beans",
      "Meat"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "chelo-kabab": {
    id: "chelo-kabab",
    canonicalName: "Chelo Kabab",
    aliases: [
      "chelow kabab"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Grilled skewered meat (minced or whole cuts) served with saffron-buttered steamed rice.",
    typicalIngredients: [
      "Skewered minced or whole-cut meat",
      "Saffron rice"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "tahdig": {
    id: "tahdig",
    canonicalName: "Tahdig",
    aliases: [
      "tahdig"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "The crisped, golden layer of rice formed at the bottom of the pot during Persian rice cooking, prized as a delicacy.",
    typicalIngredients: [
      "Rice",
      "Butter or oil (crisped bottom layer)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "fesenjan": {
    id: "fesenjan",
    canonicalName: "Fesenjan",
    aliases: [
      "fesenjoon"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A stew of ground walnuts and pomegranate molasses, usually with chicken or duck, giving a sweet-tart flavour.",
    typicalIngredients: [
      "Ground walnuts",
      "Pomegranate molasses",
      "Chicken or duck"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "zereshk-polo": {
    id: "zereshk-polo",
    canonicalName: "Zereshk Polo",
    aliases: [
      "zereshk polo"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Saffron rice studded with tart barberries, typically served with chicken.",
    typicalIngredients: [
      "Saffron rice",
      "Barberries",
      "Chicken"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "ash-reshteh": {
    id: "ash-reshteh",
    canonicalName: "Ash Reshteh",
    aliases: [
      "ash-e reshteh"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A thick Persian noodle soup with herbs, beans and often a fermented whey (kashk) topping.",
    typicalIngredients: [
      "Noodles",
      "Herbs",
      "Beans",
      "Kashk (fermented whey)"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "kashk-e-bademjan": {
    id: "kashk-e-bademjan",
    canonicalName: "Kashk-e Bademjan",
    aliases: [
      "kashk bademjan"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A dip/side of fried eggplant mashed with kashk (a fermented whey product), garlic and mint.",
    typicalIngredients: [
      "Fried eggplant",
      "Kashk",
      "Garlic",
      "Mint"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "saffron-rice": {
    id: "saffron-rice",
    canonicalName: "Saffron Rice",
    aliases: [
      "zaferan polo"
    ],
    country: "Iran",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Steamed rice finished with a saffron-and-butter (or oil) infusion for colour and aroma.",
    typicalIngredients: [
      "Rice",
      "Saffron",
      "Butter or oil"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "menemen": {
    id: "menemen",
    canonicalName: "Menemen",
    aliases: [
      "menemen"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A Turkish breakfast dish of eggs cooked with tomato, green pepper and often cheese.",
    typicalIngredients: [
      "Eggs",
      "Tomato",
      "Green pepper",
      "Cheese (optional)"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "kebabs": {
    id: "kebabs",
    canonicalName: "Kebabs",
    aliases: [
      "kebab",
      "kofte"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A broad category of grilled or skewered meat dishes, central to Turkish cuisine.",
    typicalIngredients: [
      "Ground or cubed meat",
      "Spices",
      "Skewers"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "turkish-tea": {
    id: "turkish-tea",
    canonicalName: "Turkish Tea",
    aliases: [
      "cay",
      "çay"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "beverage_hot",
    culturalContext: "Strong black tea served in small tulip-shaped glasses, drunk throughout the day in Türkiye.",
    typicalIngredients: [
      "Black tea"
    ],
    nutrition: [
      "Contains caffeine (amount varies by preparation and strength)"
    ],
    safeWhen: [
      "consumed in moderate amounts within recommended daily caffeine limits"
    ],
    cautionWhen: [
      "multiple cups a day — caffeine is cumulative across all sources (tea, coffee, cola, chocolate)",
      "total daily caffeine across all sources, not just this drink"
    ],
    avoidWhen: [],
    alternatives: [
      "Decaffeinated black tea or apple tea (elma çayı), served the same way",
      "Herbal tea such as linden (ıhlamur)"
    ],
    reproductiveHealth: {
      general: "A caffeinated beverage; total daily caffeine from all sources is the relevant consideration.",
      pregnancy: "UK (NHS) guidance recommends keeping total caffeine under 200mg/day in pregnancy — this drink counts toward that total alongside coffee, cola and chocolate.",
      postpartum: "Caffeine can pass into breast milk in small amounts and may affect some babies' sleep; moderate intake is generally the guidance.",
      breastfeeding: "Same moderate-intake consideration as postpartum.",
      menstrual: "Some people find high caffeine intake worsens cramping or anxiety around their period — this varies by individual.",
      menopause: "Caffeine can be a trigger for hot flashes in some people.",
      preconception: "No specific restriction beyond general moderate-caffeine guidance.",
    },
    evidence: "established",
    flags: [
      "caffeine"
    ],
  },
  "dolma": {
    id: "dolma",
    canonicalName: "Dolma",
    aliases: [
      "dolma",
      "sarma"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Vegetables or grape/cabbage leaves stuffed with a rice (and sometimes meat) filling.",
    typicalIngredients: [
      "Grape or cabbage leaves",
      "Rice",
      "Meat (optional)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "pide": {
    id: "pide",
    canonicalName: "Pide",
    aliases: [
      "pide"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A boat-shaped leavened flatbread topped with cheese, meat or vegetables and baked — sometimes called 'Turkish pizza'.",
    typicalIngredients: [
      "Leavened flatbread dough",
      "Cheese, meat or vegetable topping"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "lahmacun": {
    id: "lahmacun",
    canonicalName: "Lahmacun",
    aliases: [
      "lahmajoun"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A thin, crisp flatbread topped with minced meat, herbs and spices.",
    typicalIngredients: [
      "Thin flatbread",
      "Minced meat",
      "Herbs",
      "Spices"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "borek": {
    id: "borek",
    canonicalName: "Börek",
    aliases: [
      "boreka",
      "borek"
    ],
    country: "Türkiye",
    region: "west_asian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "Layered filo pastry filled with cheese, spinach or minced meat, baked or fried.",
    typicalIngredients: [
      "Filo pastry",
      "Cheese, spinach or minced meat"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "ackee-saltfish": {
    id: "ackee-saltfish",
    canonicalName: "Ackee & Saltfish",
    aliases: [
      "ackee and saltfish"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "fruit_raw",
    culturalContext: "Jamaica's national dish, combining the fruit of the ackee tree with salted, desalted codfish.",
    typicalIngredients: [
      "Ackee fruit (naturally ripened)",
      "Saltfish (desalted)",
      "Onion",
      "Tomato",
      "Scotch bonnet"
    ],
    nutrition: [
      "Vitamin C",
      "Fibre",
      "Natural sugars"
    ],
    safeWhen: [
      "washed before eating; ripe where ripeness affects safety (see dish-specific notes)"
    ],
    cautionWhen: [
      "large quantities of dried/concentrated fruit, for sugar content",
      "ackee that is not fully, naturally ripened"
    ],
    avoidWhen: [
      "unripe or forced/artificially opened ackee — it contains hypoglycin A/B and can cause serious poisoning (Jamaican vomiting sickness); only naturally ripened, naturally opened ackee pods should ever be eaten, per Jamaica Ministry of Health guidance",
      "saltfish that has not been properly desalted before cooking (sodium concern, not a toxicity one)"
    ],
    alternatives: [
      "The same dish made with confirmed naturally ripened, naturally opened ackee and well-desalted saltfish",
      "Vegetable and saltfish stew (callaloo/tomato-based) without ackee, or a tofu scramble prepared in the same style"
    ],
    reproductiveHealth: {
      general: "Fresh fruit is a good source of vitamins and fibre and fits well across the reproductive journey.",
      pregnancy: "Wash thoroughly before eating. Only use naturally ripened, naturally opened ackee, and ensure saltfish is thoroughly desalted before cooking — this is a genuine, well-documented food-safety distinction, not a blanket 'ackee is unsafe' rule.",
      postpartum: "A useful, easy source of vitamins during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Vitamin C from fruit can support iron absorption from other foods eaten at the same meal.",
      menopause: "Fibre and antioxidants are relevant to general cardiovascular health.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [
      "unripe_toxic"
    ],
  },
  "jerk-chicken": {
    id: "jerk-chicken",
    canonicalName: "Jerk Chicken",
    aliases: [
      "jerk chicken"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Chicken marinated in a Scotch-bonnet-and-allspice jerk seasoning and grilled or smoked.",
    typicalIngredients: [
      "Chicken",
      "Scotch bonnet",
      "Allspice",
      "Thyme"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "rice-peas": {
    id: "rice-peas",
    canonicalName: "Rice & Peas",
    aliases: [
      "rice and peas"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "Rice cooked with kidney beans (or gungo/pigeon peas) and coconut milk, a staple across much of the Caribbean.",
    typicalIngredients: [
      "Rice",
      "Kidney or gungo peas",
      "Coconut milk"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "callaloo": {
    id: "callaloo",
    canonicalName: "Callaloo",
    aliases: [
      "callaloo"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A leafy green (amaranth in Jamaica; taro/dasheen leaf elsewhere in the Caribbean) sautéed or stewed, often with onion and okra.",
    typicalIngredients: [
      "Callaloo/amaranth or taro leaf",
      "Onion",
      "Okra (optional)"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "festival": {
    id: "festival",
    canonicalName: "Festival",
    aliases: [
      "festival dumpling"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A slightly sweet, deep-fried cornmeal-and-flour dumpling, traditionally served alongside fried fish.",
    typicalIngredients: [
      "Cornmeal",
      "Flour",
      "Sugar (fried dumpling)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "fried-dumplings": {
    id: "fried-dumplings",
    canonicalName: "Fried Dumplings",
    aliases: [
      "johnny cakes",
      "fried dumpling"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Deep-fried or pan-fried flour dumplings, a common Jamaican breakfast starch.",
    typicalIngredients: [
      "Flour",
      "Water",
      "Baking powder"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "jamaican-patty": {
    id: "jamaican-patty",
    canonicalName: "Jamaican Patty",
    aliases: [
      "beef patty jamaican"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A flaky, turmeric- or annatto-coloured pastry filled with spiced meat, vegetables, or cheese.",
    typicalIngredients: [
      "Pastry (turmeric/annatto)",
      "Spiced meat, vegetable or cheese filling"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "bammy": {
    id: "bammy",
    canonicalName: "Bammy",
    aliases: [
      "bammy"
    ],
    country: "Jamaica",
    region: "jamaican",
    subgroup: null,
    category: "staple_starch",
    culturalContext: "A flatbread made from cassava, traditionally soaked in coconut milk and fried, served with fried fish.",
    typicalIngredients: [
      "Cassava (grated, pressed)",
      "Coconut milk (soaking)"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "doubles": {
    id: "doubles",
    canonicalName: "Doubles",
    aliases: [
      "doubles"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Two pieces of fried flatbread (bara) filled with curried channa (chickpeas), a beloved Trinidadian street-food breakfast.",
    typicalIngredients: [
      "Fried flatbread (bara)",
      "Curried channa (chickpeas)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "pelau": {
    id: "pelau",
    canonicalName: "Pelau",
    aliases: [
      "pelau"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "rice_grain",
    culturalContext: "A one-pot dish of caramelised meat (or plant protein), rice, pigeon peas and coconut milk.",
    typicalIngredients: [
      "Rice",
      "Caramelised meat or plant protein",
      "Pigeon peas",
      "Coconut milk"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "bakes": {
    id: "bakes",
    canonicalName: "Bakes",
    aliases: [
      "fried bake",
      "bake"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Fried or baked flatbread, often served with saltfish (bake and shark or bake and saltfish).",
    typicalIngredients: [
      "Flour",
      "Baking powder (fried or baked)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "shark-bake": {
    id: "shark-bake",
    canonicalName: "Shark & Bake",
    aliases: [
      "shark and bake",
      "bake and shark"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "seafood_shellfish",
    culturalContext: "Fried shark fillet served in fried bake with condiments — a popular Trinidadian beach food; shark is a species associated with higher mercury levels.",
    typicalIngredients: [
      "Shark fillet (fried)",
      "Fried bake",
      "Condiments"
    ],
    nutrition: [
      "Protein",
      "Omega-3 fatty acids",
      "Iodine (in some seafood)"
    ],
    safeWhen: [
      "thoroughly cooked and, for shellfish, properly cleaned/prepared"
    ],
    cautionWhen: [
      "species known to accumulate higher mercury levels — check local guidance on safe weekly amounts",
      "this species is associated with higher mercury accumulation than most fish"
    ],
    avoidWhen: [
      "raw or undercooked shellfish/seafood, and high-mercury species, particularly in pregnancy",
      "frequent or large portions during pregnancy and for young children, per general high-mercury-fish guidance"
    ],
    alternatives: [
      "The same fried-bake preparation made with a lower-mercury fish (e.g. snapper or tilapia) instead of shark",
      "Bake and saltfish, a related Trinidadian dish using a lower-mercury fish"
    ],
    reproductiveHealth: {
      general: "A useful omega-3 and protein source; species choice and thorough cooking are the key considerations.",
      pregnancy: "Favour lower-mercury species and ensure thorough cooking; check local (e.g. NHS/FDA) guidance on species and weekly amounts. This species is one that general guidance (e.g. NHS/FDA 'fish to avoid' lists) flags for higher mercury content — check current local guidance before eating it during pregnancy.",
      postpartum: "Omega-3s are commonly discussed as relevant to postpartum mood and recovery, though this is an area of ongoing research rather than a guaranteed effect.",
      breastfeeding: "Similar species/mercury considerations as pregnancy are often applied out of caution.",
      menstrual: "No specific concerns beyond general food safety.",
      menopause: "Omega-3s are relevant to cardiovascular health discussions generally.",
      preconception: "No specific concerns beyond species/mercury awareness.",
    },
    evidence: "limited",
    flags: [
      "high_mercury_fish"
    ],
  },
  "aloo-pie": {
    id: "aloo-pie",
    canonicalName: "Aloo Pie",
    aliases: [
      "aloo pie"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "A fried pastry filled with spiced mashed potato, part of Trinidad's Indo-Caribbean street-food tradition.",
    typicalIngredients: [
      "Pastry",
      "Spiced mashed potato filling"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "pholourie": {
    id: "pholourie",
    canonicalName: "Pholourie",
    aliases: [
      "phulourie"
    ],
    country: "Trinidad & Tobago",
    region: "trinidad_tobagonian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Small deep-fried balls of spiced split-pea batter, served with tamarind or mango chutney.",
    typicalIngredients: [
      "Split pea batter (fried)",
      "Tamarind or mango chutney"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "cou-cou-flying-fish": {
    id: "cou-cou-flying-fish",
    canonicalName: "Cou-Cou & Flying Fish",
    aliases: [
      "cou-cou and flying fish",
      "coucou and flying fish"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "seafood_shellfish",
    culturalContext: "Barbados' national dish: a cornmeal-and-okra mash served with steamed, seasoned flying fish.",
    typicalIngredients: [
      "Cornmeal",
      "Okra",
      "Steamed flying fish"
    ],
    nutrition: [
      "Protein",
      "Omega-3 fatty acids",
      "Iodine (in some seafood)"
    ],
    safeWhen: [
      "thoroughly cooked and, for shellfish, properly cleaned/prepared"
    ],
    cautionWhen: [
      "species known to accumulate higher mercury levels — check local guidance on safe weekly amounts"
    ],
    avoidWhen: [
      "raw or undercooked shellfish/seafood, and high-mercury species, particularly in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A useful omega-3 and protein source; species choice and thorough cooking are the key considerations.",
      pregnancy: "Favour lower-mercury species and ensure thorough cooking; check local (e.g. NHS/FDA) guidance on species and weekly amounts.",
      postpartum: "Omega-3s are commonly discussed as relevant to postpartum mood and recovery, though this is an area of ongoing research rather than a guaranteed effect.",
      breastfeeding: "Similar species/mercury considerations as pregnancy are often applied out of caution.",
      menstrual: "No specific concerns beyond general food safety.",
      menopause: "Omega-3s are relevant to cardiovascular health discussions generally.",
      preconception: "No specific concerns beyond species/mercury awareness.",
    },
    evidence: "limited",
    flags: [],
  },
  "pudding-souse": {
    id: "pudding-souse",
    canonicalName: "Pudding & Souse",
    aliases: [
      "pudding and souse"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "A traditional Saturday dish of pickled pork (souse) served with a spiced sweet-potato pudding.",
    typicalIngredients: [
      "Pickled pork (souse)",
      "Spiced sweet-potato pudding"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "macaroni-pie": {
    id: "macaroni-pie",
    canonicalName: "Macaroni Pie",
    aliases: [
      "macaroni pie"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "other",
    culturalContext: "A baked, custard-style macaroni-and-cheese, a Bajan Sunday-dinner staple.",
    typicalIngredients: [
      "Macaroni",
      "Cheese",
      "Egg",
      "Milk"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "bajan-roti": {
    id: "bajan-roti",
    canonicalName: "Bajan Roti",
    aliases: [
      "barbadian roti"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "bread_starch",
    culturalContext: "A curry-filled flatbread, a Bajan take on the wider Caribbean roti tradition.",
    typicalIngredients: [
      "Flatbread",
      "Curried filling"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "fish-cakes": {
    id: "fish-cakes",
    canonicalName: "Fish Cakes",
    aliases: [
      "saltfish cakes"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Deep-fried fritters made from desalted saltfish and seasoned batter.",
    typicalIngredients: [
      "Desalted saltfish",
      "Seasoned batter (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "conkies": {
    id: "conkies",
    canonicalName: "Conkies",
    aliases: [
      "conkies"
    ],
    country: "Barbados",
    region: "barbadian",
    subgroup: null,
    category: "dessert_sweet",
    culturalContext: "A sweet steamed pudding of cornmeal, coconut, pumpkin and sweet potato wrapped in banana leaf, traditionally eaten around Independence Day.",
    typicalIngredients: [
      "Cornmeal",
      "Coconut",
      "Pumpkin",
      "Sweet potato",
      "Banana leaf"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "griot": {
    id: "griot",
    canonicalName: "Griot",
    aliases: [
      "griyo"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "protein_meat_fish",
    culturalContext: "Chunks of pork marinated in citrus and spices, braised then fried until crisp, usually served with pikliz.",
    typicalIngredients: [
      "Pork",
      "Citrus marinade",
      "Spices (braised then fried)"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "soup-joumou": {
    id: "soup-joumou",
    canonicalName: "Soup Joumou",
    aliases: [
      "soup joumou",
      "joumou soup"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "soup_stew",
    culturalContext: "A pumpkin soup with beef and vegetables, historically significant as the dish eaten to celebrate Haitian independence.",
    typicalIngredients: [
      "Pumpkin",
      "Beef",
      "Vegetables"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "plantains": {
    id: "plantains",
    canonicalName: "Plantains",
    aliases: [
      "bannann peze",
      "fried plantain"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Fried plantain slices (bannann peze/fritay), a very common Haitian side.",
    typicalIngredients: [
      "Plantain (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "akra": {
    id: "akra",
    canonicalName: "Akra",
    aliases: [
      "akra",
      "malanga fritters"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "fried_snack",
    culturalContext: "Fried fritters made from grated malanga (taro) root, often spiced with Scotch bonnet.",
    typicalIngredients: [
      "Grated malanga (taro) root",
      "Scotch bonnet (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "pikliz": {
    id: "pikliz",
    canonicalName: "Pikliz",
    aliases: [
      "pikliz"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "vegetable_leafy",
    culturalContext: "A spicy pickled-vegetable condiment (cabbage, carrot, Scotch bonnet in vinegar), served with most Haitian meals.",
    typicalIngredients: [
      "Cabbage",
      "Carrot",
      "Scotch bonnet",
      "Vinegar"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "lambi": {
    id: "lambi",
    canonicalName: "Lambi",
    aliases: [
      "conch",
      "lambi"
    ],
    country: "Haiti",
    region: "haitian",
    subgroup: null,
    category: "seafood_shellfish",
    culturalContext: "Conch (a large sea snail), typically stewed (lambi en sauce) or grilled; needs thorough cooking and cleaning as with other shellfish.",
    typicalIngredients: [
      "Conch",
      "Sauce or grill marinade"
    ],
    nutrition: [
      "Protein",
      "Omega-3 fatty acids",
      "Iodine (in some seafood)"
    ],
    safeWhen: [
      "thoroughly cooked and, for shellfish, properly cleaned/prepared"
    ],
    cautionWhen: [
      "species known to accumulate higher mercury levels — check local guidance on safe weekly amounts"
    ],
    avoidWhen: [
      "raw or undercooked shellfish/seafood, and high-mercury species, particularly in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A useful omega-3 and protein source; species choice and thorough cooking are the key considerations.",
      pregnancy: "Favour lower-mercury species and ensure thorough cooking; check local (e.g. NHS/FDA) guidance on species and weekly amounts.",
      postpartum: "Omega-3s are commonly discussed as relevant to postpartum mood and recovery, though this is an area of ongoing research rather than a guaranteed effect.",
      breastfeeding: "Similar species/mercury considerations as pregnancy are often applied out of caution.",
      menstrual: "No specific concerns beyond general food safety.",
      menopause: "Omega-3s are relevant to cardiovascular health discussions generally.",
      preconception: "No specific concerns beyond species/mercury awareness.",
    },
    evidence: "limited",
    flags: [],
  },
  "hoppin-john": {
    id: "hoppin-john",
    canonicalName: "Hoppin' John",
    aliases: [
      "hoppin john"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "legume",
    culturalContext: "Black-eyed peas and rice cooked together, traditionally eaten in the US South on New Year's Day for good luck.",
    typicalIngredients: [
      "Black-eyed peas",
      "Rice"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "gumbo": {
    id: "gumbo",
    canonicalName: "Gumbo",
    aliases: [
      "gumbo"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "soup_stew",
    culturalContext: "A Louisiana stew built on a roux, with the 'holy trinity' of vegetables, and often okra, sausage, chicken and/or seafood.",
    typicalIngredients: [
      "Roux",
      "Okra",
      "Sausage, chicken and/or seafood",
      "Vegetable trinity"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "jambalaya": {
    id: "jambalaya",
    canonicalName: "Jambalaya",
    aliases: [
      "jambalaya"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "rice_grain",
    culturalContext: "A one-pot Louisiana rice dish with sausage, chicken and/or seafood and the Cajun/Creole vegetable base.",
    typicalIngredients: [
      "Rice",
      "Sausage, chicken and/or seafood",
      "Vegetable trinity"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "cornbread": {
    id: "cornbread",
    canonicalName: "Cornbread",
    aliases: [
      "corn bread"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "bread_starch",
    culturalContext: "A cornmeal-based quick bread, a staple side across Southern/soul food cooking.",
    typicalIngredients: [
      "Cornmeal",
      "Flour",
      "Egg",
      "Milk"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "red-beans-rice": {
    id: "red-beans-rice",
    canonicalName: "Red Beans & Rice",
    aliases: [
      "red beans and rice"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "legume",
    culturalContext: "Red beans slow-cooked with the vegetable trinity and often sausage, served over rice — a New Orleans Monday tradition.",
    typicalIngredients: [
      "Red beans",
      "Rice",
      "Sausage",
      "Vegetable trinity"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "sweet-potato-pie": {
    id: "sweet-potato-pie",
    canonicalName: "Sweet Potato Pie",
    aliases: [
      "sweet potato pie"
    ],
    country: "African American",
    region: "north_american",
    subgroup: "african_american",
    category: "dessert_sweet",
    culturalContext: "A baked, spiced sweet-potato custard pie, a staple soul-food dessert especially around holidays.",
    typicalIngredients: [
      "Sweet potato",
      "Pastry",
      "Sugar",
      "Spices"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "tamales": {
    id: "tamales",
    canonicalName: "Tamales",
    aliases: [
      "tamales"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "staple_starch",
    culturalContext: "Masa (corn dough) filled with meat, cheese or vegetables, wrapped in a corn husk or banana leaf and steamed.",
    typicalIngredients: [
      "Masa (corn dough)",
      "Meat, cheese or vegetable filling",
      "Corn husk"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "pozole": {
    id: "pozole",
    canonicalName: "Pozole",
    aliases: [
      "posole"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "soup_stew",
    culturalContext: "A hominy-based soup with pork or chicken, traditionally garnished with cabbage, radish, lime and chilli.",
    typicalIngredients: [
      "Hominy",
      "Pork or chicken",
      "Cabbage",
      "Radish",
      "Lime"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "tacos": {
    id: "tacos",
    canonicalName: "Tacos",
    aliases: [
      "tacos"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "other",
    culturalContext: "Corn or wheat tortillas folded around a filling of meat, beans, vegetables and/or cheese.",
    typicalIngredients: [
      "Corn or wheat tortilla",
      "Meat, beans or vegetables"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "mole": {
    id: "mole",
    canonicalName: "Mole",
    aliases: [
      "mole sauce"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "soup_stew",
    culturalContext: "A category of complex Mexican sauces, most famously mole poblano (chilli, chocolate and spices), served over meat.",
    typicalIngredients: [
      "Chilli",
      "Chocolate",
      "Spices",
      "Meat"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "sopa-de-fideo": {
    id: "sopa-de-fideo",
    canonicalName: "Sopa de Fideo",
    aliases: [
      "fideo soup"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "soup_stew",
    culturalContext: "A tomato-based soup with toasted vermicelli noodles, a common Mexican home-cooked comfort food.",
    typicalIngredients: [
      "Vermicelli noodles",
      "Tomato broth"
    ],
    nutrition: [
      "Protein",
      "Vitamins (varies by vegetables used)",
      "Iron (if leafy greens or meat/fish included)"
    ],
    safeWhen: [
      "meat, fish and eggs are cooked thoroughly",
      "made with clean water and properly stored leftovers"
    ],
    cautionWhen: [
      "prepared with a lot of added salt or stock cubes",
      "made with a large amount of oil/palm oil"
    ],
    avoidWhen: [
      "meat or fish inside is undercooked or reheated unsafely"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the main considerations are the specific ingredients used (see this dish's own notes).",
      pregnancy: "Choose versions where meat/fish are fully cooked; watch sodium if store-bought stock is used.",
      postpartum: "Warm, easy-to-eat soups/stews are commonly used across cultures for postpartum recovery meals; this is a traditional practice rather than an established clinical claim.",
      breastfeeding: "No specific concerns beyond general food safety and moderate sodium.",
      menstrual: "Warm, iron-containing soups can be a comfortable choice during a period if they include leafy greens, beans or meat.",
      menopause: "Watch sodium content for cardiovascular and bone health if eaten often.",
      preconception: "No specific concerns beyond general food safety.",
    },
    evidence: "limited",
    flags: [],
  },
  "arroz-con-leche": {
    id: "arroz-con-leche",
    canonicalName: "Arroz con Leche",
    aliases: [
      "arroz con leche"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "dessert_sweet",
    culturalContext: "Mexican rice pudding, made with milk, cinnamon and sugar.",
    typicalIngredients: [
      "Rice",
      "Milk",
      "Cinnamon",
      "Sugar"
    ],
    nutrition: [
      "Carbohydrates",
      "Added sugar"
    ],
    safeWhen: [
      "eaten in moderation as part of an overall varied diet"
    ],
    cautionWhen: [
      "large or frequent portions, for added sugar intake — relevant to anyone managing blood sugar, including gestational diabetes"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A traditional sweet dish that can fit into an overall varied diet in moderate amounts.",
      pregnancy: "Fine occasionally; portion matters more if gestational diabetes has been diagnosed.",
      postpartum: "Can be part of a varied diet during recovery.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency given general dietary guidance to limit added sugar.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "chiles-rellenos": {
    id: "chiles-rellenos",
    canonicalName: "Chiles Rellenos",
    aliases: [
      "chile relleno"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "fried_snack",
    culturalContext: "Poblano peppers stuffed with cheese or meat, battered and fried, usually served in a tomato sauce.",
    typicalIngredients: [
      "Poblano pepper",
      "Cheese or meat filling",
      "Batter (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
  "enchiladas": {
    id: "enchiladas",
    canonicalName: "Enchiladas",
    aliases: [
      "enchiladas"
    ],
    country: "Mexican/Mexican-American",
    region: "north_american",
    subgroup: "mexican_american",
    category: "other",
    culturalContext: "Corn tortillas rolled around a filling, covered in chilli sauce and cheese, then baked.",
    typicalIngredients: [
      "Corn tortilla",
      "Filling",
      "Chilli sauce",
      "Cheese"
    ],
    nutrition: [
      "Varies by ingredients used"
    ],
    safeWhen: [
      "ingredients are fresh and any meat/egg/fish components are cooked thoroughly"
    ],
    cautionWhen: [
      "fried or high-sodium versions, for portion"
    ],
    avoidWhen: [
      "any raw animal-protein filling, in pregnancy"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Can fit into a varied diet; the ingredients and preparation used matter more than the dish category itself.",
      pregnancy: "Check that any meat, egg or seafood filling/component is fully cooked.",
      postpartum: "Can be part of a varied recovery diet.",
      breastfeeding: "No specific concerns beyond standard food safety.",
      menstrual: "No specific concerns.",
      menopause: "No specific concerns.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "fry-bread": {
    id: "fry-bread",
    canonicalName: "Fry Bread",
    aliases: [
      "frybread"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "bread_starch",
    culturalContext: "A flat, deep-fried bread that developed among Indigenous nations in the 19th century; a food with a complex history tied to government-issued commodity rations, now also reclaimed and reimagined in contemporary Indigenous cooking.",
    typicalIngredients: [
      "Flour",
      "Baking powder (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "bison": {
    id: "bison",
    canonicalName: "Bison",
    aliases: [
      "buffalo meat"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "protein_meat_fish",
    culturalContext: "A lean red meat that was historically central to the diets and cultures of Plains nations.",
    typicalIngredients: [
      "Bison (buffalo) meat"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "wild-rice": {
    id: "wild-rice",
    canonicalName: "Wild Rice",
    aliases: [
      "manoomin"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "rice_grain",
    culturalContext: "Manoomin (wild rice), hand-harvested by Anishinaabe and other Great Lakes nations; a culturally and nutritionally significant staple grain.",
    typicalIngredients: [
      "Wild rice (manoomin)"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre and B vitamins depending on grain type and additions"
    ],
    safeWhen: [
      "cooked and stored safely (reheated rice should be piping hot and not left at room temperature)"
    ],
    cautionWhen: [
      "portion size, for people managing blood sugar (e.g. gestational diabetes)",
      "fried-rice-style preparations with high oil/salt"
    ],
    avoidWhen: [
      "rice that has been left at room temperature for a long time before reheating (Bacillus cereus food-poisoning risk applies to rice generally)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A carbohydrate-based staple that fits into a balanced diet in appropriate portions.",
      pregnancy: "Fine in normal portions; if gestational diabetes has been diagnosed, portion and pairing with protein/fibre matters — follow individual dietary guidance.",
      postpartum: "A common, gentle staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "A steady energy source; pairing with iron-rich sides is useful.",
      menopause: "Consider whole-grain versions where available for fibre and blood-sugar stability.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "corn": {
    id: "corn",
    canonicalName: "Corn",
    aliases: [
      "maize indigenous"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "staple_starch",
    culturalContext: "One of the 'Three Sisters' companion crops (with beans and squash) central to many Indigenous agricultural traditions across North America.",
    typicalIngredients: [
      "Corn/maize"
    ],
    nutrition: [
      "Carbohydrates",
      "Resistant starch (varies by preparation)",
      "Potassium (in plantain/banana-based staples)"
    ],
    safeWhen: [
      "properly cooked/processed (e.g. cassava products must be adequately processed to remove naturally occurring cyanogenic compounds — a standard part of traditional garri/fufu/attiéké production)"
    ],
    cautionWhen: [
      "large portions if managing blood sugar"
    ],
    avoidWhen: [
      "cassava that has not been properly processed (peeled, soaked/fermented, cooked) — raw or under-processed cassava is a genuine safety concern"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple starch across many cuisines; nutrition value depends heavily on preparation and what it's served with.",
      pregnancy: "Fine when properly prepared; pair with protein and vegetables for a balanced plate.",
      postpartum: "A traditional, filling staple in many postpartum recovery diets.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Consider portion and pairing with fibre-rich vegetables.",
      preconception: "No specific concerns.",
    },
    evidence: "limited",
    flags: [],
  },
  "squash": {
    id: "squash",
    canonicalName: "Squash",
    aliases: [
      "indigenous squash"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "vegetable_leafy",
    culturalContext: "The third of the 'Three Sisters' crops, used in soups, roasted, or mashed.",
    typicalIngredients: [
      "Squash"
    ],
    nutrition: [
      "Vitamin A/C/K (varies by vegetable)",
      "Iron",
      "Fibre"
    ],
    safeWhen: [
      "washed thoroughly before cooking or eating"
    ],
    cautionWhen: [
      "raw/unwashed leafy greens or salads, due to potential contamination"
    ],
    avoidWhen: [
      "unwashed raw greens from an uncertain source, particularly in pregnancy (listeria/toxoplasmosis-type contamination risk applies generally to unwashed produce, not to this dish specifically)"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "Leafy vegetables are a valuable source of vitamins, iron and fibre across the reproductive journey.",
      pregnancy: "Wash thoroughly; cooked leafy greens are a good folate and iron source.",
      postpartum: "Iron-rich greens can help support postpartum recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron content is relevant to replacing losses during a period.",
      menopause: "Vitamin K and calcium-adjacent nutrients in leafy greens are relevant to bone health.",
      preconception: "Folate-rich greens are relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "berries": {
    id: "berries",
    canonicalName: "Berries",
    aliases: [
      "wild berries indigenous"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "fruit_raw",
    culturalContext: "Wild-harvested berries (e.g. saskatoon, chokecherry, blueberry) traditionally gathered and used fresh or dried by many Indigenous nations.",
    typicalIngredients: [
      "Wild berries"
    ],
    nutrition: [
      "Vitamin C",
      "Fibre",
      "Natural sugars"
    ],
    safeWhen: [
      "washed before eating; ripe where ripeness affects safety (see dish-specific notes)"
    ],
    cautionWhen: [
      "large quantities of dried/concentrated fruit, for sugar content"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "Fresh fruit is a good source of vitamins and fibre and fits well across the reproductive journey.",
      pregnancy: "Wash thoroughly before eating.",
      postpartum: "A useful, easy source of vitamins during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "Vitamin C from fruit can support iron absorption from other foods eaten at the same meal.",
      menopause: "Fibre and antioxidants are relevant to general cardiovascular health.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "salmon": {
    id: "salmon",
    canonicalName: "Salmon",
    aliases: [
      "indigenous salmon"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "protein_meat_fish",
    culturalContext: "A culturally central fish for many Pacific Northwest nations, traditionally smoked, grilled or dried.",
    typicalIngredients: [
      "Salmon"
    ],
    nutrition: [
      "Protein",
      "Iron (red meat)",
      "Omega-3 (oily fish)",
      "B vitamins"
    ],
    safeWhen: [
      "meat, poultry and fish are cooked all the way through"
    ],
    cautionWhen: [
      "fatty/processed cuts eaten very frequently, for saturated fat and sodium"
    ],
    avoidWhen: [
      "undercooked or raw meat, poultry or fish — particularly relevant in pregnancy due to listeria/toxoplasmosis/salmonella-type risk from undercooked animal protein"
    ],
    alternatives: [],
    reproductiveHealth: {
      general: "A protein source; the main consideration for any journey is that meat, poultry and fish are cooked thoroughly.",
      pregnancy: "Ensure fully cooked; this is one of the more important preparation-dependent food-safety categories in pregnancy specifically.",
      postpartum: "A useful protein and iron source during recovery.",
      breastfeeding: "No specific concerns beyond thorough cooking.",
      menstrual: "Iron and protein are relevant to replacing losses during a period.",
      menopause: "Lean, well-cooked protein supports muscle maintenance.",
      preconception: "Zinc and iron in meat are relevant to preconception nutrition generally.",
    },
    evidence: "established",
    flags: [],
  },
  "three-sisters": {
    id: "three-sisters",
    canonicalName: "Three Sisters",
    aliases: [
      "three sisters"
    ],
    country: "Indigenous Communities",
    region: "north_american",
    subgroup: "indigenous",
    category: "legume",
    culturalContext: "The companion-planted trio of corn, beans and squash, and dishes (such as succotash) built around them.",
    typicalIngredients: [
      "Corn",
      "Beans",
      "Squash"
    ],
    nutrition: [
      "Plant protein",
      "Fibre",
      "Folate",
      "Iron"
    ],
    safeWhen: [
      "cooked thoroughly (dried beans/peas should be fully cooked, not left undercooked)"
    ],
    cautionWhen: [
      "large portions may cause bloating for some people, especially if not used to a high-fibre diet"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A good source of plant protein, fibre and folate that fits well across the reproductive journey.",
      pregnancy: "A useful folate and iron source; well tolerated by most people in normal portions.",
      postpartum: "Supports iron repletion after birth.",
      breastfeeding: "No specific concerns.",
      menstrual: "Iron and folate can help support what's lost during a period.",
      menopause: "Plant protein and fibre support cardiovascular and bone health.",
      preconception: "Folate content is relevant to preconception nutrition guidance generally.",
    },
    evidence: "established",
    flags: [],
  },
  "roti-caribbean-diaspora": {
    id: "roti-caribbean-diaspora",
    canonicalName: "Roti Caribbean Diaspora",
    aliases: [
      "roti"
    ],
    country: "Caribbean Diaspora",
    region: "north_american",
    subgroup: "caribbean_diaspora",
    category: "bread_starch",
    culturalContext: "A flatbread wrapped or folded around a curried filling, brought to North America through Caribbean (particularly Trinidadian and Guyanese) migration.",
    typicalIngredients: [
      "Flatbread",
      "Curried filling"
    ],
    nutrition: [
      "Carbohydrates",
      "Some fibre (more with whole-grain versions)"
    ],
    safeWhen: [
      "freshly made or properly stored"
    ],
    cautionWhen: [
      "deep-fried versions, for portion/fat content",
      "refined white-flour versions if watching blood sugar"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "A staple bread/starch that fits into a balanced diet.",
      pregnancy: "Fine in normal portions; choose whole-grain versions where available.",
      postpartum: "A gentle, familiar staple during recovery.",
      breastfeeding: "No specific concerns.",
      menstrual: "No specific concerns.",
      menopause: "Whole-grain versions support fibre and blood-sugar goals.",
      preconception: "No specific concerns.",
    },
    evidence: "established",
    flags: [],
  },
  "plantains-diaspora": {
    id: "plantains-diaspora",
    canonicalName: "Plantains Diaspora",
    aliases: [
      "fried plantains diaspora"
    ],
    country: "Caribbean Diaspora",
    region: "north_american",
    subgroup: "caribbean_diaspora",
    category: "fried_snack",
    culturalContext: "Fried ripe or green plantain, a very common side dish across Caribbean-diaspora households.",
    typicalIngredients: [
      "Plantain (fried)"
    ],
    nutrition: [
      "Carbohydrates",
      "Fat (from frying)",
      "Protein (varies by filling)"
    ],
    safeWhen: [
      "fried thoroughly and fillings (meat/fish/egg) are fully cooked"
    ],
    cautionWhen: [
      "frequency and portion size, given the fat and sodium contributed by frying and fillings/seasoning"
    ],
    avoidWhen: [],
    alternatives: [],
    reproductiveHealth: {
      general: "An occasional treat food across the journey; frequency and portion are the main considerations, as with any fried food.",
      pregnancy: "Fine occasionally; ensure any meat/egg filling is fully cooked.",
      postpartum: "Can be part of a varied diet during recovery, in reasonable amounts.",
      breastfeeding: "No specific concerns beyond moderation.",
      menstrual: "No specific concerns.",
      menopause: "Consider frequency for cardiovascular health if eaten often.",
      preconception: "No specific concerns beyond moderation.",
    },
    evidence: "established",
    flags: [],
  },
};

export const CULTURAL_MEAL_LIST = Object.values(CULTURAL_MEAL_LIBRARY);
