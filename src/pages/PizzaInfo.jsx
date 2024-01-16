import axios from 'axios';
import React from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {addProduct,cartSelector,updateSelectedIngredients,updateExcludedIngredients,updateSelectedSauce} from '../redux/slices/cartSlice';
import {useSelector,useDispatch} from 'react-redux';
export const PizzaInfo = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pizza,setPizza] = React.useState();
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [excludedIngredients, setExcludedIngredients] = React.useState([]);
    const selectedSauce = useSelector((state) => state.cart.selectedSauce);   
    const [isSauceChecked, setIsSauceChecked] = React.useState(false);
 
    const {totalPrice} = useSelector(cartSelector);
    const cartItems = useSelector((state) => state.cart.items);
    React.useEffect(() => {
      dispatch(updateSelectedSauce(''));
  }, []);
    React.useEffect(()=>{
        async function fetchPizzas(){
            try{
                const {data} = await axios.get('https://6589685a324d41715258e658.mockapi.io/pizzas/'+id);
                setPizza(data);
            }catch(error){
                alert('Smth was wrong :(');
            }
        }
        fetchPizzas();
    },[]);
    const handleIngredientChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
          setSelectedIngredients((prevIngredients) =>
            prevIngredients.filter((item) => item !== ingredient)
          );
          dispatch(updateSelectedIngredients([...selectedIngredients, ingredient])); 

        } else {
          setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
          dispatch(updateSelectedIngredients([...selectedIngredients, ingredient]));

        }
    };
    const handleExcludeIngredientChange = (ingredient) => {
      if (excludedIngredients.includes(ingredient)) {
        setExcludedIngredients((prevIngredients) =>
          prevIngredients.filter((item) => item !== ingredient)
        );
        dispatch(updateExcludedIngredients(excludedIngredients));

      } 
      else {
        setExcludedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
        dispatch(updateExcludedIngredients(excludedIngredients));

      }
    };
    const handleSauceChange = () => {
      setIsSauceChecked(true);
      const newSelectedSauce = selectedSauce === pizza.sauce ? '' : pizza.sauce;
      dispatch(updateSelectedSauce(newSelectedSauce));
    };
    
    const calculateTotalPrice = () => {
        const ingredientsPrice = selectedIngredients.reduce((total, ingredient) => {
          const selectedIngredient = pizza.ingredientsAdd.find((item) => item.name === ingredient);
          return total + (selectedIngredient ? selectedIngredient.price : 0);
        }, 0);
        console.log(pizza.price + ingredientsPrice);
        return pizza.price + ingredientsPrice;
      };
      const handleAddToCart = () => {
        const item = {
          id,
          title: pizza.title,
          price: calculateTotalPrice(),
          imageUrl: pizza.imageUrl,
          selectedIngredients,
          excludedIngredients,
          selectedSauce,
          totalPrice
        };
        dispatch(addProduct(item));
        navigate('/basket');
    };
    
    if(!pizza){
        return 'Загрузка...';
    }
    return (
        <div className="pizza-info">
        <div>
        <h2>{pizza.title}</h2>
          <img src={pizza.imageUrl} alt="Pizza" />
          <p>{pizza.ingredients.join(', ')}</p>
          <div>
            <h5>Соус:</h5>
            <label>
              <input type="checkbox" onChange={handleSauceChange} checked={isSauceChecked} />
              {pizza.sauce}
            </label>
          </div>
          <div>
            <h5>Добавить ингредиенты:</h5>
            {pizza.ingredientsAdd.map((ingredient) => (
              <div key={ingredient.name}>
                <label>
                  <input type="checkbox" onChange={() => handleIngredientChange(ingredient.name, ingredient.price)}
                  checked={selectedIngredients.includes(ingredient.name)}/>
                  {`${ingredient.name} (+${ingredient.price} грн)`}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h5>Исключить ингредиенты:</h5>
            {pizza.ingredientsExcept.map((ingredient) => (
              <div key={ingredient}>
                <label>
                  <input type="checkbox" onChange={() => handleExcludeIngredientChange(ingredient)}
                  checked={excludedIngredients.includes(ingredient)} />
                  {`${ingredient}`}
                </label>
              </div>
            ))}
          </div>
          <div>
          <p>Цена: {calculateTotalPrice()} грн</p>  
          <button onClick={handleAddToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
          </button>  
          </div> 
        </div>       
    </div>
  )
}
