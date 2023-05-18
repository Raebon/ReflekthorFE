"use client";
import { useGetCategoriesSetupQuery } from "@/utils/api/query/getCategoriesQueryKey";
import Link from "next/link";

const SelectCategoriesBar = () => {
  const { data } = useGetCategoriesSetupQuery();

  return (
    <div className="flex gap-2 flex-wrap">
      {data &&
        data.map((item, index) => {
          return (
            <div
              className="flex gap-1 items-center cursor-pointer hover:underline"
              key={index}
            >
              <div
                className={`h-2 w-2 rounded-full`}
                style={{ backgroundColor: item.color ?? "gray" }}
              />
              <span className="text-sm tracking-tighter leading-tight text-slate-700 dark:text-slate-400 hover:text-black hover:dark:text-slate-100">
                {item.name}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default SelectCategoriesBar;
