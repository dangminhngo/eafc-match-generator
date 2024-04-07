type Option = { label: string; value: string };

interface SelectProps {
  id: string;
  label: string;
  options: Option[];
  disabledOptions?: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({
  id,
  label,
  options,
  disabledOptions,
  value,
  setValue,
}: SelectProps) {
  return (
    <div className="flex flex-col items-stretch space-y-1">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 rounded bg-slate-800 px-4 py-2"
      >
        {options.map((opt) => (
          <option
            key={`${id}-${value}`}
            value={opt.value}
            disabled={disabledOptions?.includes(opt.value)}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
