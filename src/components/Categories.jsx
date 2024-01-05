import React from "react";
export const categories = [
  'Все',
  'Комбо',
  'Зимние новинки',
  'Новинки',
  'Сезонные новинки',
  'Соусы',
  'Напитки'
]
function Categories({value,onClickCategory}){
    return(
      <div className="categories">
      <ul>
        {categories.map((categoryName,indx)=>(
            <li 
            key={indx}
            onClick={()=>onClickCategory(indx)} 
            className={value===indx?'active':''}>
                {categoryName}
            </li>
        ))}
      </ul>
    </div>
    );
}
export default Categories;