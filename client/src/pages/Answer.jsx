import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const Answer = () => {
    const params = useParams();
    const [answer, setAnswer] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/answers/${params.id}`);
                setAnswer(res.data[0]);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAnswer();
    });

    const deleteAnswer = async () => {
        try {
            await axios.delete(`http://localhost:8800/answers/${answer.id}`);
            navigate('/answers');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Form Cevap Detayı</h1>
            {answer && (<table>
                <tr><th>İsim Soyisim: </th><td>{answer.name}</td></tr>
                <tr><th>TC Kimlik: </th><td>{answer.tcn}</td></tr>
                <tr><th>Adres: </th><td>{answer.address}</td></tr>
                <tr><th>Telefon: </th><td>{answer.phone}</td></tr>
                <tr><th>Email: </th><td>{answer.email}</td></tr>
                <tr><th>Doğum Tarihi: </th><td>{answer.birthday.slice(0, 10).split('-').reverse().join('/')}</td></tr>
                <tr><th>Perakende Ticareti İle Uğraştınız Mı? </th><td>{answer.experience ? 'Evet' : 'Hayır'}</td></tr>
                { answer.reason && (<tr><th>Lokumcu Baba'yı Tercih Etmenizin Sebebi Nedir? </th><td>{answer.reason}</td></tr>)}
                <tr><th>Hangi İl İçin Lokumcu Baba İşletmeciliği Düşünüyorsunuz? </th><td>{answer.city}</td></tr>
                <tr><th>Hangi İlçe İçin Lokumcu Baba İşletmeciliği Düşünüyorsunuz? </th><td>{answer.province}</td></tr>
                { answer.district && (<tr><th>Hangi Semt İçin Lokumcu Baba İşletmeciliği Düşünüyorsunuz? </th><td>{answer.district}</td></tr>)}
                <tr><th>Yatırım Miktarınız Nedir? </th><td>{answer.investment}</td></tr>
                { answer.extra && (<tr><th>Eklemek İstedikleriniz </th><td>{answer.extra}</td></tr>)}
                <tr>
                    <td><button onClick={() => navigate('/answers')}>Geri Dön</button></td>
                    <td><button onClick={deleteAnswer}>Kaydı Sil</button></td>
                </tr>
            </table>)}
        </div>
    );
};

export default Answer;