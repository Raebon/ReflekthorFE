import { SelectItemType } from "@/types/appTypes";
import { CategoryDto } from "@/types/reflektor-api-service";

export function convertCategoryItems(
  categoryItems: CategoryDto[] | undefined
): SelectItemType[] {
  if (!categoryItems) return [];
  let categoryItemsForSelect: SelectItemType[] = [];

  for (let i = 0; i < categoryItems.length; i++) {
    const item = categoryItems[i];
    const categoryItemForSelect: SelectItemType = {
      value: item.categoryId,
      name: item.name!,
    };
    categoryItemsForSelect.push(categoryItemForSelect);
  }

  return categoryItemsForSelect;
}
