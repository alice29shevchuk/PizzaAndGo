import React from "react";
function Categories({value,onClickCategory}){
    const categories = [
        'Все',
        'Комбо',
        'Зимние новинки',
        'Новинки',
        'Сезонные новинки',
        'Соусы',
        'Напитки'
    ]
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