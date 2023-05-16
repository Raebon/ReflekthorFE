import Link from "next/link";

interface CategoryItem {
  text: string;
  colorCategory: string;
}

const SelectCategoriesBar = () => {
  const category: CategoryItem[] = [
    {
      text: "Programování",
      colorCategory: "bg-orange-400",
    },
    {
      text: "Technologie",
      colorCategory: "bg-blue-500",
    },
    {
      text: "Finance",
      colorCategory: "bg-blue-950",
    },
    {
      text: "Cestování",
      colorCategory: "bg-green-700",
    },
    {
      text: "Auta",
      colorCategory: "bg-red-700",
    },
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {category.map((item, index) => {
        return (
          <div
            className="flex gap-1 items-center cursor-pointer hover:underline"
            key={index}
          >
            <div className={`h-2 w-2 rounded-full ${item.colorCategory}`} />
            <span className="text-sm tracking-tighter leading-tight text-slate-700 dark:text-slate-400 hover:text-black hover:dark:text-slate-100">
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCategoriesBar;
