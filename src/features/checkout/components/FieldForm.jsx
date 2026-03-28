import { useFormContext } from "react-hook-form";

export default function FieldForm({ label, name, placeholder, gridSpan }) {

  const { register, formState: { errors } } = useFormContext();
  
  const error = errors[name]?.message;
  return (
    <div className={gridSpan}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        {...register(name)}
        className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 
                ${error ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary-500 focus:border-transparent"}`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
