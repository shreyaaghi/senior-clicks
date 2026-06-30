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
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={checkedIds.has(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            {item.text}
          </label>
        </li>
      ))}
    </ul>
  );
}