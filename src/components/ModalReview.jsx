import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const ModalReview = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 100; 
  const minWords = 5; // Минимальное количество символов
  const { name , email } = useSelector((state) => state.user);
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  React.useEffect(() => {
    setIsFieldsFilled(rating !== 0 && review.trim() !== '' && review.trim().length >= minWords);
  }, [rating, review,minWords]);
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === '') {
        alert('Пожалуйста, оцените заказ и оставьте отзыв.');
        return;
    }
    const feedbackData = {
        id: 0,
        name: name, 
        message: review, 
        rating: rating 
      };
      console.log(feedbackData);
      axios.post('http://alisa000077-001-site1.htempurl.com/api/FeedBack/AddFeedBack', feedbackData)
        .then(response => {
          console.log('Ответ сервера:', response.data);
          alert('Успешно');
          // Ваша логика обработки успешного ответа
        })
        .catch(error => {
          console.error('Ошибка при отправке запроса:', error);
        });
    onClose();
  };
  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxWords) {
      setReview(value);
      setWordCount(value.length);
    }
  };
  
  return (
    <div className="modalReview">
      <div className="modal-content-review">
        <h2>Оставить отзыв</h2>
        <div>
          <p>На сколько Вы оцениваете ваш заказ?</p>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ color: star <= rating ? '#fe5f1e' : 'gray', cursor: 'pointer',fontSize:30 }}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div>
          <p>Оставьте отзыв:</p>
          <textarea
            value={review}
            onChange={handleReviewChange}
            rows={4}
            cols={40}
            placeholder="Напишите ваш отзыв здесь..."
          />
        </div>
        <p style={{fontSize:10}}>{wordCount}/{maxWords} символов</p>
        {!isFieldsFilled && <p style={{fontSize:10,marginBottom:20}}>Минимальное количество символов: 5</p>}
        <div className='buttons-send'>
            <button className='close-button' onClick={handleClose}>Закрыть</button>
            <button className='send-button' onClick={handleSubmit} disabled={!isFieldsFilled}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
