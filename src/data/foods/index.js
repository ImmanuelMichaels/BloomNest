// src/data/foods/index.js
export * from './types';
export * from './regions';
export * from './countries';
export * from './foods';
export * from './guidance';
export * from './sources';
export * from './resolver';
export * from './validation';

// Re-export migration for use in app
export { migrateCulturalFoods } from './migration';

// `export *` re-exports these names for consumers of this module, but it
// does NOT create local bindings usable inside this file — so
// initializeFoodDatabase() below needs its own explicit imports of
// anything it references directly.
import { FOODS } from './foods';
import { HEALTH_GUIDANCE } from './guidance';
import { generateValidationTable } from './validation';
import { migrateCulturalFoods } from './migration';

// Import legacy data for migration
import * as LegacyFoods from '../culturalFoods';

// Migration function that can be called on app start
export function initializeFoodDatabase() {
  console.log('🔄 Initializing food database...');
  
  // Check if we need to migrate
  const hasStorage = typeof localStorage !== 'undefined';
  const needsMigration = !hasStorage || !localStorage.getItem('femin9_food_migrated');
  
  if (needsMigration) {
    console.log('📦 Migrating legacy food data...');
    const result = migrateCulturalFoods(LegacyFoods.CULTURAL_FOODS || {});
    console.log(`✅ Migration complete. ${result.report.migratedFoods} foods migrated, ${result.report.guidanceEntries} guidance entries created.`);
    
    // Store migration version
    if (hasStorage) {
      localStorage.setItem('femin9_food_migrated', '1.0.0');
      localStorage.setItem('femin9_food_migration_date', new Date().toISOString());
    }
    
    // Generate validation report
    const report = generateValidationTable();
    console.log('📊 Validation Report:\n', report);
    
    return result;
  }
  
  console.log('✅ Food database already migrated.');
  return { foods: FOODS, guidance: HEALTH_GUIDANCE };
}