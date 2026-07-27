import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [message, setMessage] = useState('أهلاً بك في الآلة الحاسبة المحششة 😂');
  const [btnStyles, setBtnStyles] = useState({});
  const containerRef = useRef(null);

  const funnyMessages = [
    "شغل مخك يا أخي!",
    "يعني بدك ياني احسبلك اياها؟",
    "الجواب: بطيخة 🍉",
    "روح ادرس أحسلك 📚",
    "حاول مرة أخرى... أو لا تحاول أحسن",
    "الرقم المطلوب لا يمكن الاتصال به حاليا 📞",
    "عفواً، الحاسبة في استراحة غداء 🍔",
    "يا زلمة استحِ على وجهك، هيك سؤال بينسأل؟",
    "الجواب هو: 404 Not Found",
    "انا آلة حاسبة مش ساحر 🧙‍♂️"
  ];

  const handleInput = (val) => {
    setDisplay(prev => prev + val);
    setMessage("أيوة... كمل... عم بحسب 🧐");
  };

  const calculate = () => {
    if (!display) {
      setMessage("اكتب شي يا عبقري!");
      return;
    }
    
    // Trolling logic for simple math like 1+1
    if (display === '1+1') {
      setDisplay('11');
      setMessage("طبعا 11... شو مفكر؟ 😂");
      return;
    }
    if (display === '5+5') {
      setDisplay('55');
      setMessage("أكيد 55، الرياضيات في خطر 💀");
      return;
    }

    // 40% chance to just give a troll message instead of the answer
    if (Math.random() > 0.6) {
      const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setDisplay('Error 420 🌿');
      setMessage(randomMsg);
      return;
    }

    try {
      // Very dangerous eval but this is a local troll app
      // eslint-disable-next-line
      const result = eval(display); 
      // Sometimes just add a random number to the result
      if (Math.random() > 0.7) {
        setDisplay(String(result + Math.floor(Math.random() * 10)));
        setMessage("ممكن زدت شوي من عندي، اعتبرهم بخشيش 💵");
      } else {
        setDisplay(String(result));
        setMessage("خذ الجواب ولا تزعجني مرة تانية 😒");
      }
    } catch (e) {
      setDisplay('مستحيل 🤦‍♂️');
      setMessage("شو هالخبيصة اللي كاتبها؟");
    }
  };

  const clear = () => {
    setDisplay('');
    setMessage("مسحنا... يلا من أول وجديد 🔄");
    setBtnStyles({});
  };

  const moveButton = (id) => {
    // 30% chance the button moves when hovered
    if (Math.random() > 0.7) {
      const top = Math.random() * 150 - 75;
      const left = Math.random() * 150 - 75;
      setBtnStyles(prev => ({
        ...prev,
        [id]: { transform: `translate(${left}px, ${top}px)`, transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)', zIndex: 10 }
      }));
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="troll-container" ref={containerRef}>
      <h1 className="title">الآلة الحاسبة المحششة 🚀</h1>
      <p className="message">{message}</p>
      
      <div className="calculator">
        <div className="display">{display || '0'}</div>
        <div className="buttons-grid">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`calc-btn ${btn === '=' ? 'equals' : ''} ${btn === '/' || btn === '*' || btn === '-' || btn === '+' ? 'operator' : ''}`}
              style={btnStyles[btn]}
              onMouseEnter={() => moveButton(btn)}
              onClick={() => {
                if (btn === '=') calculate();
                else handleInput(btn);
              }}
            >
              {btn}
            </button>
          ))}
          <button className="calc-btn clear" onClick={clear}>C</button>
        </div>
      </div>
      
      <button className="panic-btn" onClick={() => {
        document.body.classList.toggle('earthquake');
        setMessage("زلزاااااال 🌍🏃‍♂️💨");
      }}>
        لا تضغط هنا ⚠️
      </button>
    </div>
  );
}

export default App;
