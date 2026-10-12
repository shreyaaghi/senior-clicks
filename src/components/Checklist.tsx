import { useState } from 'react';

type ChecklistItemData = {
  id: string;
  text: string;
};

type ChecklistProps = {
  items: ChecklistItemData[];
};

export default function Checklist({ items }: ChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <label className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 cursor-pointer transition-colors ${checkedIds.has(item.id) ? 'bg-sc-light border-sc-navy' : 'bg-white border-sc-light hover:border-sc-periwinkle'}`}>
            <input
              type="checkbox"
              checked={checkedIds.has(item.id)}
              onChange={() => toggleItem(item.id)} className="w-6 h-6 accent-sc-navy cursor-pointer shrink-0"
            />
            <span className={`text-lg leading-snug ${checkedIds.has(item.id) ? 'text-sc-dark line-through' : 'text-sc-darkest'}`}>
            {item.text}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}