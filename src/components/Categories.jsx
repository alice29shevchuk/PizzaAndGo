import React from "react";
function Categories(){
    const [activeCategory,setActiveCategory]= React.useState(0);
    const categories = [
        'Все',
        'Комбо',
        'Зимние новинки',
        'Новинки',
        'Сезонные новинки',
        'Соусы',
        'Напитки'
    ]
    const onClickCategory=(index)=>{
        setActiveCategory(index);
    }
    return(
      <div className="categories">
      <ul>
        {categories.map((value,indx)=>(
            <li 
            key={indx}
            onClick={()=>onClickCategory(indx)} 
            className={activeCategory===indx?'active':''}>
                {value}
            </li>
        ))}
      </ul>
    </div>
    );
}
export default Categories;