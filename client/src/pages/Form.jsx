import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [inputs, setInputs] = useState({
        name: '',
        experience: false,
        tcn: '',
        address: '',
        phone: '',
        email: '',
        birthday: '',
        province: '',
        investment: '',
        city: "ADANA"
    });
    const cities = ["ADANA", "ADIYAMAN", "AFYONKARAHİSAR", "AĞRI", "AMASYA", "ANKARA", "ANTALYA", "ARTVİN", "AYDIN", "BALIKESİR", "BİLECİK", "BİNGÖL", "BİTLİS", "BOLU", "BURDUR", "BURSA", "ÇANAKKALE", "ÇANKIRI", "ÇORUM", "DENİZLİ", "DİYARBAKIR", "EDİRNE", "ELAZIĞ", "ERZİNCAN", "ERZURUM", "ESKİŞEHİR", "GAZİANTEP", "GİRESUN", "GÜMÜŞHANE", "HAKKARİ", "HATAY", "ISPARTA", "MERSİN", "İSTANBUL", "İZMİR", "KARS", "KASTAMONU", "KAYSERİ", "KIRKLARELİ", "KIRŞEHİR", "KOCAELİ", "KONYA", "KÜTAHYA", "MALATYA", "MANİSA", "KAHRAMANMARAŞ", "MARDİN", "MUĞLA", "MUŞ", "NEVŞEHİR", "NİĞDE", "ORDU", "RİZE", "SAKARYA", "SAMSUN", "SİİRT", "SİNOP", "SİVAS", "TEKİRDAĞ", "TOKAT", "TRABZON", "TUNCELİ", "ŞANLIURFA", "UŞAK", "VAN", "YOZGAT", "ZONGULDAK", "AKSARAY", "BAYBURT", "KARAMAN", "KIRIKKALE", "BATMAN", "ŞIRNAK", "BARTIN", "ARDAHAN", "IĞDIR", "YALOVA", "KARABÜK", "KİLİS", "OSMANİYE", "DÜZCE"];

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        if (event.target.name === 'experience') {
            const value = event.target.checked;
            setInputs(values => ({ ...values, [name]: value }))
        } else {
            const value = event.target.value;
            setInputs(values => ({ ...values, [name]: value }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let validationFail = false;
            Object.keys(inputs).forEach(key => {
                
                if (inputs[key].length < 1) {
                    validationFail = true;
                    document.querySelector(`[name=${ key }]`).style.borderColor = 'red';
                }
            });

            if (!validationFail) {
                await axios.post("http://localhost:8800/answers", inputs);
                navigate('/answers');
            }
        } catch (error) {
            throw error;
        }
    };

    const handleNavigation = (event) => {
        event.preventDefault();
        navigate('/answers');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>BAYİLİK ÖN BAŞVURU FORMU</h1>
            <label>
                <span className="required">İsim Soyisim</span>
                <input
                    type="text"
                    name="name"
                    value={inputs.name || ""}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span className="required">TC Kimlik</span>
                <input
                    type="text"
                    name="tcn"
                    value={inputs.tcn || ""}
                    onChange={handleChange}
                    onKeyPress={(e) => (!/[0-9]/.test(e.key) || e.target.value.length > 10) && e.preventDefault()}
                    required
                />
            </label>
            <label>
                <span className="required">Telefon</span>
                <input
                    type="text"
                    name="phone"
                    value={inputs.phone || ""}
                    onChange={handleChange}
                    onKeyPress={(e) => (!/[+0-9]/.test(e.key) || e.target.value.length > 12) && e.preventDefault()}
                    required
                />
            </label>
            <label>
                <span className="required">E-Posta</span>
                <input
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span className="required">Doğum Tarihi</span>
                <input
                    type="date"
                    name="birthday"
                    value={inputs.birthday || ""}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span className="required">Yatırım Miktarınız Nedir?</span>
                <input
                    type="text"
                    name="investment"
                    value={inputs.investment || ""}
                    onChange={handleChange}
                    onKeyPress={(e) => (!/[0-9]/.test(e.key) || e.target.value.length > 10) && e.preventDefault()}
                    required
                />
            </label>
            <label>
                <span className="required">Adres</span>
                <textarea
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span>Lokumcu Baba'yı Tercih Etmenizin Sebebi Nedir?</span>
                <textarea
                    name="reason"
                    value={inputs.reason}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span className="required">Hangi İl/İlçe/Semt İçin Lokumcu Baba İşletmeciliği Düşünüyorsunuz?</span>
                <select name="city" value={inputs.city || "ADANA"} onChange={handleChange}>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="province"
                    value={inputs.province || ""}
                    onChange={handleChange}
                    placeholder="İlçe"
                    required
                />
                <input
                    type="text"
                    name="district"
                    value={inputs.district || ""}
                    onChange={handleChange}
                    placeholder="Semt"
                    required
                />
            </label>
            <label>
                <span>Eklemek İstedikleriniz</span>
                <textarea
                    name="extra"
                    value={inputs.extra}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span className="required">Perakende Ticareti İle Uğraştınız Mı?</span>
                <input
                    type="checkbox"
                    name="experience"
                    checked={inputs.experience || false}
                    onChange={handleChange}
                    required
                />
            </label>
            <div className="buttonContainer">
                <button onClick={handleSubmit}>Gönder</button>
                <button onClick={handleNavigation}>Cevapları Gör</button>
            </div>
        </form>
    );
};

export default Form;