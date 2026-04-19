export interface B12Inputs {
  age: '60-69' | '70-79' | '80+';
  gender: 'male' | 'female';
  diet: 'omnivore' | 'vegetarian' | 'vegan';
  medications: boolean; // metformin, PPIs, H2 blockers
  symptoms: boolean;    // fatigue, tingling, memory issues
}

export interface B12Result {
  dailyDose: string;
  form: string;
  timing: string;
  note: string;
  urgency: 'routine' | 'elevated' | 'urgent';
}

export function calculateB12Dose(inputs: B12Inputs): B12Result {
  let base = 25; // mcg, standard maintenance

  // Age adjustment
  if (inputs.age === '70-79') base = 100;
  if (inputs.age === '80+') base = 500;

  // Vegan/vegetarian significantly increase need
  if (inputs.diet === 'vegan') base = Math.max(base, 500);
  if (inputs.diet === 'vegetarian') base = Math.max(base, 100);

  // Medications that block absorption
  if (inputs.medications) base = Math.max(base, 500);

  // Active symptoms → higher-dose sublingual
  if (inputs.symptoms) base = Math.max(base, 1000);

  let form = 'cyanocobalamin tablet';
  let timing = 'with breakfast';

  if (base >= 1000) {
    form = 'methylcobalamin sublingual (dissolves under tongue)';
    timing = 'morning, on empty stomach';
  } else if (base >= 500) {
    form = 'methylcobalamin or cyanocobalamin tablet';
    timing = 'with breakfast';
  }

  let note = '';
  let urgency: B12Result['urgency'] = 'routine';

  if (inputs.symptoms) {
    note = 'Symptoms suggest possible deficiency. Get a blood test (serum B12 + MMA) before starting high-dose supplementation.';
    urgency = 'urgent';
  } else if (inputs.medications || inputs.diet === 'vegan' || inputs.age === '80+') {
    note = 'You have at least one strong risk factor for B12 malabsorption. Annual blood testing recommended.';
    urgency = 'elevated';
  } else {
    note = 'Routine supplementation for adults 60+. Test every 2–3 years.';
    urgency = 'routine';
  }

  return {
    dailyDose: `${base} mcg/day`,
    form,
    timing,
    note,
    urgency,
  };
}
