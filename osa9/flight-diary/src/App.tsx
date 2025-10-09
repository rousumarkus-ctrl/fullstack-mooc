import React, { useEffect, useState } from 'react';
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from './types';
import { createDiary, getAllDiaries } from './diaryService';
import axios from 'axios';

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
  const diary = props.diary;
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    createDiary(newDiary)
      .then((response) => setDiaries(diaries.concat(response)))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data);
          setTimeout(() => setNotification(''), 5000);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getAllDiaries().then((response) => setDiaries(response));
  }, []);
  return (
    <div>
      <div>{notification}</div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>
            date
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
              name="date"
            ></input>
          </label>
        </div>
        <div>
          <label>
            weather
            {Object.values(Weather).map((w) => {
              return (
                <label key={w}>
                  {w}
                  <input
                    type="radio"
                    onChange={() => setWeather(w)}
                    name="weather"
                  ></input>
                </label>
              );
            })}
          </label>
        </div>
        <div>
          <label>
            visibility
            {Object.values(Visibility).map((v) => {
              return (
                <label key={v}>
                  {v}
                  <input
                    type="radio"
                    onChange={() => setVisibility(v)}
                    name="visibility"
                  ></input>
                </label>
              );
            })}
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              name="comment"
            ></input>
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <Diary key={d.id} diary={d}></Diary>
      ))}
    </div>
  );
};

export default App;
