import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  setIsTendencyModal: (newValue: boolean) => void;
  setIsThemeModal: (newValue: boolean) => void;
};
const ThemeModal = ({ setIsTendencyModal, setIsThemeModal }: Props) => {
  const handleTendencyOpen = () => {
    setIsTendencyModal(true);
    setIsThemeModal(false);
  };

  const themes: string[] = [
    '맛집',
    '명소',
    '공연/전시',
    '스포츠 경기',
    '액티비티',
    '쇼핑',
    '힐링',
    '사진',
    '파티',
    '기타',
  ];

  // 테마 담기 // 최대개수
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const option = target.value;
    if (target.checked) {
      if (selectedThemes.length < 3) {
        setSelectedThemes(item => [...item, option]);
      } else {
        target.checked = false;
      }
    } else {
      const index = selectedThemes.indexOf(option);
      if (index !== -1) {
        setSelectedThemes(item => item.filter(thing => thing !== option));
      }
    }
  };
  return (
    <ThemeBox>
      <div className="theme-box">
        <div className="theme-top">
          <h3>원하는 테마를 선택하세요</h3>
          <p>1~3개의 키워드를 선택해주세요</p>
        </div>
        <label>테마</label>
        <ThemeContent>
          {themes.map((theme: string) => (
            <li key={theme}>
              <label>
                <input
                  type="checkbox"
                  value={theme}
                  onClick={handleCheckboxClick}
                ></input>
                {theme}
              </label>
            </li>
          ))}
        </ThemeContent>
        <div className="selected-theme">
          {selectedThemes.map((theme, index) => (
            <div key={index}>{theme}</div>
          ))}
        </div>
        <div className="theme-bottom">
          <button onClick={handleTendencyOpen}>이전</button>
          <button>다음</button>
        </div>
      </div>
    </ThemeBox>
  );
};

export default ThemeModal;

const ThemeBox = styled.div`
  display: flex;
  width: 550px;
  height: 800px;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;
  font-size: 24px;
  .theme-box {
    padding: 40px;
    width: 100%;
    height: 100%;
    > label {
      margin-left: 20px;
      font-size: 1.7rem;
    }
  }
  .theme-top {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    > h3 {
      font-size: 2rem;
      font-weight: bold;
    }
    > p {
      font-size: 1rem;
    }
  }
  .theme-bottom {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 30px;
    > button:first-child {
      border: none;
      width: 96px;
      height: 44px;
      border-radius: 30px;
      background-color: #aeaeae;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
    }
    > button:last-child {
      border: none;
      width: 96px;
      height: 44px;
      border-radius: 30px;
      background-color: #feb35c;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
  .selected-theme {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      width: 100px;
      height: 30px;
      background-color: #5d62a0;
      color: white;
      font-size: 1.2rem;
    }
  }
`;

const ThemeContent = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 80px;
    background-color: #d9d9d9;
    margin-bottom: 10px;
    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &:hover {
        background-color: #feb35c;
      }
      > input {
        display: none;
      }
    }
  }
`;