interface FeedbackChipProps {
  metric: 'LDI' | 'GDP' | 'Population' | 'correct';
  guessValue: number;
  targetValue: number;
  isCorrectGuess?: boolean;
}


function getDescriptiveText(metric: string, guessValue: number, targetValue: number): string {
  if (metric === 'LDI') {
    // LDI uses absolute difference - show target relative to guess
    const diff = targetValue - guessValue; // Flipped: target - guess
    const absDiff = Math.abs(diff);
    
    if (absDiff <= 0.10) return 'Similar ';
    if (absDiff <= 0.25) {
      return diff > 0 ? 'A Bit Higher ' : 'A Bit Lower ';
    }
    return diff > 0 ? 'Much Higher ' : 'Much Lower ';
  } else {
    // GDP and Population use ratio comparison - show target relative to guess
    const ratio = targetValue / guessValue; // Flipped: target / guess
    
    if (ratio >= 0.67 && ratio <= 1.5) return 'Similar ';
    if (ratio >= 1.5 && ratio < 5) return 'A Bit Higher ';
    if (ratio >= 5) return 'Much Higher ';
    if (ratio >= 0.2 && ratio < 0.67) return 'A Bit Lower ';
    return 'Much Lower '; // ratio < 0.2
  }
}

function getColorClass(metric: string, guessValue: number, targetValue: number): string {
  if (metric === 'LDI') {
    const absDiff = Math.abs(targetValue - guessValue); // Flipped to match logic
    if (absDiff <= 0.10) return 'text-green-700 bg-green-100';
    if (absDiff <= 0.25) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  } else {
    const ratio = targetValue / guessValue; // Flipped to match logic
    if (ratio >= 0.67 && ratio <= 1.5) return 'text-green-700 bg-green-100';
    if ((ratio >= 1.5 && ratio < 5) || (ratio >= 0.2 && ratio < 0.67)) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  }
}

export default function FeedbackChip({ metric, guessValue, targetValue, isCorrectGuess = false }: FeedbackChipProps) {
  const descriptiveText = isCorrectGuess ? 'Correct!' : getDescriptiveText(metric, guessValue, targetValue);
  const colorClass = isCorrectGuess ? 'text-green-700 bg-green-100' : getColorClass(metric, guessValue, targetValue);

  if (metric === 'correct') {
    return (
      <div className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-green-100 text-green-700">
        <span className="text-sm" style={{ verticalAlign: 'middle' }}>✅</span>
        <span>Correct! </span>
      </div>
    );
  }

  const emojis = {
    LDI: '🏛️',
    GDP: '💰',
    Population: '👥'
  };

  return (
    <div className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${colorClass}`}>
      <span className="text-sm" style={{ verticalAlign: 'middle' }}>{emojis[metric as keyof typeof emojis]}</span>
      <span>{descriptiveText} </span>
    </div>
  );
}
