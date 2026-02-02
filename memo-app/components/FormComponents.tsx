'use client';

import { TeamMember } from '@/lib/memoTypes';
import { Plus, Trash2 } from 'lucide-react';

export const FormSection = ({ 
  title, 
  color, 
  children 
}: { 
  title: string; 
  color: string; 
  children: React.ReactNode 
}) => (
  <div className="mb-8">
    <div className={`${color} text-white font-bold py-3 px-4 rounded-lg mb-4 text-center`}>
      {title}
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export const FormField = ({ 
  label, 
  note,
  children 
}: { 
  label: string; 
  note?: string;
  children: React.ReactNode 
}) => (
  <div>
    <label className="form-label">{label}</label>
    {note && (
      <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded mb-2">💡 {note}</p>
    )}
    {children}
  </div>
);

export const TextInput = ({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string 
}) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="form-input"
  />
);

export const TextArea = ({ 
  value, 
  onChange, 
  placeholder,
  rows = 3
}: { 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string;
  rows?: number;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="form-textarea"
  />
);

export const RadioGroup = ({ 
  options, 
  value, 
  onChange,
  name
}: { 
  options: string[]; 
  value: string; 
  onChange: (v: string) => void;
  name: string;
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {options.map((option) => (
      <label key={option} className="checkbox-label">
        <input
          type="radio"
          name={name}
          checked={value === option}
          onChange={() => onChange(option)}
          className="w-4 h-4"
        />
        <span className={value === option ? 'font-medium text-blue-700' : ''}>{option}</span>
      </label>
    ))}
  </div>
);

export const CheckboxGroup = ({ 
  options, 
  values, 
  onChange 
}: { 
  options: string[]; 
  values: string[]; 
  onChange: (v: string[]) => void 
}) => (
  <div className="space-y-2">
    {options.map((option) => (
      <label key={option} className="checkbox-label">
        <input
          type="checkbox"
          checked={values.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...values, option]);
            } else {
              onChange(values.filter(v => v !== option));
            }
          }}
          className="w-4 h-4"
        />
        <span className={values.includes(option) ? 'font-medium text-blue-700' : ''}>{option}</span>
      </label>
    ))}
  </div>
);

