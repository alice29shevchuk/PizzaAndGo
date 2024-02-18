import React,{useEffect,useState} from "react";
import axios from "axios";
// export const categories = [
//   'Все',
//   'Комбо',
//   'Зимние новинки',
//   'Новинки',
//   'Сезонные новинки',
//   'Соусы',
//   'Напитки'
// ]
function Categories({value,onClickCategory}){
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://alisa000077-001-site1.htempurl.com/api/Category/GetCategoryes");
        const fetchedCategories = response.data;
        fetchedCategories.unshift({ title: "Все" });
        setCategories(fetchedCategories);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
    return(
      <div className="categories">
      <ul>
        {categories.map((categoryName,indx)=>(
            <li 
            key={indx}
            onClick={()=>onClickCategory(indx)} 
            className={value===indx?'active':''}>
                {categoryName.title}
            </li>
        ))}
      </ul>
    </div>
    );
}
export default Categories;