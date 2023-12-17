import React from "react";

function Category({ selected, item, handleToggleCategory, type }) {
  const classNames = [
    "cursor-pointer hover:bg-secondary grid content-center gap-1 justify-items-center rounded-md py-2 px-4 border",
    selected && "bg-secondary",
    type === "link" && " hover:text-primary",
  ];

  return (
    <div
      className={classNames.join(" ")}
      onClick={handleToggleCategory && handleToggleCategory}
    >
      <p className="text-xl sm:text-2xl">{React.createElement(item.icon)}</p>
      <p className="text-sm md:text.md">{item.name}</p>
    </div>
  );
}

export default Category;
