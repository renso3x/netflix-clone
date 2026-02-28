type NumeralBadgeProps = {
  index: number;
};

const NumeralBadge = ({ index }: NumeralBadgeProps) => {
  const labels = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ];
  const key = labels[index];
  if (!key) {
    return (
      <span className="pointer-events-none absolute -left-4 bottom-0 text-[140px] font-black leading-none text-white/10">
        {index + 1}
      </span>
    );
  }

  return (
    <img
      src={`/numerals/${key}.svg`}
      alt={`Rank ${index + 1}`}
      className="pointer-events-none absolute -left-6 bottom-2 h-40 w-auto opacity-90"
    />
  );
};

export default NumeralBadge;