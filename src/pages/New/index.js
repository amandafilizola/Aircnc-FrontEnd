import React, {useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail):null;
        },[thumbnail]
    );

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        const user_id = localStorage.getItem('user');

        await api.post('/spots', data,{
            headers:{
                user_id
            }
        })
        history.push('/Dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail"
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail':''}>
                <input type="file" onChange={event=>setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="camera icon"/>
            </label>

            <label htmlFor="company">EMPRESA</label>
            <input type="text"
            placeholder="Sua empresa incrível"
            id="company" value={company}
            onChange={event=>setCompany(event.target.value)}/>

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input type="text"
            placeholder="Quais tecnologias usam?"
            id="techs" value={techs}
            onChange={event=>setTechs(event.target.value)}/>

            <label htmlFor="price">VALOR DA DIÁRIA* <span>(em branco para gratuito)</span></label>
            <input type="text"
            placeholder="Valor cobrado por dia"
            id="price" value={price}
            onChange={event=>setPrice(event.target.value)}/>

            <button className="btn">Cadastrar</button>
        </form>
    )
}