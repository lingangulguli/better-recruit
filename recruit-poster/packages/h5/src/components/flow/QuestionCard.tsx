import type { Question, UserAnswers } from '@recruit-poster/shared';

type Value = UserAnswers[string] | undefined;

interface Props {
  question: Question;
  value: Value;
  onChange: (v: UserAnswers[string]) => void;
}

export default function QuestionCard({ question, value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[20px] leading-[1.35] font-semibold text-ink-900 tracking-tight">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="mt-1.5 text-[13px] text-ink-500">{question.subtitle}</p>
        )}
      </div>

      {question.type === 'single-choice' && (
        <SingleChoice
          options={question.options || []}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
        />
      )}

      {question.type === 'multi-choice' && (
        <MultiChoice
          options={question.options || []}
          maxSelection={question.maxSelection}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {question.type === 'text' && (
        <TextInput
          maxLength={question.maxLength}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
        />
      )}

      {question.type === 'structured' && (
        <StructuredInput
          fields={question.fields || []}
          value={(value && typeof value === 'object' && !Array.isArray(value)) ? value as Record<string, string> : {}}
          onChange={onChange}
        />
      )}
    </div>
  );
}

// -------------------- 各子类型 --------------------

interface Option { id: string; label: string; hint?: string }

function SingleChoice({
  options, value, onChange,
}: { options: Option[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full text-left px-4 py-3.5 rounded-md border transition-all ${
              active
                ? 'bg-ink-900 border-ink-900 text-white'
                : 'bg-white border-ink-100 hover:border-ink-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-[15px] font-medium ${active ? 'text-white' : 'text-ink-900'}`}>
                  {opt.label}
                </div>
                {opt.hint && (
                  <div className={`mt-0.5 text-[12px] ${active ? 'text-white/70' : 'text-ink-400'}`}>
                    {opt.hint}
                  </div>
                )}
              </div>
              {active && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({
  options, maxSelection, value, onChange,
}: { options: Option[]; maxSelection?: number; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      if (maxSelection && value.length >= maxSelection) return;
      onChange([...value, id]);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`px-4 py-2 rounded-full border text-[14px] transition-all ${
                active
                  ? 'bg-ink-900 border-ink-900 text-white'
                  : 'bg-white border-ink-200 text-ink-700 hover:border-ink-400'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {maxSelection && (
        <div className="mt-3 text-[12px] text-ink-400">
          已选 {value.length} / {maxSelection}
        </div>
      )}
    </div>
  );
}

function TextInput({
  maxLength, value, onChange,
}: { maxLength?: number; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        rows={4}
        placeholder="选填"
        className="w-full px-4 py-3 rounded-md border border-ink-200 bg-white text-[15px] text-ink-900 placeholder-ink-300 focus:outline-none focus:border-ink-600 resize-none"
      />
      {maxLength && (
        <div className="mt-1.5 text-right text-[12px] text-ink-400">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
}

function StructuredInput({
  fields, value, onChange,
}: {
  fields: { key: string; label: string; placeholder?: string; required?: boolean; type?: string; maxLength?: number }[];
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
}) {
  const setField = (k: string, v: string) => {
    onChange({ ...value, [k]: v });
  };
  return (
    <div className="space-y-3">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-[13px] font-medium text-ink-600 mb-1.5">
            {f.label}
            {f.required && <span className="ml-1 text-ink-400">*</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              value={value[f.key] || ''}
              onChange={(e) => setField(f.key, f.maxLength ? e.target.value.slice(0, f.maxLength) : e.target.value)}
              placeholder={f.placeholder}
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-md border border-ink-200 bg-white text-[14px] text-ink-900 placeholder-ink-300 focus:outline-none focus:border-ink-600 resize-none"
            />
          ) : (
            <input
              type={f.type === 'number' ? 'number' : 'text'}
              value={value[f.key] || ''}
              onChange={(e) => setField(f.key, f.maxLength ? e.target.value.slice(0, f.maxLength) : e.target.value)}
              placeholder={f.placeholder}
              className="w-full h-11 px-3.5 rounded-md border border-ink-200 bg-white text-[14px] text-ink-900 placeholder-ink-300 focus:outline-none focus:border-ink-600"
            />
          )}
        </div>
      ))}
    </div>
  );
}
