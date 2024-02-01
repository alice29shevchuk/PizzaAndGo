import axios from 'axios';
import React from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {addProduct,cartSelector,updateSelectedIngredients,updateExcludedIngredients,updateSelectedSauce} from '../redux/slices/cartSlice';
import {useSelector,useDispatch} from 'react-redux';
import Footer from '../components/Footer';
export const PizzaInfo = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pizza,setPizza] = React.useState();
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [excludedIngredients, setExcludedIngredients] = React.useState([]);
    const selectedSauce = useSelector((state) => state.cart.selectedSauce);   
    const [isSauceChecked, setIsSauceChecked] = React.useState(false);
    const {totalPrice,items} = useSelector(cartSelector);
    React.useEffect(() => {
      dispatch(updateSelectedSauce(''));
  }, []);
    React.useEffect(()=>{
        async function fetchPizzas(){
            try{
                const {data} = await axios.get(`http://alisa000077-001-site1.htempurl.com/api/Pizza/GetPizzaByID?idPizza=${id}`);
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
        console.log(excludedIngredients);
        dispatch(updateExcludedIngredients(excludedIngredients,ingredient));

      } 
      else {
        setExcludedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
        console.log(excludedIngredients);
        dispatch(updateExcludedIngredients(excludedIngredients));

      }
    };
    const handleSauceChange = () => {
      // setIsSauceChecked(true);
      setIsSauceChecked((prevIsSauceChecked) => !prevIsSauceChecked);
      const newSelectedSauce = selectedSauce === pizza.sauce ? '' : pizza.sauce;
      dispatch(updateSelectedSauce(newSelectedSauce));
    };
    
    const calculateTotalPrice = () => {
        const ingredientsPrice = selectedIngredients.reduce((total, ingredient) => {
          const selectedIngredient = pizza.ingredientsAdd.find((item) => item.name === ingredient);
          return total + (selectedIngredient ? selectedIngredient.price : 0);
        }, 0);
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
        };

        dispatch(addProduct(item));
        navigate('/basket');
    };
    
    if(!pizza){
      return(
          <div className={`loading-container ${!pizza ? 'loading' : ''}`}>{!pizza ? (
            <div className="loader">
              <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
              </svg>
            </div>
          ) : (
            'Завантажено!'
          )}</div>
      );
    }
    return (
      <>
        <div className="pizza-info">
        <div>
        <h2>{pizza.title}</h2>
          <img src={pizza.imageUrl} alt="Pizza" />
          <p>{pizza.ingredients.map((ingredient) => ingredient.name).join(', ')}</p>
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
              <div key={ingredient.id}>
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
            {pizza.ingredientsExcepts.map((ingredient) => (
              <div key={ingredient.id}>
                <label>
                  <input type="checkbox" onChange={() => handleExcludeIngredientChange(ingredient.name)}
                  checked={excludedIngredients.includes(ingredient.name)} />
                  {`${ingredient.name}`}
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
    <Footer></Footer>
    </>
  )
}
