import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Answers = () => {
    const [answers, setAnswers] = useState();

    useEffect(() => {
        const fetchAllAnswers = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/answers`);
                setAnswers(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllAnswers();
    });

    const navigate = useNavigate();

    const clickHandler = (event) => {
        navigate(`/answer/${event.target.getAttribute('answer')}`);
    }

    return (
        <div>
            <h1>Form Cevapları</h1>
            <table className="answers">
                <thead>
                    <tr>
                        <th>İsim Soyisim</th>
                        <th>Telefon</th>
                        <th>E-Posta</th>
                        <th>Şehir</th>
                        <th>Yatırım Miktarı</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {answers && answers.map(answer => (
                    <tr className="answer" key={answer.id}>
                        <td>{answer.name}</td>
                        <td>{answer.phone}</td>
                        <td>{answer.email}</td>
                        <td>{answer.city}</td>
                        <td>{answer.investment}</td>
                        <td><button answer={answer.id} onClick={clickHandler}>Detay</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="buttonContainer"><button onClick={() => navigate('/')}>Forma Dön</button></div>
        </div>
    );
};

export default Answers;