export function useStep<T>(initialStep: T) {
  const currentStep = ref(initialStep);
  const stepAnimationName = ref('');

  watch(currentStep, (nextStep, prevStep) => {
    stepAnimationName.value = nextStep > prevStep ? 'slide-right' : 'slide-left';
  });

  return { currentStep, stepAnimationName };
}
