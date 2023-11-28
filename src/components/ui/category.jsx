import React from "react";

function Category({ selected, item, handleToggleCategory }) {
  const classNames = [
    "cursor-pointer hover:bg-secondary flex flex-col items-center rounded-md py-2 px-4 border",
    selected && "bg-secondary",
  ];

  return (
    <div
      className={classNames.join(" ")}
      key={item.name}
      onClick={handleToggleCategory}
    >
      <p className="text-2xl">{React.createElement(item.icon)}</p>
      <p>{item.name}</p>
    </div>
  );
}

export default Category;
