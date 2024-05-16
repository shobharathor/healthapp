import axios from 'axios';
import { useEffect, useState } from 'react';
import './Body.css';

const Body = () => {

    const [dataArr, setDataArr] = useState([]);
    const [imgArr, setImgArr] = useState([]);
    const [exName, setExName] = useState('');

    const getData = async () => {

        const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises',
            params: {limit: '10'},
            headers: {
            'X-RapidAPI-Key': 'b44edc273fmsh1d5bf2b8ce193b1p1e8307jsnd3ba87e25030',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            setDataArr(response.data);
            setImgArr(response.data);
        } catch (error) {
            console.error(error);
        }
        
    }

    const handleClick = (e) => {
        e.preventDefault();

        if (exName === 'All') {
            setImgArr(dataArr);
            return;
        }

        const newArr = dataArr.filter((obj)=>{
            return obj.bodyPart.startsWith(exName);
        })
        setImgArr(newArr);
    }

    useEffect(()=> {

        getData();

    },[]);  

    return (
        <section className='body'>
            <div className='body-container'>
                <form>
                    <select onChange={(e)=>setExName(e.target.value)}>
                        <option>All</option>
                        <option>waist</option>
                        <option>upper legs</option>
                        <option>back</option>
                        <option>lower legs</option>
                        <option>chest</option>
                    </select>
                    <button type='submit' onClick={handleClick}>search</button>
                </form>
                <div className='exercises'>
                    {
                        imgArr.map((obj) => {
                            return <img src={obj.gifUrl} alt='img' />
                        })
                    }
                </div>
            </div>
        </section>
    )
    
}

export default Body;