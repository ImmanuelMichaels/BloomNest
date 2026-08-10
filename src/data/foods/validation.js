// src/data/foods/validation.js
import { FOODS } from './foods';
import { HEALTH_GUIDANCE } from './guidance';
import { SOURCES } from './sources';
import { REVIEW_STATUSES } from './types';

export function generateValidationReport() {
  const report = {
    foodsNeedingReview: [],
    foodsApproved: [],
    foodsNeedingRevision: [],
    guidanceNeedingReview: [],
    guidanceApproved: [],
    guidanceWithUnresolvedSources: [],
    unknownNutrients: [],
    duplicates: [],
    foodsWithNoSource: [],
    foodsWithNoNutrition: [],
    summary: {
      totalFoods: 0,
      foodsApproved: 0,
      foodsPending: 0,
      totalGuidance: 0,
      guidanceApproved: 0,
      guidancePending: 0,
      foodsWithNoSource: 0,
      foodsWithNoNutrition: 0
    }
  };

  // Check each food
  Object.values(FOODS).forEach(food => {
    report.summary.totalFoods++;

    if (!food.review) {
      report.foodsNeedingReview.push({
        id: food.id,
        name: food.name,
        reason: 'No review status',
        urgency: 'high'
      });
    } else if (food.review.status === REVIEW_STATUSES.APPROVED) {
      report.foodsApproved.push({
        id: food.id,
        name: food.name,
        reviewedBy: food.review.reviewedBy,
        reviewedAt: food.review.reviewedAt
      });
      report.summary.foodsApproved++;
    } else if (food.review.status === REVIEW_STATUSES.NEEDS_REVISION) {
      report.foodsNeedingRevision.push({
        id: food.id,
        name: food.name,
        reason: 'Needs revision',
        urgency: 'medium'
      });
    } else {
      report.foodsNeedingReview.push({
        id: food.id,
        name: food.name,
        reason: `Status: ${food.review.status}`,
        urgency: 'medium'
      });
      report.summary.foodsPending++;
    }

    // Check source IDs
    if (!food.sourceIds || food.sourceIds.length === 0) {
      report.foodsWithNoSource.push(food.id);
      report.summary.foodsWithNoSource++;
    } else {
      food.sourceIds.forEach(sourceId => {
        if (!SOURCES[sourceId]) {
          report.guidanceWithUnresolvedSources.push({
            foodId: food.id,
            sourceId: sourceId,
            issue: 'Source not found'
          });
        }
      });
    }

    // Check nutrients
    if (!food.nutrients || food.nutrients.length === 0) {
      report.foodsWithNoNutrition.push(food.id);
      report.summary.foodsWithNoNutrition++;
    }
  });

  // Check each guidance entry
  Object.values(HEALTH_GUIDANCE).forEach(guidance => {
    report.summary.totalGuidance++;

    if (!guidance.review) {
      report.guidanceNeedingReview.push({
        id: guidance.id,
        foodId: guidance.foodId,
        journey: guidance.journey,
        reason: 'No review status',
        urgency: 'high'
      });
    } else if (guidance.review.status === REVIEW_STATUSES.APPROVED) {
      report.guidanceApproved.push({
        id: guidance.id,
        foodId: guidance.foodId,
        reviewedBy: guidance.review.reviewedBy,
        reviewedAt: guidance.review.reviewedAt
      });
      report.summary.guidanceApproved++;
    } else {
      report.guidanceNeedingReview.push({
        id: guidance.id,
        foodId: guidance.foodId,
        journey: guidance.journey,
        reason: `Status: ${guidance.review.status}`,
        urgency: 'medium'
      });
      report.summary.guidancePending++;
    }
  });

  return report;
}

/**
 * Generate a human-readable validation table
 */
export function generateValidationTable() {
  const report = generateValidationReport();

  let table = '## Femin9 Food Database Validation Report\n\n';

  table += '### Summary\n';
  table += `| Metric | Count |\n`;
  table += `|--------|-------|\n`;
  table += `| Total Foods | ${report.summary.totalFoods} |\n`;
  table += `| Foods Approved | ${report.summary.foodsApproved} |\n`;
  table += `| Foods Pending Review | ${report.summary.foodsPending} |\n`;
  table += `| Total Guidance Entries | ${report.summary.totalGuidance} |\n`;
  table += `| Guidance Approved | ${report.summary.guidanceApproved} |\n`;
  table += `| Guidance Pending Review | ${report.summary.guidancePending} |\n`;
  table += `| Foods with No Sources | ${report.summary.foodsWithNoSource} |\n`;
  table += `| Foods with No Nutrition Data | ${report.summary.foodsWithNoNutrition} |\n\n`;

  if (report.foodsNeedingReview.length > 0) {
    table += '### Foods Needing Clinical Review\n';
    table += `| Food ID | Name | Reason | Urgency |\n`;
    table += `|---------|------|--------|---------|\n`;
    report.foodsNeedingReview.forEach(f => {
      table += `| ${f.id} | ${f.name} | ${f.reason} | ${f.urgency} |\n`;
    });
    table += '\n';
  }

  if (report.guidanceNeedingReview.length > 0) {
    table += '### Guidance Entries Needing Clinical Review\n';
    table += `| ID | Food ID | Journey | Reason |\n`;
    table += `|-----|---------|---------|--------|\n`;
    report.guidanceNeedingReview.forEach(g => {
      table += `| ${g.id} | ${g.foodId} | ${g.journey} | ${g.reason} |\n`;
    });
    table += '\n';
  }

  if (report.guidanceWithUnresolvedSources.length > 0) {
    table += '### Unresolved Source References\n';
    table += `| Food ID | Source ID | Issue |\n`;
    table += `|---------|-----------|-------|\n`;
    report.guidanceWithUnresolvedSources.forEach(g => {
      table += `| ${g.foodId} | ${g.sourceId} | ${g.issue} |\n`;
    });
    table += '\n';
  }

  table += '### Next Steps\n';
  table += '1. Review all foods with status "pending_review"\n';
  table += '2. Add sources for foods without references\n';
  table += '3. Review guidance entries with no review status\n';
  table += '4. Add nutrition data for foods without it\n';
  table += '5. Update source URLs for referenced sources\n';

  return table;
}