export const TeamMemberTable = ({ 
  members, 
  onChange,
  showWhen = false
}: { 
  members: TeamMember[]; 
  onChange: (m: TeamMember[]) => void;
  showWhen?: boolean;
}) => {
  const addMember = () => {
    onChange([...members, { person: '', role: '', hours: '', when: '', confirmed: false }]);
  };

  const removeMember = (index: number) => {
    onChange(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string | boolean) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {members.map((member, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-lg">
          <input
            type="text"
            value={member.person}
            onChange={(e) => updateMember(idx, 'person', e.target.value)}
            placeholder="Name"
            className="col-span-3 form-input text-sm"
          />
          <input
            type="text"
            value={member.role}
            onChange={(e) => updateMember(idx, 'role', e.target.value)}
            placeholder="Their role"
            className={`${showWhen ? 'col-span-3' : 'col-span-4'} form-input text-sm`}
          />
          <input
            type="text"
            value={member.hours}
            onChange={(e) => updateMember(idx, 'hours', e.target.value)}
            placeholder="Hours"
            className="col-span-2 form-input text-sm"
          />
          {showWhen && (
            <input
              type="text"
              value={member.when}
              onChange={(e) => updateMember(idx, 'when', e.target.value)}
              placeholder="When"
              className="col-span-2 form-input text-sm"
            />
          )}
          <label className={`${showWhen ? 'col-span-1' : 'col-span-2'} flex items-center gap-1 text-sm`}>
            <input
              type="checkbox"
              checked={member.confirmed}
              onChange={(e) => updateMember(idx, 'confirmed', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="hidden sm:inline">OK</span>
          </label>
          <button
            type="button"
            onClick={() => removeMember(idx)}
            className="col-span-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addMember}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add team member
      </button>
    </div>
  );
};

export const ObjectionsList = ({
  objections,
  onChange
}: {
  objections: { objection: string; response: string }[];
  onChange: (o: { objection: string; response: string }[]) => void;
}) => {
  const addObjection = () => {
    onChange([...objections, { objection: '', response: '' }]);
  };

  const removeObjection = (index: number) => {
    onChange(objections.filter((_, i) => i !== index));
  };

  const updateObjection = (index: number, field: 'objection' | 'response', value: string) => {
    const updated = [...objections];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {objections.map((obj, idx) => (
        <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm text-gray-600">Objection {idx + 1}</span>
            <button
              type="button"
              onClick={() => removeObjection(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={obj.objection}
            onChange={(e) => updateObjection(idx, 'objection', e.target.value)}
            placeholder="What objection will they have?"
            className="form-input text-sm"
          />
          <input
            type="text"
            value={obj.response}
            onChange={(e) => updateObjection(idx, 'response', e.target.value)}
            placeholder="How will you respond?"
            className="form-input text-sm"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addObjection}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add objection
      </button>
    </div>
  );
};

export const RisksList = ({
  risks,
  onChange,
  showLikelihoodImpact = false
}: {
  risks: { risk: string; mitigation: string; likelihood?: string; impact?: string }[];
  onChange: (r: { risk: string; mitigation: string; likelihood?: string; impact?: string }[]) => void;
  showLikelihoodImpact?: boolean;
}) => {
  const addRisk = () => {
    onChange([...risks, { risk: '', mitigation: '', likelihood: '', impact: '' }]);
  };

  const removeRisk = (index: number) => {
    onChange(risks.filter((_, i) => i !== index));
  };

  const updateRisk = (index: number, field: string, value: string) => {
    const updated = [...risks];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {risks.map((r, idx) => (
        <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm text-gray-600">Risk {idx + 1}</span>
            <button
              type="button"
              onClick={() => removeRisk(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={r.risk}
            onChange={(e) => updateRisk(idx, 'risk', e.target.value)}
            placeholder="What could go wrong?"
            className="form-input text-sm"
          />
          {showLikelihoodImpact && (
            <div className="grid grid-cols-2 gap-2">
              <select
                value={r.likelihood || ''}
                onChange={(e) => updateRisk(idx, 'likelihood', e.target.value)}
                className="form-input text-sm"
              >
                <option value="">Likelihood</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={r.impact || ''}
                onChange={(e) => updateRisk(idx, 'impact', e.target.value)}
                className="form-input text-sm"
              >
                <option value="">Impact</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          )}
          <input
            type="text"
            value={r.mitigation}
            onChange={(e) => updateRisk(idx, 'mitigation', e.target.value)}
            placeholder="How will you handle it?"
            className="form-input text-sm"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addRisk}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add risk
      </button>
    </div>
  );
};

export const MilestonesList = ({
  milestones,
  onChange
}: {
  milestones: { date: string; milestone: string; criteria: string; owner: string }[];
  onChange: (m: { date: string; milestone: string; criteria: string; owner: string }[]) => void;
}) => {
  const addMilestone = () => {
    onChange([...milestones, { date: '', milestone: '', criteria: '', owner: '' }]);
  };

  const removeMilestone = (index: number) => {
    onChange(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {milestones.map((m, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-lg">
          <input
            type="text"
            value={m.date}
            onChange={(e) => updateMilestone(idx, 'date', e.target.value)}
            placeholder="Date"
            className="col-span-2 form-input text-sm"
          />
          <input
            type="text"
            value={m.milestone}
            onChange={(e) => updateMilestone(idx, 'milestone', e.target.value)}
            placeholder="Milestone"
            className="col-span-4 form-input text-sm"
          />
          <input
            type="text"
            value={m.criteria}
            onChange={(e) => updateMilestone(idx, 'criteria', e.target.value)}
            placeholder="Success criteria"
            className="col-span-3 form-input text-sm"
          />
          <input
            type="text"
            value={m.owner}
            onChange={(e) => updateMilestone(idx, 'owner', e.target.value)}
            placeholder="Owner"
            className="col-span-2 form-input text-sm"
          />
          <button
            type="button"
            onClick={() => removeMilestone(idx)}
            className="col-span-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addMilestone}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add milestone
      </button>
    </div>
  );
};

export const BudgetList = ({
  items,
  onChange
}: {
  items: { item: string; oneTime: string; monthly: string }[];
  onChange: (b: { item: string; oneTime: string; monthly: string }[]) => void;
}) => {
  const addItem = () => {
    onChange([...items, { item: '', oneTime: '', monthly: '' }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {items.map((b, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-lg">
          <input
            type="text"
            value={b.item}
            onChange={(e) => updateItem(idx, 'item', e.target.value)}
            placeholder="Item"
            className="col-span-5 form-input text-sm"
          />
          <input
            type="text"
            value={b.oneTime}
            onChange={(e) => updateItem(idx, 'oneTime', e.target.value)}
            placeholder="One-time cost"
            className="col-span-3 form-input text-sm"
          />
          <input
            type="text"
            value={b.monthly}
            onChange={(e) => updateItem(idx, 'monthly', e.target.value)}
            placeholder="Monthly"
            className="col-span-3 form-input text-sm"
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="col-span-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add budget item
      </button>
    </div>
  );
};

export const AlternativesList = ({
  items,
  onChange
}: {
  items: { option: string; reason: string }[];
  onChange: (a: { option: string; reason: string }[]) => void;
}) => {
  const addItem = () => {
    onChange([...items, { option: '', reason: '' }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {items.map((a, idx) => (
        <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm text-gray-600">
              {idx === 0 ? 'Option A (Recommended)' : idx === 1 ? 'Option B' : `Option ${String.fromCharCode(65 + idx)}`}
            </span>
            {idx > 0 && (
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="text"
            value={a.option}
            onChange={(e) => updateItem(idx, 'option', e.target.value)}
            placeholder="What's the option?"
            className="form-input text-sm"
          />
          <input
            type="text"
            value={a.reason}
            onChange={(e) => updateItem(idx, 'reason', e.target.value)}
            placeholder={idx === 0 ? "Why is this the best choice?" : "Why not this option?"}
            className="form-input text-sm"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <Plus className="w-4 h-4" /> Add alternative
      </button>
    </div>
  );
};
