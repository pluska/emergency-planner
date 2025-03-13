import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  name: string;
  quantity: number;
  isChecked: boolean;
}

interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

interface EmergencyChecklistProps {
  checklistData: string;
}

const EmergencyChecklist: React.FC<EmergencyChecklistProps> = ({ checklistData }) => {
  // Parse the markdown-formatted checklistData into structured data
  const parseChecklistData = (data: string): ChecklistCategory[] => {
    const categories: ChecklistCategory[] = [];
    let currentCategory: ChecklistCategory | null = null;
    
    const lines = data.split('\n');
    lines.forEach(line => {
      // Check for category headers (lines starting with "A.", "B.", etc.)
      if (line.match(/^[A-Z]\.\s/)) {
        const title = line.replace(/^[A-Z]\.\s/, '').trim();
        currentCategory = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          items: []
        };
        categories.push(currentCategory);
      }
      // Check for items (lines starting with bullet points or dashes)
      else if (currentCategory && line.includes('x')) {
        const match = line.match(/(.*?)\s?x\s?(\d+)/);
        if (match) {
          const itemName = match[1].trim();
          const quantity = parseInt(match[2]);
          currentCategory.items.push({
            id: Math.random().toString(36).substr(2, 9),
            name: itemName,
            quantity,
            isChecked: false
          });
        }
      }
    });

    return categories;
  };

  const [categories, setCategories] = useState<ChecklistCategory[]>(() => 
    parseChecklistData(checklistData)
  );

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === itemId) {
                return { ...item, isChecked: !item.isChecked };
              }
              return item;
            })
          };
        }
        return category;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {categories.map(category => (
        <div key={category.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
          <div className="space-y-2">
            {category.items.map(item => (
              <div key={item.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => toggleItem(category.id, item.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={`flex-1 ${item.isChecked ? 'line-through text-gray-500' : ''}`}>
                  {item.name}
                </span>
                <span className="text-sm text-gray-600">
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyChecklist;