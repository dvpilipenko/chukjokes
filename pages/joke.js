import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

const getJoke = async () =>{
    const res = await fetch('http://api.icndb.com/jokes/random');
    const data = await res.json();
    return {
        joke: data.value.joke
    };
};

const saveInLocalStorage = (item) => {
  localStorage.setItem('joke',JSON.stringify(item));
};

const Index = (props) => {
    const [joke, setJoke] = useState(props.joke);

    const reload = async () => {
        const newJoke = await getJoke();
        setJoke(newJoke.joke)
    };
    const saveJoke = () => {
        saveInLocalStorage(joke);
    };

    return (
        <div>
            <p>{joke}</p>
            <button onClick={reload}>Reload</button>
            <button onClick={saveJoke}>Save Joke!</button>
        </div>
    );
};

Index.getInitialProps = async function () {
    return await getJoke();
};

export default Index;
